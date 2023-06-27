const os = require('os')
const redis = require('redis')
const express = require('express')

const app = express()

const port = 3000

const redisClient = redis.createClient({
  host: 'redis',
  port: 6379,
  url: process.env.REDIS_URL,
})

redisClient.on('error', (err) => console.log('Redis Client Error', err))

redisClient.connect()

app.get('/', async (req, res) => {
  // redisClient
  //   .ping()
  //   .then((res) => console.log('ping', res))
  //   .catch((err) => console.log('ping err', err))

  redisClient
    .get('numOfVisits')
    .then((numOfVisits) => {
      let numVisitsToDisplay = parseInt(numOfVisits) + 1

      if (isNaN(numVisitsToDisplay)) {
        numVisitsToDisplay = 1
      }

      res.send(`${os.hostname()}: Number of visits: ${numVisitsToDisplay}`)
      redisClient.set('numOfVisits', numVisitsToDisplay)
    })
    .catch((err) => console.log('get err', err))
})

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})
