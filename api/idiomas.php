<?php
// idiomas.php
require_once __DIR__ . '/admin_common.php';

$data  = read_json_body();
$token = $data['token'] ?? null;
require_admin($token);

$action = $data['action'] ?? 'list';
$pdo = db();

try {
  if ($action === 'list') {
    // Ahora traemos nombre, icono y activo
    $stmt = $pdo->query("SELECT ididioma, nombre, icono, activo FROM idiomas ORDER BY ididioma ASC");
    json_out(['ok'=>true, 'rows'=>$stmt->fetchAll()]);
  }

  if ($action === 'create') {
    $nombre = trim($data['nombre'] ?? '');
    if ($nombre === '') json_out(['ok'=>false,'msg'=>'nombre requerido'],400);

    $icono  = $data['icono'] ?? null;
    $activo = isset($data['activo']) ? (int)$data['activo'] : 1;

    $stmt = $pdo->prepare("INSERT INTO idiomas (nombre, icono, activo) VALUES (?,?,?)");
    $stmt->execute([$nombre, $icono, $activo]);
    json_out(['ok'=>true, 'ididioma'=>$pdo->lastInsertId()]);
  }

  if ($action === 'update') {
    $id     = (int)($data['ididioma'] ?? 0);
    if ($id<=0) json_out(['ok'=>false,'msg'=>'ididioma requerido'],400);

    $nombre = array_key_exists('nombre',$data) ? trim((string)$data['nombre']) : null;
    $icono  = array_key_exists('icono',$data) ? $data['icono'] : null;
    $activo = array_key_exists('activo',$data) ? (int)$data['activo'] : null;

    // Construimos el UPDATE dinámico
    $sets = []; $vals = [];
    if ($nombre !== null) { $sets[]='nombre=?'; $vals[]=$nombre; }
    if ($icono  !== null) { $sets[]='icono=?';  $vals[]=$icono;  }
    if ($activo !== null) { $sets[]='activo=?'; $vals[]=$activo; }
    if (!$sets) json_out(['ok'=>false,'msg'=>'sin cambios'],400);

    $vals[] = $id;
    $sql = "UPDATE idiomas SET ".implode(',',$sets)." WHERE ididioma=?";
    $pdo->prepare($sql)->execute($vals);

    json_out(['ok'=>true]);
  }

  if ($action === 'delete') {
    $id = (int)($data['ididioma'] ?? 0);
    if ($id<=0) json_out(['ok'=>false,'msg'=>'ididioma requerido'],400);

    // Evitar borrar si está en uso
    $stmt = $pdo->prepare("SELECT 1 FROM categoriasxidioma WHERE ididioma=? LIMIT 1");
    $stmt->execute([$id]);
    if ($stmt->fetch()) json_out(['ok'=>false,'msg'=>'Idioma en uso en categorías'],409);

    $stmt = $pdo->prepare("SELECT 1 FROM platosxidioma WHERE ididioma=? LIMIT 1");
    $stmt->execute([$id]);
    if ($stmt->fetch()) json_out(['ok'=>false,'msg'=>'Idioma en uso en platos'],409);

    $pdo->prepare("DELETE FROM idiomas WHERE ididioma=?")->execute([$id]);
    json_out(['ok'=>true]);
  }

  json_out(['ok'=>false,'msg'=>'Acción no soportada'],400);

} catch (Throwable $e) {
  json_out(['ok'=>false,'msg'=>$e->getMessage()],500);
}
