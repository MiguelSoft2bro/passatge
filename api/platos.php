<?php
// platos.php
require_once __DIR__ . '/admin_common.php';

$data = read_json_body();
$token = $data['token'] ?? null;
require_admin($token);

$action = $data['action'] ?? 'list';
$pdo = db();

function norm_bool01($v) {
  // Normaliza a 0/1 (acepta 0/1, true/false, "0"/"1")
  return (int) (!!$v);
}

try {
  if ($action === 'list') {
    // opcional: filtrar por idcategoria y/o destacado
    $idcat = isset($data['idcategoria']) ? (int)$data['idcategoria'] : null;
    $destacadoFilter = isset($data['destacado']) ? norm_bool01($data['destacado']) : null;

    $sql = "
      SELECT p.idplato, p.idcategoria, p.precio, p.image, p.destacado,
             pxi.ididioma, pxi.nombre, pxi.descripcion
      FROM platos p
      LEFT JOIN platosxidioma pxi ON pxi.idplato = p.idplato
    ";

    $where = [];
    $params = [];
    if ($idcat) { $where[] = "p.idcategoria = ?"; $params[] = $idcat; }
    if ($destacadoFilter !== null) { $where[] = "p.destacado = ?"; $params[] = $destacadoFilter; }
    if ($where) { $sql .= " WHERE " . implode(" AND ", $where); }

    // primero los destacados, luego por id y por idioma
$sql .= " ORDER BY p.orden ASC, p.destacado DESC, p.idplato, pxi.ididioma";

    $stmt = $pdo->prepare($sql);
    $stmt->execute($params);
    $rows = $stmt->fetchAll();

    $map = [];
    foreach ($rows as $r) {
      $id = (int)$r['idplato'];
      if (!isset($map[$id])) {
        $map[$id] = [
          'idplato' => $id,
          'idcategoria' => (int)$r['idcategoria'],
          'precio' => $r['precio'],
          'image' => $r['image'],
          'destacado' => (int)$r['destacado'],
          'orden' => (int)$r['orden'],
          'traducciones' => []
        ];
      }
      if ($r['ididioma'] !== null) {
        $map[$id]['traducciones'][] = [
          'ididioma' => (int)$r['ididioma'],
          'nombre' => $r['nombre'],
          'descripcion' => $r['descripcion']
        ];
      }
    }
    json_out(['ok'=>true, 'rows'=>array_values($map)]);
  }

  if ($action === 'create') {
    $idcategoria = (int)($data['idcategoria'] ?? 0);
    if ($idcategoria<=0) json_out(['ok'=>false,'msg'=>'idcategoria requerido'],400);
    $precio = ($data['precio'] ?? 0);
    $image = $data['image'] ?? null;
    $destacado = isset($data['destacado']) ? norm_bool01($data['destacado']) : 0;
    $orden = isset($data['orden']) ? (int)$data['orden'] : 0;
    $pdo->prepare("INSERT INTO platos (idcategoria, precio, image, destacado, orden) VALUES (?,?,?,?,?)")
        ->execute([$idcategoria, $precio, $image, $destacado, $orden]);
    $idplato = (int)$pdo->lastInsertId();

    // traducciones: [{ididioma, nombre, descripcion}]
    $trs = $data['traducciones'] ?? [];
    if (is_array($trs)) {
      $ins = $pdo->prepare("INSERT INTO platosxidioma (idplato, ididioma, nombre, descripcion) VALUES (?,?,?,?)");
      foreach ($trs as $t) {
        $ins->execute([$idplato, (int)$t['ididioma'], $t['nombre'] ?? '', $t['descripcion'] ?? null]);
      }
    }

    json_out(['ok'=>true, 'idplato'=>$idplato]);
  }

  if ($action === 'update') {
    $idplato = (int)($data['idplato'] ?? 0);
    if ($idplato<=0) json_out(['ok'=>false,'msg'=>'idplato requerido'],400);

    // Si llegan campos básicos, actualizamos (incluye destacado si llega)
    if (array_key_exists('idcategoria', $data) || array_key_exists('precio',$data) || array_key_exists('image',$data) || array_key_exists('destacado',$data)) {
      $idcategoria = array_key_exists('idcategoria',$data) ? (int)$data['idcategoria'] : null;
      $precio = array_key_exists('precio',$data) ? $data['precio'] : null;
      $image = array_key_exists('image',$data) ? $data['image'] : null;
      $destacado = array_key_exists('destacado',$data) ? norm_bool01($data['destacado']) : null;
 $orden = array_key_exists('orden',$data) ? (int)$data['orden'] : null;
      // Construimos UPDATE dinámico para tocar solo lo que llega explícitamente
      $sets = [];
      $params = [];
      if ($idcategoria !== null) { $sets[] = "idcategoria = ?"; $params[] = $idcategoria; }
      if ($precio !== null)     { $sets[] = "precio = ?";      $params[] = $precio; }
      if ($image !== null)      { $sets[] = "image = ?";       $params[] = $image; }
      if ($destacado !== null)  { $sets[] = "destacado = ?";   $params[] = $destacado; }
      if ($orden !== null)      { $sets[] = "orden = ?";       $params[] = $orden; }

      if ($sets) {
        $sql = "UPDATE platos SET ".implode(", ", $sets)." WHERE idplato = ?";
        $params[] = $idplato;
        $stmt = $pdo->prepare($sql);
        $stmt->execute($params);
      }
    }

    // traducciones
    $trs = $data['traducciones'] ?? [];
    if (is_array($trs) && $trs) {
      foreach ($trs as $t) {
        $ididioma = (int)$t['ididioma'];
        $nombre = $t['nombre'] ?? '';
        $descripcion = $t['descripcion'] ?? null;
        $pdo->prepare("
          INSERT INTO platosxidioma (idplato, ididioma, nombre, descripcion)
          VALUES (?,?,?,?)
          ON DUPLICATE KEY UPDATE nombre=VALUES(nombre), descripcion=VALUES(descripcion)
        ")->execute([$idplato, $ididioma, $nombre, $descripcion]);
      }
    }

    json_out(['ok'=>true]);
  }

  if ($action === 'delete') {
    $idplato = (int)($data['idplato'] ?? 0);
    if ($idplato<=0) json_out(['ok'=>false,'msg'=>'idplato requerido'],400);

    $pdo->prepare("DELETE FROM platosxidioma WHERE idplato=?")->execute([$idplato]);
    $pdo->prepare("DELETE FROM platos WHERE idplato=?")->execute([$idplato]);

    json_out(['ok'=>true]);
  }

  json_out(['ok'=>false,'msg'=>'Acción no soportada'],400);

} catch (Throwable $e) {
  json_out(['ok'=>false,'msg'=>$e->getMessage()],500);
}
