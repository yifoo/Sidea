/*
 * @Author: Daniel Hfood 
 * @Date: 2018-03-10 14:08:42 
 * @Last Modified by: Daniel
 * @Last Modified time: 2018-03-18 23:05:28
 * @description:首页js 
 */

import "../css/main.less";
import utils from '../common/utils';

/**
 * 切换菜单Tab:最新/趋势/热门
 */
(()=>{
  var elem=document.getElementsByClassName("r-tabs")[0];
  utils.bindEvents(elem,"click","a",function(e){
    console.log("bangding",e.target);
    var li=e.target.parentNode;
    var tab=e.target.getAttribute("data-toggle");
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
  utils.bindEvents(tabs,'click','li',function(e){
    console.log("绑定",e);
    e.target.classList.toggle("active");
  })
})();

/**
 * 渲染idea
 */
(()=>{
  var pno=1,pageSize=10;
  loadPage(pno,pageSize);

  function loadPage(pno,pageSize){
    utils.ajax({
      url:"http://127.0.0.1:3000/req/idea",
      methods:"get",
      data:{pno:pno,pageSize:pageSize},
      aysnc:false,
      success:function(data){
        var dataPage=data.pageResponse;   //获得分页数据
        var data=data.list;               //获得列表数据
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
        var idea=document.getElementById("idea-main"); 
        idea.innerHTML=html;

        /**动态创建页码 */
        var pageHTML="";
        if(typeof(dataPage.pno=="string")){
          dataPage.pno=parseInt(dataPage.pno);
        }
        if(dataPage.pno>2){
          pageHTML+=`<li><a href="${dataPage.pno-2}">${dataPage.pno-2}</a></li>`
        }
        if(dataPage.pno>1){
          pageHTML+=`<li><a href="${dataPage.pno-1}">${dataPage.pno-1}</a></li>`
        }
        pageHTML+=`<li class="active"><a href="${dataPage.pno}">${dataPage.pno}</a></li>`;
        if(dataPage.pno<dataPage.pageCount-1){
          pageHTML+=`<li><a href="${dataPage.pno+1}">${dataPage.pno+1}</a></li>`
        }
        if(dataPage.pno<dataPage.pageCount-2){
          pageHTML+=`<li><a href="${dataPage.pno+2}">${dataPage.pno+2}</a></li>`
        }
          //获得分页元素
        var pagination=document.getElementById("pagination");
        pagination.innerHTML=pageHTML;
        // 追加上一页和下一页
        var prev=document.createElement("li");
        var next=document.createElement("li");
        var li=document.querySelector("#pagination li")
        prev.innerHTML=`<a href="javascript:;">上一页</a>`;
        next.innerHTML=`<a href="javascript:;">下一页</a>`;
        prev.className="prev";
        pagination.insertBefore(prev,li);
        next.className="next";
        pagination.appendChild(next);

        // // 判断状态
        if(dataPage.pno==1)
        prev.className="prev disabled";
        if(dataPage.pno==dataPage.pageCount)
        next.className="next disabled";

      }
    })
   
  }
  var pagination=document.getElementById("pagination");
  utils.bindEvents(pagination,"click","li:not(.disabled) a",function(e){
    e.preventDefault();
    var target=e.target;
    var pno=target.getAttribute("href");
    var n=document.querySelector("#pagination li.active>a").getAttribute("href");
    if(target.parentNode.className=="prev"){
      pno=--n;
    }else if(target.parentNode.className=="next"){
      pno=parseInt(n)+1;
    }
    loadPage(pno,pageSize);
    setTimeout(() => {
      var contentBox=document.getElementById("idea-main");
      var items = contentBox.children;
      utils.waterFall(contentBox,5)
    }, 100);
  })
})();
/**
 * 渲染用户积分排名
 */
(()=>{
  console.log("用户");
  utils.ajax({
    url:"user/",
    methods:"get",
    success:function(data){
      var data=data.list;
      var html="";
      for(var key in data){
        html+=`
        <li>
          <i>${data[key].uid}</i>
          <p class="name">${data[key].name}</p>
          <p class="points fr">${data[key].score}</p>
        </li>
        `
      }
      document.getElementsByClassName("board")[0].innerHTML=html;
    }
  })
})();




window.onload=function(){
  var contentBox=document.getElementById("idea-main");
  var items = contentBox.children;
  utils.waterFall(contentBox,5)
  window.onresize = function() {
    utils.waterFall(contentBox,5)
  };
}