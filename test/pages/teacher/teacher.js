Page({
    data:{
        number:'',
        name:''
    },

    onLoad:function(e){
        console.log("接收上个页面传递的数据",e)
        this.setData({
            number:e.number,
            name:e.name
        })
    },

    upLoad: function () {
        qq.navigateTo({
            url:'../upload2/upload?number='+this.data.number
        })
    },

    downLoad: function () {
        qq.navigateTo({
            url:'../download2/download'
        })
    },

    changePassword:function(){
        qq.navigateTo({
            url:'../changepassword/changepassword?number='+this.data.number+'&group='+'tea'+'&name='+this.data.name
        })
    }
})