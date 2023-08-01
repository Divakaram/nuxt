const express = require('express')
const consola = require('consola')
const bodyParser = require('body-parser');
const { Nuxt, Builder } = require('nuxt')
const app = express()

// Import and Set Nuxt.js options
const config = require('../nuxt.config.js')
config.dev = process.env.NODE_ENV !== 'production'

async function start () {
  // Init Nuxt.js
  const nuxt = new Nuxt(config)

  const { host, port } = nuxt.options.server

  await nuxt.ready()
  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  }

  app.use(bodyParser.json());

  app.post("/api/testpage/", (req, res) => {
    try {
      const id = req.body.id;
      res.status(200).json({message: `Соединение с сервером успешно установлено. Введенный параметр: ${id}` });
      
    } catch (error) {
      console.error('Ошибка', error);
      res.status(500).json({message: 'Ошибка' });
    }
  });

  // Give nuxt middleware to express
  app.use(nuxt.render)

  // Listen the server
  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}
start()
