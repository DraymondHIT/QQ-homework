<view class="contentView">
  <view class="textarea_bg">
    <textarea value="{{shoopingtext}}" bindinput="shoppinginput"></textarea>
  </view>
</view> 
<view class="history" wx:if="{{history}}">
  <view class="history_title">
    <text>历史搜索</text>
  </view>
  <view class="history_text">
    <text wx:for="{{newArray}}" wx:key="key" data-text="{{item}}" bindtap="textfz">{{item}}</text>
  </view>
  <view class="history_clear">
    <text bindtap="cleanhistory">清空搜索记录</text>
  </view>
</view>
<view class="none" wx:if="{{noneview}}">
  <text>抱歉，没有相关资源</text>
</view>
<view class='swiper_con' wx:if="{{shoppinglist}}">
  <view class='swiper_con_view' wx:for="{{shoopingarray}}" wx:key="id" wx:if='{{item.status=="1"?true:false}}'>
    <view style="width:90%;margin:5%">
      <text style="font-size:35rpx" bindtap="downLoad" id="{{item.id}}" data-hi="{{item.fileID}}">{{item.title}}</text>
    </view>
  </view>
</view>
<view class="submit">
 <view style="position:fixed;bottom:5%;width:50%">
    <button bindtap="search">搜索</button>
    </view>
  </view>
