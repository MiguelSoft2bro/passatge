<?php
// categorias.php
require_once __DIR__ . '/admin_common.php';



$data = read_json_body();
$token = $data['token'] ?? null;
require_admin($token);

$action = $data['action'] ?? 'list';
$pdo = db();

try {
  if ($action === 'list') {
    // Devuelve categorías + sus traducciones
    $sql = "
      SELECT c.idcategoria, c.idcategoriapadre, c.activo,
             cxi.ididioma, cxi.nombre, cxi.descripcion
      FROM categorias c
      LEFT JOIN categoriasxidioma cxi ON cxi.idcategoria = c.idcategoria
   ORDER BY c.orden ASC, c.idcategoria, cxi.ididioma
    ";
    $rows = $pdo->query($sql)->fetchAll();
    // Agrupar
    $map = [];
    foreach ($rows as $r) {
      $id = (int)$r['idcategoria'];
      if (!isset($map[$id])) {
        $map[$id] = [
          'idcategoria' => $id,
          'idcategoriapadre' => $r['idcategoriapadre'] !== null ? (int)$r['idcategoriapadre'] : null,
          'activo' => (int)$r['activo'],
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
    $padre = $data['idcategoriapadre'] ?? null;
    $orden = isset($data['orden']) ? (int)$data['orden'] : 0;
    $activo = isset($data['activo']) ? (int)$data['activo'] : 1;
    $pdo->prepare("INSERT INTO categorias (idcategoriapadre, activo, orden) VALUES (?,?,?)")
        ->execute([$padre ?: null, $activo, $orden]);
    $idcat = (int)$pdo->lastInsertId();

    // traducciones: [{ididioma, nombre, descripcion}]
    $trs = $data['traducciones'] ?? [];
    if (is_array($trs)) {
      $ins = $pdo->prepare("INSERT INTO categoriasxidioma (idcategoria, ididioma, nombre, descripcion) VALUES (?,?,?,?)");
      foreach ($trs as $t) {
        $ins->execute([$idcat, (int)$t['ididioma'], $t['nombre'] ?? '', $t['descripcion'] ?? null]);
      }
    }

    json_out(['ok'=>true, 'idcategoria'=>$idcat]);
  }

  if ($action === 'update') {
    $id = (int)($data['idcategoria'] ?? 0);
    if ($id<=0) json_out(['ok'=>false,'msg'=>'idcategoria requerido'],400);

    $padre = array_key_exists('idcategoriapadre',$data) ? $data['idcategoriapadre'] : null;
    $activo = array_key_exists('activo',$data) ? (int)$data['activo'] : null;
$orden = array_key_exists('orden',$data) ? (int)$data['orden'] : null;
    if ($padre !== null || $activo !== null || $orden !== null) {
      $stmt = $pdo->prepare("UPDATE categorias SET idcategoriapadre=?, activo=?, orden=? WHERE idcategoria=?");
      $stmt->execute([$padre ?: null, $activo ?? 1, $orden ?? 0, $id]);
    }

    // upsert traducciones
    $trs = $data['traducciones'] ?? [];
    if (is_array($trs)) {
      foreach ($trs as $t) {
        $ididioma = (int)$t['ididioma'];
        $nombre = $t['nombre'] ?? '';
        $descripcion = $t['descripcion'] ?? null;

        // upsert
        $pdo->prepare("
          INSERT INTO categoriasxidioma (idcategoria, ididioma, nombre, descripcion)
          VALUES (?,?,?,?)
          ON DUPLICATE KEY UPDATE nombre=VALUES(nombre), descripcion=VALUES(descripcion)
        ")->execute([$id, $ididioma, $nombre, $descripcion]);
      }
    }

    json_out(['ok'=>true]);
  }

  if ($action === 'delete') {
    $id = (int)($data['idcategoria'] ?? 0);
    if ($id<=0) json_out(['ok'=>false,'msg'=>'idcategoria requerido'],400);

    // impedir borrar si tiene platos
    $stmt = $pdo->prepare("SELECT 1 FROM platos WHERE idcategoria=? LIMIT 1");
    $stmt->execute([$id]);
    if ($stmt->fetch()) json_out(['ok'=>false,'msg'=>'La categoría tiene platos'],409);

    // borrar traducciones + categoría
    $pdo->prepare("DELETE FROM categoriasxidioma WHERE idcategoria=?")->execute([$id]);
    $pdo->prepare("DELETE FROM categorias WHERE idcategoria=?")->execute([$id]);

    json_out(['ok'=>true]);
  }

  json_out(['ok'=>false,'msg'=>'Acción no soportada'],400);

} catch (Throwable $e) {
  json_out(['ok'=>false,'msg'=>$e->getMessage()],500);
}
