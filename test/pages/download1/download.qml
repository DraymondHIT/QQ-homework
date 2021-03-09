<view class="container">
    <form bindsubmit="formSubmit">
    <view class="number">
        <text>教师工号: </text>
        <input name="number" placeholder=" 请输入教师工号！" />
    </view>
    <view class="homeworkID">
        <label>作业编号: </label>
        <input name="homeworkID" placeholder=" 请输入作业编号！" />
    </view>
    <view class="submit">
        <button style="width:60%" form-Type="submit">下载</button>
        <!-- <button style="width:60%" bindtap="back">返回</button> -->
    </view> 
    </form>
</view>