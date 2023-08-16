// 프로필 업로드 및 미리보기 

// 이미지 선택 및 미리보기 처리 함수
function previewImage(event) {
    const fileInput = event.target;
    const previewImage = document.getElementById('user');
// previewImage 함수가 호출될때 target 속성 > 파일  input 요소를 가지고옴
// 미리보기 이미지 엘리먼트를 'id'가 user인거  가져옴  

if (fileInput.files && fileInput.files[0]) {
        const reader = new FileReader();
// 파일을 읽기위한 file reader 객체 생성
        reader.onload = function (e) {
            previewImage.src = e.target.result;
        }
// fild reader 객체의 onload 핸들러 정의 > 이미지 src 속성에 파일 할당하여 이미지 미리보기 창에 표시
        reader.readAsDataURL(fileInput.files[0]);
    }
}
// 매서드를 호출하여 선택한 파일 읽음 

// 폼 제출 처리 함수

function submitProfileForm() {
    const form = document.querySelector('form');
    // 프로필 폼 요소를 가져옴
    const nickname = form.elements.nickname.value;
    //  폼 요소에서 닉네임(input 요소 name = nickname)을 가져옴
    const email = form.elements.email.value;
    // 폼 요소에서 이메일(input 요소 name = email)을 가져옴
    const password = form.elements.password.value;
    // 폼 요소에서 비밀번호(input요소의 name = "password")을 가져옴
    const profileImage = document.getElementById('user').src;
    // 프로필이미지의  url을 가져온 뒤, 이미지가 미리보기 창에 표시되고 있으므로
    // 해당 이미지의 src 속성을 가져와 'profileImage'변수에 할당
    
    
    // 폼 데이터를 로깅하는 예제 코드입니다.
    console.log('닉네임:', nickname);
    console.log('이메일:', email);
    console.log('비밀번호:', password);
    console.log('프로필 이미지:', profileImage);

    
    // 실제 서버로 폼 데이터를 제출해야 프로필 정보가 저장/수정됩니다.
    // form.submit();
}

// 사용자가 이미지를 선택하면 이벤트 발생 > previewImage 함수 호출
document.getElementById('profile-image-input').addEventListener('change', previewImage);

// 폼 제출 이벤트 리스너를 form 요소에 추가
document.querySelector('form').addEventListener('submit', function (event) {
    event.preventDefault(); // 기본 폼 제출 동작을 취소합니다. (페이지 새로고침 방지) = 폼을 제출하고 난 뒤에도 추가작업 가능
    submitProfileForm(); // submitProfileForm() 함수를 호출하여 폼 데이터를 서버로 전송
});




// 닉네임 확인 함수

document.getElementById("profile-form").addEventListener("submit", function(event) {
    event.preventDefault(); // 기본 폼 제출 동작 취소
    validateForm();
});

function validateForm() {
    const nickname = document.getElementById("nickname").value.trim();

    // 닉네임이 비어있는지 확인
    if (nickname === "") {
        alert("아이디를 입력해주세요.");
        return false;
    }

    // 닉네임 유효성 검사 - 영어, 숫자로만 구성되어야 하며, 최대 9자까지 입력 가능합니다.
    const nicknameRegExp = /^[A-Za-z0-9]{1,9}$/;
    if (!nicknameRegExp.test(nickname)) {
        alert("아이디는 영어, 숫자로만 구성되어야 하며, 최대 9자까지 입력 가능합니다.");
        return false;
    }

    document.getElementById("profile-form").submit(); // 폼 제출
}

