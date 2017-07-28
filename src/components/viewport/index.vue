<template>
  <div class="holder" id="viewport">
    <div class="screen"
      @dblclick="replaceImage"
      :style="{
        height: height + 'px', 
        transform: 'scale(' + zoom / 100 + ')'
      }">

      <!-- 背景图 -->
      <bg-pic
        v-for="(val, i) in bgImage"
        :key="i"
        :val="val">
      </bg-pic>

      <!-- 图片 -->
      <pic
        v-for="(val, i) in image"
        :key="i"
        :id="id"
        :val="val"
        :height="height" 
        :width="750"
        :playState="playState">
      </pic>

      <!-- 文本 -->
      <txt
        v-for="(val, i) in text"
        :key="i"
        :id="id"
        :val="val"
        :height="height"
        :width="750"
        :playState="playState">
      </txt>

      <!-- 容器 -->
      <container
        v-for="(val, i) in container"
        :key="i"
        :id="id"
        :val="val"
        :i="i"
        :height="height"
        :playState="playState">
      </container>

      <!-- 注册组件 -->
      <signup :height="height" :id="id"></signup>

      <!-- 参考线 -->
      <ref></ref>

      <!-- 尺寸控制器 -->
      <control></control>
    </div>
  </div>
</template>

<script>
  import bgImage from '../elements/bgImage'
  import pic from '../elements/pic'
  import txt from '../elements/txt'
  import container from '../elements/container'
  import signup from '../elements/signup'
  import ref from './ref-lines'
  import control from './size-control'
  import { move } from '@/mixins'

  export default {
    components: {
      'bg-pic': bgImage,          // 背景图
      pic: pic,                   // 图片
      txt: txt,                   // 文本
      container: container,       // 容器
      signup: signup,             // 注册组件
      ref: ref,                   // 参考线
      control: control            // 尺寸控制
    },

    mixins: [move],

    props: ['zoom'],

    mounted () {
      // 采用事件代理的方式监听元件的选中操作
      document.getElementById('viewport').addEventListener('mousedown', this.handleSelection, false);

      // 绑定键盘上下左右键用于元件的移动
      document.addEventListener('keydown', (e) => {
        e.stopPropagation();
        var target = this.$store.state.h5.activeElement;

        // 左
        if (e.keyCode === 37 && target.left) {
          target.left -= 1;
          return
        }
        // 上
        if (e.keyCode === 38 && target.top) {
          e.preventDefault();
          target.top -= 1;
          return
        }
        // 右
        if (e.keyCode === 39 && target.left) {
          target.left += 1;
          return
        }

        // 下
        if (e.keyCode === 40 && target.top) {
          e.preventDefault();
          target.top += 1;
        }
      }, true)
    },

    methods: {
      handleSelection (e) {
        var target = e.target;
        var type = target.getAttribute('data-type');

        if (type) {
          var index = target.getAttribute('data-index');

          // 设置选中元素
          this.$store.commit('select', {
            type: type,
            index: index ? parseInt(index) : -1
          })

          // 绑定移动事件：只有从属于 page 的，除背景图以外的元件才能移动
          var target = this.$store.state.h5.activeElement;
          if (target.belong === 'page' && type !== 'bgImage') {
            this.initmovement(e);  // 参见 mixins
          }
        } else {
          // 取消选中元素
          this.$store.commit('select', {
            type: 'page',
            index: -1
          })
        }
      },

      // 替换图片
      replaceImage (e) {
        if (this.id.toLowerCase().indexOf('image') > -1) {
          $communicator.$emit('upload', (payload) => {
            this.$store.commit('replaceImage', payload)
          })
        }
      }
    },

    computed: {
      // 画布高度
      height () {
        return this.$store.state.h5.page.height
      },

      // 选中项id
      id () {
        var type = this.$store.state.h5.type;
        var index = this.$store.state.h5.index;
        index = index >= 0 ? index : '';
        return type + index;
      },

      // 图片
      image () {
        return this.$store.getters.image.filter(val => val.belong === 'page')
      },

      // 图片
      bgImage () {
        return this.$store.getters.bgImage
      },

      // 文本
      text () {
        return this.$store.getters.text.filter(val => val.belong === 'page')
      },

      // 容器
      container () {
        return this.$store.state.h5.container
      },

      // 动画播放状态
      playState () {
        return this.$store.state.h5.playState
      }
    }
  }
</script>

<style scoped>
  .holder {
    height: 100%;
    overflow: auto;
    font-size: 0;
  }
  .screen {
    width: 750px;
    background-image:
      linear-gradient(45deg, #f5f5f5 25%, transparent 0, transparent 75%, #f5f5f5 0),
      linear-gradient(45deg, #f5f5f5 25%, transparent 0, transparent 75%, #f5f5f5 0);
    background-position: 0 0, 16px 16px;
    background-size: 32px 32px;
    margin: 25px auto;
    transform-origin: center top;
    position: relative;
  }
</style>