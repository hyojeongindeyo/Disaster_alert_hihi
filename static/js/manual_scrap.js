// 스크랩 버튼 클릭 시 별 아이콘을 토글하는 함수
function toggleStar() {
    const scrapButton = document.querySelector('.scrap-button');
    scrapButton.classList.toggle('active');
    document.getElementById('scrap_form').submit();
    console.log('hi')
}
  
// 캐러셀 기능
const slideContainers = document.querySelectorAll('.slide-container');
slideContainers.forEach((container) => {
  const slide = container.querySelector('.slide');
  const prevBtn = container.querySelector('.prev-btn');
  const nextBtn = container.querySelector('.next-btn');
  let currentSlide = 1;
  const slideWidth = 340; // 이미지의 가로 크기
  const slideCount = slide.querySelectorAll('li').length;
  const slideStep = slideWidth; // 한 번에 슬라이드할 거리

  // 다음 버튼 클릭 이벤트
  nextBtn.addEventListener('click', next);
  function next() {
      currentSlide++;
      if (currentSlide > slideCount) {
          currentSlide = 1;
      }
      slide.style.transform = `translateX(-${slideStep * (currentSlide - 1)}px)`;
  }

  // 이전 버튼 클릭 이벤트
  prevBtn.addEventListener('click', prev);
  function prev() {
      currentSlide--;
      if (currentSlide < 1) {
          currentSlide = slideCount;
      }
      slide.style.transform = `translateX(-${slideStep * (currentSlide - 1)}px)`;
  }
});
  
  
  
  