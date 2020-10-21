$('.list-main').css('display', 'none')
var $telname = location.search.slice(-11).replace(/^(\d{3})\d*(\d{4})$/, '$1****$2')
var tel = telname = location.search.slice(-11)
show()

function show() {
    $.ajax({
        url: "http://localhost/src/php/select.php",
        data: {
            "tel": tel,
        },
        type: "POST",
        success: function (res) {
            var json = $.parseJSON(res)
            var count = $.parseJSON(res).length
            console.log(json);
            if(count==0){
                $('#car').hide()
                $('.kkry').show
            console.log(count)
            }else{
                $('#car').show
                $('.kkry').hide()
            }
            for (var i = 0; i < count; i++) {
                $('.pritwo').eq(i).empty()
                $('.prione').eq(i).empty()
                $('.specs-line').eq(i).empty()
                $('.list-main').eq(i).css('display', 'block')
                $('.item-img-box').eq(i).append(`<img src="${json[i][2]}" alt="">`)
                $('.item-info').eq(i).empty().append(`<a href="" class="item-name">${json[i][1]}
                </a>`)
                $('.specs-line').eq(i).append(`<p>${json[i][6]}
                </p>`)
                $('.buynumber').eq(i).val(json[i][4])
                $('.prione').eq(i).append(`<i>￥</i><em>${json[i][3]}
                </em>`)
                $('.pritwo').eq(i).append(`<i>¥</i><em>${json[i][3]*parseInt(json[i][4])}
                </em>`)
                $('.pritwo').children('em').text()
                $('.name').text(json[i][7])

            }


        },
        cache: false,
    })
}
console.log($('.name'));
$(function () {
    $('.checkbtnone').on('click', function () {
        var pos = $('.checkbtnone').css('background-position')
        console.log(pos == "0px -20px")
        if (pos == "0px -20px") {
            $(this).css('background-position', '0 -36px')
            $('.checkbtntwo').css('background-position', '0 -36px')
            $('.checkbtnthree').css('background-position', '0 -36px')
            $('.list-main').css('background-color', '#fffbf2')
            var totl = $('.pritwo').children("em").length
            var single = parseInt($('.pritwo').children("em").text())
            var sum = 0
            for (var i = 0; i < totl; i++) {
                var single = parseInt($('.pritwo').children("em").eq(i).text())
                sum = sum + single
            }
            $('.totalprice').empty().append(`<i>¥</i><em>${sum}</em>`)
            $('.numpri').empty().text(totl)
        } else {
            $(this).css('background-position', '0 -20px')
            $('.checkbtntwo').css('background-position', '0 -20px')
            $('.checkbtnthree').css('background-position', '0 -20px')
            $('.list-main').css('background-color', '#ffffff')
            $('.totalprice').empty().append(`<i>¥</i><em>0</em>`)
        }
        show()
    })
})
$(function () {
    var index
    var name
    var pri = $('.prione em').text()
    $('.letbutton').on({
        'click': function (e) {
            e.preventDefault()
            index = e.target.nextElementSibling.value
            name = e.target.parentElement.parentElement.parentElement.children[1].children[1].children[0].innerText
            if (index > 1) {
                $.ajax({
                    url: "http://localhost/src/php/add.php",
                    type: "POST",
                    data: {
                        "type": "jian",
                        "name": name,
                        "tel": tel,
                    },
                    success: function (res) {
                        show()
                        console.log(res)
                    },
                    dataType: "json",
                    cache: false,
                })
                e.target.nextElementSibling.value = index - 1
            }

        }
    })
    $('.rigbutton').on({
        'click': function (e) {
            e.preventDefault()
            console.log($(e.target).parents('.td-amount').siblings('.list-item').children('.item-info').children('.item-name').text());
            name = e.target.parentElement.parentElement.parentElement.children[1].children[1].children[0].innerText
            index = e.target.previousElementSibling.value
            $.ajax({
                url: "http://localhost/src/php/add.php",
                type: "POST",
                data: {
                    "type": "add",
                    "name": name,
                    "tel": tel,
                },
                success: function (res) {
                    console.log(res)
                    show()
                },
                cache: false,
            })
            e.target.previousElementSibling.value = parseInt(index) + 1
        }
    })
})


console.log($('.letbutton'))
console.log(tel, name)
$('.remove-item').on('click', function (e) {
    var name = e.target.parentElement.parentElement.children[1].children[1].children[0].innerText
    var list=e.target.parentElement.parentElement
    $(e.target).parents('.list-main').hide()
    $.ajax({
        url: "http://localhost/src/php/del.php",
        type: "POST",
        data: {
            "name": name,
            "tel": tel,
        },
        success: function (res) {
            show()
            location.reload();
        }
    })
})
var priarr=[]
$('.checkbtnthree').click(function(e){
    var singlepri=parseInt($(e.target).parents('.td-check').siblings('.td-sum').children('.pritwo').children('em').text())
    var pos = $(e.target).css('background-position')
        if (pos == "0px -20px") {
            $(e.target).css('background-position','0px -36px')
            var sinsum=0
            priarr.push(singlepri)
            $.each(priarr,function(i,v){
                sinsum+=v
            })
            $('.totalprice').children('em').empty().text(sinsum)
        }else{
            var index=priarr.indexOf(singlepri)
            priarr.splice(index,1)
            var sinsum=0
            $(e.target).css('background-position','0px -20px')
            $.each(priarr,function(i,v){
                sinsum+=v
            })
            $('.totalprice').children('em').text(sinsum)
        }
        console.log(priarr);
        show()
})
$('.remove-item').mouseover(function(e){
    $(this).css('color','#f60')
}).mouseleave(function(){
    $(this).css('color','#666')
})
$('.jiesuanbtn').click(function(){
    alert("看什么看，没钱想屁吃呢！！！！")
})