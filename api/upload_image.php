<?php
// upload_image.php
require_once __DIR__ . '/admin_common.php';

// Verificación de token admin (mantener)
$token = $_POST['token'] ?? null;
require_admin($token);

// Verificamos que exista archivo subido
if (!isset($_FILES['file']) || !is_uploaded_file($_FILES['file']['tmp_name'])) {
  json_out(['ok'=>false,'msg'=>'No se recibió archivo'], 400);
}

$file = $_FILES['file'];

// Validar tipo MIME real (solo extensión permitida)
$finfo = new finfo(FILEINFO_MIME_TYPE);
$mime  = $finfo->file($file['tmp_name']) ?: '';
$allowed = [
  'image/jpeg' => 'jpg',
  'image/png'  => 'png',
  'image/webp' => 'webp',
  'image/gif'  => 'gif',
];

if (!isset($allowed[$mime])) {
  json_out(['ok'=>false,'msg'=>'Formato no permitido (usa jpg, png, webp o gif)'], 415);
}

$ext = $allowed[$mime];

// Carpeta destino
$destDir = __DIR__ . '/uploads/images';
@mkdir($destDir, 0775, true);

// Nombre único
$rand = bin2hex(random_bytes(6));
$filename = 'img_' . date('Ymd_His') . '_' . $rand . '.' . $ext;
$destPath = $destDir . '/' . $filename;

// Guardar archivo
move_uploaded_file($file['tmp_name'], $destPath);

// URL pública
$scheme = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') ? 'https' : 'http';
$host   = $_SERVER['HTTP_HOST'] ?? 'localhost';
$base   = rtrim(dirname($_SERVER['SCRIPT_NAME']), '/');
$url    = $scheme . '://' . $host . $base . '/uploads/images/' . $filename;

json_out(['ok'=>true, 'url'=>$url]);
