// 검색
function filter() {
    let search = document.getElementById("search").value.toLowerCase();
    let listInner = document.getElementsByClassName("listInner");

    for (let i = 0; i < listInner.length; i++) {
        hashtag = listInner[i].getElementsByClassName("hashtag");
        title = listInner[i].getElementsByClassName("title");
        if (hashtag[0].innerHTML.toLowerCase().indexOf(search) != -1 ||
        title[0].innerHTML.toLowerCase().indexOf(search) != -1
        ) {
            listInner[i].style.display = "flex"
        } else {
            listInner[i].style.display = "none"
        }
    }
}

// country -> menual_text -> text -> title
// city -> hashtag -> hashtag