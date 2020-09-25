const axios = require('axios')
const count = 2000

const promisesRedis = []
const promisesHttp = []

const errorHandler = err => err.response ? console.log(err.response.data) : console.log(err)

for(let i = 0; i < count; i++){
    // promisesRedis.push(axios.get('http://localhost:3000/sometexts').catch(err => console.log(err.response.data)))
    // promisesHttp.push(axios.get('http://localhost:3000/http/sometexts').catch(err => console.log(err.response.data)))

    promisesRedis.push(axios.post('http://localhost:3000/double',{count: 22}).catch(errorHandler))
    promisesHttp.push(axios.post('http://localhost:3000/http/double',{count: 22}).catch(errorHandler))
}




console.time("redis");
console.time("http");
Promise.all(promisesRedis).then(() => console.timeEnd('redis')).catch(err => console.log(err))
Promise.all(promisesHttp).then(() => console.timeEnd('http')).catch(err => console.log(err))
    