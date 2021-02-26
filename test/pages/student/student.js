Page({
    data:{
        number:'',
        name:'',
        class:''
    },

    onLoad:function(e){
        console.log("接收上个页面传递的数据",e)
        this.setData({
            number:e.number,
            name:e.name,
            class:e.class
        })
    },

    upLoad: function () {
        qq.navigateTo({
            url:'../upload1/upload?number='+this.data.number+'&class='+this.data.class
        })
    },

    downLoad: function () {
        qq.navigateTo({
            url:'../download1/download'
        })
    },

    search: function() {
        qq.navigateTo({
            url:'../search/search'
        })
    },

    changePassword:function(){
        qq.navigateTo({
            url:'../changepassword/changepassword?number='+this.data.number+'&group='+'stu'+'&name='+this.data.name+'&class='+this.data.class
        })
    }
})