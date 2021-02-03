const extCI = require('@cloudbase/extension-ci');
const db = qq.cloud.database({
            env: 'cloudbase-5gxq5ehyf8eca834'
        });
const file = db.collection('file')

Page({
    data:{
        number:'',
        class:'',
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
            class:e.class
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
                                class:that.data.class,
                                homeworkID:that.data.homeworkID,
                                fileID:res.fileID
                            },
                        }).then((res) => {
                            console.log(res.data)
                        });
                        qq.showModal({
                            title: '上传成功',
                            content: '作业已成功上传！',
                            confirmColor: '#0bc183',
                            confirmText: '知道了',
                            showCancel: false
                        })
                        qq.navigateBack()
                    })
            }
        })
    }
})