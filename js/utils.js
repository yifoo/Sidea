var utils ={
  /**
   * 改变H根元素font-size
   */
  changeRootSize: function(){
    var html=document.documentElement;  //根元素
    var clientWidth = html.clientWidth;   //viewport窗口尺寸
    console.log(clientWidth*2);
  //把document的fontSize大小设置成跟窗口成一定比例的大小，从而实现响应式效果。
    html.style.fontSize = 20 * (clientWidth / 750) + 'px';
    console.log(html.style.fontSize);
  }
}
export default utils;