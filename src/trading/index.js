const Price = require('../models/price')
const moment = require('moment')

exports.onPrice = async function(price) {
    const start = moment().subtract(1, 'days').toDate()

    const dayAverage = await Price.getMean({start})
    const dayMax = await Price.getMax({start})
    const dayMin = await Price.getMin({start})
    const dayMedian = await Price.getMedian({start})

    console.log('')
    console.log(`Day Mean: ${dayAverage}`)
    console.log(`Day Max: ${dayMax}`)
    console.log(`Day Min: ${dayMin}`)
    console.log(`Day Median: ${dayMedian}`)

    console.log(`current: ${price.spot}`)

}

