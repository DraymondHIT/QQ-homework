const extCI = require('@cloudbase/extension-ci');
const db = qq.cloud.database({
            env: 'cloudbase-5gxq5ehyf8eca834'
        });
const student = db.collection('student')
const teacher = db.collection('teacher')

Page({
    data:{
        tip:'',
        number:'',
        password:'',
        group:''
    },

    onLoad:function(){
        qq.cloud.init({
            env: 'cloudbase-5gxq5ehyf8eca834'
        })
        qq.cloud.registerExtension(extCI);
    },

    formSubmit: function(e){
        console.log('form发生了submit事件，携带数据为：', e.detail.value)
        if(e.detail.value.group=='stu'){
            console.log('学生端')
            student.where({
                number: e.detail.value.number
            }).get().then((res) => {
                console.log(res.data);
                // console.log(res.data[0].password,e.detail.value.password)
                if(res.data.length==0||res.data[0].password!=e.detail.value.password){
                    console.log('登陆失败')
                    this.setData({
                        tip:'提示：帐号或密码错误！',
                        number:'',
                        password:''
                    })
                }else{
                    console.log('登陆成功')
                    this.setData({
                        tip:'',
                        number:e.detail.value.number,
                        password:e.detail.value.password
                    })
                    qq.navigateTo({
                        url:'../student/student?number='+this.data.number+'&name='+res.data[0].name+'&class='+res.data[0].class
                    })
                }
            });
        }else{
            console.log('教师端')
            teacher.where({
                number: e.detail.value.number
            }).get().then((res) => {
                console.log(res.data);
                // console.log(res.data[0].password,e.detail.value.password)
                if(res.data.length==0||res.data[0].password!=e.detail.value.password){
                    console.log('登陆失败')
                    this.setData({
                        tip:'提示：帐号或密码错误！',
                        number:'',
                        password:''
                    })
                }else{
                    console.log('登陆成功')
                    this.setData({
                        tip:'',
                        number:e.detail.value.number,
                        password:e.detail.value.password   
                    })
                    qq.navigateTo({
                        url:'../teacher/teacher?number='+this.data.number+'&name='+res.data[0].name
                    })
                }
            });
        }
    },

    formReset: function(){
        console.log('form发生了reset事件')
        this.setData({
            tip:'',
            number:'',
            password:''
        })
    }
})