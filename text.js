var cheerio = require('cheerio')
var fs = require('fs')

fs.readFile('mes.txt', 'utf-8', (err, data) => {
  var $ = cheerio.load(data)
  // var box = $('.pic-box')
  // var img = box.find('img')
  // console.log(box.html())
  // console.log(img.attr('src'))
          var img = $('.pic-box a').find('img')
          console.log(img.attr('src'))
})