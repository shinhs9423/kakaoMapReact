var http = require('http');
const express = require('express')
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express()

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const hostname = '127.0.0.1';
const port = 3002;

app.get('/', (req, res) => {
  console.log('Hello World, from express');
  res.send('Hello World, from express');
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
      console.log(busList);
      res.send('action');
  });

  
});

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
