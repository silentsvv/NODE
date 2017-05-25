require('chromedriver');
var webdriver = require('selenium-webdriver');
var cheerio = require('cheerio');
var fs = require('fs')



function RouterPage () {
  var page = (function () {
    this.title = null
    this.imgSrc = null
    this.link = null

    this.setTitle = function (newTitle) {
      this.title = newTitle
    }

    this.getTitle = function () {
      return this.title
    }

    this.setImgSrc = function (newImgSrc) {
      this.imgSrc = newImgSrc
    }

    this.getImgSrc = function () {
      return this.imgSrc
    }

    this.setLink = function (newLink) {
      this.link = newLink
    }

    this.getLink = function () {
      return this.link
    }
    return {
      'setTitle': this.setTitle,
      'getTitle': this.getTitle,
      'setImgSrc': this.setImgSrc,
      'getImgSrc': this.getImgSrc,
      'setLink': this.setLink,
      'getLink': this.getLink
    }
  })()
  return page;
}

var driver
var newImgArr = []
var p

function myTest ({pageNum=0}) {

  if(pageNum === 0) {
    driver = new webdriver.Builder().forBrowser('phantomjs').build()
    driver.get('http://tu.duowan.com/tu')
    p = new Promise(function(resolve, reject){
      driver.getPageSource().then(function (src) {
        var html = src
        var $ = cheerio.load(html)
        var li = $('.masonry-brick:not(.tags) a');
        var img = li.find('img')
        if(img.length > 0){
          img.each(function(i,elem){
            var rPage = new RouterPage()
            let parent = $(this).closest('li')
            let src = $(this).attr('src')
            let title = parent.find('em a').text()
            let link = parent.find('em a').attr('href')
            rPage.setTitle(title)
            rPage.setImgSrc(src)
            rPage.setLink(link)
            newImgArr.push(rPage)
          })
          console.log(newImgArr.length,"console.log(newImgArr.length)!")
          resolve(newImgArr)
        }else{
          console.log("-->masonry-brick-->找不到相关类信息")
          reject()
        }
      })
    })
  }else{
    p = new Promise(function(resolve, reject) {
      driver.executeScript("var winH = document.body.scrollHeight;console.log(document.body.scrollHeight);window.scrollTo(0,winH)").then(function(){
        driver.sleep(1000)
        var newHtml = driver.getPageSource().then(function(src){
          var html = src
          var $ = cheerio.load(html)
          var li = $('.masonry-brick:not(.tags) a');
          var img = li.find('img')
          if(img.length > 0){
            img.each(function(i,elem){
              var rPage = new RouterPage()
              let parent = $(this).closest('li')
              let src = $(this).attr('src')
              let title = parent.find('em a').text()
              let link = parent.find('em a').attr('href')
              let isExist = newImgArr.find((item)=>
                item.title == title
              )
              if(!isExist){
                rPage.setTitle(title)
                rPage.setImgSrc(src)
                rPage.setLink(link)
                newImgArr.push(rPage)
              }
            })
            console.log(newImgArr.length,"console.log(newImgArr.length)!22")
            resolve(newImgArr)
          }else{
            console.log("-->masonry-brick-->找不到相关类信息")
            reject()
          }
        })
      })
    })
  }

  return p
}
  
module.exports = myTest
