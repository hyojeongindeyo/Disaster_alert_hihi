/*아직 내용 없음*/
var currentPage = 1;
var messageListDiv;
// var oneYearAgoDate = new Date();
// oneYearAgoDate.setFullYear(new Date().getFullYear() - 1);
var disasterMsgList = []; // 모든 데이터를 저장할 배열

function formatDate(date) {
    // 시, 분, 초를 0으로 설정하여 날짜만 비교하도록 함
    var newDate = new Date(date);
    newDate.setHours(0, 0, 0, 0);

    var currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    var timeDiff = currentDate.getTime() - newDate.getTime();
    var dayDiff = Math.floor(timeDiff / (1000 * 3600 * 24));

    if (dayDiff === 0) {
        return '오늘';
    } else if (dayDiff === 1) {
        return '어제';
    } else {
        return dayDiff + '일 전';
    }
}

function parseDateString(dateString) {
var parts = dateString.split(' ');
var datePart = parts[0].split('/');
var timePart = parts[1].split(':');

var year = parseInt(datePart[0]);
var month = parseInt(datePart[1]) - 1; 
var day = parseInt(datePart[2]);
var hours = parseInt(timePart[0]);
var minutes = parseInt(timePart[1]);
var seconds = parseInt(timePart[2]);

return new Date(year, month, day, hours, minutes, seconds);
}

document.querySelector('.container').style.height = '800px';
document.querySelector('.loading').style.display = 'block';

function getDisasterMessages(pageNumber) {
    var xhr = new XMLHttpRequest();
    var url = 'http://apis.data.go.kr/1741000/DisasterMsg3/getDisasterMsg1List';
    var queryParams = '?' + encodeURIComponent('serviceKey') + '=' + 'enh0By9MVc5ZXW6tQaiu0NElUnh6mfIivoB9u3IPuJhEAKb4K%2FPZc6JMKqiAyeNpQ7kRvzghYyM7EAFZ4%2BoJbA%3D%3D';
    queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent(pageNumber); //페이지번호
    queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('1000'); 
    queryParams += '&' + encodeURIComponent('type') + '=' + encodeURIComponent('json');
    xhr.open('GET', url + queryParams);
    xhr.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) { //정상적으로 요청을 받으면
            try {
                document.querySelector('.loading').style.display = 'none';
                var responseData = JSON.parse(this.responseText);

                var newDisasterMsgList = responseData.DisasterMsg[1].row; // 실제 데이터

                // 조건 추가: 오늘로부터 7일 이전 데이터만 필터링
                var thirtyDaysAgoDate = new Date();
                thirtyDaysAgoDate.setDate(thirtyDaysAgoDate.getDate() - 7); // 일주일치 데이터만 필터링
                console.log(thirtyDaysAgoDate);

                var filteredData = newDisasterMsgList.filter(function (row) {
                    var createDate = parseDateString(row.create_date);
                    return row.location_name.includes('경기도') && createDate >= thirtyDaysAgoDate;
                    //~ ~ ~ ~ ~ ★★★★★지역별 재난 문자 뽑기 부분★★★★★ ~ ~ ~ ~ ~//
                });

                // 이미 존재하는 데이터와 create_date(발송 일자)가 겹치지 않는 경우만 배열에 추가
                filteredData.forEach(function (row) {
                    var createDate = parseDateString(row.create_date);
                    if (!disasterMsgList.some(function (existingRow) {
                        return parseDateString(existingRow.create_date).getTime() === createDate.getTime();
                    })) {
                        disasterMsgList.push(row);
                    }
                });

                //정렬
                disasterMsgList.sort(function (a, b) {
                  return parseDateString(b.create_date) - parseDateString(a.create_date);
                });

                console.log(disasterMsgList);

                messageListDiv = document.querySelector('.message-list');

                // 페이지에 표시할 데이터 추가
                messageListDiv.innerHTML = ''; // 기존 결과 초기화

                var displayedData = disasterMsgList.slice((currentPage - 1) * 15, currentPage * 15); // 현재 페이지에 표시할 데이터만 추출
                //한 페이지당 개수 조절하면 됨
                console.log(displayedData);

                displayedData.forEach(function (row) {
                    var createDate = parseDateString(row.create_date);
                    createDate.setHours(0, 0, 0, 0);

                    var messageDiv = document.createElement('div');
                    messageDiv.classList.add('message');

                    var msgElement = document.createElement('p');
                    msgElement.classList.add('messageText');
                    msgElement.textContent = row.msg; // 재난문자 내용 추가

                    var dateElement = document.createElement('p');
                    dateElement.classList.add('time');
                    dateElement.textContent = formatDate(createDate); 

                    messageDiv.appendChild(msgElement);
                    messageDiv.appendChild(dateElement);

                    messageListDiv.appendChild(messageDiv);
                });

                document.querySelector('.container').style.height = '100%';

                // 페이지네이션 버튼 추가
                addPaginationButtons();
            } catch (error) {
                var fail = document.createElement('p');
                fail.textContent = '새로고침 해주세요!';
                fail.classList.add('fail');
                document.querySelector('.container').appendChild(fail);
                fail.style.textAlign = 'center';
                console.error('Error while parsing response data:', error);
            }
        }
    };
    xhr.send();
}

function addPaginationButtons() {
    var paginationDiv = document.querySelector('.pagination');
    paginationDiv.innerHTML = ''; // 이전 페이지네이션 버튼 초기화

    var totalPages = Math.ceil(disasterMsgList.length / 15); // 한 페이지당 15개씩

    // 이전 페이지네이션 버튼
    if (currentPage > 1) {
        var prevButton = document.createElement('button');
        prevButton.textContent = '이전';
        prevButton.classList.add('prevBtn');

        prevButton.addEventListener('click', function () {
            currentPage--;
            getDisasterMessages(currentPage);
        });
        paginationDiv.appendChild(prevButton);
    }

    // 현재 페이지 번호만 표시
    var currentPageButton = document.createElement('button');
    currentPageButton.textContent = currentPage;
    currentPageButton.classList.add('page-button');
    // currentPageButton.disabled = true; // 현재 페이지 버튼 비활성화
    paginationDiv.appendChild(currentPageButton);

    // 다음 페이지네이션 버튼
    if (currentPage < totalPages) {
        var nextButton = document.createElement('button');
        nextButton.textContent = '다음';
        nextButton.classList.add('nextBtn');

        nextButton.addEventListener('click', function () {
            currentPage++;
            getDisasterMessages(currentPage);
        });
        paginationDiv.appendChild(nextButton);
    }
}       

// 페이지 로드 시 API 호출 및 결과 표시
getDisasterMessages(currentPage);

//-----------------------------------------혹은 이러한 방법.....? 페이지네이션 x, 대신 밑으로 데이터가 주욱 쌓이고 스크롤 되어버림...
// function formatDate(date) {
//     var currentDate = new Date();
//     var oneYearAgoDate = new Date();
//     oneYearAgoDate.setFullYear(currentDate.getFullYear() - 1);
    
//     if (date >= oneYearAgoDate) {
//         var timeDiff = currentDate.getTime() - date.getTime();
//         var dayDiff = Math.floor(timeDiff / (1000 * 3600 * 24));
    
//         if (dayDiff === 0) {
//           return '오늘';
//         } else if (dayDiff === 1) {
//           return '어제';
//         } else {
//           return dayDiff + '일 전';
//         }
//     } else {
//         // 1년 이전의 경우엔 원하는 포맷을 반환
//         var year = date.getFullYear();
//         var month = ('0' + (date.getMonth() + 1)).slice(-2);
//         var day = ('0' + date.getDate()).slice(-2);
//         return year + '/' + month + '/' + day;
//     }
// }
    
// function getDisasterMessages(pageNo, totalData) {
//     var xhr = new XMLHttpRequest();
//     var url = 'http://apis.data.go.kr/1741000/DisasterMsg3/getDisasterMsg1List';
//     var queryParams = '?' + encodeURIComponent('serviceKey') + '=' + 'enh0By9MVc5ZXW6tQaiu0NElUnh6mfIivoB9u3IPuJhEAKb4K%2FPZc6JMKqiAyeNpQ7kRvzghYyM7EAFZ4%2BoJbA%3D%3D';
//     queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent(pageNo);
//     queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('1000');
//     queryParams += '&' + encodeURIComponent('type') + '=' + encodeURIComponent('json');
//     xhr.open('GET', url + queryParams);
//     xhr.onreadystatechange = function () {
//         if (this.readyState == 4 && this.status == 200) {
//             try {
//                 var responseData = JSON.parse(this.responseText);
//                 var totalCount = responseData.DisasterMsg[0].head[0].totalCount; // 전체 데이터 수
//                 var disasterMsgList = responseData.DisasterMsg[1].row; // 실제 데이터
    
//                 // 'location_id'가 21이고, 현재 날짜로부터 7일 이내인 경우에만 메시지와 날짜를 추가
//                 var messageListDiv = document.querySelector('.message-list');
//                 var currentDate = new Date();
//                 var sevenDaysAgoDate = new Date();
//                 sevenDaysAgoDate.setDate(currentDate.getDate() - 7); // 7일 전 날짜로 설정
    
//                 disasterMsgList.forEach(function (row) {
//                     var createDate = new Date(row.create_date);
//                     if (row.location_name.includes('경기도') && createDate >= sevenDaysAgoDate) {
//                         var messageDiv = document.createElement('div');
//                         messageDiv.classList.add('message');
    
//                         var msgElement = document.createElement('p');
//                         msgElement.classList.add('messageText');
//                         msgElement.textContent = row.msg;
    
//                         var dateElement = document.createElement('p');
//                         dateElement.classList.add('time');
//                         dateElement.textContent = formatDate(createDate);
    
//                         messageDiv.appendChild(msgElement);
//                         messageDiv.appendChild(dateElement);
    
//                         messageListDiv.appendChild(messageDiv);
//                     }
//                 });
    
//                 // 전체 데이터 수와 받은 데이터 수를 누적
//                 totalData += disasterMsgList.length;
    
//                 // 다음 페이지 호출
//                 if (totalData < totalCount) {
//                     getDisasterMessages(pageNo + 1, totalData);
//                 } 
//             // else {
//             //   // 페이지네이션 버튼 추가
//             //   addPaginationButtons(pageNo);
//             // }
//             } catch (error) {
//                 console.error('Error while parsing response data:', error);
//             }
//         }
//     };
//         xhr.send('');
// }

// getDisasterMessages(1, 0);