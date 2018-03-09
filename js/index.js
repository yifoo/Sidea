import "../css/normalize.css";
import "../css/base.less";
import utils from './utils';

window.onresize =function(){  
  utils.changeRootSize();
}  
window.onload=function(){
  utils.changeRootSize();
}