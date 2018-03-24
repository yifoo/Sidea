/*
 * @Author: Daniel Hfood 
 * @Date: 2018-03-11 20:17:13 
 * @Last Modified by: Daniel
 * @Last Modified time: 2018-03-25 00:05:34
 * @name:公共方法库
 */

var utils ={
  
  /**
   * @name:改变根元素font-size
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
   * @param:elem:事件作用父元素,type:事件类型,selector:事件作用元素,fn:事件回调函数(参数代表e)
   * @description:该方法可传3个参数或4个参数,3个参数:没有冒泡,4个参数:有冒泡
   */
  bindEvents:function(elem,type,selector,fn){
    if(fn==null){		//如果没有第四个参数
      fn=selector;
      selector=null;
    }
    elem.addEventListener(type,function(e){
      e.preventDefault();
      if(selector){
        var target=e.target;
        if(target.matches(selector)){
          fn.call(target,e)
        }else if(target.parentNode.matches(selector)){
          var target=target.parentNode
          fn.call(target,e) //二级子元素
        }
      }else{
        fn(e)
      }
    })
  },
  /**
   * @name:获取xhr对象
   */
  getXhr:function(){
    
  },
  /**
   * @name:封装ajax方法
   * @param:参数对象包含methods,url,success方法等
   */
  ajax:function(obj){
    /**获得xhr */
    var xhr;
    if(window.XMLHttpRequest){
      xhr=new XMLHttpRequest();
    }else{
      xhr=new ActiveXObject("MicroSoft.XMLHttp")
    }
    /**请求类型 */
    var type=obj.methods||obj.type; 
    if(type.toLowerCase()==="get"){      //get方法的data拼接
      if(!obj.data||obj.data.length!=0){
        var data=obj.data;
        var params=[];
        for(var key in data){
          params.push(key+"="+data[key])
        }
        var str=params.join("&");
        xhr.open(type,obj.url+"?"+str,obj.async||true)
      }else{
        xhr.open(type,obj.url,obj.async||true)
      }
      xhr.send(null);
    }else{
      xhr.open(type,url,obj.async||true)
      xhr.send(obj.data);
    }
    xhr.onreadystatechange=function(){      //ajax状态判断
      if(xhr.readyState==4&&xhr.status==200){
        if(typeof(xhr.response)=="string"){
          var resp=JSON.parse(xhr.response);
        }
        obj.success(resp,xhr.response)    //ajax成功则返回数据
      }
      else{
        if(obj.error){
          obj.error(xhr)
        }
      }
    }
  },
  /**
   * @name:瀑布流
   * @param:parent(容器元素)
   * @param:oneGap(只有一列时元素的间距,其他列数自适应)
   * @description:自适应瀑布流,多列间距自适应
   */
  waterFall:function (parent,oneGap){
    /**容器的宽度(包含内边距、边框) */
    var width=parent.offsetWidth;
    /**容器内盒子元素的宽度(包含内边距、边框)  */
    var items=parent.children;
    var itemWidth = items[0].offsetWidth;
    var gap=(width-parseInt(width / (itemWidth))*itemWidth)/2;
    /**计算每列放的盒子元素个数 */
    var columns = parseInt(width / (itemWidth + gap));
    /**定义一个空数组,用来储存每列元素的高度 */
    var arr = [];
    for (var i = 0; i < items.length; i++) {
      /**1.将第一行元素的高度都存到arr中 */
      if (i < columns) {
          items[i].style.top = 0;
          items[i].style.left = (itemWidth + gap) * i + 'px';
          arr.push(items[i].offsetHeight);
      } 
      /**2.找到每一行的最小高度 */
      else {
          var minHeight = arr[0];
          var index = 0;
          for (var j = 0; j < arr.length; j++) {
              if (minHeight > arr[j]) {
                  minHeight = arr[j];//获得当前行最小高度
                  index = j;          //记下当前列下标
              }
          }
          /**3.设置下一行第一个盒子的位置,
           * top值就是最小高度值+gap
           * left值就是最小列距离左边的距离
           */
          if(gap!=0){
            items[i].style.top = arr[index] + gap + 'px';
            items[i].style.left = items[index].offsetLeft + 'px';
            /**4.修改最小列的高度 
             * 最小列的高度 = 当前自己的高度 + 拼接过来的高度 + 间隙的高度
             */
            arr[index] = arr[index] + items[i].offsetHeight + gap;
          }else{
            items[i].style.top = arr[index] + oneGap + 'px';
            items[i].style.left = 0;
            arr[index] = arr[index] + items[i].offsetHeight + oneGap;
          }
        }
      }
  }
}
export default utils;