$.extend({
    reduce: function () {
        var date = new Date()
        var now = new Date()
        date.setDate(date.getDate() + 3)
        var target = new Date(date.toLocaleDateString())
        return target - now
    }
})
$(function () {
    countdown = setInterval(function () {
        var reduceTime = $.reduce()
        var d = parseInt(reduceTime / 36e+5 / 24)
        var h = parseInt(reduceTime / 36e+5 % 24)

        var m = parseInt(reduceTime / 6e+4 % 60)
        var s = parseFloat(reduceTime / 1000 % 60).toFixed(1)
        if (d < 10) {
            d = "0" + d
        }
        if (h < 10) {
            h = "0" + h
        }
        if (m < 10) {
            m = "0" + m
        }
        if (s < 10) {
            s = "0" + s
        }
        $('.mstime').children('em').eq(0).html(d)
        $('.mstime').children('em').eq(1).html(h)
        $('.mstime').children('em').eq(2).html(m)
        $('.mstime').children('em').eq(3).html(s)
    }, 100)
})
console.log($('.itemul li').siblings().children());
$(function () {
    var index
    $('.letbutton').on({
        'click': function (e) {
            e.preventDefault()
            index = $('.buynumber').val()
            if (index > 1) {
                $('.buynumber').val(index - 1)
            }
        }
    })
    $('.rigbutton').on({
        'click': function (e) {
            e.preventDefault()
            index = $('.buynumber').val()
            $('.buynumber').val(parseInt(index) + 1)

        }
    })
})
$('.interval-right').on('click', function (e) {
    e.preventDefault()
    $('.phonelist').animate({
        left: -60,
    }, 250, 'linear')
    $(this).css('background-position', '0 -1028px')
    $('.interval-left').css('background-position', '-904px -826px')
})
$('.interval-left').on('click', function (e) {
    e.preventDefault()
    $('.phonelist').animate({
        left: 0,
    }, 250, 'linear')
    $(this).css('background-position', '-903px -656px')
    $('.interval-right').css('background-position', '-1042px -472px')
})
var index = 1
console.log(imglist[0]["as" + index])


$(function () {
    $('.titname').text(imglist[0]["h"])
    $('.bigprice').append(`<i>￥</i><span  style="font-size: 30px;"class="bigsize">${imglist[0]["p"]}</span> <span>.00</span>`)
    $('.itemul li').on({
        'click': function (e) {
            $(this).children().children('i').addClass('dui').parents('li').siblings().children().children('i').removeClass('dui')
            $(this).children().addClass('xxk')
            $(this).siblings().children().removeClass('xxk')
            $('.bigprice').empty().append(`<i>￥</i><span  style="font-size: 30px;"class="bigsize">${imglist[$(this).index()]["p"]}</span><span>.00</span>`)
            $('.aimg').empty().append(`<img src="${imglist[$(this).index()]["as0"]}"
            // alt="" class="smbox">`)
            $('.titname').empty().text(imglist[$(this).index()]["h"])
            $('.loupe-bigbox').empty().append(`<img src="${imglist[$(this).index()]["as0"]}"
            // alt="">`)
            $('.phonelist').children().empty()
            e.currentTarget.index = $(this).index()
            $('.itemul li').attr('index', $(this).index())
            $('.phonelist').children().each(function (index, item) {
                $('.phonelist').children().eq(index).append(`<img src="${imglist[e.currentTarget.index]["as"+index]}"
                alt="">`)
            })
        },
    })
    $('.aimg').append(`<img src="${imglist[0]["as0"]}"
alt="" class="smbox">`)
    $('.loupe-bigbox').append(`<img src="${imglist[0]["as0"]}"
alt="">`)
    console.log($('.smbox'));
    $('.aimg').mouseenter(function (e) {
        $('.loupe-box-shot').show()
        $('.loupe-bigbox').show()
    }).mouseout(function () {
        $('.loupe-box-shot').hide()
        $('.loupe-bigbox').hide()
    }).mousemove(function(e){
        var le=e.pageX-$(this).offset().left-100
        var to=e.pageY-$(this).offset().top-100
        
        console.log($(this))
        if(le<0){
            le=0
        }
        if(to<0){
            to=0
        }
        if(to>200){
            to=200
        }
        if(le>200){
            le=200
        }
        $('.loupe-box-shot').css({
            left:le,
            top:to,
        })
        $('.loupe-bigbox').children().css({
            left:-2*le,
            top:-2*to
        })
        console.log($('.loupe-bigbox').children());
    })
    $('.phonelist').children().on('click', function () {
        $(this).addClass('xxk').siblings().removeClass('xxk')
        $('.aimg').empty()
        $('.loupe-bigbox').empty()
        $('.itemul li').attr('index')
        if (!imglist[$('.itemul li').attr('index')]) {
            $('.aimg').append(`<img src="${imglist[0]["as"+$(this).attr('index')]}"alt="" class="smbox">`)
            $('.loupe-bigbox').append(`<img src="${imglist[0]["as"+$(this).attr('index')]}"alt="">`)
        } else {
            $('.aimg').append(`<img src="${imglist[$('.itemul li').attr('index')]["as"+$(this).attr('index')]}"
        alt="" class="smbox">`)
            $('.loupe-bigbox').append(`<img src="${imglist[$('.itemul li').attr('index')]["as"+$(this).attr('index')]}"
        alt="">`)
        }
        console.log($('.aimg').children());
    })
})


var $telname=location.search.slice(-11).replace(/^(\d{3})\d*(\d{4})$/,'$1****$2')
var tel=location.search.slice(-11)
$('.jrcar').on('click', function () {
    $.ajax({
        url: "http://localhost/src/php/jiaru.php",
        type: "POST",
        data: {
            "name": $('.titname').text(),
            "num": $('.buynumber').val(),
            "price": $('.bigsize').text(),
            "img": $('.aimg').children('img').attr('src'),
            "tel": tel,
            "gg": $('.xxk').eq(1).children('span').text(),
        },
        // dataType:"json",
        success: function (res) {
            console.log(res)
            alert('加入购物车成功')
        },
        cache: false,
    })
    
})
if($telname){
    $('.name').empty().text($telname)
}
$('.gwc').on('click',function(){
    location.href="http://localhost/src/pages/car.html?name="+tel
})

$('.ljgm').click(function(){
    alert('没钱，没钱，你没钱')
})