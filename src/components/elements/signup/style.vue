<template>
	<div v-if="activeElement.type === 'signup'">
    <hr>
    <div class="panel-row" flex>
      <i class="material-icons">vertical_align_top</i>
      <div class="panel-label">注册按钮</div>
      <div class="panel-value">{{ activeElement.bottom }}</div>
      <div class="panel-slider-wrap">
        <slider v-model="activeElement.bottom" :step="1" :max="500" />
      </div>
    </div>

    <div class="panel-row" flex>
      <i class="material-icons">visibility_off</i>
      <div class="panel-label">隐藏登录</div>
      <div class="panel-value">
        <input type="checkbox" v-model="activeElement.hideSignIn">
      </div>
    </div>

    <div class="panel-row" flex>
      <i class="material-icons">visibility_off</i>
      <div class="panel-label">隐藏邀请</div>
      <div class="panel-value">
        <input type="checkbox" v-model="activeElement.hideInvite">
      </div>
    </div>

    <div class="panel-row" flex>
      <i class="material-icons">bookmark_border</i>
      <div class="panel-label">图形验证</div>
      <div class="panel-value">
        <input type="checkbox" v-model="activeElement.toggleVali">
      </div>
    </div>
  </div>
</template>

<script>
	export default {
		props: ['activeElement']
	}
</script>