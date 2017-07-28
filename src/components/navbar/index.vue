<template>
  <div class="nav" flex>
    <!-- logo -->
    <div class="logo"></div>
    
    <!-- 菜单栏 -->
    <ul flex class="middle">
      <li @click="copy">
        <i class="material-icons">code</i>
      </li>
    </ul>

    <!-- 工具栏 -->
    <div class="side">
      <ul v-show="show">
        <li title="复制元件 Ctrl + C" @click="copyWidget">
          <i class="material-icons f18">note_add</i>
        </li>
        <li title="删除元件 Delete" @click="dele">
          <i class="material-icons f20">delete_forever</i>
        </li>
      </ul>
    </div>

    <!-- 代码生成组件 -->
    <factory ref="factory"></factory>
  </div>
</template>

<script>
  import factory from '@/components/factory'
  export default {
    components: {
      factory: factory         // 生成代码组件
    },
    mounted () {
      // Ctrl + C 复制元件
      document.addEventListener('keyup', (e) => {
        e.stopPropagation();
        if (e.ctrlKey && e.keyCode === 67) {
          this.$store.commit('copy')
        }
      }, true);

      // Delete 删除选中元件
      document.addEventListener('keyup', (e) => {
        e.stopPropagation();
        if (e.keyCode === 46) {
          this.$store.commit('delete')
        }
      }, true);
    },

    methods: {
      // 生成并复制代码
      copy () {
        this.$refs.factory.showDialog()
      },

      // 复制元件
      copyWidget () {
        this.$store.commit('copy')
      },

      // 删除元件
      dele () {
        this.$store.commit('delete')
      }
    },
    
    computed: {
      show () {
        return this.$store.state.h5.type !== 'page'
      }
    }
  }
</script>

<style scoped>
  .logo {
    width: 50px;
    height: 50px;
    background: url(../../assets/cat.png) no-repeat right bottom/90%;
  }
  .nav {
    width: 100%;
    height: 50px;
    flex-shrink: 0;
    background-color: var(--main);
  }
  .middle {
    flex-grow: 1;
    justify-content: center;
  }
  .side {
    width: 400px;
    height: 50px;
  }
  li {
    display: inline-block;
    width: 50px;
    height: 50px;
    cursor: pointer;
    line-height: 50px;
  }
  i {
    color: #eee;
    line-height: inherit;
    vertical-align: middle;
  }
  .pt12 {
    padding-top: 12px;
  }
  .pt14 {
    padding-top: 14px;
  }
  .f16 {
    font-size: 16px;
  }
  .f18 {
    font-size: 18px;
  }
  .f20 {
    font-size: 20px;
  }
</style>