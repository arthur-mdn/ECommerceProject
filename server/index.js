const express = require('express')
const app = express()
const port = 3001

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)

})

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/api', (req, res) => {
    res.send('Hello API!')
})