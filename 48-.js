const fs = require("fs")

fs.readFile('./css.txt', 'utf-8', (error, data) => {
    console.log(data)

})

<!--pages/test3/test3.wxml-->
<view class="mask">
    <view class="container">
        <image class="fudai_close" src=".site/public/luckyBag/fudai_close@2x.png"></image>
        <image class="openBag" src=".site/public/luckyBag/openBag@2x.png"></image>
        <image class="privilegeCard" src=".site/public/luckyBag/choujiangcard@2x.png"></image>
        <image class="kou" src=".site/public/luckyBag/kou@2x.png"></image>
        <image class="decorate" src=".site/public/luckyBag/decorate@2x.png"></image>
        <image class="light" src=".site/public/luckyBag/light@2x.png"></image>
        <image class="cloudone" src=".site/public/luckyBag/cloudone@2x.png"></image>
        <image class="cloudtwo" src=".site/public/luckyBag/cloudtwo@2x.png"></image>
        <image class="cloudthree" src=".site/public/luckyBag/cloudthree@2x.png"></image>
        <image class="luckyTip" src=".site/public/luckyBag/luckyTip@2x.png"></image>
        <image class="button" src=".site/public/luckyBag/button@2x.png"></image>
        <image class="close_white" src=".site/public/luckyBag/close_white56@2x.png"></image>
    </view>
</view>

let io = new IntersectionObserver(function(res){
    /**
     * res是目标元素的信息,具体说下本次讲解的
     * time：可见性发生变化的时间，是一个高精度时间戳，单位为毫秒
     * target：被观察的目标元素，是一个 DOM 节点对象
     * rootBounds：根元素的矩形区域的信息，getBoundingClientRect()方法的返回值，如果没有根元素（即直接相对于视口滚动），则返回null
     * boundingClientRect：目标元素的矩形区域的信息
     * intersectionRect：目标元素与视口（或根元素）的交叉区域的信息
     * intersectionRatio：目标元素的可见比例，即intersectionRect占boundingClientRect的比例，完全可见时为1，完全不可见时小于等于0
     */
    if(res[0].intersectionRatio>0){
        head.innerHTML = "可见";
    } else {
        head.innerHTML = "不可见";
    }
});

io.observe(item)