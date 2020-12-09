console.log('client side javascript is loaded')

const weatherForm = document.querySelector('form')
const searchElement = document.querySelector('input')
const msg1 = document.querySelector('#message-1')
const msg2 = document.querySelector('#message-2')



weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = searchElement.value
    msg1.textContent = 'Loading ...'
    msg2.textContent = ''

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
        }
    })
})

})