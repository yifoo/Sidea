var utils ={
  
  /**
   * 改变根元素font-size
   */
  changeRootSize: function(){
    var html=document.documentElement;  //根元素
    var clientWidth = html.clientWidth;   //viewport窗口尺寸
    if(clientWidth>600){
      clientWidth=600
    }
  //把document的fontSize大小设置成跟窗口成一定比例的大小。
    html.style.fontSize = 20 * (clientWidth / 750) + 'px';
    console.log(html.style.fontSize);
  },

  /**
   * @name: 通用事件绑定
   * @param:elem:事件作用父元素,type:事件类型,selector:事件作用元素,fn:事件回调函数(参数代表e.target)
   * @description:该方法可传3个参数或4个参数,3个参数:没有冒泡,4个参数:有冒泡
   */
  bindEvents:function(elem,type,selector,fn){
    if(fn==null){		//如果没有第四个参数
      fn=selector;
      selector=null;
    }
    elem.addEventListener(type,function(e){
      if(selector){
        var target=e.target;
        if(target.matches(selector)){
          fn.call(this,e.target)
        }else if(target.parentNode.matches(selector)){
          fn.call(this,target.parentNode) //二级子元素
        }
      }else{
        fn(e)
      }
    })
  }
}
export default utils;