const script = document.createElement("script");
script.src = "https://dapi.kakao.com/v2/maps/sdk.js?appkey=kakaokey";
document.head.appendChild(script);

document.addEventListener("DOMContentLoaded", function () {
    let locX, locY; //위도와 경도를 저장할 변수
    function getLocation() {
        // 허용 여부를 묻는 팝업창 열기
        const popupContainer = document.getElementById("popup-container");
        popupContainer.classList.add("active");
    }

    // 허용 여부를 묻는 팝업창 닫기 버튼 이벤트 처리
    function closePopup() {
        const popupContainer = document.getElementById("popup-container");
        popupContainer.classList.remove("active");
    }

    // 내 위치 찾기 텍스트에 클릭 이벤트 핸들러를 추가
    const getLocationText = document.getElementById("get-location");
    getLocationText.addEventListener("click", getLocation);

    // 허용 버튼 클릭
    const allowLocationButton = document.getElementById("allow-location");
    allowLocationButton.addEventListener("click", function () {
        // 위치 정보 가져오기 함수 호출
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                function (position) {
                    locX = position.coords.latitude;
                    locY = position.coords.longitude;

                    // 위도, 경도를 주소로 변환해주는 것입니다잉 -여기서부터 geocoder.coord2Address(coord.getLng(), coord.getLat(), callback);
                    // 여기까지 효징이가 했는데 아래에 주소변환 함수가 있긴 하던디... 우선은 제걸로 뜨게끔 해놨는데 아래 함수로 바꾸고 싶으시면 바꾸셔도 괜찮습니닷....
                    var geocoder = new kakao.maps.services.Geocoder();
                    var coord = new kakao.maps.LatLng(locX, locY);
                    var callback = function(result, status) {
                        if (status === kakao.maps.services.Status.OK) {
                            resultInfo.innerHTML = "당신의 위치<br>" + result[0].address.address_name
//                            console.log(result[0].address.address_name);
//                            juso = result[0].address.address_name;
                        }
                    };

                    geocoder.coord2Address(coord.getLng(), coord.getLat(), callback);



                    // 허용 팝업 닫기
                    closePopup();

                    // 결과 팝업에 위치 정보 표시
                    const resultInfo = document.getElementById("result-info");
//                    resultInfo.innerHTML = "당신의 위치<br> 위도 " + locX + "<br> 경도 " + locY;

                    // 카카오맵 API 로드하기
                    kakao.maps.load(function () {
                        // 카카오맵 API 사용 가능한 상태
                        // 카카오맵 API를 사용하여 주소로 변환
//                        const geocoder = new kakao.maps.services.Geocoder();
//                        const latlng = new kakao.maps.LatLng(locX, locY);
//                        geocoder.coord2Address(latlng, function (result, status) {
//                            if (status === kakao.maps.services.Status.OK) {
//                                if (Array.isArray(result) && result.length > 0) {
//                                    resultInfo.textContent += "\n주소: " + result[0].address.address_name;
//                                } else {
//                                    console.error("Geocoder 실패: " + status);
//                                    resultInfo.textContent += "\n주소를 찾을 수 없습니다.";
//                                }
//                            } else {
//                                console.error("Geocoder 실패: " + status);
//                                resultInfo.textContent = "주소를 찾을 수 없습니다.";
//                            }
//                        });

                        // 결과 팝업 열기
                        const resultPopupContainer = document.getElementById("result-popup-container");
                        resultPopupContainer.classList.add("active");
                    });
                },
                function (error) {
                    console.error("위치 정보 가져오기 오류:", error.message);
                    // 허용 팝업 닫기
                    closePopup();
                }
            );
        } else {
            console.error("브라우저에서 Geolocation을 지원하지 않습니다.");
        }
    });

    // "거부" 버튼 클릭 이벤트 처리
    const denyLocationButton = document.getElementById("deny-location");
    denyLocationButton.addEventListener("click", closePopup);

    // 결과 팝업 닫기 버튼 이벤트 처리
    const closeResultButton = document.getElementById("close-result");
    closeResultButton.addEventListener("click", function () {
        // 결과 팝업 닫기
        const resultPopupContainer = document.getElementById("result-popup-container");
        resultPopupContainer.classList.remove("active");
    });
});