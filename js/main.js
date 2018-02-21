import "../css/main.less";
import utils from './utils';
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
})()