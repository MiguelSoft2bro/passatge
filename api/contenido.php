<?php
require_once __DIR__ . '/admin_common.php';
$token = $_POST['token'] ?? null;
require_admin($token);

$action = $_POST['action'] ?? 'list';

switch ($action) {
  case 'list': listContenido(); break;
  case 'get_sections': listSections(); break;
  case 'update': updateContenido(); break;
  case 'bulk_update': bulkUpdate(); break;
  case 'create': createContenido(); break;
  case 'delete': deleteContenido(); break;
  case 'reorder': reorderContenido(); break;
  case 'upload_image': uploadImage(); break;
  default: json_out(['ok'=>false,'msg'=>'Acción inválida'],400);
}

function listSections() {
  global $pdo;
  $rows = $pdo->query("SELECT DISTINCT seccion FROM contenido ORDER BY seccion")->fetchAll(PDO::FETCH_COLUMN);
  json_out(['ok'=>true,'sections'=>$rows]);
}

function listContenido() {
  global $pdo;
  $sql = "
    SELECT c.*,
      GROUP_CONCAT(CONCAT(ct.ididioma,':',REPLACE(ct.valor,'|','\\|')) SEPARATOR '||') traducciones
    FROM contenido c
    LEFT JOIN contenido_traducciones ct ON ct.id_contenido = c.id
    WHERE c.activo=1
    GROUP BY c.id
    ORDER BY c.seccion, c.orden, c.id
  ";
  $stmt = $pdo->query($sql);
  $out = [];
  while ($r = $stmt->fetch(PDO::FETCH_ASSOC)) {
    $trs = [];
    if ($r['traducciones']) {
      foreach (explode('||',$r['traducciones']) as $raw) {
        if (strpos($raw,':')!==false) {
          [$ididioma,$val] = explode(':',$raw,2);
          $trs[] = ['ididioma'=>(int)$ididioma,'valor'=>str_replace('\\|','|',$val)];
        }
      }
    }
    $out[] = [
      'id'=>(int)$r['id'],
      'seccion'=>$r['seccion'],
      'clave'=>$r['clave'],
      'tipo'=>$r['tipo'],
      'valor'=>$r['valor'],
      'imagen'=>$r['imagen'],
      'orden'=>(int)$r['orden'],
      'activo'=>(int)$r['activo'],
      'traducciones'=>$trs
    ];
  }
  json_out(['ok'=>true,'rows'=>$out]);
}

function createContenido() {
  global $pdo;
  $seccion = trim($_POST['seccion'] ?? '');
  $clave    = trim($_POST['clave'] ?? '');
  $tipo     = $_POST['tipo'] ?? 'text';
  $valor    = $_POST['valor'] ?? null;
  $orden    = (int)($_POST['orden'] ?? 0);
  if(!$seccion || !$clave) json_out(['ok'=>false,'msg'=>'seccion y clave requeridos'],400);
  $stmt = $pdo->prepare("INSERT INTO contenido (seccion,clave,tipo,valor,orden,activo) VALUES (?,?,?,?,?,1)");
  $stmt->execute([$seccion,$clave,$tipo,$valor,$orden]);
  json_out(['ok'=>true,'id'=>$pdo->lastInsertId()]);
}

function updateContenido() {
  global $pdo;
  $id = (int)($_POST['id'] ?? 0);
  if(!$id) json_out(['ok'=>false,'msg'=>'ID requerido'],400);
  $valor = $_POST['valor'] ?? null;
  $imagen = $_POST['imagen'] ?? null;
  $tipo = $_POST['tipo'] ?? null;
  $activo = isset($_POST['activo']) ? (int)$_POST['activo'] : null;
  $orden = isset($_POST['orden']) ? (int)$_POST['orden'] : null;
  $traducciones = $_POST['traducciones'] ?? [];

  try {
    $pdo->beginTransaction();
    $fields=[];$params=[];
    foreach (['valor','imagen','tipo','activo','orden'] as $f) {
      if(isset($$f)) { $fields[]="$f=?"; $params[]=$$f; }
    }
    if($fields){
      $params[]=$id;
      $sql="UPDATE contenido SET ".implode(',',$fields)." WHERE id=?";
      $st=$pdo->prepare($sql); $st->execute($params);
    }
    if(is_array($traducciones)){
      $del=$pdo->prepare("DELETE FROM contenido_traducciones WHERE id_contenido=?");
      $del->execute([$id]);
      $ins=$pdo->prepare("INSERT INTO contenido_traducciones (id_contenido,ididioma,valor) VALUES (?,?,?)");
      foreach ($traducciones as $t){
        if(isset($t['ididioma'],$t['valor'])){
          $ins->execute([$id,(int)$t['ididioma'],$t['valor']]);
        }
      }
    }
    $pdo->commit();
    json_out(['ok'=>true]);
  } catch(Exception $e){
    $pdo->rollBack();
    json_out(['ok'=>false,'msg'=>$e->getMessage()],500);
  }
}

function bulkUpdate() {
  global $pdo;
  $itemsJson = $_POST['items'] ?? '[]';
  $items = json_decode($itemsJson,true);
  if(!is_array($items)) json_out(['ok'=>false,'msg'=>'Formato inválido'],400);

  try {
    $pdo->beginTransaction();
    $upd = $pdo->prepare("UPDATE contenido SET valor=?, imagen=?, orden=?, activo=? WHERE id=?");
    $delT = $pdo->prepare("DELETE FROM contenido_traducciones WHERE id_contenido=?");
    $insT = $pdo->prepare("INSERT INTO contenido_traducciones (id_contenido,ididioma,valor) VALUES (?,?,?)");

    foreach ($items as $it){
      $id = (int)($it['id'] ?? 0);
      if(!$id) continue;
      $upd->execute([
        $it['valor'] ?? null,
        $it['imagen'] ?? null,
        (int)($it['orden'] ?? 0),
        (int)($it['activo'] ?? 1),
        $id
      ]);
      if(isset($it['traducciones']) && is_array($it['traducciones'])){
        $delT->execute([$id]);
        foreach ($it['traducciones'] as $t){
          if(isset($t['ididioma'],$t['valor'])){
            $insT->execute([$id,(int)$t['ididioma'],$t['valor']]);
          }
        }
      }
    }
    $pdo->commit();
    json_out(['ok'=>true]);
  } catch(Exception $e){
    $pdo->rollBack();
    json_out(['ok'=>false,'msg'=>$e->getMessage()],500);
  }
}

function deleteContenido() {
  global $pdo;
  $id = (int)($_POST['id'] ?? 0);
  if(!$id) json_out(['ok'=>false,'msg'=>'ID requerido'],400);
  $st=$pdo->prepare("DELETE FROM contenido WHERE id=?");
  $st->execute([$id]);
  json_out(['ok'=>true]);
}

function reorderContenido() {
  global $pdo;
  $seccion = $_POST['seccion'] ?? '';
  $ordersJson = $_POST['orders'] ?? '[]';
  $orders = json_decode($ordersJson,true);
  if(!$seccion || !is_array($orders)) json_out(['ok'=>false,'msg'=>'Datos inválidos'],400);
  $upd=$pdo->prepare("UPDATE contenido SET orden=? WHERE id=? AND seccion=?");
  foreach ($orders as $o){
    if(isset($o['id'],$o['orden'])){
      $upd->execute([(int)$o['orden'], (int)$o['id'], $seccion]);
    }
  }
  json_out(['ok'=>true]);
}

function uploadImage() {
  if(!isset($_FILES['file']) || !is_uploaded_file($_FILES['file']['tmp_name']))
    json_out(['ok'=>false,'msg'=>'Archivo requerido'],400);
  $file = $_FILES['file'];
  $finfo = new finfo(FILEINFO_MIME_TYPE);
  $mime = $finfo->file($file['tmp_name']) ?: '';
  $allowed = ['image/jpeg'=>'jpg','image/png'=>'png','image/webp'=>'webp','image/gif'=>'gif'];
  if(!isset($allowed[$mime])) json_out(['ok'=>false,'msg'=>'Formato no permitido'],415);
  $ext = $allowed[$mime];
  $dir = __DIR__ . '/uploads/contenido';
  @mkdir($dir,0775,true);
  $name = 'contenido_' . date('Ymd_His') . '_' . bin2hex(random_bytes(5)) . '.' . $ext;
  $dest = $dir . '/' . $name;
  if(!move_uploaded_file($file['tmp_name'],$dest))
    json_out(['ok'=>false,'msg'=>'Error guardando'],500);
  $scheme = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') ? 'https':'http';
  $host = $_SERVER['HTTP_HOST'] ?? 'localhost';
  $base = rtrim(dirname($_SERVER['SCRIPT_NAME']),'/');
  $url = $scheme.'://'.$host.$base.'/uploads/contenido/'.$name;
  json_out(['ok'=>true,'url'=>$url]);
}