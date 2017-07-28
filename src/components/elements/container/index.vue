<template>
  <div
    class="lz-container"
    data-type="container"
    :data-index="i"
    :class="[{'g-active': 'container' + i === id}, playState ? 'anm-' + val.animationName : '']"
    :style="{
      display: val.display,
      position: 'absolute',
      width: val.width / 7.5 + '%',
      height: val.height / height * 100 + '%',
      left: val.left / 7.5 + '%',
      top: val.top / height * 100 + '%',
      zIndex: val.z,
      backgroundColor: val.bgColor,
      backgroundImage: 'url(' + val.backPic + ')',
      borderStyle: 'solid',
      borderRadius: val.radius + 'px',
      borderColor: val.borderColor,
      borderWidth: val.borderWidth + 'px',
      flexDirection: val.dir,
      justifyContent: val.justify,
      alignItems: val.align
    }">

		<!-- 图片 -->
    <pic 
      v-for="(img, index) in image"
      :key="index"
      :id="id"
      :val="img"
      :height="val.height" 
      :width="val.width"
      :playState="playState">
    </pic>

    <!-- 文本 -->
    <txt 
      v-for="(txt, index) in text"
      :key="index"
      :id="id"
      :val="txt"
      :height="val.height" 
      :width="val.width"
      :playState="playState">
    </txt>
  </div>
</template>

<script>
  import pic from '@/components/elements/pic'
  import txt from '@/components/elements/txt'

  export default {
    props: ['height', 'val', 'i', 'id', 'playState'],
    
    components: {
    	pic: pic,
    	txt: txt
    },
    
    computed: {
      // 文本
      text () {
        return this.$store.getters.text.filter(item => item.belong === this.val.name)
      },
      // 图片
      image () {
        return this.$store.getters.image.filter(item => item.belong === this.val.name)
      }
    }
  }
</script>

<style scoped>
  .lz-container {
    background-repeat: no-repeat;
    background-position: center;
    background-size: 100%;
  }
</style>