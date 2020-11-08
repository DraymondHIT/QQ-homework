<form bindsubmit="formBindsubmit" bindreset="formReset">
  <view style="display:flex;margin-left:20px;margin-top:10px">
    <label>工号：</label>
    <input name="IDnumber" placeholder="请输入学号！" />
  </view>
  <view style="display:flex;margin-left:20px;">
    <label>姓名：</label>
    <input name="name" placeholder="请输入姓名！" />
  </view>
  <view style="display:flex;margin-top:30px;">
    <button style="width:30%;" formType="submit" >提交</button>
    <button style="width:30%" formType="reset" >重置</button>
  </view>
</form>
<view>{{tip}}</view>
<view>{{IDnumber}}</view>
<view>{{name}}</view>