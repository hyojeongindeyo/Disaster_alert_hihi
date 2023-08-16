const slideContainers = document.querySelectorAll('.slide-container');
slideContainers.forEach((container) => {
    const slide = container.querySelector('.slide');
    const prevBtn = container.querySelector('.prev-btn');
    const nextBtn = container.querySelector('.next-btn');
    let currentSlide = 0; // 이미지 인덱스는 0부터 시작
    const slides = slide.querySelectorAll('li');
    const btnWidth = prevBtn.offsetWidth; //버튼의 너비
    const slideCount = slides.length;
    const slideWidth = slides[0].offsetWidth + 37.5; // 한 항목의 너비와 margin 값의 합
    const containerWidth = slideWidth * slideCount;
    slide.style.width = `${containerWidth}px`;

    // 첫 번째 이미지 보여주기
    showSlide(currentSlide);

    // 다음 슬라이드로 자동으로 넘어가는 함수
    function autoNext() {
        currentSlide++;
        if (currentSlide >= slideCount) {
            currentSlide = 0; // 이미지 인덱스가 마지막 이미지 인덱스를 넘어가면 처음 이미지로
        }
        showSlide(currentSlide);
    }

    // 자동으로 다음 슬라이드로 넘어가는 간격 (밀리초 단위, 예: 3000밀리초 = 3초)
    const autoSlideInterval = 3000;
    let autoSlideTimer = setInterval(autoNext, autoSlideInterval);

    // 슬라이드 컨테이너에 마우스가 올라갔을 때 자동 넘김을 일시 중지
    container.addEventListener('mouseenter', () => {
        clearInterval(autoSlideTimer);
    });

    // 슬라이드 컨테이너에서 마우스가 벗어났을 때 자동 넘김 다시 시작
    container.addEventListener('mouseleave', () => {
        autoSlideTimer = setInterval(autoNext, autoSlideInterval);
    });

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