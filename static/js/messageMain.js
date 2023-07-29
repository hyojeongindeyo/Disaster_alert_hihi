//스크랩 별 변경하기
function toggleImage(button) {
    const img = button.querySelector("img");
    const src = img.getAttribute("src");

    if (src === "../../../static/image/star_white.png") {
        img.setAttribute("src", "../../../static/image/star_black.png");
    } else if (src === "../../../static/image/star_black.png") {
        img.setAttribute("src", "../../../static/image/star_white.png");
    }
}
