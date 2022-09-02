const fs = require('fs');
const express = require('express');
// const bodyParser = require('body-parser');
// const cors = require('cors');
const axios = require('axios');

const app = express();
const port = 3000;

let books = [
    {
        "isbn": "9781593275846",
        "title": "Eloquent JavaScript, Second Edition",
        "author": "Marijn Haverbeke",
        "publish_date": "2014-12-14",
        "publisher": "No Starch Press",
        "numOfPages": 472,
    },
    {
        "isbn": "9781449331818",
        "title": "Learning JavaScript Design Patterns",
        "author": "Addy Osmani",
        "publish_date": "2012-07-01",
        "publisher": "O'Reilly Media",
        "numOfPages": 254,
    },
    {
        "isbn": "9781449365035",
        "title": "Speaking JavaScript",
        "author": "Axel Rauschmayer",
        "publish_date": "2014-02-01",
        "publisher": "O'Reilly Media",
        "numOfPages": 460,
    }
];

// app.use(cors());

// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());

app.get('/', (req, res) => {
    fs.readFile("../client/index.html", "utf8", (err, data) => {
        if (err) {
          console.error(err);
        } else {
          console.log(data);
          res.send(data);
        }
      });
});

app.post('/book', (req, res) => {
    const book = req.body;

    // output the book to the console for debugging
    console.log(book);
    books.push(book);

    res.send('Book is added to the database');
});

app.get('/book', (req, res) => {
    res.json(books);
});


app.get('/bus', (req, res) => {
    const busListKey = decodeURI("RQv1Nk77cxhZEsb2QLxNK2lBZeNoM8PFkwV7TsTIVEJAABja6LBqDXtUCfFTlxjYQwMAUGRL9HQM999i/XjmJA==");
    const busListUrl = `http://ws.bus.go.kr/api/rest/busRouteInfo/getBusRouteList?`;

    axios({
        method: "get", // 통신 방식
        url: busListUrl, // 서버
        headers: {'X-Requested-With': 'XMLHttpRequest'}, // 요청 헤더 설정
        params: { serviceKey : busListKey, resultType : "json", }, // ?파라미터를 전달
        // responseType: 'json', // default
        
    })
    .then(function (response) {
        // response Action
        const busList = [];
        for (let i = 0; i < response.data.msgBody.itemList.length; i++) {
            let obj = {
                busRouteId : response.data.msgBody.itemList[i].busRouteId,
                busRouteNm : response.data.msgBody.itemList[i].busRouteNm,
                stStationNm : response.data.msgBody.itemList[i].stStationNm,
                edStationNm : response.data.msgBody.itemList[i].edStationNm,
            };
            busList.push(obj);
            
        }
        let template = "<div class='busListWrap'>";
        for (let i = 0; i < busList.length; i++) {
            template += `
            <div>
                <h2>${busList[i].busRouteNm}</h2>
                <h2>${busList[i].stStationNm}-${busList[i].edStationNm}</h2>
                <button onclick="console.log('c')">추가하기</button>
            </div>
            `;
        }
        template += "</div>";
        // console.log(busList);        
        res.send(template);

    });
    // res.json(books);
    
});

app.get('/bus/:strSrch', (req, res) => {
    // reading isbn from the URL
    const strSrch = req.params.strSrch;

    const busListKey = decodeURI("RQv1Nk77cxhZEsb2QLxNK2lBZeNoM8PFkwV7TsTIVEJAABja6LBqDXtUCfFTlxjYQwMAUGRL9HQM999i/XjmJA==");
    const busListUrl = `http://ws.bus.go.kr/api/rest/busRouteInfo/getBusRouteList?`;

    axios({
        method: "get", // 통신 방식
        url: busListUrl, // 서버
        headers: {'X-Requested-With': 'XMLHttpRequest'}, // 요청 헤더 설정
        params: { serviceKey : busListKey, resultType : "json", strSrch : strSrch }, // ?파라미터를 전달
        // responseType: 'json', // default
        
    })
    .then(function (response) {
        // response Action
        const busList = [];
        for (let i = 0; i < response.data.msgBody.itemList.length; i++) {
            let obj = {
                busRouteId : response.data.msgBody.itemList[i].busRouteId,
                busRouteNm : response.data.msgBody.itemList[i].busRouteNm,
                stStationNm : response.data.msgBody.itemList[i].stStationNm,
                edStationNm : response.data.msgBody.itemList[i].edStationNm,
            };
            busList.push(obj);
            
        }
        let template = "<div class='busListWrap'>";
        for (let i = 0; i < busList.length; i++) {
            template += `
            <div>
                <h2>${busList[i].busRouteNm}</h2>
                <h2>${busList[i].stStationNm}-${busList[i].edStationNm}</h2>
                <button onclick="console.log('c')">추가하기</button>
            </div>
            `;
        }
        template += "</div>";
        // console.log(busList);        
        res.send(template);

    });

});

app.delete('/book/:isbn', (req, res) => {
    // reading isbn from the URL
    const isbn = req.params.isbn;

    // remove item from the books array
    books = books.filter(i => {
        if (i.isbn !== isbn) {
            return true;
        }

        return false;
    });

    // sending 404 when not found something is a good practice
    res.send('Book is deleted');
});


app.listen(port, () => console.log(`Hello world app listening on port ${port}!`));