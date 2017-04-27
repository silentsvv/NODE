'use strict'
let fs = require("fs");
let cheerio = require('cheerio');
let asyncQuene = require("async").queue;
let request = require('superagent');
require('superagent-charset')(request);

const Config = {
    startPage: 1, //开始页码
    endPage: 1, //结束页码，不能大于当前图片类型总页码
    downloadImg: true, //是否下载图片到硬盘,否则只保存Json信息到文件
    downloadConcurrent: 10, //下载图片最大并发数
    currentImgType: "scy" //当前程序要爬取得图片类型,取下面AllImgType的Key。
};


const AllImgType = { //网站的图片类型
    ecy: "http://tu.duowan.com/tu"
};


let getHtmlAsync = function (url) {
    return new Promise(function (resolve, reject) {
        request.get(url).charset('gbk').end(function (err, res) {
            err ? reject(err) : resolve(cheerio.load(res.text));
        });
    });
}

let getAlbumsAsync = function () {
    return new Promise(function (resolve, reject) {
        console.log('Start get albums .....');
        let albums = [];
        let q = asyncQuene(async function (url, taskDone) {
            try {
                let $ = await getHtmlAsync(url);
                console.log(`download ${url} success`);
                $('.masonry-brick a').each(function (idx, element) {
                    albums.push({
                        title: element.children[1].attribs.alt,
                        url: element.attribs.href,
                        imgList: []
                    });
                });
            } catch (err) {
                console.log(`Error : get Album list - download ${url} err : ${err}`);
            }
            finally {
                taskDone();// 一次任务结束
            }
        }, 10);//html下载并发数设为10
        /**
         * 监听：当所有任务都执行完以后，将调用该函数
         */
        q.drain = function () {
            console.log('Get album list complete');
            resolve(albums);//返回所有画册
        }

        let pageUrls = [];
        let imageTypeUrl = AllImgType[Config.currentImgType];
        for (let i = Config.startPage; i <= Config.endPage; i++) {
            pageUrls.push(imageTypeUrl + `${i}.shtml`);
        }
        q.push(pageUrls);
    }
    );
}