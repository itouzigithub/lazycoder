<template>
  <div
    class="txt"
    v-html="val.text"
    @mousedown="handleSelection"
    @mouseup.stop="syncFontParam"
    @blur="updateText(val.index)"
    :id="'text' + val.index"
    :class="[{'g-active': isCurrent}, playState ? 'anm-' + val.animationName : '']"
    :contenteditable="editable"
    :style="{
      position: val.belong === 'page' ? 'absolute' : 'relative',
      left: val.belong === 'page' ? val.left / width * 100 + '%' : '0',
      top: val.belong === 'page' ? val.top / height * 100 + '%' : '0',
      width: val.width / width * 100 + '%',
      height: val.height / height * 100 + '%',
      zIndex: val.z,
      lineHeight: val.lineHeight
    }">
  </div>
</template>

<script>
  import { move } from '@/mixins'
  export default {
    // 属性含义参照 widget-image.vue
    props: ['val', 'height', 'width', 'id', 'playState'],

    data () {
      return {
        editable: false,
        t: 0
      }
    },

    mixins: [move],

    methods: {
      handleSelection (e) {
        e.stopPropagation();

        if (this.editable) return;

        // 提交元件选中事件
        this.$store.commit('select', {
          type: 'text',
          index: this.val.index
        })

        // 模拟双击事件
        var now = Date.now();
        var dt = now - this.t;
        this.t = now;
        if (dt < 300) {
          this.editable = true;
          return;
        }

        // 绑定移动事件：只有从属于 page 的元件才能移动
        var target = this.$store.state.h5.activeElement;
        if (target.belong === 'page' && !this.editable) {
          this.initmovement(e);  // 参见 mixins
        }
      },

      // 更新文本
      updateText (index) {
        var id = 'text' + index;
        var text = document.getElementById(id).innerHTML;
        this.$store.commit('updateText', {
          index: index,
          text: text
        })
      },

      // 文本元件编辑状态下，点击文本时，同步字体参数
      syncFontParam (e) {
        var sele = document.getSelection();
        var bold = false;

        if (sele.toString()) {
          var node = sele.anchorNode.nodeName;
          var pnode = sele.anchorNode.parentNode.nodeName;

          if (node === 'B' || pnode === 'B') {
            bold = true;
          }
        }

        $communicator.$emit('syncFont', bold)
      }
    },

    computed: {
      isCurrent () {
        if ('text' + this.val.index === this.id) {
          return true
        } else {
          this.editable = false;
          return false
        }
      }
    }
  }
</script>

<style scoped>
  .txt {
    outline: none;
    font-size: 28px;
  }
</style>