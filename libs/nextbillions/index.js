/**
 * @see: https://docs.nextbillion.ai/docs/places/api/multi-geocode
 * @desc: WIP
 */
const axios = require('axios')
const fs = require('fs')
let results = []

fs.readFile('./geocode-test-1.json', 'utf8', (err, file) => {
  if (err) {
    console.log('File read failed:', err)
    return
  }

  console.info('file:', JSON.parse(file))

  JSON.parse(file).map(async (query) => {
    await axios
      .get(
        'https://api.nextbillion.io/multigeocode/v1/multi-geocode/search?key=2433d042b6f64691b11917faadbbfae5&limit=10&in=countryCode%3AZAF',
        {
          headers: {
            'Content-Type': 'application/json'
          },
          cors: 'no-cors',
          data: query
        }
      )
      .then((res) => {
        console.warn('result: ', query, res.data)
        results.push(res.data)
      })
      .catch(console.warn)
  })

  console.info('-------------', results)
  fs.writeFile('./response.json', JSON.stringify(results), (err) => {
    if (err) {
      console.log('Error writing file', err)
    } else {
      console.log('Successfully wrote file')
    }
  })
})
