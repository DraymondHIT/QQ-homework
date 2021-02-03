const extCI = require('@cloudbase/extension-ci');
const db = qq.cloud.database({
            env: 'cloudbase-5gxq5ehyf8eca834'
        });
const file = db.collection('file')

Page({
    data:{
        homeworkID:'',
        number:''
    },

    onLoad:function(e){
        qq.cloud.init({
            env: 'cloudbase-5gxq5ehyf8eca834'
        })
        qq.cloud.registerExtension(extCI);
    },
        
    formSubmit: function(e){
        console.log('form发生了submit事件，携带数据为：', e.detail.value)
        let that = this
        that.setData({
            number: e.detail.value.number,
            homeworkID: e.detail.value.homeworkID
        })
        file.where({
            number: that.data.number,
            homeworkID: that.data.homeworkID
        }).get().then((res) => {
            for(i=0;i<res.data.length;i++){
                qq.cloud.downloadFile({
                    fileID:res.data[i].fileID
                })
                .then((res)=>{
                    console.log(res.tempFilePath)
                    const savePath = qq.env.USER_DATA_PATH + '/'  + that.data.homeworkID + '.pdf.jpg'
                    qq.getFileSystemManager().saveFile({
                        tempFilePath: res.tempFilePath,
                        filePath: savePath,
                        success(res) {
                            console.log('save ->', res)
                            qq.saveImageToPhotosAlbum({
                                filePath: savePath,
                                success: (res) => {
                                    qq.showModal({
                                        title: '文件已保存到手机相册',
                                        content: '可在相册中查看文件详细位置，找到文件后将保存的文件后缀名改为[.pdf]即可',
                                        confirmColor: '#0bc183',
                                        confirmText: '知道了',
                                        showCancel: false
                                    })
                                    qq.navigateBack()
                                }
                            })
                        },
                        fail(){
                            console.log("下载失败")
                        }
                    })
                })  
            }
        })
    }
})