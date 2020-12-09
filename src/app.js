const express = require('express')
const path = require('path')
const hbs = require('hbs')

const location = require('./utils/geocode.js')
const weather = require('./utils/forecast.js')

const app = express()

//Defined paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//set up handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req, res) => {
    res.render('index',{
        title: 'Weather',
        name: 'Hitesh Dhanwani'
    })
})

app.get('/about',(req, res) => {
    res.render('about',{
        title: 'About Me',
        name: 'Hitesh Dhanwani'
    })
})

app.get('/help',(req, res) => {
    res.render('help',{
        message: 'This Application is developed to find the weather of location',
        title: 'Help',
        name: 'Hitesh Dhanwani'
    })
})


// app.get('/help',(req, res) => {
//     res.send({
//         name: 'Hitesh',
//         age: 31
//     })
// })

// app.get('/about',(req, res) => {
//     res.send('<h1>About Page</h1>')
// })

app.get('/Weather',({query}, res) => {
    if(!query.address){
        return res.send({
            errorMessage: 'Please provide an address'
        })
    }
    else{
        location.geocode(query.address,(error, {latitude, longitude} = {}) => {
        if(error)
            return res.send({
                errorMessage: error
            })
            weather.forecast(longitude, latitude, (error2, data2 = {}) => {
            if(error2)
                return res.send({
                    errorMessage: error2
                })
            res.send(data2)
        })
    })
    }
})

app.get('/products',(req,res) => {
    if(!req.query.search){
        return res.send('Please enter a search criteria')
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*',(req, res) => {
    res.render('error',{
        message: 'Help article not found',
        title: '404',
        name: 'Hitesh Dhanwani'
    })
})

app.get('*',(req, res) => {
    res.render('error',{
        message: 'Page not found',
        title: '404',
        name: 'Hitesh Dhanwani'
    })
})

app.listen(3000,() => {
    console.log('Server is up on port 3000')
})