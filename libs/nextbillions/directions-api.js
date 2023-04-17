const fs = require('fs')
let results = []
let delay = 300

/**
 * source data is trip id only, this is a 2 step, with a firebase-admin task first.
 * will need to retrieve the trips from db, then use that source data for the nextbillion test.
 */

fs.readFile('./directions-api-trip-ids-prod.json', 'utf8', (err, file) => {
  if (err) {
    console.log('File read failed:', err)
    return
  }

  console.info('file:', JSON.parse(file))

  const QueryList = JSON.parse(file)

  QueryList.map(async (query) => {
    const requestOptions = {
      method: 'GET',
      redirect: 'follow'
    }

    delay = delay + 300

    // setTimeout(() => {
    //   fetch(
    //     `https://api.nextbillion.io/h/geocode?key=2433d042b6f64691b11917faadbbfae5&q=${query}&limit=10&in=countryCode%3AZAF`,
    //     requestOptions
    //   )
    //     .then((response) => response.json())
    //     .then((result) => {
    //       console.info(result)

    //       results.push({ query, items: result.items })

    //       if (QueryList.length === results.length) {
    //         write()
    //       }
    //     })
    //     .catch((error) => console.log('error', error))
    // }, delay)
  })

  const write = () => {
    fs.writeFile(
      './directions-api-response.json',
      JSON.stringify(results, null, 2),
      (err) => {
        if (err) {
          console.log('Error writing file', err)
        } else {
          console.log('Successfully wrote file')
        }
      }
    )
  }
})
