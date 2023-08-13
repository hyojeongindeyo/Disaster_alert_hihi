const fileInput = document.getElementById('fileInput');
const file = document.getElementById('fileName');
const del = document.getElementById('del');

// 이미지가 이미 선택되어 있는지 확인 후, 파일 이름을 표시
window.onload=function(){
  if (change.src != '') {
    let last = change.src.lastIndexOf('/')
    let name = change.src.substring(last+1, change.src.length);
    console.log(name);
    if (name !== '') {
        file.textContent = `${name}`;
        del.style.display = 'inline-block';
    }
  }
}

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

//maxlength 작동이 안돼서.. 글자 수 제한하기
function maxLengthCheck(object) {
    if (object.value.length > object.maxlength)
        object.value = object.value.slice(0, object.max.length)
}

// 파일 선택이 완료되었을 때의 이벤트를 처리
fileInput.addEventListener("change", function () {
  if (fileInput.files.length > 0) {
    const fileName = fileInput.files[0].name;
    file.textContent = `${fileName}`;
  } 
});

const imageInput = document.getElementById('fileInput');
const imageView = document.getElementById('change');

imageInput.addEventListener('change', (event) => {
  const file = event.target.files[0];
  console.log(file);
  if (file && file.type.startsWith('image/')) {
    imageView.src = URL.createObjectURL(file);
    imageView.style.display = 'block';
    imageView.style.width = '332px';
    del.style.display = 'inline-block';
  } 
  // else {
  //   imageView.src = '';
  // }
});

del.addEventListener('click', () => {
  imageView.src = '';
  imageView.style.display = 'none';
  file.textContent = '';
  del.style.display = 'none';
  fileInput.value = "";
})