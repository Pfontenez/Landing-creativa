# Formulario de contacto con Gmail

El formulario vive en Google Apps Script y se muestra dentro de la landing. Cada envío:

1. Manda la consulta a `pabloezequielfontenez@gmail.com`, con el correo del cliente como dirección de respuesta.
2. Manda un comprobante con las respuestas al cliente, desde el Gmail de Pablo.
3. Confirma el resultado dentro del formulario.

## Estado actual

Proyecto de Apps Script: `Consultas landing Pablo Fonteñez` (cuenta `pabloezequielfontenez@gmail.com`). Implementación web versión 1, con acceso **Cualquiera** y ejecución como Pablo:

`https://script.google.com/macros/s/AKfycbwye3BlEEcR1O8dgJgVVdqVq1z8mDRXpIM1Ys9uKAR_KiIqpHNspudDD7ePS23ZLiYy/exec`

La URL ya está incluida en `dist/index.html`. La prueba del 23/09/2026 con el correo de Pablo devolvió confirmación de consulta y copia enviada. Al pasar la landing a GitHub Pages no hace falta modificar Apps Script: se usa la misma URL. Se debe comprobar el formulario una vez desde el dominio final.

## Si se vuelve a implementar

1. Crear un proyecto en [Google Apps Script](https://script.google.com/) con la cuenta `pabloezequielfontenez@gmail.com`.
2. Pegar `Code.gs` en el archivo de código y crear un archivo HTML llamado `Form` con el contenido de `Form.html`.
3. Ejecutar una función de prueba o iniciar la implementación para autorizar `MailApp` desde la cuenta de Pablo.
4. Implementar como **Aplicación web**, **Ejecutar como: yo**, **Quiénes tienen acceso: cualquier persona**. Copiar la URL terminada en `/exec`.
5. Si se crea una implementación nueva con otra URL, actualizar `data-src` del iframe en `dist/index.html`. Si se actualiza la implementación existente, la URL no cambia.
6. Publicar la landing y hacer una prueba con un correo propio distinto del destinatario. Verificar el aviso a Pablo, el comprobante, las respuestas incluidas y que responder al aviso abra el correo del cliente.

Si se cambia el código del proyecto, crear una nueva versión de la implementación web. La landing no guarda los mensajes; las dos copias por correo son el registro.

El envío desde Gmail personal está sujeto a los límites de Google Apps Script. El formulario valida los datos, usa un campo trampa y limita envíos repetidos con el mismo correo. Mantener WhatsApp y email como alternativa cuando el servicio falle o se agote el cupo.
