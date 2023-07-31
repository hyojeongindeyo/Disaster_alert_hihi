function appearButton(clickedBtn) {
    // 클릭된 이미지 버튼의 인덱스 찾기
    const imageBtns = document.getElementsByClassName('dotButton');
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