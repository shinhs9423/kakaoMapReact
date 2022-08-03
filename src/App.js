import React from "react";
import MapContainer from "./map/MapContainer";



function App() {
  return (
    <div className="wrap">
      <div className="position_wrap">  
        <div className="position_child" style={{position:"absolute", zIndex:"100",boxShadow : "0px 0px 20px #333", width:"20%",height:"100vh", background:"#fff"}}>
          <div>로고</div>
          <div>메뉴</div>
          <div>폼/input 검색</div>
          <div>선택 리스트</div>
        </div>
        <div className="position_child" style={{marginLeft:"20%", width:"80%"}}>
          <MapContainer />
        </div>
      </div>

    </div>
  );
}

export default App;
