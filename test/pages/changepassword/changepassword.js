const extCI = require('@cloudbase/extension-ci');
const db = qq.cloud.database({
            env: 'cloudbase-5gxq5ehyf8eca834'
        });
const student = db.collection('student')
const teacher = db.collection('teacher')

Page({
    data:{
        number:'',
        name:'',
        class:'',
        password:'',
        group:''
    },

    onLoad:function(e){
        qq.cloud.init({
            env: 'cloudbase-5gxq5ehyf8eca834'
        })
        qq.cloud.registerExtension(extCI);
        console.log("接收上个页面传递的数据",e)
        this.setData({
            number:e.number,
            name:e.name,
            group:e.group,
            class:e.class
        })
    },

    formSubmit: function(e){
        console.log('form发生了submit事件，携带数据为：', e.detail.value)
        if(this.data.group=='stu'){
            console.log('学生端修改密码')
            // student.where({
            //     number: this.data.number
            // }).update({
            //     password: e.detail.value.password
            // }).then((res) => {
            //     console.log('修改后数据库相应记录的值：',res.data);
            // });
            student.where({
                number:this.data.number
            }).remove().then((res) => {
                   console.log('删除一条记录',res.data);
            });
            student.add({
                data:{
                    number:this.data.number,
                    name:this.data.name,
                    class:this.data.class,
                    password:e.detail.value.password
                }
            }).then((res) => {
                   console.log('增加一条记录：',res.data);
            });
            qq.showModal({                        
                content: '修改密码成功',
                confirmColor: '#0bc183',
                confirmText: '知道了',
                showCancel: false
            })
            qq.navigateBack()
        }else{
            console.log('教师端修改密码')
            teacher.where({
                number:this.data.number
            }).remove().then((res) => {
                   console.log('删除一条记录',res.data);
            });
            teacher.add({
                data:{
                    number:this.data.number,
                    name:this.data.name,
                    class:this.data.class,
                    password:e.detail.value.password
                }
            }).then((res) => {
                   console.log('增加一条记录：',res.data);
            });
            qq.showModal({                        
                content: '修改密码成功',
                confirmColor: '#0bc183',
                confirmText: '知道了',
                showCancel: false
            })
            qq.navigateBack()
        }
    },

    formReset: function(){
        console.log('form发生了reset事件')
        this.setData({
            password:''
        })
    }

})