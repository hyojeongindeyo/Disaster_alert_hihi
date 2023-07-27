function validatePhoneNumber() {
  // 전화번호 입력 필드 값 가져오기
  const phoneNumber1 = document.getElementById("phone-number1").value;
  const phoneNumber2 = document.getElementById("phone-number2").value;
  const phoneNumber3 = document.getElementById("phone-number3").value;

  // 전화번호가 모두 입력되었는지 확인
  if (!phoneNumber1 || !phoneNumber2 || !phoneNumber3) {
    alert("전화번호를 모두 입력해주세요.");
    return false;
  }

  // 전화번호가 숫자로만 이루어져 있는지 확인
  const phoneNumberRegExp = /^[0-9]+$/;
  if (
    !phoneNumberRegExp.test(phoneNumber1) ||
    !phoneNumberRegExp.test(phoneNumber2) ||
    !phoneNumberRegExp.test(phoneNumber3)
  ) {
    alert("전화번호는 숫자로만 입력해주세요.");
    return false;
  }

  // 전화번호가 각각 3자리, 4자리로 입력되었는지 확인
  if (
    phoneNumber1.length !== 3 ||
    phoneNumber2.length !== 4 ||
    phoneNumber3.length !== 4
  ) {
    alert("전화번호를 올바른 형식으로 입력해주세요.");
    return false;
  }

  // 모든 유효성 검사 통과
  return true;
}

function validateForm() {
  // 전화번호 유효성 검사 호출
  if (!validatePhoneNumber()) {
    return false;
  }

  return true;
}
