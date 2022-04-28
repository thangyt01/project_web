function getBlogs(name) {
    var blogsArr = document.cookie.split(";");

    for(var i = 0; i < blogsArr.length; i++){
        var blogsPair = blogsArr[i].split("=");

        if(name == blogsPair[0].trim()){
            return decodeURIComponent(blogsPair[1]);
        }
    }

    return null;
}

function addBlog(){
    var data = document.myform.textarea.value;

    if(data == ""){
        return false;
    } else {
        var oldBlogs = getBlogs("blog");
        var blogsValue = "";
        if(oldBlogs != null){
            blogsValue = encodeURIComponent(oldBlogs + " " + data);
        } else {
            blogsValue = encodeURIComponent(data);
        }
        var maxAge = "; max-age=" + 1*24*60*60 + ";"; 
        document.cookie = "blog=" + blogsValue + maxAge;
        document.myform.textarea.value = "";
    }
}

function loadBlog(){
    var allBlog = getBlogs("blog");
    let start = 0;
    let stop = allBlog.length;
    let i = 0;
    while (true) {
        for(i = start; i < stop; i++){
            if (allBlog[i] == " ") {
                break;
            }
        }
        var tmpBlog = allBlog.substring(start, i);
        document.writeln(tmpBlog + "<br />");
        start = i+1;
        if (start >= stop) {
            break;
        }
    }
}