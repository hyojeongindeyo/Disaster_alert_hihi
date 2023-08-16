const slideContainers = document.querySelectorAll('.slide-container');
slideContainers.forEach((container) => {
    const slide = container.querySelector('.slide');
    const prevBtn = container.querySelector('.prev-btn');
    const nextBtn = container.querySelector('.next-btn');
    let currentSlide = 0; // 이미지 인덱스는 0부터 시작
    const slides = slide.querySelectorAll('li');
    const btnWidth = prevBtn.offsetWidth; // 버튼의 너비
    const slideCount = slides.length;

    // 각 항목의 너비와 margin 값의 합을 슬라이드 컨테이너의 너비로 설정
    const slideWidth = slides[0].offsetWidth + 37; // 한 항목의 너비와 margin 값의 합
    const containerWidth = slideWidth * slideCount;
    slide.style.width = `${containerWidth}px`;

    // 첫 번째 이미지 보여주기
    showSlide(currentSlide);

    // 다음 버튼 클릭 이벤트
    nextBtn.addEventListener('click', next);
    function next() {
        currentSlide++;
        if (currentSlide >= slideCount) {
            currentSlide = 0; // 이미지 인덱스가 마지막 이미지 인덱스를 넘어가면 처음 이미지로
        }
        showSlide(currentSlide);
    }

    // 이전 버튼 클릭 이벤트
    prevBtn.addEventListener('click', prev);
    function prev() {
        currentSlide--;
        if (currentSlide < 0) {
            currentSlide = slideCount - 1; // 이미지 인덱스가 0 미만이면 마지막 이미지로
        }
        showSlide(currentSlide);
    }

    // 이미지 보여주는 함수
    function showSlide(index) {
        const offset = -index * slideWidth;
        slide.style.transform = `translateX(${offset}px)`;
    }
});