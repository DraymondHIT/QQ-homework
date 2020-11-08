Page({
    data:{
        tip:'',
        IDnumber:'',
        name:''
    },
    formBindsubmit:function(e){
        if(e.detail.value.IDnumber.length==0||e.detail.value.name.length==0){
            this.setData({
                tip:'提示：学号和姓名不能为空！',
                IDnumber:'',
                name:''
            })
        }else{
            this.setData({
                tip:'',
                IDnumber:e.detail.value.IDnumber,
                name:e.detail.value.name
            })
        }
    },
    formReset:function(){
        this.setData({
            tip:'',
            IDnumber:'',
            name:''
        })
    }
})