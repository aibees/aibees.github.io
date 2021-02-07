var access = function(menuid, pwd) {
    window.open('./login', '_blank', 'width=400px,height=280px,top=350px,left=800px,scrollbars=no,location=no');
}

var articleAccess = function(title) {
    var now = new Date();
    var data = JSON.stringify({
        title: title,
        ip : ip()
    })
    sendAjax('POST', 'http://101.101.219.206:5000/blog/postlog', data);
}
/**********************
***  ajax function  ***
***********************/

var sendAjax = function(type, url, data) {
    $.ajax({
        type: type, // get / post / put
        url: url,
        async: true,
        headers : {
            "Content-Type" : "application/json"
        },
        dataType: 'json',
        data: data,

        success : function(ret) {
            
        },
        error : function(request, status, error) {
            alert(error)
        }
    })
}
