// MDGram: endpoint /api/latest — sirve el manifiesto de versión que consulta el updater in-app.
// Proxya version.json del repo de releases (github.com/jair1c/MDGram), que es la fuente de verdad.
// Así, publicar una versión nueva solo requiere editar version.json en GitHub — sin redeploy de la web.
// Funciona como Serverless Function de Vercel aunque el sitio sea estático (carpeta /api en la raíz).
module.exports = async (req, res) => {
  try {
    const r = await fetch(
      'https://raw.githubusercontent.com/jair1c/MDGram/main/version.json',
      { cache: 'no-store' }
    );
    if (!r.ok) {
      res.status(502).json({ error: 'manifiesto no disponible' });
      return;
    }
    const data = await r.json();
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.setHeader('Cache-Control', 'no-store, max-age=0');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).send(JSON.stringify(data));
  } catch (e) {
    res.status(502).json({ error: 'no se pudo obtener el manifiesto' });
  }
};
