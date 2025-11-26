<?php
// get_idiomas.php — Lista de idiomas públicos (activos)

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json; charset=utf-8');

// ===== Config DB (ajusta) =====
$dbHost = 'localhost';
$dbName = 'admin_passatge';
$dbUser = 'admin_passatge';
$dbPass = '5tN57~me1';
$dsn    = "mysql:host={$dbHost};dbname={$dbName};charset=utf8mb4";

try {
  $pdo = new PDO($dsn, $dbUser, $dbPass, [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
  ]);

  // Solo idiomas activos. Se espera columna 'codigo' (es/en/va...) y opcional 'icono'
  $sql = "
    SELECT ididioma, nombre as codigo, icono
    FROM idiomas
    WHERE activo = 1
    ORDER BY nombre
  ";
  $rows = $pdo->query($sql)->fetchAll();

  // Normalizar respuesta
  $out = array_map(function($r) {
    return [
      'ididioma' => (int)$r['ididioma'],
      'codigo'   => (string)$r['codigo'], 
      'icono'    => isset($r['icono']) ? ($r['icono'] ?: null) : null,
    ];
  }, $rows);

  echo json_encode($out, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);

} catch (Throwable $e) {
  http_response_code(500);
  echo json_encode([
    'error' => 'SERVER_ERROR',
    'msg'   => $e->getMessage()
  ], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
}
