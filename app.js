const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const app = express()

const middleware = require('./middleware')
app.use(middleware.cors)
app.use(bodyParser.json())

// ✅ Serve static files like index.js, nanohtml.js, etc.
app.use(express.static(path.join(__dirname, 'public')))

// ✅ Serve index.html when root is accessed
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

const api = require('./api')
app.get('/products', api.listProducts)
app.get('/products/:id', api.getProduct)
app.post('/products', api.createProduct)
app.put('/products/:id', api.updateProduct)
app.delete('/products/:id', api.deleteProduct)

app.use(middleware.notFound)
app.use(middleware.handleError)

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000')
})
