<view class="container">
    <form bindsubmit="formSubmit" bindreset="formReset">
    <view class="name">
        <label>帐号：</label>
        <input name="number" placeholder="请输入帐号！" />
    </view>
    <view class="box">
    </view>
    <view class="name">
        <label>密码：</label>
        <input password="true" name="password" placeholder="请输入密码！" />
    </view>
    <view class="section">
        <radio-group name="group">
        <label>
            <radio value="stu" />
            学生  
        </label>
        <label>
            <radio value="tea" />
            教师
        </label>
        </radio-group>
    </view>
    <view class="submit">
        <button class="button" style="width:60%" form-Type="submit">提交</button>
        <button class="button" style="width:60%" form-Type="reset">重置</button>
    </view>
    </form>
</view>