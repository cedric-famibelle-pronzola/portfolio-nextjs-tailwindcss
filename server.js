const express = require('express')
const next = require('next')
const compression = require('compression')
const {sendMail} = require('./lib/sendmail')

const port = process.env.PORT || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({dev})
const handle = app.getRequestHandler()

app.prepare().then(() => {
  const app = express()

  if (!dev) {
    app.use(compression())
  }

  app.use(express.json()) // for parsing application/json

  app.post('/send-email', (req, res) => {
    const {body} = req
    sendMail(body)
    res.send('ok email envoyé')
  })

  app.all('*', (req, res) => {
    return handle(req, res)
  })

  app.listen(port, err => {
    if (err) {
      throw err
    }
    console.log(`> Ready on http://localhost:${port}`)
  })
})
