-- Tabla para almacenar el contenido del home
CREATE TABLE contenido_home (
  id INT PRIMARY KEY AUTO_INCREMENT,
  seccion VARCHAR(50) NOT NULL,
  elemento VARCHAR(50) NOT NULL,
  tipo ENUM('texto', 'imagen', 'titulo') NOT NULL,
  valor TEXT,
  imagen VARCHAR(255) NULL,
  orden INT DEFAULT 0,
  activo TINYINT(1) DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabla para las traducciones del contenido
CREATE TABLE contenido_home_traducciones (
  id INT PRIMARY KEY AUTO_INCREMENT,
  id_contenido INT NOT NULL,
  ididioma INT NOT NULL,
  valor TEXT,
  FOREIGN KEY (id_contenido) REFERENCES contenido_home(id) ON DELETE CASCADE,
  FOREIGN KEY (ididioma) REFERENCES idiomas(ididioma) ON DELETE CASCADE,
  UNIQUE KEY unique_contenido_idioma (id_contenido, ididioma)
);

-- Insertar contenido inicial del home
INSERT INTO contenido_home (seccion, elemento, tipo, valor, orden) VALUES
-- Sección Hero
('hero', 'titulo_principal', 'titulo', 'Bar Passatge', 1),
('hero', 'subtitulo', 'texto', 'Auténtica experiencia gastronómica en el corazón de la ciudad', 2),
('hero', 'imagen_fondo', 'imagen', '/images/hero.jpeg', 3),

-- Sección About
('about', 'titulo', 'titulo', 'Sobre Nosotros', 1),
('about', 'descripcion', 'texto', 'Descubre la esencia de la gastronomía tradicional con un toque moderno', 2),
('about', 'imagen_principal', 'imagen', '/images/about.jpg', 3),

-- Sección Footer
('footer', 'direccion', 'texto', 'Calle Principal 123, Ciudad', 1),
('footer', 'telefono', 'texto', '+34 123 456 789', 2),
('footer', 'email', 'texto', 'info@passatgebar.com', 3),
('footer', 'horarios', 'texto', 'Lun-Dom: 12:00-24:00', 4);

-- Insertar traducciones en español (ididioma = 1, asumiendo que existe)
INSERT INTO contenido_home_traducciones (id_contenido, ididioma, valor) VALUES
(1, 1, 'Bar Passatge'),
(2, 1, 'Auténtica experiencia gastronómica en el corazón de la ciudad'),
(4, 1, 'Sobre Nosotros'),
(5, 1, 'Descubre la esencia de la gastronomía tradicional con un toque moderno'),
(7, 1, 'Calle Principal 123, Ciudad'),
(8, 1, '+34 123 456 789'),
(9, 1, 'info@passatgebar.com'),
(10, 1, 'Lun-Dom: 12:00-24:00');
