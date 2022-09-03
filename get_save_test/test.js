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
                busIndex : i,
                지역번호 : "서울",
                busRouteId : response.data.msgBody.itemList[i].busRouteId,
                busRouteNm : response.data.msgBody.itemList[i].busRouteNm,
                stStationNm : response.data.msgBody.itemList[i].stStationNm,
                edStationNm : response.data.msgBody.itemList[i].edStationNm,
            };
            busList.push(obj);
        }
        console.log(busList);
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
        fs.writeFileSync("test.json", JSON.stringify(busList));
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




app.listen(port, () => console.log(`Hello world app listening on port ${port}!`));