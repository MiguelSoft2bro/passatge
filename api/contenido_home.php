<?php
// contenido_home.php
require_once __DIR__ . '/admin_common.php';

$token = $_POST['token'] ?? null;
require_admin($token);

$action = $_POST['action'] ?? null;

switch ($action) {
    case 'list':
        listContenido();
        break;
    case 'update':
        updateContenido();
        break;
    case 'upload_image':
        uploadImageContenido();
        break;
    default:
        json_out(['ok' => false, 'msg' => 'Acción no válida'], 400);
}

function listContenido() {
    global $pdo;
    
    $sql = "
        SELECT 
            c.*,
            GROUP_CONCAT(
                CONCAT(ct.ididioma, ':', ct.valor) 
                SEPARATOR '||'
            ) as traducciones
        FROM contenido_home c
        LEFT JOIN contenido_home_traducciones ct ON c.id = ct.id_contenido
        WHERE c.activo = 1
        GROUP BY c.id
        ORDER BY c.seccion, c.orden
    ";
    
    $stmt = $pdo->query($sql);
    $rows = [];
    
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        // Procesar traducciones
        $traducciones = [];
        if ($row['traducciones']) {
            foreach (explode('||', $row['traducciones']) as $trad) {
                if (strpos($trad, ':') !== false) {
                    [$ididioma, $valor] = explode(':', $trad, 2);
                    $traducciones[] = [
                        'ididioma' => (int)$ididioma,
                        'valor' => $valor
                    ];
                }
            }
        }
        
        $row['traducciones'] = $traducciones;
        unset($row['traducciones']);
        
        $rows[] = [
            'id' => (int)$row['id'],
            'seccion' => $row['seccion'],
            'elemento' => $row['elemento'],
            'tipo' => $row['tipo'],
            'valor' => $row['valor'],
            'imagen' => $row['imagen'],
            'orden' => (int)$row['orden'],
            'activo' => (int)$row['activo'],
            'traducciones' => $traducciones
        ];
    }
    
    json_out(['ok' => true, 'rows' => $rows]);
}

function updateContenido() {
    global $pdo;
    
    $id = $_POST['id'] ?? null;
    $valor = $_POST['valor'] ?? null;
    $imagen = $_POST['imagen'] ?? null;
    $traducciones = $_POST['traducciones'] ?? [];
    
    if (!$id) {
        json_out(['ok' => false, 'msg' => 'ID requerido'], 400);
    }
    
    try {
        $pdo->beginTransaction();
        
        // Actualizar contenido principal
        $sql = "UPDATE contenido_home SET valor = ?, imagen = ? WHERE id = ?";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([$valor, $imagen, $id]);
        
        // Actualizar traducciones
        if (is_array($traducciones)) {
            // Primero eliminar traducciones existentes
            $sql = "DELETE FROM contenido_home_traducciones WHERE id_contenido = ?";
            $stmt = $pdo->prepare($sql);
            $stmt->execute([$id]);
            
            // Insertar nuevas traducciones
            $sql = "INSERT INTO contenido_home_traducciones (id_contenido, ididioma, valor) VALUES (?, ?, ?)";
            $stmt = $pdo->prepare($sql);
            
            foreach ($traducciones as $trad) {
                if (isset($trad['ididioma'], $trad['valor'])) {
                    $stmt->execute([$id, $trad['ididioma'], $trad['valor']]);
                }
            }
        }
        
        $pdo->commit();
        json_out(['ok' => true]);
        
    } catch (Exception $e) {
        $pdo->rollback();
        json_out(['ok' => false, 'msg' => 'Error actualizando contenido: ' . $e->getMessage()], 500);
    }
}

function uploadImageContenido() {
    if (!isset($_FILES['file']) || !is_uploaded_file($_FILES['file']['tmp_name'])) {
        json_out(['ok' => false, 'msg' => 'No se recibió archivo'], 400);
    }
    
    $file = $_FILES['file'];
    
    // Validar tipo MIME
    $finfo = new finfo(FILEINFO_MIME_TYPE);
    $mime = $finfo->file($file['tmp_name']) ?: '';
    $allowed = [
        'image/jpeg' => 'jpg',
        'image/png' => 'png',
        'image/webp' => 'webp',
        'image/gif' => 'gif',
    ];
    
    if (!isset($allowed[$mime])) {
        json_out(['ok' => false, 'msg' => 'Formato no permitido (usa jpg, png, webp o gif)'], 415);
    }
    
    $ext = $allowed[$mime];
    
    // Carpeta destino
    $destDir = __DIR__ . '/uploads/home';
    @mkdir($destDir, 0775, true);
    
    // Nombre único
    $rand = bin2hex(random_bytes(6));
    $filename = 'home_' . date('Ymd_His') . '_' . $rand . '.' . $ext;
    $destPath = $destDir . '/' . $filename;
    
    // Guardar archivo
    if (!move_uploaded_file($file['tmp_name'], $destPath)) {
        json_out(['ok' => false, 'msg' => 'Error guardando archivo'], 500);
    }
    
    // URL pública
    $scheme = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') ? 'https' : 'http';
    $host = $_SERVER['HTTP_HOST'] ?? 'localhost';
    $base = rtrim(dirname($_SERVER['SCRIPT_NAME']), '/');
    $url = $scheme . '://' . $host . $base . '/uploads/home/' . $filename;
    
    json_out(['ok' => true, 'url' => $url]);
}
?>
