import React from "react";

function ViewMode() {
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