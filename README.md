# La galería de Paula

Web estática editable con Pages CMS.

## Archivos principales

- `index.html`: estructura de la web.
- `styles.css`: diseño y colores.
- `app.js`: carga el contenido.
- `content/site.json`: textos, proyectos, enlaces e imágenes.
- `.pages.yml`: configuración para editar la web desde Pages CMS.
- `images/uploads/`: carpeta donde Pages CMS guardará las fotografías que subas.

## Publicarla gratis

1. Crea una cuenta gratuita en GitHub.
2. Crea un repositorio llamado, por ejemplo, `la-galeria-de-paula`.
3. Sube todos estos archivos manteniendo las carpetas.
4. En Netlify, crea un sitio nuevo e importa el repositorio de GitHub.
5. Como es HTML estático, no necesitas comando de compilación. Publica la raíz del repositorio.
6. Netlify te dará una dirección `*.netlify.app`.

## Editarla sin tocar código

1. Entra en https://app.pagescms.org
2. Inicia sesión con GitHub.
3. Instala/autoriza Pages CMS para el repositorio.
4. Abre `la-galeria-de-paula`.
5. Pages CMS detectará `.pages.yml`.
6. Edita textos, proyectos y fotografías desde la interfaz y guarda.
7. Cada guardado actualiza GitHub y Netlify vuelve a publicar la web.

## Cambiar colores

Están todos al principio de `styles.css`:

- `--paper`: fondo blanco cálido.
- `--brown`: marrón principal.
- `--brown-dark`: marrón oscuro.
- `--orange`: naranja.
- `--orange-soft`: naranja suave.

## Importante

Las fotografías iniciales son de demostración y se cargan desde Unsplash. Sustitúyelas desde Pages CMS por tus propias fotografías.
