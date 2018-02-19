/**
 * 模型-model
 */

var Note=Backbone.Model.extend({
    defaults:{
        title:'',
        created_at:new Date()
    },
    initialize:function(){
        console.log('新建一条笔记'+this.get('title'));
        this.on('change',function(model,options){ //model表示当前对象,options表示选项
            console.log('属性值发生变化')
        });
        this.on('change:title',function(model,options){ //监听title属性变化
            console.log('title发生了变化')
        })
        this.on('invalid',function(model,error){ //输出验证失败输出的提示
            console.log(error)
        })
    },
    validate:function(attributes,options){
       if(attributes.title.length<3){
           return '笔记的标题字符太短'
       }
    }
})

/*
 *视图 - view
 */
var NoteView=Backbone.View.extend({
    //添加元素属性
    tagName:'li',
    className:'item',
    attributes:{'data-rote':'list'},
    template:_.template($('#list-template').html()),
    render:function(){
        this.$el.html(this.template(this.model.attributes))
        return this;
    }
    }
    );

var note =new Note({
    title:'西红柿炒鸡蛋的做法'
})
var noteView=new NoteView({
    model:note
});
// noteView.render();
// console.log(noteView.el)//<li data-rote="list" class="item">西红柿炒鸡蛋的做法</li>

var NoteCollection=Backbone.Collection.extend({
    model:Note
});
var NoteCollectionView=Backbone.View.extend({
    tagName:'ul',
    initialize:function(){
      this.collection.on('add',this.addOne,this);
      this.render();
    },
    render:function(){
        this.collection.each(this.addOne,this);
        return this;
    },
    addOne:function(note){
        var noteView=new NoteView({model:note});
        this.$el.append(noteView.render().el);
    }
})
/**
 * 测试
 */
var note1=new Note({id:1,title:'西红柿炒鸡蛋'});
var note2=new Note({id:2,title:'明天要上班'});
var note3=new Note({id:3,title:'又是一个春节'});
var noteCollection=new NoteCollection([note1,note2,note3]);//向模型中添加
var noteCollectionView=new NoteCollectionView({collection:noteCollection});