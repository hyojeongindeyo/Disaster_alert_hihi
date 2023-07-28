function checkPassword() {
  const passwordInput = document.getElementById("password");
  const passwordValue = passwordInput.value;

  const passwordRegex = /^[A-Za-z0-9]{8,12}$/;

  if (!passwordRegex.test(passwordValue)) {
    alert(
      "비밀번호는 영어와 숫자만 포함하여 8~12자여야 합니다. 특수문자는 사용할 수 없습니다."
    );
    passwordInput.focus();
    return false; // 폼 제출을 막습니다.
  }

  return true; // 폼 제출을 허용합니다.
}
