const DESTINATION_EMAIL = 'pabloezequielfontenez@gmail.com';
const POINTS = [
  'Tengo una idea.',
  'No sé por dónde empezar.',
  'Ya tengo un brief.',
  'Tengo el contenido.',
  'Necesito solamente diseño.',
  'Hay una campaña en marcha.',
  'Me quedé trabado.'
];
const SERVICES = ['Diseño multimedia', 'Dupla creativa', 'No estoy seguro'];

function doGet() {
  return HtmlService.createHtmlOutputFromFile('Form')
    .setTitle('Contanos tu proyecto')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

function submitInquiry(payload) {
  if (!payload || typeof payload !== 'object') throw new Error('Revisá los datos e intentá nuevamente.');

  // A hidden field and a minimum elapsed time discard most automated submissions.
  if (String(payload.website || '').trim()) return { ok: true, receiptSent: false };
  const elapsed = Date.now() - Number(payload.startedAt);
  if (!Number.isFinite(elapsed) || elapsed < 4000 || elapsed > 3600000) {
    throw new Error('La sesión venció. Recargá el formulario e intentá nuevamente.');
  }

  const name = clean(payload.name, 80);
  const company = clean(payload.company, 100);
  const email = clean(payload.email, 254).toLowerCase();
  const point = String(payload.point || '');
  const service = String(payload.service || '');
  const description = clean(payload.description, 1500);
  if (!name || !company || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
      !POINTS.includes(point) || !SERVICES.includes(service) || description.length < 20) {
    throw new Error('Completá todos los campos y contanos un poco más sobre el proyecto.');
  }

  const cache = CacheService.getScriptCache();
  const key = 'inquiry:' + Utilities.base64EncodeWebSafe(
    Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, email)
  ).slice(0, 40);
  if (cache.get(key)) throw new Error('Ya recibimos una consulta con este correo. Esperá unos minutos antes de enviar otra.');
  if (MailApp.getRemainingDailyQuota() < 2) {
    throw new Error('Ahora no podemos enviar el formulario. Escribinos por WhatsApp o email.');
  }

  const details = [
    'Nombre: ' + name,
    'Empresa: ' + company,
    'Correo: ' + email,
    'Punto de partida: ' + point,
    'Servicio: ' + service,
    '',
    'Proyecto:',
    description
  ].join('\n');

  // Send the lead first, then its receipt. Both messages come from the owner's Gmail.
  MailApp.sendEmail({
    to: DESTINATION_EMAIL,
    subject: 'Nueva consulta desde la landing — ' + company,
    body: 'Llegó una nueva consulta desde la landing.\n\n' + details,
    name: 'Consultas web',
    replyTo: email
  });
  cache.put(key, '1', 300);

  try {
    MailApp.sendEmail({
      to: email,
      subject: 'Recibimos tu consulta — Pablo Fonteñez',
      body: 'Hola ' + name + ',\n\nRecibimos tu consulta. Vamos a revisar lo que nos contaste y responderte a la brevedad.\n\nEsta es una copia de tus respuestas:\n\n' +
        details + '\n\nSi querés agregar algo, respondé a este correo.\n\nSaludos,\nPablo Fonteñez',
      name: 'Pablo Fonteñez',
      replyTo: DESTINATION_EMAIL
    });
    return { ok: true, receiptSent: true };
  } catch (error) {
    console.error('Inquiry received; receipt failed: ' + error);
    return { ok: true, receiptSent: false };
  }
}

function clean(value, limit) {
  return String(value == null ? '' : value).trim().replace(/[\u0000-\u001f\u007f]/g, ' ').slice(0, limit);
}
