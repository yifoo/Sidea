/*
 * @Author: Daniel Hfood 
 * @Date: 2018-03-10 14:08:42 
 * @Last Modified by: Daniel
 * @Last Modified time: 2018-03-11 00:18:17
 * @description:首页js 
 */

import "../css/main.less";
import utils from '../common/utils';
/**
 * 切换菜单Tab:最新/趋势/热门
 */
(()=>{
  var elem=document.getElementsByClassName("r-tabs")[0];
  utils.bindEvents(elem,"click","a",function(target){
    console.log("bangding",target);
    var li=target.parentNode;
    var tab=target.getAttribute("data-toggle");
    var lis=this.children;
    for(var item of lis){
      item.removeAttribute("class")
      item.setAttribute("class",'item')
    }
    li.setAttribute("class",'item active')
    var tabShow=document.getElementById(tab);
    var tabShows=tabShow.parentNode.children;
    for(var value of tabShows){
      value.removeAttribute("class");
    }
    tabShow.setAttribute("class","active");
  })
})();

/**
 * 视图样式切换
 */

 (()=>{
  var tabs=document.querySelectorAll(".l-tabs")[0];
  utils.bindEvents(tabs,'click','li',function(target){
    console.log("绑定",target);
    target.classList.toggle("active");
  })
})();

/**
 * 渲染idea
 */
(()=>{
  var ajax=utils.getXhr();
  ajax.open('get','http://127.0.0.1:3000/req/idea',true)
  ajax.send(null);
  ajax.onreadystatechange=function(){
    var html="";
    if(ajax.readyState==4&&ajax.status==200){
      var data=JSON.parse(ajax.response);
    console.log(data);
      for(var i=0;i<data.length;i++){
        html+=`
        <div class="content-box">
          <div class="content">
            <h3 class="title">${data[i].title}</h3>
            <div class="main-content">
              <p>${data[i].content}</p>
              <div>
                <img src="${data[i].img}" alt="">
              </div>
            </div>
            <div class="foot-content clear">
              <span class="fl">
                <svg class="icon icon-bulb" aria-hidden="true">
                  <use xlink:href="#icon-bulb"></use>
                </svg>
                <a href="">15条点子</a>
              </span>
              <a href="" class="fr">${data[i].category}</a>
            </div>
          </div>
        </div>
        `
      }
      document.getElementById("tab1").innerHTML=html;

    }
  }
})();

(()=>{
  window.onload=function(){
    var contentBox=document.getElementById("tab1");
    var items = contentBox.children;
    console.log("items",items.length);
    var gap = 5;
    waterFall()
    function waterFall(){
      var width=contentBox.offsetWidth;
      var itemWidth = items[0].offsetWidth;
      var columns = parseInt(width / (itemWidth + gap));
      var arr = [];
      for (var i = 0; i < items.length; i++) {
        if (i < columns) {
            // 2- 确定第一行
            items[i].style.top = 0;
            items[i].style.left = (itemWidth + gap) * i + 'px';
            arr.push(items[i].offsetHeight);
        } else {
            // 其他行
            // 3- 找到数组中最小高度  和 它的索引
            var minHeight = arr[0];
            var index = 0;
            for (var j = 0; j < arr.length; j++) {
                if (minHeight > arr[j]) {
                    minHeight = arr[j];
                    index = j;
                }
            }
            // 4- 设置下一行的第一个盒子位置
            // top值就是最小列的高度 + gap
            items[i].style.top = arr[index] + gap + 'px';
            // left值就是最小列距离左边的距离
            items[i].style.left = items[index].offsetLeft + 'px';
  
            // 5- 修改最小列的高度 
            // 最小列的高度 = 当前自己的高度 + 拼接过来的高度 + 间隙的高度
            arr[index] = arr[index] + items[i].offsetHeight + gap;
          }
        }
    }
    window.onresize = function() {
      waterFall();
    };
  }
  
})()