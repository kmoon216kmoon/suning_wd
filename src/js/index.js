$.each(list,function(i,v){
        $('.Classifie-li').append(`<li>
        <img src="${v["mg"]}" alt="">
        <a href="${v["a1"]}">${v["u1"]}</a><em>${v["em1"]}</em>
        <a href="${v["a2"]}">${v["u2"]}</a><em>${v["em2"]}</em>
        <a href="${v["a3"]}">${v["u3"]}</a><em>${v["em3"]}</em>
        <a href="${v["a4"]}">${v["u4"]}</a><em>${v["em4"]}</em>			
    </li>`)
    })
    $.each(hcList,function(i,v){
        $('.hcList-list').append(`<li>
        <a href="" class="hcList-area">
            <p class="hcList-title">${v["name"]}</p>
            <p class="hcList-desc">${v["word"]}</p>
        </a>
        <a href="" class="hcList-img">
            <img src="${v["mg"]}" alt="">
        </a>
    </li>`)
    })
// console.log(leftContent);
$.each(leftcontent,function(i,v){
    $('.left-ul').append(`<li>
    <div class="left-content-label">
        <img src="${v["icon"]}" alt="">
        <p>人气榜</p>
    </div>
    <a href="">
        <img src="${v["mg"]}" alt="">
    </a>
    <a href="">
        <p class="left-content-name">${v["t3"]}</p>
        <p class="left-content-desc">
            <span>
                <img class="left-content-icon" src="https://image5.suning.cn/uimg/cms/img/159525756682624771.png">
                "${v["t2"]}”
            </span>
        </p>
    </a>
</li>`)
})

// console.log(fourUl);
$.each(fourList,function(i,v){
    $('.four-ul').append(`<li>
    <a href="">
        <img src="${v["mg"]}" alt="">
        <p class="four-price">
            <span class="pricebox">
                <i style="font-size: 12px;">￥</i>
                <em>${v["pic"]}</em>
                <span class="four-nums">
                ${v["num"]}
                </span>
            </span>
        </p>
    </a>
</li>`)
})
$.each(contentlist,function(i,v){
    $('.tab-list').append(`<li>
    <a href="${v["a"]}">
        <img src="${v["mg"]}" alt="">
        <p class="tab-title">
            <i class="iconfont"></i>
            ${v["t1"]}
        </p>
        <p class="tab-price-box">
            <span class="tab-price">
                <i>¥</i>
                <em>${v["p1"]}</em>
            </span>
            <span class="tab-refprice">
                <i>¥</i>
                <em>${v["p2"]}</em>
            </span>
        </p>
        <p class="tab-cxIcon">
            <span>${v["z1"]}</span>
            <span>${v["z2"]}</span>
            <span>赠</span>
        </p>
    </a>
</li>`)
})
// console.log(tabList);


// console.log($('.Top-navigation-leftBox li'))
$(function () {
    $('.Top-navigation-leftBox li').mouseover(function () {
        $(this)
            .toggleClass('active')
            .children('ol')
            .slideDown()
        $('.Top-navigation-leftBox ol').mouseover(function () {
            $(this)
                .show()
        })
    })
    $('.Top-navigation-leftBox li').mouseout(function () {
        $(this)
            .removeClass('active')
            .children('ol')
            .hide()
    })
})

// console.log($('.Searchinput'))
$(function () {
    $('.Searchinput').on('input', function () {
        // 根据输入的内容
        var text = $(this).val()
        // 发送jsonp请求
        $.ajax({
                url: "https://ds.suning.com/ds/his/new/7173250798-" + text + "-0-1_0-autoComplateCallback_c8c0758633da7960b1061634bbd62f8d.jsonp?",
                dataType: 'jsonp',
                jsonpCallback: 'autoComplateCallback_c8c0758633da7960b1061634bbd62f8d'
            })
            .then(function (data) {
                // 每次有结果都要先清空ul里面原来的li再进行添加
                $('.Searchul').empty();
                // 根据返回的结果

                $('.Searchul').show()
                // console.log(data.words)
                // 显示在ul里面
                $.each(data.words, function (i, v) {
                    if (i < 15) {
                        $('.Searchul').append('<li>' + v.keyname + '</li>')
                    }

                })
            })
    })
    // $('.Searchinput').val('')
    $('.Searchinput').click(function () {
        $('.Searchinput').val('')
    })
    $('.Searchinput').on('blur', function () {
        $('.Searchul').hide()
        $('.Searchinput').val('请输入搜索关键字')
    })
})
var nav = $(".slider-ctrl .bannerNav-Wapper span")
//装所有按钮的盒子
var wid = $('#slider').innerWidth() //获取盒子宽度
//使用一个变量来记录当前是第几副图
var index = 0
$.extend({
    // 点亮点击按钮
    light: function () {
        for (var i = 0; i < nav.length; i++) {
            nav.eq(i).css('background', '')
            nav[i].index = i
        }
        nav.eq(index).css('background', '#f60')
    },
    prevFn: function () {
        // console.log(this)
        var now = index - 1
        if (now === -1) {
            now = $('.slider-img li').length - 1
        }
        // $('.slider-img li').eq(now).css('left',-wid)
        $('.slider-img li').eq(now).animate({
            // left: 0,
            opacity: 1,
        }, 500, 'linear')
        // console.log($('.slider-img li')[index])
        $('.slider-img li').eq(index).animate({
            opacity: 0,
            // left: 794,
        }, 500, 'linear')
        index = now
        $.light()
    },
    // 5 点击右箭头,看下一张图片,点亮该小圆点
    nextFn: function () {
        var now = index + 1
        if (now === $('.slider-img li').length) {
            now = 0
        }
        // $('.slider-img li').eq(now).css('left',wid)
        $('.slider-img li').eq(now).animate({
            opacity: 1,
            // left: 0
        }, 500, 'linear')
        $('.slider-img li').eq(index).animate({
            opacity: 0,
            // left: -wid
        }, 500, 'linear')
        index = now
        $.light()
    }
})
$.light()
// 1 根据图片数量动态生成小圆点(document.createElement和appendChild)
// 2 点亮第一个小圆点,显示第一幅图
$('.slider-img li').each(function(index,item){
    $('.slider-img li').eq(index).css('left',0)
    $('.slider-img li').eq(index).css("opacity",0)
})
$('.slider-img li').eq(index).css("opacity",1)
// 3 点击小圆点,点亮该小圆点,图片运动到指定图片(箭头和小圆点的事件都委托给sliderCtrl)
$(".slider-ctrl").click(function (e) {
    if (e.target.className === 'prev LeftBtn') {
        $.prevFn()
    }
    if (e.target.className === 'next RightBtn') {
        $.nextFn()
    }
})
$(".slider-ctrl").mouseover(function (e) {
    if (e.target.className.indexOf('cril') > -1) {
        if (e.target.index > index) {
            // $('.slider-img li').eq(e.target.index).css({
            //     left: wid
            // })
            $('.slider-img li').eq(e.target.index).animate({
                // left: 0
                opacity: 1

            }, 500, 'linear')
            $('.slider-img li').eq(index).animate({
                // left: -wid
                opacity: 0,

            }, 500, 'linear')
        }
        if (e.target.index < index) {
            // $('.slider-img li').eq(e.target.index).css({
            //     left: -wid
            // })
            $('.slider-img li').eq(e.target.index).animate({
                // left: 0
                opacity: 1,
            }, 500, 'linear')
            $('.slider-img li').eq(index).animate({
                // left: wid
                opacity: 0,
            }, 500, 'linear')
        }
        index = e.target.index
        $.light()
    }
})
// 4 点击左箭头,看上一张图片,点亮该小圆点
// 8 轮播图可以自动轮播
var timer = setInterval($.nextFn, 4000)
// 6 鼠标移入slider,轮播图停止轮播
$('#slider').mouseenter(function () {
    clearInterval(timer)
    $(".prev").show()
    $(".next").show()
})
// 7 鼠标移除slider,轮播图继续轮播
$('#slider').mouseleave(function () {
    clearInterval(timer)
    timer = setInterval($.nextFn, 2000)
    $(".prev").hide()
    $(".next").hide()
})
var portrait1=$('.left-ul')
var portrait2=$('.four-ul')

$(function(){
    var portraittime1=setInterval(function(){
        var topvalue=parseInt(portrait1.css('top'))
        // console.log(topvalue)
        var interval=topvalue-1
        portrait1.css('top',interval)
        if(interval<-762){
            portrait1.css('top',0)
        }
    },10)
    var portraittime2=setInterval(function(){
        var topvalue=parseInt(portrait2.css('top'))
        var interval=topvalue-1
        portrait2.css('top',interval)
        if(interval<-642){
            portrait2.css('top',0)
        }
    },10)
})
$.extend({
    reduce: function () {
        var date = new Date()
        var now = new Date()
        date.setDate(date.getDate() + 2)
        var target = new Date(date.toLocaleDateString())
        return target - now
    }
})
var timespans=$('.left-title-time').children('span')
$(function(){
    var countdown=setInterval(function(){
        var reduceTime=$.reduce()
    var h=parseInt(reduceTime/36e+5 % 24)
    
    var m=parseInt(reduceTime/6e+4%60)
    var s=parseInt(reduceTime/1000%60)
    if(h<10){
        h="0"+h
    }
    if(m<10){
        m="0"+m
    }
    if(s<10){
        s="0"+s
    }
    timespans.eq(0).html(h)
    timespans.eq(1).html(m)
    timespans.eq(2).html(s)
    },1000)
})

$('.left-title-list li').hover(function(){
    $(this).css({
        background: '#ef0027',
        color:'#fff'
    })
    $(this).siblings().css({
        background: '#fff',
        color: '#ef0027',
    })
    if($(this).index()){
        $('.left-contentlist').eq(0).hide()
        $('.left-contentlist').eq(1).show()
    }else{
        $('.left-contentlist').eq(1).hide()
        $('.left-contentlist').eq(0).show()
    }
})

var leftarea=$('.Classifie-nav')
var midarea=$('.Search-EnginesBox')
var rightarea=$('.telname')
var rightcar=$('.rightcar')
var tab=$('.tab-nav')
console.log(leftarea,midarea,rightarea)
$(function(){
    $(window).scroll(function(){
        if($(window).scrollTop()>=720){
            $('.ng-fix-bar').css('display','block')
            leftarea.addClass('leftfix')
            midarea.addClass('midfix')
            $('.Searchinput').css('width',350)
            $('.Search-EnginesBox-input').css('width',350)
            $('.Search-recommend').css('display','none')
            rightarea.addClass('rightfixone')
            rightcar.addClass('rightfixtwo')
        }else{
            $('.ng-fix-bar').css('display','none')
            leftarea.removeClass('leftfix')
            midarea.removeClass('midfix')
            $('.Searchinput').css('width',380)
            $('.Search-EnginesBox-input').css('width',390)
            rightarea.removeClass('rightfixone')
            rightcar.removeClass('rightfixtwo')
        }
        if($(window).scrollTop()>=3010){
            tab.addClass('tabmove')
        }else{
            tab.removeClass('tabmove')
        }
    })
})

var $telname=location.search.slice(-11).replace(/^(\d{3})\d*(\d{4})$/,'$1****$2')
var tel=location.search.slice(-11)
if($telname){
    $('.telname').empty().append("<a>"+$telname+"</a>")
}
console.log(tel)
$('.tab-list').children().eq(0).on('click',function(){
    location.href="http://localhost/src/pages/Item.html?name="+tel
})
console.log($('.tab-list').children().eq(0))