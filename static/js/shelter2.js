function locationLoadSuccess(pos) {
  // 현재 위치 받아오기
  var currentPos = new kakao.maps.LatLng(
    pos.coords.latitude,
    pos.coords.longitude
  );

  locX = pos.coords.latitude;
  locY = pos.coords.longitude;
  const locationInfo = document.getElementById("location");

  setValue(locX, locY);

  var geocoder = new kakao.maps.services.Geocoder();
  var coord = new kakao.maps.LatLng(locX, locY);
  var callback = function(result, status) {
      if (status === kakao.maps.services.Status.OK) {
          locationInfo.value = "내 위치 : " + result[0].address.address_name
          console.log(locationInfo.value);

          submitForm();
      }
  };

  geocoder.coord2Address(coord.getLng(), coord.getLat(), callback);

    // 카카오맵 API 로드하기
  kakao.maps.load(function () {

  });

  // 마커 생성
  var marker = new kakao.maps.Marker({
    position: currentPos,
  });

  // 기존에 마커가 있다면 제거
  marker.setMap(null);
  marker.setMap(map);

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
