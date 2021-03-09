Page({
  //清除历史记录
  cleanhistory: function(e) {
    this.setData({
      history: false, //隐藏历史记录
      noneview: false,  //隐藏未找到提示
      historyArray: [], //清空历史记录数组
      newArray: [],
      shoopingtext: "" //清空搜索框
    })
  },
  //搜索
  search: function(e) {
    var searchtext = this.data.shoopingtext; //搜索框的值
    var sss = true;
    if (searchtext != "") {
      //将搜索框的值赋给历史数组
      if (!this.data.historyArray.includes(searchtext)) {
        this.data.historyArray.push(searchtext);
      }
      //模糊查询 循环查询数组中的title字段
      for (var index in this.data.shoopingarray) {
        var num = this.data.shoopingarray[index].title.indexOf(searchtext);
        let temp = 'shoopingarray[' + index + '].status';
        if (num != -1) { //不匹配的不显示
          this.setData({
            [temp]: 1,
          })
          sss = false //隐藏未找到提示
        }
      }
      this.setData({
        history: false, //隐藏历史记录
        noneview: sss, //隐藏未找到提示
        shoppinglist: true, //显示商品列表
        newArray: this.data.historyArray //给新历史记录数组赋值
      })
    } else {
      this.setData({
        noneview: true, //显示未找到提示
        shoppinglist: false, //隐藏商品列表
        history: false, //隐藏历史记录
      })
    }
  },
  data: {
    shoopingtext: "", //搜索框的值
    history: false, //显示历史记录
    noneview: false, //显示未找到提示
    shoppinglist: false, //显示资源列表
    historyArray: [], //历史记录数组,
    newArray: [], //添加历史记录数组
    shoopingarray: [{ //资源
      id: 0,
      title: "补集的概念",
      fileID: "cloud://cloudbase-5gxq5ehyf8eca834.636c-cloudbase-5gxq5ehyf8eca834-1304143222/算法设计与分析第一章.pdf",
      status: 0
    }, {
      id: 1,
      title: "笛卡尔乘积运算",
      fileID: "adgadgd43643f",
      status: 0
    }, {
      id: 2,
      title: "集合的运算",
      fileID: "3467rdhfdhbdf",
      status: 0
    }, {
      id: 3,
      title: "鸽舍原理",
      fileID: "dfdhfh53y35y53y35",
      status: 0
    }, {
      id: 4,
      title: "映射的概念习题",
      fileID: "sbsfbw4t63t34",
      status: 0
    }, {
      id: 5,
      title: "置换",
      fileID: "dfbfbefberh54e",
      status: 0
    }, {
      id: 6,
      title: "全序关系与偏序关系",
      fileID: "dfbdfb354246i56u",
      status: 0
    }, {
      id: 7,
      title: "欧拉定理相关例题",
      fileID: "cbderjktji5645u3",
      status: 0
    }, {
      id: 8,
      title: "哈密顿图",
      fileID: "238tu48hjvnempiv",
      status: 0
    }, {
      id: 9,
      title: "图的破圈法",
      fileID: "sdgwb230jgeb4",
      status: 0
    }]
  },
  //搜索框的值
  shoppinginput: function(e) {
    //当删除input的值为空时
    if (e.detail.value == "") {
      this.setData({
        history: true, //显示历史记录
        noneview: false,
        shoppinglist: false //隐藏商品列表
      });
      //所有商品列表的状态改为0
      for (var index in this.data.shoopingarray) {
        let temp = 'shoopingarray[' + index + '].status';
        this.setData({
          [temp]: 0,
        })
      }
    }
    this.setData({
      shoopingtext: e.detail.value
    })
  },
  //点击历史记录赋值给搜索框
  textfz: function(e) {
    this.setData({
      shoopingtext: e.target.dataset.text
    })
  },

  downLoad: function(param) {
      console.log("打开文档ID：", param.target.id)
      console.log("打开文档url: ", param.target.dataset.hi)
      var _fileID = param.target.dataset.hi
      qq.cloud.downloadFile({
          fileID: _fileID
      })
      .then((res)=>{
          console.log(res.tempFilePath)
          const filePath = res.tempFilePath
          qq.openDocument({
            filePath,
            success(res) {
              console.log('打开文档成功')
            }
          })
      })
  }
})