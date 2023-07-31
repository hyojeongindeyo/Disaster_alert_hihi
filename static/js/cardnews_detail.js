 // 캐러셀 기능
 const slideContainers = document.querySelectorAll('.slide-container');
 slideContainers.forEach((container) => {
     const slide = container.querySelector('.slide');
     const prevBtn = container.querySelector('.prev-btn');
     const nextBtn = container.querySelector('.next-btn');
     let currentSlide = 0; // 이미지 인덱스는 0부터 시작
     const slides = slide.querySelectorAll('li');
 
     // 첫 번째 이미지 보여주기
     showSlide(currentSlide);
 
     // 다음 버튼 클릭 이벤트
     nextBtn.addEventListener('click', next);
     function next() {
         currentSlide++;
         if (currentSlide >= slides.length) {
             currentSlide = 0; // 이미지 인덱스가 마지막 이미지 인덱스를 넘어가면 처음 이미지로 
         }
         showSlide(currentSlide);
     }
 
     // 이전 버튼 클릭 이벤트
     prevBtn.addEventListener('click', prev);
     function prev() {
         currentSlide--;
         if (currentSlide < 0) {
             currentSlide = slides.length - 1; // 이미지 인덱스가 0 미만이면 마지막 이미지로 
         }
         showSlide(currentSlide);
     }
 
     // 이미지 보여주는 함수
     function showSlide(index) {
         slides.forEach((slide, i) => {
             if (i === index) {
                 slide.style.display = 'block'; // 현재 이미지를 보여줌
             } else {
                 slide.style.display = 'none'; // 다른 이미지들은 숨김
             }
         });
     }
 });