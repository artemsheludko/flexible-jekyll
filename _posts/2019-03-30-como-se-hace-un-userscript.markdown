---
layout: post
title: ¿Cómo se hace un userscript?
date: 2019-03-30 12:00:00 +0300
description: De acá salimos todos haciendo scripts.
img: como-se-hace-un-userscript.jpg
tags: [programación,userscript,javascript]
---

Como lo comenté en el episodio # 1 de mi podcast (¿Qué me estás container?), he grabado un video enseñando como se estructura un userscript, como se instala en chrome y en otros navegadores y el potencial que tiene esta herramienta en el día a día.

<div class="center-text video-responsive">
<iframe width="100%" height="315" src="https://www.youtube.com/embed/3O6-bAJeRv0" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

No olvidéis suscribiros al canal.

Si preferís leerlo aquí tenéis un pequeño resumen:

Lo primero es instalar la extensión del navegador que nos dejará agregar y ejecutar este tipo de scripts, en los siguientes enlaces podréis encontrarlas: 

- <a href="https://tampermonkey.net" target="_blank">Tampermonkey (Chrome)</a>
- <a href="https://www.greasespot.net" target="_blank">Greasemonkey (Firefox)</a>
- <a href="https://addons.opera.com/sk/extensions/details/violent-monkey/" target="_blank">Violent monkey (Opera)</a>

Lo segundo es aprender las partes de un user script, para eso empezaremos viendo uno vacío y luego dejaré un ejemplo real.

```javascript
// ==UserScript==
// @name         New Userscript
// @namespace    https://sergiosusa.com
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://github.com/sergiosusa/my-user-scripts/edit/master/README.md
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    // Your code here...
})();
```

El ejemplo anterior se divide en dos partes, la "cabecera" o Metadata Block (delimitado por el tag
``// ==UserScript==`` y ``// ==/UserScript==`` ) y el resto que es el contenido.

El **Metadata Block** tiene un conjunto de opciones que en nuestro caso de ejemplo, son las mínimas necesarias, revisemos un poco para que son cada una: 

**@name**: Nombre del script.  
**@namespace**:    Es una cadena que evita que los scripts colisionen por nombre.   
**@version**: Se espera un numero de versión (0.1, 0.0.1, 1.0, etc.) que ayudará a la extensión del navegador a actualizar el script si se dispone de una nueva versión.  
**@description**: Es una pequeña descripción del script.  
**@author**: Nombre/seudónimo del autor.  
**@match**: Es una expresión que permite especificar en que páginas se va a ejecutar el script.  
**@grant**: Permisos especiales que necesita el script.  

Para más información sobre la "cabecera" o Metadata block y algunos ejemplos, podéis visitar la documentación <a href="https://wiki.greasespot.net/Metadata_Block" target="_blank">oficial</a>.
   
El **contenido** tiene una estructura bastante simple, es una función anónima que se ejecuta luego de completar el cargado de la página lo que garantiza que podemos interactual con ella sin ningún temor a que algo no este renderizado; dentro podremos nuestro código.  

Lo mejor ahora es ver un ejemplo real y así afianzar lo aprendido, voy a dejar un pequeño script que hice para que todos los que queráis comprar cosas en amazon España con mi enlace de referido no tengáis que ponerlo a mano nunca más. 

<a href="https://github.com/sergiosusa/my-user-scripts/blob/master/stores/my-amazon-affiliate.user.js" target="_blank">My Amazon Affiliate</a>
