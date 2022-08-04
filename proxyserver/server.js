const express = require('express')
const app = express()
const cors = require('cors')
const axdata = require('./axdata.js')

app.use(cors())

app.get('/', async(req, res) => {
    await axdata('버스',(error, {busline}={})=> {
        if(error){
            res.send(error)
        }
        res.send(busline)
    })
})

app.listen(8000, ()=> {
    console.log('server is running at the port 8000')
})