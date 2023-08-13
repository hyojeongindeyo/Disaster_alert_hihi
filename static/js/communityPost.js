// 등록 버튼 클릭 이벤트 처리
let submitButton = document.getElementById('stop'); 
let tvalue = document.getElementById('commentText'); 
let alert = document.getElementById('alertText');
alert.style.display = 'none';

submitButton.addEventListener('click', function (event) {
  let text = tvalue.value.trim(); // textarea의 텍스트를 가져와서 앞뒤 공백을 제거
  
  if (text.length === 0) {
    // 텍스트가 비어있을 경우 폼 제출 막기
    event.preventDefault(); // 폼 제출을 막기
    // tvalue.style.border = '1px solid #68B1F4';
    // tvalue.style.borderRadius = '10px';
    alert.style.display = 'block';
  }
});

//글자수 세기 js
// textarea 요소와 글자 수를 표시할 div 요소를 가져오기
const textarea_cnt = document.getElementById("commentText");
const charCountDiv = document.getElementById("charCount");

// textarea의 내용이 변경될 때마다 글자 수를 업데이트하는 함수 만들기
function updateCharCount() {
    const text = textarea_cnt.value;
    const charCount = text.length;
    charCountDiv.textContent = `(${charCount} / 150)`;
}

// textarea의 내용이 변경될 때마다 updateCharCount 함수를 호출
textarea_cnt.addEventListener("input", updateCharCount);

// 페이지 로드 시 초기 글자 수를 설정
updateCharCount();

//maxlength가 작동을 안해서... js처리
function maxLengthCheck(object) {
    if (object.value.length > object.maxlength)
       object.value = object.value.slice(0, object.maxlength)
}

//모달창 띄우기 코드
const closeButton = document.getElementById('closePopup');

closeButton.addEventListener('click', () => {
    modal.style.display = 'none';
});

const openModalBtn = document.getElementById('open-modal');
const modal = document.getElementById('modal');
const closeModalBtn = document.getElementById('closePopup');

openModalBtn.addEventListener('click', function(event) {
    event.preventDefault();
    modal.style.display = 'block';
    // body.style.overflow = 'hidden';
});

closeModalBtn.addEventListener('click', function() {
    modal.style.display = 'none';
});

// window.addEventListener('click', function(event) {
//     if (event.target === modal) {
//         modal.style.display = 'none';
//     }
// });

//신고버튼 활성화 코드
// function appearButton1() {
//     const dynamicButton = document.querySelector('.reportBtn1');
//     dynamicButton.classList.toggle('show');
// };

// function appearButton2() {
//     const dynamicButton = document.querySelector('.reportBtn2');
//     dynamicButton.classList.toggle('show');
// };

// function appearButton(clickedBtn) {
//     // 클릭된 이미지 버튼의 인덱스 찾기
//     const imageBtns = document.getElementsByClassName('commentsDots');
//     const index = Array.from(imageBtns).indexOf(clickedBtn);
  
//     // 모든 reportBtn 숨기기
//     const reportBtns = document.getElementsByClassName('reportBtn');
//     // for (let i = 0; i < reportBtns.length; i++) {
//     //   reportBtns[i].style.display = 'none';
//     // }
  
//     // 클릭된 이미지 버튼과 관련된 reportBtn 보이거나 숨기기
//     const relatedReportBtn = reportBtns[index];
//     if (relatedReportBtn.style.display === 'none') {
//       relatedReportBtn.style.display = 'block';
//     } else {
//       relatedReportBtn.style.display = 'none';
//     }
// }

function appearButton(clickedBtn) {
    // 클릭된 이미지 버튼의 인덱스 찾기
    const imageBtns = document.getElementsByClassName('commentsDots');
    const index = Array.from(imageBtns).indexOf(clickedBtn);
  
    // 모든 reportBtn 숨기기
    const reportBtns = document.getElementsByClassName('reportBtn');
  
    // 클릭된 이미지 버튼과 관련된 reportBtn 보이거나 숨기기
    const relatedReportBtn = reportBtns[index];
    const computedStyle = window.getComputedStyle(relatedReportBtn);
    if (computedStyle.display === 'none') {
      relatedReportBtn.style.display = 'block';
    } else {
      relatedReportBtn.style.display = 'none';
    }
  }
  