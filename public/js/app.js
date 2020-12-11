console.log('client side javascript is loaded')

const weatherForm = document.querySelector('form')
const searchElement = document.querySelector('input')
const msg1 = document.querySelector('#message-1')
const msg2 = document.querySelector('#message-2')
const img1 = document.querySelector('#currWeatherIcon')
const msg3 = document.querySelector('#message-3')
const msg4 = document.querySelector('#message-4')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = searchElement.value
    msg1.textContent = 'Loading ...'
    msg2.textContent = ''
    msg3.textContent = ''
    msg4.textContent = ''
    img1.setAttribute('src','')
    const url = '/weather?address='+location
    console.log(url)
    fetch(url).then((response) => {
        response.json().then((data) => {
        if(data.errorMessage)
        {
            msg1.textContent = data.errorMessage
        }
        else {
            msg1.textContent = data.region.name
            msg2.textContent = data.weatherDescription
            img1.setAttribute('src',data.currIcon)
            document.querySelector('#message-3').textContent = 'Current Temperature: '+data.temperature
            document.querySelector('#message-4').textContent = 'Feels Like'+data.feelsLike
        }
    })
})

})