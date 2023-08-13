//스크랩 별 변경하기
function toggleImage(button) {
    const img = button.querySelector("img");
    const src = img.getAttribute("src");
    let name = src.substring(src.lastIndexOf('/')+1, src.length + 1);
    console.log(name);

    if (name === "star_white.png") {
        img.setAttribute("src", "../../../static/image/star_black.png");
    } else if (name === "star_black.png") {
        img.setAttribute("src", "../../../static/image/star_white.png");
    }
}
