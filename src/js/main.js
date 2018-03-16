/*
 * @Author: Daniel Hfood 
 * @Date: 2018-03-10 14:08:42 
 * @Last Modified by: Daniel
 * @Last Modified time: 2018-03-16 23:25:31
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
  utils.ajax({
    url:"http://127.0.0.1:3000/req/idea",
    methods:"get",
    success:function(data){
      var data=data.list;
      var html="";
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
                <a href="">${data[i].idea}条点子</a>
              </span>
              <a href="" class="fr">${data[i].category}</a>
            </div>
          </div>
        </div>
        `
      }
      document.getElementById("tab1").innerHTML=html;
    }
  })
})();
/**
 * 渲染用户积分排名
 */
(()=>{
  window.onload=function(){
    var contentBox=document.getElementById("tab1");
    var items = contentBox.children;
    utils.waterFall(contentBox,5)
    window.onresize = function() {
      utils.waterFall(contentBox,5)
    };
  }
  
})()