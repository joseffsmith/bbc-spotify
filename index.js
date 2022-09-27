const cheerio = require('cheerio')
const axios = require('axios')


const showId = "m001bp6c"
const showBaseUrl = "https://www.bbc.co.uk/sounds/play/"

const main = async () => {
    const t = await axios.get(`${showBaseUrl}${showId}`)
    const $ = cheerio.load(t.data)

    // console.log($('script'))
    const scripts = $('script')
    // console.log(scripts.contents())
    // console.log($.html())
    const a = scripts.contents()
    const b = Object.keys(v => v)
    const c = Object.values(a).find(a => a.data.includes('window.__PRELOADED_STATE__'))
    const d = c.data.replace(' window.__PRELOADED_STATE__ = ', '')
    console.log(d)
    const x = JSON.parse(d)
    console.log(x)
    // console.log(c.data)
}


main()

