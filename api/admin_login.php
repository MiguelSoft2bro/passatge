<?php


header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *'); // Cambia en producción si quieres restringir
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { http_response_code(204); exit; }

function json_out($arr, $code = 200) {
  http_response_code($code);
  echo json_encode($arr, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
  exit;
}

/* =============================
   CONFIGURACIÓN DEL LOGIN
   ============================= */

const ADMIN_USER = 'siminfo';
/**
 * Hash SHA-256 de "Alicante60"
 * Generado con: php -r "echo hash('sha256','Alicante60');"
 */
const ADMIN_PASS_SHA256 = '33ccdf7e685ee0bebecd0c44f327712221bd670a7254aebc4cc6fcbc9f81fce6';

/** Clave secreta para firmar los tokens (cámbiala por una larga y única) */
const ADMIN_SECRET = '33ccdf7e685ee0bebecd0c44f327712221bd670a7254aebc4cc6fcbc9f81fce6';

/** Duración del token en segundos (2 horas) */
const TOKEN_TTL = 2 * 60 * 60;

/* =============================
   LÓGICA DE LOGIN
   ============================= */

$raw = file_get_contents('php://input');
$data = json_decode($raw, true);

$username = isset($data['username']) ? trim($data['username']) : '';
$password = isset($data['password']) ? (string)$data['password'] : '';

if ($username === '' || $password === '') {
  json_out(['ok' => false, 'msg' => 'Usuario y contraseña requeridos'], 400);
}

if (!hash_equals(ADMIN_USER, $username)) {
  json_out(['ok' => false, 'msg' => 'Credenciales inválidas'], 401);
}

$pass_sha256 = hash('sha256', $password);
if (!hash_equals(ADMIN_PASS_SHA256, $pass_sha256)) {
  json_out(['ok' => false, 'msg' => 'Credenciales inválidas'], 401);
}

/* =============================
   TOKEN SIMPLE FIRMADO
   ============================= */
$exp = time() + TOKEN_TTL;
$payload_json = json_encode(['sub' => $username, 'exp' => $exp], JSON_UNESCAPED_UNICODE);
$payload_b64 = rtrim(strtr(base64_encode($payload_json), '+/', '-_'), '=');
$signature_raw = hash_hmac('sha256', $payload_b64, ADMIN_SECRET, true);
$signature_b64 = rtrim(strtr(base64_encode($signature_raw), '+/', '-_'), '=');

$token = $payload_b64 . '.' . $signature_b64;

json_out(['ok' => true, 'token' => $token, 'exp' => $exp]);
