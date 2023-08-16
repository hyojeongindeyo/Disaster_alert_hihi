// 첫 번째 캐러셀
const firstCarouselContainer = document.querySelector('.tab_cardnews_box_main');

if (firstCarouselContainer) {
    const firstSlide = firstCarouselContainer.querySelector('.slide');
    const firstPrevBtn = firstCarouselContainer.querySelector('.prev-btn');
    const firstNextBtn = firstCarouselContainer.querySelector('.next-btn');
    let firstCurrentSlide = 0;
    const firstSlides = firstSlide.querySelectorAll('li');
    const firstSlideWidth = firstSlide.clientWidth;

    firstPrevBtn.addEventListener('click', () => {
        firstCurrentSlide--;
        if (firstCurrentSlide < 0) {
            firstCurrentSlide = firstSlides.length - 1;
        }
        firstSlide.style.transform = `translateX(-${firstCurrentSlide * firstSlideWidth}px)`;
    });

    firstNextBtn.addEventListener('click', () => {
        firstCurrentSlide++;
        if (firstCurrentSlide >= firstSlides.length) {
            firstCurrentSlide = 0;
        }
        firstSlide.style.transform = `translateX(-${firstCurrentSlide * firstSlideWidth}px)`;
    });
}

// 두 번째 캐러셀
const secondCarouselContainer = document.querySelector('.tab_menual_container');

if (secondCarouselContainer) {
    const secondSlide = secondCarouselContainer.querySelector('.slide');
    const secondPrevBtn = secondCarouselContainer.querySelector('.prev-btn');
    const secondNextBtn = secondCarouselContainer.querySelector('.next-btn');
    let secondCurrentSlide = 0;
    const secondSlides = secondSlide.querySelectorAll('li');
    const secondSlideWidth = secondSlide.clientWidth;

    secondPrevBtn.addEventListener('click', () => {
        secondCurrentSlide--;
        if (secondCurrentSlide < 0) {
            secondCurrentSlide = secondSlides.length - 1;
        }
        secondSlide.style.transform = `translateX(-${secondCurrentSlide * secondSlideWidth}px)`;
    });

    secondNextBtn.addEventListener('click', () => {
        secondCurrentSlide++;
        if (secondCurrentSlide >= secondSlides.length) {
            secondCurrentSlide = 0;
        }
        secondSlide.style.transform = `translateX(-${secondCurrentSlide * secondSlideWidth}px)`;
    });
}
