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

// function RouterPage (title,imgSrc,link) {
//   this.title = title
//   this.imgSrc = imgSrc
//   this.link = link
// }
var driver
var newImgArr = [];

function p() {
  let p1 = new Promise(function(resolve, reject) {
    driver = new webdriver.Builder()
      .forBrowser('chrome')
      .build();
    driver.get('http://tu.duowan.com/tu')
    driver.getPageSource().then(function (src) {
      fs.writeFile('message.txt',src, (err)=>{
        if(err) throw err
        console.log("It's saved")
      })
      fs.readFile('message.txt','utf-8',(err,data)=>{
        if(err) throw err
        var html = data
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
            resolve()
          })
        }else{
          console.log("-->masonry-brick-->找不到相关类信息")
          reject()
        }
      })
    })
  })

  let p2 = new Promise(function(resolve, reject) {
    driver.executeScript("var winH = document.body.scrollHeight;window.scrollTo(0,winH)").then(function(){
      var newHtml = driver.getPageSource().then(function(src){
        fs.writeFile('message2.txt',src, (err)=>{
          if(err) throw err
          console.log("It's saved")
        })
        fs.readFile('message2.txt','utf-8',(err,data)=>{
          if(err) throw err
          var html = data
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
            resolve(newImgArr)
          }else{
            console.log("-->masonry-brick-->找不到相关类信息")
            reject()
          }
        })
      })
    })
  })
  return Promise.all([p1,p2])
}
  

// function p() {
//   return function(){
//     let result = Promise.all([p1,p2])
//     return result
//   }
// }




// function promise() {
//   var driver = new webdriver.Builder()
//   .forBrowser('chrome')
//   .build();

//   return new Promise(function(resolve, reject){
//     var newImgArr = [];
//     driver.get('http://tu.duowan.com/tu')
//     var source = driver.getPageSource().then(function (src) {
//       fs.writeFile('message.txt',src, (err)=>{
//         if(err) throw err
//         console.log("It's saved")
//       })
//       fs.readFile('message.txt','utf-8',(err,data)=>{
//         if(err) throw err
//         var html = data
//         var $ = cheerio.load(html)
//         var li = $('.masonry-brick:not(.tags) a');
//         var img = li.find('img')
//         if(img.length > 0){
//           img.each(function(i,elem){
//             var rPage = new RouterPage()
//             let parent = $(this).closest('li')
//             let src = $(this).attr('src')
//             let title = parent.find('em a').text()
//             let link = parent.find('em a').attr('href')
//             rPage.setTitle(title)
//             rPage.setImgSrc(src)
//             rPage.setLink(link)
//             newImgArr.push(rPage)
//           })
//         }else{
//           console.log("-->masonry-brick-->找不到相关类信息")
//         }
//       })
//     })

//     var source2 = driver.executeScript("var winH = document.body.scrollHeight;window.scrollTo(0,winH)").then(function(){
//       driver.sleep(5000);
//       var newHtml = driver.getPageSource().then(function(src){
//         fs.writeFile('message2.txt',src, (err)=>{
//           if(err) throw err
//           console.log("It's saved")
//         })
//         fs.readFile('message2.txt','utf-8',(err,data)=>{
//           if(err) throw err
//           var html = data
//           var $ = cheerio.load(html)
//           var li = $('.masonry-brick:not(.tags) a');
//           var img = li.find('img')
//           if(img.length > 0){
//             img.each(function(i,elem){
//               var rPage = new RouterPage()
//               let parent = $(this).closest('li')
//               let src = $(this).attr('src')
//               let title = parent.find('em a').text()
//               let link = parent.find('em a').attr('href')
//               let isExist = newImgArr.find((item)=>
//                 item.title == title
//               )
//               if(!isExist){
//                 rPage.setTitle(title)
//                 rPage.setImgSrc(src)
//                 rPage.setLink(link)
//                 newImgArr.push(rPage)
//               }
//             })
//             resolve(newImgArr)
//           }else{
//             console.log("-->masonry-brick-->找不到相关类信息")
//             reject()
//           }
//         })
//       })
//     })
//   }) 
// }




module.exports = p
