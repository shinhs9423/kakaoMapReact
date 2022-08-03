// MapContainer.js

import React, { useEffect } from 'react';

const { kakao } = window;

const MapContainer = () => {

    useEffect(() => {
        const container = document.getElementById('myMap');
		const options = {
			center: new kakao.maps.LatLng(37.5662952, 126.9779451),
			level: 8
		};
        const map = new kakao.maps.Map(container, options);

        // 지도 확대 축소를 제어할 수 있는  줌 컨트롤 생성
		var zoomControl = new kakao.maps.ZoomControl();
		map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

    }, []);

    return (
        <div id='myMap' style={{
            // border: '5px solid red',
            boxSizing: 'border-box',
            width: '100%',
            height: '100vh'
        }}></div>
    );
}

export default MapContainer; 