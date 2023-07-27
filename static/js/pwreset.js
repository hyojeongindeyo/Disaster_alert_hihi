function validateForm() {
    const password = document.getElementById("password").value;
    const passwordReset = document.getElementById("password-reset").value;
  
    // 비밀번호 형식을 검증하는 정규표현식 (영어와 숫자만 허용, 8~12자)
    const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,12}$/;
  
    if (!password || !passwordReset) {
      alert("모든 필드를 입력해주세요.");
      return false;
    }
  
    if (!passwordPattern.test(password) || !passwordPattern.test(passwordReset)) {
      alert("비밀번호는 8~12글자 사이이며, 영어와 숫자만 사용할 수 있습니다.");
      return false;
    }
  
    if (password !== passwordReset) {
      alert("비밀번호와 비밀번호 재확인이 일치하지 않습니다.");
      return false;
    }
  
    return true;
  }
  