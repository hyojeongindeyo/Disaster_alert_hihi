// textarea 요소를 가져오기
const textarea = document.getElementById("editArea");

// 높이를 자동으로 조절하는 함수를 만들기
function autoResize() {
    textarea.style.height = "auto";
    textarea.style.height = textarea.scrollHeight + "px";
}

// textarea의 내용이 변경될 때마다 높이를 자동으로 조절
textarea.addEventListener("input", autoResize);

// 페이지 로드 시 초기 높이를 설정
autoResize();

//글자수 세기 js
// textarea 요소와 글자 수를 표시할 div 요소를 가져오기
const textarea_cnt = document.getElementById("editArea");
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

// 파일 선택이 완료되었을 때의 이벤트를 처리
fileInput.addEventListener("change", function () {
  const file = document.getElementById('fileName');
  if (fileInput.files.length > 0) {
    const fileName = fileInput.files[0].name;
    file.textContent = `${fileName}`;
  } 
});