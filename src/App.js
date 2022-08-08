import React from "react";
import "./common/css/main.css";
import MapContainer from "./map/MapContainer";
import Logo from "./layout/Logo";
import ViewMode from "./layout/ViewMode";
import SearchForm from "./layout/SearchForm";
import SelectList from "./layout/SelectList";

function App() {
  return (
    <div className="wrap">
      <div className="position_wrap">  
        <div className="position_child" style={{position:"absolute", zIndex:"100",boxShadow : "0px 0px 20px #333", width:"20%",height:"100vh", background:"#fff", minWidth:"280px"}}>
          <Logo />
          <ViewMode />
          <SearchForm />
          <SelectList />
        </div>
        <div className="position_child" style={{marginLeft:"20%", width:"80%"}}>
          <MapContainer />
        </div>
      </div>

    </div>
  );
}

export default App;
