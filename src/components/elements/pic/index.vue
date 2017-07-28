<template>
  <div class="lz-image"
    :class="[{'g-active': 'image' + val.index === id}, playState ? 'anm-' + val.animationName : '']"
    :style="{
      position: val.belong === 'page' ? 'absolute' : 'relative',
      width: val.width / width * 100 + '%',
      height: val.height / height * 100 + '%',
      left: val.belong === 'page' ? val.left / width * 100 + '%' : '0',
      top: val.belong === 'page' ? val.top / height * 100 + '%' : '0',
      zIndex: val.z
    }">
    <!-- hover 图 -->
    <img v-if="val.hoverPic" :src="val.hoverPic">
    <img data-type="image"
      :data-index="val.index"
      :data-hover="!!val.hoverPic"
      :src="val.url">
  </div>
</template>

<script>
	export default {
		props: [
			'val', 				// 图片对象
			'width', 			// 包含块的宽
			'height',  		// 包含块的高
      'id',         // 选中项 id
      'playState'   // 动画播放状态
		]
	}
</script>

<style scoped>
  .lz-image img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
  }
</style>