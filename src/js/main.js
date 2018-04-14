/*
 * @Author: Daniel Hfood 
 * @Date: 2018-03-10 14:08:42 
 * @Last Modified by: Daniel
 * @Last Modified time: 2018-04-14 16:57:13
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
    //如果e.target为svg,则改变target对象为父对象
    var target=e.target;
    if(target.tagName=="svg"){
      target=target.parentNode;
    }
    var li=target.parentNode;
    var tab=target.getAttribute("data-toggle");
    var lis=this.parentNode.parentNode.children;
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
  var ul=document.querySelectorAll(".l-tabs ul")[0];
  utils.bindEvents(ul,'click','li',function(e){
    var lis=this.parentNode.children;
    for(var value of lis){
      value.setAttribute("class",'');
    }
    this.classList.toggle("active");
  })
})();

/**
 * 渲染idea
 */
(()=>{
  var pno=1,pageSize=10;
  loadPage(pno,pageSize);
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
    }, 500);
  })
})();
/**
 * 渲染用户积分排名
 */
(()=>{
  utils.$.ajax({
    url:"user/",
    method:"get",
    success:function(resp){
      if(typeof(resp)=='string'){
        resp=JSON.parse(resp);
      }
      var data=resp.list;
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
  console.log("资源加载完毕");
  var contentBox=document.getElementById("idea-main");
  var items = contentBox.children;
  console.log(contentBox);
  setTimeout(() => {
    utils.waterFall(contentBox,5)
  },100)
  window.onresize = function() {
    setTimeout(() => {
      utils.waterFall(contentBox,5)
    },0)
  };
}
function loadPage(pno,pageSize){
  utils.$.ajax({
    url:"https://www.haohome.top/sidea/req_idea.php",
    method:"get",
    data:{pno:pno,pageSize:pageSize},
    async:true,
    success:function(resp){
      if(typeof(resp)=='string'){
        resp=JSON.parse(resp);
      }
      var dataPage=resp.pageResponse;   //获得分页数据
      var data=resp.list;               //获得列表数据
      console.log("得到数据",data);
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
      console.log("请求结束");
    }
  })
}