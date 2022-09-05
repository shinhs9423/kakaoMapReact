const fs = require('fs');
const express = require('express');
const axios = require('axios');

const app = express();
const port = 3000;

// app.use(cors());

// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());

// callAPI Function
const busApi = {
    서울버스 : {callUrl : "", callKey : "", Callparams : {}},
    서울버스조회 : {callUrl : "", callKey : "", Callparams : {}},
    지방버스 : {callUrl : "", callKey : "", Callparams : {}},
    지방버스조회 : {callUrl : "", callKey : "", Callparams : {}},
    listCall : function (callUrl, callKey, Callparams) {}
}

function callAPI (callUrl, callKey, Callparams) {
    axios({
        method: "get", // 통신 방식
        url: callUrl, // 서버
        headers: {'X-Requested-With': 'XMLHttpRequest'}, // 요청 헤더 설정
        params: { serviceKey : callKey, resultType : "json", }, // ?파라미터를 전달
    })
    .then(function (response) {
        res.send(response);
    });
}

app.get('/', (req, res) => {
    const busListKey = decodeURI("RQv1Nk77cxhZEsb2QLxNK2lBZeNoM8PFkwV7TsTIVEJAABja6LBqDXtUCfFTlxjYQwMAUGRL9HQM999i/XjmJA==");
    const busListUrl = `http://ws.bus.go.kr/api/rest/busRouteInfo/getBusRouteList?`;

    axios({
        method: "get", // 통신 방식
        url: busListUrl, // 서버
        headers: {'X-Requested-With': 'XMLHttpRequest'}, // 요청 헤더 설정
        params: { serviceKey : busListKey, resultType : "json", }, // ?파라미터를 전달
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
        // console.log(busList); // busList 확인
        

        let template = "<div class='busListWrap'>";
        for (let i = 0; i < busList.length; i++) {
            template += `
            <div>
                <span>${busList[i].busRouteNm}</span>
                <span>${busList[i].stStationNm}-${busList[i].edStationNm}</span>
                <button onclick="console.log('c')">추가하기</button>
            </div>
            `;
        }
        template += "</div>";
        // console.log(busList);        
        fs.writeFileSync("test.json", JSON.stringify(busList));
        res.send(template);

    });
    
});



app.listen(port, () => console.log(`Hello world app listening on port ${port}!`));