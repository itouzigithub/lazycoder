<template>
  <div class="app">
    <!-- 顶栏 -->
    <navbar></navbar>

    <!-- 主体 -->
    <div flex class="body">
      <!-- 左侧元件菜单 -->
      <toolbar :zoom="zoom"></toolbar>

      <!-- 中部编辑区 -->
      <div class="viewport">
        <!-- 画布 -->
        <viewport :zoom="zoom"></viewport>

        <!-- 页面缩放 -->
        <div class="zoom-wrap">
          <slider @input="dozoom" :value="zoom" :step="1" :tuning="false" />
          <div class="zoom-value">{{ zoom }}%</div>
        </div>
      </div>

      <!-- 右侧参数面板 -->
      <panel></panel>
    </div>
    
    <!-- 全局组件 | 上传图片 -->
    <uploader></uploader>

    <!-- 全局组件 | 提示信息 -->
    <toast></toast>
  </div>
</template>

<script>
  import navbar from './components/navbar'
  import toolbar from './components/toolbar'
  import panel from './components/panel'
  import viewport from './components/viewport'

  export default {
    components: {
      navbar: navbar,             // 顶部导航栏
      toolbar: toolbar,           // 左侧菜单栏
      panel: panel,               // 右侧参数面板
      viewport: viewport          // 页面画布
    },

    mounted () {
      // 初始化选中元件（将页面作为初始选中元件）
      this.$store.commit('initActive')
    },

    methods: {
      dozoom (val) {
        this.$store.commit('zoom', val)
      }
    },

    computed: {
      zoom () {
        return this.$store.state.h5.zoom
      }
    }
  }
</script>

<style scoped>
  .body {
    width: 100%;
    height: calc(100% - 50px);
    overflow: hidden;
  }
  .viewport {
    height: 100%;
    flex-grow: 1;
    position: relative;
    overflow: hidden;
  }
  .zoom-wrap {
    width: 200px;
    height: 30px;
    position: absolute;
    bottom: 20px;
    right: 20px;
    opacity: 0;
    transition: opacity .3s;
  }
  .viewport:hover .zoom-wrap{
    opacity: 1;
  }
  .zoom-value {
    position: absolute;
    top: 4px;
    left: -36px;
  }
</style>

<style>
  /* global variables */
  :root {
    /*--main: #2a2e45;*/
    --main: #1a237e;
    --main-light: rgba(26, 35, 126, .3);
    --sub: #ff5722;
    --sub-light: rgba(255, 87, 34, .3);
  }

  /* google material font */
  @font-face {
    font-family: 'Material Icons';
    font-style: normal;
    font-weight: 400;
    src: url(./assets/MaterialIcons-Regular.ttf) format('truetype');
  }
  .material-icons {
    font-family: 'Material Icons';
    font-weight: normal;
    font-style: normal;
    font-size: 24px;
    line-height: 1;
    text-transform: none;
    letter-spacing: normal;
    word-wrap: normal;
    white-space: nowrap;
    direction: ltr;
    transition: all .2s;
    text-rendering: optimizeLegibility;
  }

  [flex] {
    display: flex;
  }

  [rel] {
    position: relative;
  }

  [abs] {
    position: absolute;
  }

  .g-active {
    outline: 1px solid var(--sub) !important;
  }

  /* basic reset */
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  html,
  body,
  .app {
    height: 100%;
  }
  html {
    font-size: 28px;
  }
  body {
    -webkit-font-smoothing: antialiased;
    text-size-adjust: 100%;
    font-size: 14px;
    font-family: STXihei, "华文细黑", "Microsoft YaHei", "微软雅黑";
  }
  a {
    color: inherit;
    text-decoration: none;
  }
  a:active,
  a:focus,
  a:hover {
    outline-width: 0;
    background-color: transparent;
  }
  ul, 
  ol {
    list-style-type: none;
  }
  img {
    border: none;
  }
  input {
    border:  none;
    outline: none;
    background-color: transparent;
    font-family: inherit;
  }
  input[type="color"] {
    cursor: pointer;
    vertical-align: middle;
  }
  input[type="checkbox"] {
    cursor: pointer;
    vertical-align: middle;
  }
  label {
    cursor: pointer;
  }
  select {
    appearance: none;
    outline: none;
    border: none;
    cursor: pointer;
    font-family: inherit;
  }
  textarea {
    outline: none;
    font-family: inherit;
  }
  ::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }
  ::-webkit-scrollbar-thumb {
    border-radius: 3px;
    background-color: #e9e9e9;
  }
  ::-webkit-input-placeholder {
    color: #ccc;
  }
</style>
