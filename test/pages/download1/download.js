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
            if(res.data.length == 0){
                qq.showToast({
                    title: "下载失败", 
                    icon: "none",
                    duration: 1500, 
                    mask: false
                })
            }
            for(i=0;i<res.data.length;i++){
                qq.cloud.downloadFile({
                    fileID:res.data[i].fileID
                })
                .then((res)=>{
                    console.log(res.tempFilePath)
                    const savePath = qq.env.USER_DATA_PATH + '/' + that.data.homeworkID + '.pdf.jpg'
                    qq.getFileSystemManager().saveFile({
                        tempFilePath: res.tempFilePath,
                        filePath: savePath,
                        success(res) {
                            console.log('save ->', res)
                            qq.saveImageToPhotosAlbum({
                                filePath: savePath,
                                success(){
                                    qq.showToast({
                                        title: "下载成功", 
                                        icon: "success",
                                        duration: 1500, 
                                        mask: false
                                    })
                                }
                            })
                        },
                        fail(){
                            console.log("下载失败")
                            qq.showToast({
                                title: "下载失败", 
                                icon: "none",
                                duration: 3000, 
                                mask: false
                            })
                        }
                    })
                })  
            }
        })
    },

    // back: function(){
    //     qq.navigateBack()
    // }
})