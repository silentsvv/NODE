require('chromedriver');
var webdriver = require('selenium-webdriver');
var cheerio = require('cheerio');
var fs = require('fs')

var driver = new webdriver.Builder()
  .forBrowser('chrome')
  .build();

driver.get('http://tu.duowan.com/tu')
var source = driver.getPageSource().then(function (src) {
    fs.writeFile('message.txt',src, (err)=>{
      if(err) throw err
      console.log("It's saved")
    })
    fs.readFile('message.txt','utf-8',(err,data)=>{
      if(err) throw err
      var html = data
      var $ = cheerio.load(html)
      var li = $('#content');
      var img = li.find('img')
      img.each(function(i,elem){
        console.log($(this).attr('src'))
      })
    })
    
})
