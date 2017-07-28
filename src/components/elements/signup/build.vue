<template>
  <form
    v-if="data"
    id="regForm" 
    :style="{
      position: 'absolute',
      width: data.width / 7.5 + '%',
      height: data.height / height * 100 + '%',
      left: data.left / 7.5 + '%',
      top: data.top / height * 100 + '%',
      zIndex: data.z
    }">
    <!-- 手机号 -->
    <div flex class="sign-up-row">
      <div class="sign-up--l" :style="{backgroundImage: 'url(' + data.phoneIconSrc + ')'}"></div>

      <div class="sign-up--m">
        <input maxlength="11" type="tel" class="phone" name="phone" placeholder="请输入手机号" required>

        <i class="sign-up-icon--close icon-clear"></i>

        <div class="sign-up-error error-phone" style="display: none;"></div>
      </div>
    </div>

    <!-- 密码 -->
    <div flex class="sign-up-row">
      <div class="sign-up--l" :style="{backgroundImage: 'url(' + data.passIconSrc + ')'}"></div>
      
      <div class="sign-up--m">
        <input type="password" class="password" name="password" placeholder="请设置登录密码" required>

        <div class="sign-up-error error-password" style="display: none;"></div>
      </div>

      <div id="viewPwd1" class="sign-up--r">
        <i class="sign-up-icon--eye icon-eye"></i>
      </div>
    </div>

    <!-- 图形验证码 -->
    <div flex id="valicode-li" class="sign-up-row" style="display: none;">
      <div class="sign-up--l" :style="{backgroundImage: 'url(' + data.graphIconSrc + ')'}"></div>

      <div class="sign-up--m">
        <input type="text" class="valicode" name="valicode" placeholder="请输入图形验证码" required>

        <div class="sign-up-error error-valicode" style="display: none;"></div>
      </div>

      <div class="sign-up--r vcode-wrapper"><img></div>
    </div>

    <!-- 短信验证码 -->
    <div flex class="sign-up-row">
      <div class="sign-up--l" :style="{backgroundImage: 'url(' + data.valiIconSrc + ')'}"></div>
      
      <div class="sign-up--m">
        <input type="text" class="phone-valicode" name="phoneValicode" placeholder="请输入验证码" required>

        <div class="sign-up-error error-phoneValicode" style="display: none;"></div>
      </div>

      <div class="sign-up--r">
        <button class="sign-up-btn phone-valicode-btn">获取验证码</button>
      </div>
    </div>

    <!-- 邀请人 -->
    <div flex class="sign-up-row" v-if="!data.hideInvite">
      <div class="sign-up--l" :style="{backgroundImage: 'url(' + data.inviteIconSrc + ')'}"></div>

      <div class="sign-up--m">
        <input type="text" class="invitee" name="invitee" placeholder="请填写邀请人的手机号（选填）">

        <div class="sign-up-error error-phoneValicode" style="display: none;"></div>
      </div>

      <div class="sign-up--r"></div>
    </div>

    <!-- 提交按钮 -->
    <div class="sign-up-submit reg-btn" 
      :style="{ bottom: data.bottom / data.height * 100 + '%' }">
      <!-- hover 图片 -->
      <img 
        v-if="data.btn.hoverSrc"
        :data-src="data.btn.hoverSrc"
        :width="data.btn.width / data.width * 100 + '%'"
        :style="{
          position: 'absolute',
          top: 0,
          zIndex: data.btn.z
        }">
      <!-- 按钮图片 -->
      <img 
        :data-hover="!!data.btn.hoverPic"
        :data-src="data.btn.src"
        :data-expire="data.btn.expireSrc"
        :width="data.btn.width / data.width * 100 + '%'"
        :style="{
          position: 'absolute',
          top: 0,
          zIndex: data.btn.z
        }">
    </div>
    <a v-if="!data.hideSignIn" class="sign-up-login" href="/newuser/index/loginWap">已有账号？直接登录</a>
  </form>
</template>

<script>
  export default {
    props: ['data', 'height']
  }
</script>