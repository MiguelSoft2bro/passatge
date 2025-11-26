<?php
// admin_common.php
header('Content-Type: application/json; charset=utf-8');


$origin = $_SERVER['HTTP_ORIGIN'] ?? '*';

// ⚠️ En producción, mejor lista blanca en vez de '*'
$allowed_origins = ['http://localhost:5173', 'https://passatgebar.com'];
if ($origin && in_array($origin, $allowed_origins, true)) {
  header("Access-Control-Allow-Origin: $origin");
  header("Vary: Origin");
} else {
  header("Access-Control-Allow-Origin: *");
}

header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Accept");
header("Access-Control-Max-Age: 86400"); // cachea el preflight 24h
header('Content-Type: application/json; charset=utf-8');

// Si es preflight, responder y salir ANTES de cualquier validación
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
  http_response_code(204);
  exit;
}


function db(): PDO {
  static $pdo = null;
  if ($pdo) return $pdo;
$dbHost = 'localhost';
$dbName = 'admin_passatge';
$dbUser = 'admin_passatge';
$dbPass = '5tN57~me1';
$dsn    = "mysql:host={$dbHost};dbname={$dbName};charset=utf8mb4";

  $pdo = new PDO($dsn, $dbUser, $dbPass, [
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
  ]);
  return $pdo;
}

// Debe coincidir con ADMIN_SECRET del admin_login.php
const ADMIN_SECRET = '33ccdf7e685ee0bebecd0c44f327712221bd670a7254aebc4cc6fcbc9f81fce6';

function json_out($arr, $code = 200) {
  http_response_code($code);
  echo json_encode($arr, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
  exit;
}

function require_admin(?string $token) {
  if (!$token || strpos($token, '.') === false) json_out(['ok'=>false,'msg'=>'Token requerido'],401);
  [$payload_b64,$sig_b64] = explode('.', $token, 2);
  $exp_sig = rtrim(strtr(base64_encode(hash_hmac('sha256', $payload_b64, ADMIN_SECRET, true)), '+/', '-_'), '=');
  if (!hash_equals($exp_sig, $sig_b64)) json_out(['ok'=>false,'msg'=>'Token inválido'],401);
  $payload_json = base64_decode(strtr($payload_b64, '-_', '+/'));
  $payload = json_decode($payload_json, true);
  if (!is_array($payload) || !isset($payload['exp']) || time() >= (int)$payload['exp']) {
    json_out(['ok'=>false,'msg'=>'Token caducado'],401);
  }
  return $payload; // por si quieres usar sub
}

function read_json_body(): array {
  $raw = file_get_contents('php://input');
  $data = json_decode($raw, true);
  if (!is_array($data)) $data = $_POST;
  return $data;
}
