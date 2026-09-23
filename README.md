# Desde donde estás

Landing comercial de Pablo Fonteñez y Nicolás Morales Bissio. Sitio estático en `dist/`, sin framework ni compilación. El formulario está alojado en Google Apps Script y se incorpora mediante un iframe.

## GitHub Pages

1. Subir este proyecto a un repositorio de GitHub con rama `main`.
2. En **Settings → Pages**, elegir **GitHub Actions** como origen de publicación.
3. El workflow `.github/workflows/deploy-pages.yml` publicará el contenido de `dist/` en cada push a `main`.
4. Abrir la URL publicada y probar el formulario desde una ventana privada, tanto en escritorio como en celular. Verificar que llegue la consulta a Pablo y la copia al remitente.

Si más adelante se usa un dominio propio, configurarlo en **Settings → Pages** y revisar que el sitio cargue con HTTPS. La URL de Apps Script no depende del dominio de la landing.

## Formulario

La implementación y su URL están documentadas en `integrations/google-apps-script/README.md`. El código de `Code.gs` y `Form.html` queda como respaldo editable. Para cambios de código en Google Apps Script, hay que actualizar su implementación web. Los mensajes no se guardan en GitHub Pages.
