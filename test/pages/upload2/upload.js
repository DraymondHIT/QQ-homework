const extCI = require('@cloudbase/extension-ci');
const db = qq.cloud.database({
            env: 'cloudbase-5gxq5ehyf8eca834'
        });
const file = db.collection('file')

Page({
    data:{
        number:'',
        homeworkID:''
    },

    onLoad:function(e){
        qq.cloud.init({
            env: 'cloudbase-5gxq5ehyf8eca834'
        })
        qq.cloud.registerExtension(extCI);
        console.log("接收上个页面传递的数据",e)
        this.setData({
            number:e.number,
        })
    },
        
    formSubmit: function(e){
        console.log('form发生了submit事件，携带数据为：', e.detail.value)
        let that = this
        that.setData({
            homeworkID: e.detail.value.homeworkID
        })
        
        qq.chooseMessageFile({
            type: 'all',
            success(res) {
                const tempFilePaths = res.tempFiles;
                qq.cloud.uploadFile({
                    filePath: tempFilePaths[0].path,
                    cloudPath:tempFilePaths[0].name,
                }).then((res) => {
                    console.log("上传成功",res.fileID)
                    // this.setData({
                    //     fileID:res.fileID
                    // })
                        
                    file.add({
                        data:{
                            number:that.data.number,
                            class:'0',
                            homeworkID:that.data.homeworkID,
                            fileID:res.fileID
                        },
                    }).then((res) => {
                        console.log(res.data)
                    });
                    qq.showToast({
                        title: "上传成功", 
                        icon: "success",
                        duration: 1500, 
                        mask: false
                    })
                })
            }
        })
    },

    // back: function(){
    //     qq.navigateBack()
    // }
})