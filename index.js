const axios = require('axios')
const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()

const port = process.env.PORT || 4000


const GOOGLE_PLACES_URL = (key, location, radius) =>  "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location="+location.lat+","+location.long+"&radius="+radius+"&type=restaurant&key="+key;
const GOOGLE_PLACE_DETAIL = (key, placeId) => "https://maps.googleapis.com/maps/api/place/details/json?place_id="+placeId+"&fields=name,rating,formatted_phone_number,formatted_address,place_id,url,photo,website,reviews&key="+key;


app.use(cors())
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/get-restaurants', (req,res) => {
    console.log("Received get restaurants")
    axios.get(
        GOOGLE_PLACES_URL(process.env.GOOGLE_API_KEY,
            {   
                lat: req.query.latitude, 
                long: req.query.longitude
            }, req.query.radius)).then(
                (request) => {
        console.log("got "+request.data.results.length+" results")
        res.send(request.data)
    }).catch((error) => {
        console.log(error.message)
    })
})

app.get('/get-restaurant-detail', (req, res) => {
    console.log("Received get detail")
    axios.get(GOOGLE_PLACE_DETAIL(process.env.GOOGLE_API_KEY, req.query.id)).then( (request, response) => {
        res.send(request.data)
    }).catch((error) => {
        console.log(error)
    })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})