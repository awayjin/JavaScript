const express = require('express')
const app = express()

app.get('/', (req, res) => {
  res.send('Hi')
})

const port = process.env.PORT || 3000
console.log('process.argv::', process.argv)
app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`)
})
