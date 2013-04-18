function loadArticle(){
    var link = localStorage.link;
    $("#article").attr("src", link);
    console.log("LOADED ARTICLE"+link);
}

loadArticle();