var mapContainer = document.getElementById("map"), // 지도를 표시할 div
  mapOption = {
    center: new kakao.maps.LatLng(36.6438784, 126.9235712), // 지도의 중심좌표
    level: 3, // 지도의 확대 레벨
  };

var map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다

// 마커가 표시될 위치입니다
var markerPosition = new kakao.maps.LatLng(36.6438784, 126.9235712);

// 마커를 생성합니다
var marker = new kakao.maps.Marker({
  position: markerPosition,
});

// 마커가 지도 위에 표시되도록 설정합니다
marker.setMap(map);

// 지도를 생성한다
var map = new kakao.maps.Map(mapContainer, mapOption);

function locationLoadSuccess(pos) {
  // 현재 위치 받아오기
  var currentPos = new kakao.maps.LatLng(
    pos.coords.latitude,
    pos.coords.longitude
  );

  locX = pos.coords.latitude;
  locY = pos.coords.longitude;

  setValue(locX, locY);

  // 지도 이동(기존 위치와 가깝다면 천천히 이동)
  map.panTo(currentPos);

  // 마커 생성
  var marker = new kakao.maps.Marker({
    position: currentPos,
  });

  // 기존에 마커가 있다면 제거
  marker.setMap(null);
  marker.setMap(map);

  submitForm();
}

function locationLoadError(pos) {
  alert("위치 정보를 가져오는데 실패했습니다.");
}

function setValue(locX,locY) {
    var inputElementX = document.getElementById("inputX");
    inputElementX.value = locX;
    var inputElementY = document.getElementById("inputY");
    inputElementY.value = locY;
}

function submitForm() {
    var form = document.getElementById("myinput");
    form.submit();
}

// 위치 가져오기 버튼 클릭시
function getCurrentPosBtn() {
  navigator.geolocation.getCurrentPosition(
    locationLoadSuccess,
    locationLoadError
  );
}
