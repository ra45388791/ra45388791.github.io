//引入http模組
const http = require('http');       //開啟伺服器功能
const url = require('url');         //用來解析url
const express = require('express');   //


//設定server網址 因為是本地端測試所以用127.0.0.1
// const hostname = '127.0.0.1';        //上傳到伺服器要拿掉
//PORT號 不要跟現有埠號重複就好
const port = process.env.PORT || 5000;                      //伺服器會自動分配鎖以上傳時不需要設置

//新增一個server並指定他的頁面資訊 內容為hello world!
const server = http.createServer((req, res) => {
    res.writeHead(200, {
        'Content-type': 'text/plain; charser=utf-8',
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-Origin': '*'
    });



    // res.statusCode = 200;
    // res.setHeader('Content-Type', 'application/json');
    res.end('Hello World');
})

let app1 = express();
app1.get("test1", function (req, res) {
    res.statusCode = 200;                               //狀態碼
    res.header('Access-Control-Allow-Origin', '*');     //cors設定
    res.setHeader('Content-Type', 'application/json');  //資料型態設定
    res.send('你好');
})
app1.listen(4999);

let app2 = express();
app2.get("test2", function (req, res) {
    res.statusCode = 200;
    res.header('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/json');
    res.send('你好222222');
})
app2.listen(5001);

server.listen(port, () => {
    // console.log(`伺服器運作於 http://${hostname}:${port}`);
    console.log(`伺服器運作於 port:${port}`);
    // console.log(http);
    // console.log(url);
    // console.log(express);
    console.log(app1);
    // console.log(http.rawHeaders);
})

