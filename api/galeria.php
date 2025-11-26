<?php
// galeria.php - API para gestionar la galería de fotos de productos
require_once __DIR__ . '/admin_common.php';

$data = read_json_body();
$token = $data['token'] ?? null;
require_admin($token);

$action = $data['action'] ?? 'list';
$pdo = db();

try {
  // LISTAR fotos de un plato
  if ($action === 'list') {
    $idplato = (int)($data['idplato'] ?? 0);
    if ($idplato <= 0) json_out(['ok'=>false,'msg'=>'idplato requerido'],400);

    $sql = "SELECT id, idplato, imagen, orden, activo, fecha_creacion 
            FROM platos_galeria 
            WHERE idplato = ? 
            ORDER BY orden ASC, id ASC";
    
    $stmt = $pdo->prepare($sql);
    $stmt->execute([$idplato]);
    $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    $result = [];
    foreach ($rows as $r) {
      $result[] = [
        'id' => (int)$r['id'],
        'idplato' => (int)$r['idplato'],
        'imagen' => $r['imagen'],
        'orden' => (int)$r['orden'],
        'activo' => (int)$r['activo'],
        'fecha_creacion' => $r['fecha_creacion']
      ];
    }
    
    json_out(['ok'=>true, 'fotos'=>$result]);
  }

  // CREAR foto
  if ($action === 'create') {
    $idplato = (int)($data['idplato'] ?? 0);
    $imagen = $data['imagen'] ?? null;
    $orden = isset($data['orden']) ? (int)$data['orden'] : 0;
    $activo = isset($data['activo']) ? (int)$data['activo'] : 1;
    
    if ($idplato <= 0) json_out(['ok'=>false,'msg'=>'idplato requerido'],400);
    if (!$imagen) json_out(['ok'=>false,'msg'=>'imagen requerida'],400);
    
    $stmt = $pdo->prepare("INSERT INTO platos_galeria (idplato, imagen, orden, activo) VALUES (?,?,?,?)");
    $stmt->execute([$idplato, $imagen, $orden, $activo]);
    $id = (int)$pdo->lastInsertId();
    
    json_out(['ok'=>true, 'id'=>$id]);
  }

  // ACTUALIZAR foto
  if ($action === 'update') {
    $id = (int)($data['id'] ?? 0);
    if ($id <= 0) json_out(['ok'=>false,'msg'=>'id requerido'],400);
    
    $sets = [];
    $params = [];
    
    if (array_key_exists('imagen', $data)) {
      $sets[] = "imagen = ?";
      $params[] = $data['imagen'];
    }
    if (array_key_exists('orden', $data)) {
      $sets[] = "orden = ?";
      $params[] = (int)$data['orden'];
    }
    if (array_key_exists('activo', $data)) {
      $sets[] = "activo = ?";
      $params[] = (int)$data['activo'];
    }
    
    if (empty($sets)) json_out(['ok'=>false,'msg'=>'No hay campos para actualizar'],400);
    
    $sql = "UPDATE platos_galeria SET " . implode(", ", $sets) . " WHERE id = ?";
    $params[] = $id;
    
    $stmt = $pdo->prepare($sql);
    $stmt->execute($params);
    
    json_out(['ok'=>true]);
  }

  // ELIMINAR foto
  if ($action === 'delete') {
    $id = (int)($data['id'] ?? 0);
    if ($id <= 0) json_out(['ok'=>false,'msg'=>'id requerido'],400);
    
    $stmt = $pdo->prepare("DELETE FROM platos_galeria WHERE id = ?");
    $stmt->execute([$id]);
    
    json_out(['ok'=>true]);
  }

  json_out(['ok'=>false,'msg'=>'Acción no soportada'],400);

} catch (Throwable $e) {
  json_out(['ok'=>false,'msg'=>$e->getMessage()],500);
}