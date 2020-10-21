var tel=$("#tel")
var password=$("#password")
$.submitHeader=function(e){
        e.preventDefault()
        console.log(tel.val(),password.val());
        $.ajax({
            url:'http://localhost:8080/login',
            type:"post",
            data:{
                "tel":tel.val(),
                "password":password.val()
            },
            success:function(res){
                var json=$.parseJSON(res)
                console.log(json.code)
                console.log(res)
                if(json.code){
                    window.location.href="http://localhost/src/pages/index.html?name="+json.tel
                    console.log(json.tel)
                    alert('登录成功')
                }
                else{
                    e.preventDefault()
                }
            }
        })
    }
$('.Login-form-usersBox').on('click','input[name=submit]',$.submitHeader)
