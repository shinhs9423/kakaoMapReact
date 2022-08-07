import React, { useInsertionEffect } from "react";
import axios from 'axios';
import {useEffect} from "react";



function ViewMode() {
  useEffect(() => {
    const SERVICE_KEY = 'RQv1Nk77cxhZEsb2QLxNK2lBZeNoM8PFkwV7TsTIVEJAABja6LBqDXtUCfFTlxjYQwMAUGRL9HQM999i%2FXjmJA%3D%3D';
    const url = 'https://apis.data.go.kr/1613000/BusRouteInfoInqireService/getRouteInfoIem?serviceKey=RQv1Nk77cxhZEsb2QLxNK2lBZeNoM8PFkwV7TsTIVEJAABja6LBqDXtUCfFTlxjYQwMAUGRL9HQM999i%2FXjmJA%3D%3D&_type=json&cityCode=25&routeId=DJB30300004';
  
    axios.get(url)
    .then(
      res => {
        console.log(res.data.response.body.items);
      }
    )
  },
  []);

  return (
    <section>
        <div className="viewMode_wrap">
            <button className="viewMode_btn active">버스명</button>
            <button className="viewMode_btn">정류소</button>
        </div>
    </section>
  );
}

export default ViewMode;