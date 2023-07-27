function validateForm() {
  const password = document.getElementById("password").value;
  const newPassword = document.getElementById("new-password").value;
  const passwordCheck = document.getElementById("password-check").value;

  // 비밀번호 형식을 검증하는 정규표현식
  const passwordPattern =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,12}$/;

  // 어떤 필드라도 비어 있는지 확인합니다.
  if (!password || !newPassword || !passwordCheck) {
    alert("모든 필드를 입력해주세요.");
    return false;
  }

  // 비밀번호 형식이 유효한지 확인합니다.
  if (!passwordPattern.test(password) || !passwordPattern.test(newPassword)) {
    alert("비밀번호는 8~12글자 사이이며, 영어와 숫자만 사용할 수 있습니다.");
    return false;
  }

  // 새 비밀번호와 비밀번호 재확인이 일치하는지 확인합니다.
  if (newPassword !== passwordCheck) {
    alert("새 비밀번호와 비밀번호 재확인이 일치하지 않습니다.");
    return false;
  }

  return true;
}

function togglePasswordVisibility(inputId) {
  const inputElement = document.getElementById(inputId);
  if (inputElement.type === "password") {
    inputElement.type = "text";
  } else {
    inputElement.type = "password";
  }
}
