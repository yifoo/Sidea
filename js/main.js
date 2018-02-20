import "../css/main.less";
import utils from './utils';
(()=>{
  var elem=document.getElementsByClassName("item")[1];
  utils.bindEvents(elem,"click",function(e){
    var target=e.target;
    console.log(target);
  })
})()