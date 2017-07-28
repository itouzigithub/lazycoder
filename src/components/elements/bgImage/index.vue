<template>
  <img 
    width="100%"
    data-type="bgImage"
    :data-index="val.index"
    :src="val.url">
</template>

<script>
  export default {
    props: [
      'val'       // 图片对象
    ]
  }
</script>