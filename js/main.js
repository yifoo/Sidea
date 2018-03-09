import "../css/main.less";
import utils from './utils';
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
  ajax.open('get','/req/idea',true)
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
      var contentBox=document.getElementsByClassName("content-box")
      var top=0,
      left=0;
      for(var i=0;i<contentBox.length;i++){
        console.log(contentBox[i]);
        if(i%2==0){
          left=397;
          top+=contentBox[i].clientHeight;
        }else{
          left=0;
        }
        contentBox[i+2].style.top=(top+30)+'px';
        contentBox[i+1].style.left=left+'px';

      }
    }
  }
  ajax.send(null);	
})()