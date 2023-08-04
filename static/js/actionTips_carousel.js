$(document).ready(function() {
    // Move to the previous slide when the left side of the current image is clicked
    $(".slide img").on("click", function(e) {
        var slideContainer = $(".slide-container");
        var slideWidth = slideContainer.width();
        var currentSlideIndex = Math.round(slideContainer.scrollLeft() / slideWidth);
        var clickedPosition = e.pageX - slideContainer.offset().left;
        
        if (clickedPosition <= slideWidth / 2) {
            var prevSlideIndex = currentSlideIndex - 1;
            if (prevSlideIndex < 0) {
                prevSlideIndex = $(".slide li").length - 1;
            }
            slideContainer.animate({ scrollLeft: prevSlideIndex * slideWidth }, 500);
        } else {
            var nextSlideIndex = currentSlideIndex + 1;
            if (nextSlideIndex >= $(".slide li").length) {
                nextSlideIndex = 0;
            }
            slideContainer.animate({ scrollLeft: nextSlideIndex * slideWidth }, 500);
        }
    });

    // Move to the previous slide when 'prev' button is clicked
    $(".prev-btn").click(function() {
        var slideContainer = $(".slide-container");
        var slideWidth = slideContainer.width();
        var currentSlideIndex = Math.round(slideContainer.scrollLeft() / slideWidth);
        var prevSlideIndex = currentSlideIndex - 1;

        if (prevSlideIndex < 0) {
            prevSlideIndex = $(".slide li").length - 1;
        }
        slideContainer.animate({ scrollLeft: prevSlideIndex * slideWidth }, 500);
    });

    // Move to the next slide when 'next' button is clicked
    $(".next-btn").click(function() {
        var slideContainer = $(".slide-container");
        var slideWidth = slideContainer.width();
        var currentSlideIndex = Math.round(slideContainer.scrollLeft() / slideWidth);
        var nextSlideIndex = currentSlideIndex + 1;

        if (nextSlideIndex >= $(".slide li").length) {
            nextSlideIndex = 0;
        }
        slideContainer.animate({ scrollLeft: nextSlideIndex * slideWidth }, 500);
    });
});