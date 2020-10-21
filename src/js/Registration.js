var $inputtext = Array.from($('input:not([name=sex])').slice(0, -1))
var $submit = $('input[name=submit]')
var $set = new Set()
var tel = $('#tel')
var word = $('#password')
var email = $('#email')
var area = $('#area')
$.extend({
    sumbitHolder: function (e) {
        console.log(tel.val())
        e.preventDefault()
        if ($set.size >= $inputtext.length) {
            $.ajax({
                url: "http://localhost:8080/reg",
                type: "post",
                data: {
                    "tel": tel.val(),
                    "password": word.val(),
                    "area": area.val(),
                    "email": email.val()
                },
                success: function (res) {
                    if (res) {
                        window.location.href = "http://localhost:8080/pages/LoginPage.html"
                        alert('注册成功')
                        
                    } else {
                        e.preventDefault()
                    }
                },

            })
        }
    },
    inputHolder: function (e) {
        var input = e.target;
        if (input.name === "age" || input.name === "tel") {
            input.value = input.value.replace(/\D/g, "");
        }
        if (!$inputtext.includes(input)) return;
        if (input.ids) return;
        input.ids = setTimeout(function () {
            input.ids = undefined;
            $.judge(input)

        }, 500)
    },
    zengz: function (input) {
        switch (input.name) {
            case 'tel':
                return /^[1](3|5|7|8|9)\d{9}$/.test(input.value);
            case 'password':
                return /^(?=\D+\d)(?=.*[a-z])(?=.*[A-Z])\w{8,16}$/.test(input.value);
            case 'okpassword':
                return $('input').eq(3).val() === input.value;
            case 'email':
                return /^\w+\@(163|qq|sina)\.(com|cn|net)$/.test(input.value);
        }
    },
    judge: function (input) {
        if ($.zengz(input)) {
            input.parentNode.className = "success";
            var bother = input.parentNode.parentNode.parentNode.nextElementSibling
            bother.style.display = 'none'
            $set.add(input.name)
        } else {
            var bother = input.parentNode.parentNode.parentNode.nextElementSibling
            bother.style.display = 'block'
            input.parentNode.className = "error";
            switch (input.name) {
                case 'tel':
                    return bother.innerText = '请输入11位电话号码';
                case 'password':
                    return bother.innerText = '请输入包含8-16位数字、字母、符号的正确密码';
                case 'okpassword':
                    return bother.innerText = '两次密码输入不一致';
                case 'email':
                    return bother.innerText = '请输入正确的邮箱';
            }
            if ($set.has(input.name)) {
                $set.detlete(input.name)
            }
        }
    }

})

$('form').on('click', 'input[name=submit]', $.sumbitHolder)
$('form').on('input', 'input:not([name=sumbit])', $.inputHolder)