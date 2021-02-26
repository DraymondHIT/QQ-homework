<view class="container">
    <form bindsubmit="formSubmit">
    <view class="number">
        <label>班级编号:</label>
        <input name="class" placeholder=" 请输入班级编号！" />
    </view>
    <view class="homeworkID">
        <label>作业编号:</label>
        <input name="homeworkID" placeholder=" 请输入作业编号！" />
    </view>
    <view class="submit">
        <button style="width:60%" form-Type="submit">下载</button>
        <button style="width:60%" bindtap="back">返回</button>
    </view>
    </form>
</view> 