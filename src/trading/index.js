const Price = require('../models/price')
const moment = require('moment')
const BB = require('technicalindicators').BollingerBands

exports.onPrice = async function(price) {
    const start = moment().subtract(0, 'days').toDate()

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

exports.getBollinger = async function({start, period = 1, end = Date()} = {}) {
    const prices = await Price.getRange({ start, end })

    const total = prices.length - period
  
    const input = {
      period: total,
      values: prices,
      stdDev: 2
    }
  
    const outcome = BB.calculate(input)
    return outcome
}

exports.showAvailable = function({ bollinger, prices } = {}) {
    const bol = bollinger[0]
    const midrange = bol['middle']
    const low = bol['lower']
    const midLow = (midrange - low) / 2 + low
    console.log(midrange)
    console.log(low)
    console.log(midLow)
    
    
    const availables = prices.filter(price => {
      return price < midrange
    })
  
    console.log(`${availables.length}/${prices.length}`)
}
  

