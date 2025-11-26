<?php
// upload_icon.php
require_once __DIR__ . '/admin_common.php';

// Nota: admin_common.php ya responde a OPTIONS y sale.
// Aquí validamos token en POST multipart:
$token = $_POST['token'] ?? null;
require_admin($token);

if (!isset($_FILES['file']) || !is_uploaded_file($_FILES['file']['tmp_name'])) {
  json_out(['ok'=>false,'msg'=>'No se recibió archivo'], 400);
}

$file = $_FILES['file'];
if ($file['error'] !== UPLOAD_ERR_OK) {
  json_out(['ok'=>false,'msg'=>'Error al subir el archivo (código '.$file['error'].')'], 400);
}

// Límite de tamaño (1MB para iconos)
$maxSize = 1 * 1024 * 1024;
if ($file['size'] > $maxSize) {
  json_out(['ok'=>false,'msg'=>'Icono demasiado grande (máx 1MB)'], 400);
}

// Validar MIME
$finfo = new finfo(FILEINFO_MIME_TYPE);
$mime  = $finfo->file($file['tmp_name']) ?: '';
$allowed = [
  'image/png'      => 'png',
  'image/webp'     => 'webp',
  'image/svg+xml'  => 'svg',
];

// Para algunos servidores SVG puede detectarse como text/plain; intentamos fallback:
if (!isset($allowed[$mime])) {
  // Fallback por extensión del nombre original solo para svg
  $extOrig = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));
  if ($extOrig === 'svg') { $mime = 'image/svg+xml'; }
}

if (!isset($allowed[$mime])) {
  json_out(['ok'=>false,'msg'=>'Formato no permitido (usa png, webp o svg)'], 415);
}

$ext = $allowed[$mime];

// Carpeta destino
$destDir = __DIR__ . '/uploads/icons';
if (!is_dir($destDir)) { @mkdir($destDir, 0775, true); }
if (!is_writable($destDir)) { json_out(['ok'=>false,'msg'=>'Carpeta de destino no escribible'], 500); }

// Nombre único
$rand = bin2hex(random_bytes(6));
$filename = 'icon_' . date('Ymd_His') . '_' . $rand . '.' . $ext;
$destPath = $destDir . '/' . $filename;

if (!move_uploaded_file($file['tmp_name'], $destPath)) {
  json_out(['ok'=>false,'msg'=>'No se pudo mover el archivo'], 500);
}

// Construir URL pública
$scheme = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') ? 'https' : 'http';
$host   = $_SERVER['HTTP_HOST'] ?? 'localhost';
$base   = rtrim(dirname($_SERVER['SCRIPT_NAME']), '/'); // /api
$url    = $scheme . '://' . $host . $base . '/uploads/icons/' . $filename;

json_out(['ok'=>true,'url'=>$url]);
