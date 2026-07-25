# MDGram — sitio web

Sitio estático (HTML + CSS + JS, sin dependencias ni build) para MDGram, cliente no
oficial de Telegram para Android.

## Estructura

```
mdgram-web/
├── index.html          Portada: hero, características, capturas, instalación, FAQ, CTA
├── descargar.html      Variantes de APK (Universal / Armv7a / Arm64) + requisitos
├── nosotros.html       Sobre el proyecto, créditos y comunidad
├── privacidad.html     Política de privacidad
├── aviso-legal.html    Aviso legal y descargo de responsabilidad
└── assets/
    ├── css/styles.css  Sistema de diseño completo (tokens, componentes, temas)
    ├── js/main.js      Tema claro/oscuro, menú móvil, animaciones de entrada
    └── img/            Imágenes recuperadas del sitio original
```

## Ejecutar en local

```bash
npx --yes serve -l 4321 mdgram-web
```

## Procedencia del diseño

El sitio original (`mdgram.dev`) ya no existe: el dominio no resuelve y `mdgram.org`
está en venta. Todo el material se recuperó del Internet Archive a partir del snapshot
del 8 de noviembre de 2025, más el README de la organización en GitHub.

Del original se conservan:

- **Paleta**, tomada de las variables del tema Astra que usaba el sitio:
  `#1BAE70` · `#06752E` · `#14261C` · `#4E5652` · `#F4F6F4`
- **Tipografía**: Inter
- **Imágenes**: logo, banner de capturas y mockups (`assets/img/`)
- **Arquitectura de páginas**: portada, descarga por arquitectura, nosotros, legales
- **Contenido**: lista de características y textos de «Nosotros», reescritos en español

Se añadieron tema oscuro, FAQ, pasos de instalación y página de requisitos, que el
original no tenía.

## Nota sobre el color de marca

`--brand` (`#1BAE70`) es el verde original, pero con texto blanco encima solo alcanza
2.86:1 y no cumple WCAG AA. Por eso los rellenos que llevan texto blanco (botón
primario, badge «Recomendada», bloque CTA) usan `--brand-strong` (`#0F8351`, 4.79:1).
El verde original se mantiene para iconos, bordes y resaltes decorativos.

## Pendiente

Los tres botones de `descargar.html` apuntan a `#`. Sustituir por las URL reales de los
APK — están marcados con un comentario `<!-- TODO -->`.
