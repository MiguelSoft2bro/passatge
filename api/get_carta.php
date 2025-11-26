<?php
// Mostrar errores en desarrollo
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json; charset=utf-8');

/**************************************************
 * get_carta.php — categorías + platos por idioma
 * Fallback a ididioma=1 si falta la traducción
 **************************************************/

// ==== Config DB ====
$dbHost = 'localhost';
$dbName = 'admin_passatge';
$dbUser = 'admin_passatge';
$dbPass = '5tN57~me1';
$dsn    = "mysql:host={$dbHost};dbname={$dbName};charset=utf8mb4";

// ==== Parámetro idioma ====
$DEFAULT_IDIOMA = 5;
$idIdioma = isset($_GET['ididioma']) ? (int)$_GET['ididioma'] : $DEFAULT_IDIOMA;
if ($idIdioma <= 0) $idIdioma = $DEFAULT_IDIOMA;

try {
  $pdo = new PDO($dsn, $dbUser, $dbPass, [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
  ]);

  // ========= Categorías (LEFT JOIN + fallback) =========
  // cxip: traducción preferida (idIdioma)
  // cxidef: traducción por defecto (DEFAULT_IDIOMA)
  // COALESCE toma preferida si existe, si no la de defecto
  $sqlCategorias = "
    SELECT
      c.idcategoria,
      c.idcategoriapadre,
      c.activo,
      COALESCE(cxip.nombre, cxidef.nombre)       AS nombre,
      COALESCE(cxip.descripcion, cxidef.descripcion) AS descripcion
    FROM categorias c
    LEFT JOIN categoriasxidioma cxip
      ON cxip.idcategoria = c.idcategoria
     AND cxip.ididioma    = :idIdioma
    LEFT JOIN categoriasxidioma cxidef
      ON cxidef.idcategoria = c.idcategoria
     AND cxidef.ididioma    = :idIdiomaDef
    WHERE c.activo = 1
    ORDER BY COALESCE(c.idcategoriapadre, c.idcategoria), c.idcategoria, nombre
  ";
  $stmtCat = $pdo->prepare($sqlCategorias);
  $stmtCat->execute([
    ':idIdioma'    => $idIdioma,
    ':idIdiomaDef' => $DEFAULT_IDIOMA
  ]);
  $categorias = $stmtCat->fetchAll();

  if (!$categorias) {
    echo json_encode([
      'ididioma'   => $idIdioma,
      'categorias' => []
    ], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
  }

  // Índice por id y estructura base
  $catById = [];
  foreach ($categorias as $cat) {
    $catById[(int)$cat['idcategoria']] = [
      'idcategoria'      => (int)$cat['idcategoria'],
      'idcategoriapadre' => $cat['idcategoriapadre'] !== null ? (int)$cat['idcategoriapadre'] : null,
      'nombre'           => $cat['nombre'] ?? '',
      'descripcion'      => $cat['descripcion'] ?? null,
      'platos'           => [],
      'children'         => []
    ];
  }

  // ========= Platos (LEFT JOIN + fallback) =========
  $catIds = array_keys($catById); // solo categorías activas
  if (!empty($catIds)) {
    $inPlaceholders = implode(',', array_fill(0, count($catIds), '?'));

    $sqlPlatos = "
      SELECT
        p.idplato,
        p.idcategoria,
        p.precio,
        p.image,
        p.destacado,
        COALESCE(pxip.nombre, pxidef.nombre)       AS nombre,
        COALESCE(pxip.descripcion, pxidef.descripcion) AS descripcion
      FROM platos p
      LEFT JOIN platosxidioma pxip
        ON pxip.idplato  = p.idplato
       AND pxip.ididioma = ?
      LEFT JOIN platosxidioma pxidef
        ON pxidef.idplato  = p.idplato
       AND pxidef.ididioma = ?
      WHERE p.idcategoria IN ($inPlaceholders)
      ORDER BY nombre, p.idplato
    ";
    $params = array_merge([$idIdioma, $DEFAULT_IDIOMA], $catIds);
    $stmtPl = $pdo->prepare($sqlPlatos);
    $stmtPl->execute($params);
    $platos = $stmtPl->fetchAll();

    foreach ($platos as $pl) {
      $idc = (int)$pl['idcategoria'];
      if (!isset($catById[$idc])) continue;
      $catById[$idc]['platos'][] = [
        'idplato'     => (int)$pl['idplato'],
        'precio'      => $pl['precio'],
        'image'       => $pl['image'],
        'nombre'      => $pl['nombre'] ?? '',
        'descripcion' => $pl['descripcion'] ?? null,
        'destacado'   => $pl['destacado'] ?? 0
      ];
    }
  }

  // ========= Montar árbol =========
  $roots = [];
  foreach ($catById as $id => &$cat) {
    $padre = $cat['idcategoriapadre'];
    if ($padre === null || !isset($catById[$padre])) {
      $roots[] = &$cat;
    } else {
      $catById[$padre]['children'][] = &$cat;
    }
  }
  unset($cat);

  echo json_encode([
    'ididioma'   => $idIdioma,
    'categorias' => $roots
  ], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);

} catch (Throwable $e) {
  http_response_code(500);
  echo json_encode([
    'error' => 'SERVER_ERROR',
    'msg'   => $e->getMessage()
  ], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
}
