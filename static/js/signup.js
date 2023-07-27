function checkPassword() {
    var pass = document.getElementById("password").value;
    var pass2 = document.getElementById("password-confirm").value;
    // document.getElementByID 를 사용해서 password가 ID인 값, password-confirm가 ID인 값을 가져와 각각 pass,pass2에 저장

    // 비밀번호가 있는지 확인
    if (!checkExistData(pass, "비밀번호를"))
        return false;

    // 비밀번호 확인이 있는지 확인
    if (!checkExistData(pass2, "비밀번호 확인을"))
        return false;

    var password1RegExp = /^[a-zA-Z0-9]{8,12}$/;
    // 영어 대소문자와 숫자, 최소 8자 ~최대 12자 

   
    if (!password1RegExp.test(pass)) {
        alert("비밀번호는 영문 대소문자와 숫자 8~12자리로 입력해야합니다");
        document.getElementById("password").value = "";
        document.getElementById("password-confirm").value = "";
        document.getElementById("password").focus();
        return false;
    }
    // 비밀번호가 정규식의 값? 조건과 맞는지 확인

    // 비밀번호와 비밀번호 확인이 같은값인지 확인
    if (pass !== pass2) {
        alert("비밀번호가 같은지 확인해주세요.");
        document.getElementById("password").value = "";
        document.getElementById("password-confirm").value = "";
        document.getElementById("password-confirm").focus();
        return false;
    }

    return true; // 확인이 완료되었을 때
}

// 데이터가 비어있다면 > message + 입력해주세요
function checkExistData(data, message) {
    if (data === "") {
        alert(message + " 입력해주세요.");
        return false;
    }
    return true;
}

// 닉네임 확인 함수
function validateForm() {
    var nickname = document.getElementById("nickname").value;
    
    if (!checkExistData(nickname, "닉네임을")) {
        return false;
    }
    
    var nicknameRegExp = /^[a-zA-Z0-9ㄱ-ㅎㅏ-ㅣ가-힣]{1,8}$/;
    
    if (!nicknameRegExp.test(nickname)) {
        alert("닉네임에 특수문자는 들어갈 수 없습니다.");
        document.getElementById("nickname").value = "";
        document.getElementById("nickname").focus();
        return false;
    }
    
    return true;
}

function checkExistData(data, message) {
    if (data === "") {
        alert(message + " 입력해주세요.");
        return false;
    }
    return true;
}
