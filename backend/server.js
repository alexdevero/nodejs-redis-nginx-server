const os = require('os')
const redis = require('redis')
const express = require('express')

const app = express()

const port = 3000

const redisClient = redis.createClient({
  host: 'redis',
  port: 6379,
  url: 'redis://redis:6379',
})

redisClient.on('error', (err) => console.log('Redis Client Error', err))

app.get('/', async (req, res) => {
  console.log('Request received')
  try {
    // await redisClient.connect()
    // redisClient.get('numOfVisits', function (err, numOfVisits) {
    //   let numVisitsToDisplay = parseInt(numOfVisits) + 1

    //   if (isNaN(numVisitsToDisplay)) {
    //     numVisitsToDisplay = 1
    //   }

    //   res.send(`${os.hostname()}: Number of visits: ${numVisitsToDisplay}`)
    //   redisClient.set('numOfVisits', numOfVisits + 1)
    // })
    res.send(`${os.hostname()}: without redis`)
  } catch (err) {
    console.log('Redis Client Error', err)

    res.send('There was an error connecting to Redis')
  }
})

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})
