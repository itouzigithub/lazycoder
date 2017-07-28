<template>
	<ul class="menu-bar" @mousedown="updateSrollTop">
    <li class="menu-item" @click="addBackImage">
      <i class="material-icons">wallpaper</i>
      <p class="menu-caption">背景图</p>
    </li>
    <li class="menu-item" @click="addText">
      <i class="material-icons">translate</i>
      <p class="menu-caption">文本</p>
    </li>
    <li class="menu-item" @click="addImage">
      <i class="material-icons">crop_original</i>
      <p class="menu-caption">图片</p>
    </li>
    <li class="menu-item" @click="addContainer">
      <i class="material-icons">inbox</i>
      <p class="menu-caption">容器</p>
    </li>
    <li class="menu-item" @click="addSignup">
      <i class="material-icons">face</i>
      <p class="menu-caption">注册</p>
    </li>
    <li class="menu-item">
      <i class="material-icons">share</i>
      <p class="menu-caption">分享</p>
    </li>
    <li class="menu-item">
      <i class="material-icons">schedule</i>
      <p class="menu-caption">进度条</p>
    </li>
  </ul>
</template>

<script>
	export default {
    props: ['zoom'],

		methods: {
      // 添加背景图
      addBackImage () {
        $communicator.$emit('upload', (payload) => {
          this.$store.commit('addBackImage', payload)
        }, true)
      },

      // 添加图片
      addImage () {
        $communicator.$emit('upload', (payload) => {
          this.$store.commit('addImage', payload)
        }, true)
      },

			// 添加文本
      addText () {
        this.$store.commit('addText');

        // 设置选中
        this.$store.commit('select', {
          type: 'text',
          index: this.$store.state.h5.text.length - 1
        });
      },

      // 添加容器
      addContainer () {
        this.$store.commit('addContainer');

        // 设置选中
        this.$store.commit('select', {
          type: 'container',
          index: this.$store.state.h5.container.length - 1
        });
      },

      // 添加注册组件
      addSignup () {
        if (this.$store.state.h5.signup) {
          $communicator.$emit('notify', {
            info: '注册组件只能加一个',
            type: false
          })
          return
        }
        
        this.$store.commit('addSignup');

        // 设置选中
        this.$store.commit('select', {
          type: 'signup'
        });
      },

      // 为确保添加的元件出现在可视区内，用画布向上滚动距离作为元件初始 top 值
      updateSrollTop () {
        var top = document.getElementById('viewport').scrollTop / this.zoom * 100;
        this.$store.commit('updateSrollTop', top)
      }
		}
	}
</script>

<style scoped>
	.menu-bar {
    width: 50px;
    height: 100%;
    border-right: 1px solid #eee;
    color: var(--main);
    padding-top: 10px;
    user-select: none;
  }
  .menu-item {
    display: inline-block;
    text-align: center;
    width: 50px;
    height: 50px;
    cursor: pointer;
    padding-top: 13px;
    transition: all .2s;
    position: relative;
  }
  .menu-caption {
    font-size: 12px;
    position: absolute;
    bottom: 5px;
    width: 100%;
    opacity: 0;
    transition: all .2s;
  }
  .menu-item:hover {
    padding-top: 5px;
  }
  .menu-item:hover i {
    font-size: 20px;
  }
  .menu-item:hover p {
    opacity: 1;
  }
</style>