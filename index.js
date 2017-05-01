require('chromedriver');
var webdriver = require('selenium-webdriver');
var cheerio = require('cheerio');
var fs = require('fs')

var driver = new webdriver.Builder()
  .forBrowser('phantomjs')
  .build();

/*function RouterPage () {
  var title = null
     ,imgSrc = null
     ,link = null;

  this.setTitle = function (newTitle) {
    title = newTitle
  }

  this.getTitle = function () {
    return title
  }

  this.setImgSrc = function (newImgSrc) {
    imgSrc = newImgSrc
  }

  this.getImgSrc = function () {
    return imgSrc
  }

  this.setLink = function (newLink) {
    link = newLink
  }

  this.getLink = function () {
    return link
  }

}*/

function RouterPage (title,imgSrc,link) {
  this.title = title
  this.imgSrc = imgSrc
  this.link = link
}

driver.get('http://tu.duowan.com/tu')
var source = driver.getPageSource().then(function (src) {
    fs.writeFile('message.txt',src, (err)=>{
      if(err) throw err
      console.log("It's saved")
    })
    fs.readFile('message.txt','utf-8',(err,data)=>{
      if(err) throw err
      var newImgArr = [];
      var html = data
      var $ = cheerio.load(html)
      var li = $('.masonry-brick:not(.tags) a');
      var img = li.find('img')
      if(img.length > 0){
        img.each(function(i,elem){
          let rPage = new RouterPage()
          let parent = $(this).closest('li')
          let src = $(this).attr('src')
          let title = parent.find('em a').text()
          let link = parent.find('em a').attr('href')
          rPage.title = title
          rPage.imgSrc = src
          rPage.link = link
          newImgArr.push(rPage)
        })
        for(let i in newImgArr) {
          console.log(newImgArr[i])
        }
      }else{
        console.log("-->masonry-brick-->找不到相关类信息")
      }
    })
    
})
