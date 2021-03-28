const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/students', (req, res) => {
    res.send([
        {id: 1, name: "Mohsin"},
        {id: 1, name: "Daniyal"},
        {id: 1, name: "Aamir"}
    ])
  })

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})