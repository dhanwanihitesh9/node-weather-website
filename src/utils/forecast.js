const request = require('postman-request')
const forecast = (latitude,longitude,callback) => {

    url = 'http://api.weatherstack.com/current?access_key=93dd67f3d635b783e640f6258b4845ed&query='+latitude+','+longitude+'&units=f'
     request({url, json: true},(error,{body}) => {
    if(error){
        callback('Unable to connect to weather service',undefined)
    }
    else{
        if(body.success === false)
        {
            callback(body.error.info, undefined)
        }
        else
            callback(undefined,  {
                weatherDescription: body.current.weather_descriptions[0],
                temperature: body.current.temperature,
                feelsLike: body.current.feelslike,
                region: body.location,
                currIcon: body.current.weather_icons
            })
    }
})
}

module.exports = {
    forecast: forecast
}