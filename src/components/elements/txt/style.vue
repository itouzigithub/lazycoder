<template>
	<div v-if="activeElement.type === 'text'">
    <hr>

    <div class="panel-row" flex>
      <i class="material-icons">format_line_spacing</i>
      <div class="panel-label">行高</div>
      <div class="panel-value">{{ activeElement.lineHeight }}</div>
      <div class="panel-slider-wrap">
        <slider :max="5" :min="1" v-model="activeElement.lineHeight" />
      </div>
    </div>

    <div class="panel-row" flex>
      <i class="material-icons">format_size</i>
      <div class="panel-label">字号</div>
      <div class="panel-value">{{ fontSize | convertFont }}px</div>
      <div class="panel-slider-wrap">
        <slider :step="1" :max="7" :min="1" v-model="fontSize" @input="execCommand('fontSize')" />
      </div>
    </div>

    <div class="panel-row" flex>
      <i class="material-icons">format_color_text</i>
      <div class="panel-label">颜色</div>
      <div class="panel-value">{{ foreColor }}</div>
      <div>
        <input type="color" v-model="foreColor" @input="execCommand('foreColor')">
      </div>
    </div>

    <div class="panel-row" flex>
      <i class="material-icons">format_bold</i>
      <div class="panel-label">加粗</div>
      <div>
        <input type="checkbox" v-model="bold" @mousedown="execSingleCommand('bold')">
      </div>
    </div>

    <div class="panel-row" flex>
      <i class="material-icons">format_align_justify</i>
      <div class="panel-label" @mousedown="execSingleCommand('justifyCenter')">对齐</div>
      <div>
        <input type="radio" name="align" value="left" id="txleft" 
          v-model="activeElement.align">
        <label for="txleft" title="左对齐" class="material-icons" 
          @mousedown="execSingleCommand('justifyLeft')">
          format_align_left
        </label>

        <input type="radio" name="align" value="center" id="txcenter" 
          v-model="activeElement.align">
        <label for="txcenter" title="居中" class="material-icons"
          @mousedown="execSingleCommand('justifyCenter')">
          format_align_center
        </label>

        <input type="radio" name="align" value="right" id="txright" 
          v-model="activeElement.align">
        <label for="txright" title="右对齐" class="material-icons"
          @mousedown="execSingleCommand('justifyRight')">
          format_align_right
        </label>
      </div>
    </div>
  </div>
</template>

<script>
	export default {
		props: ['activeElement'],

    mounted () {
      // 注册一个全局事件，来同步选中文本的参数
      $communicator.$on('syncFont', (val) => {
        this.bold = val;
      })
    },

    methods: {
      execCommand (type) {
        var _this = this;
        document.execCommand(type, false, _this[type]);
        // 重置色值
        this.foreColor = '#333333'
      },
      execSingleCommand (type) {
        document.execCommand(type)
      }
    },

    data () {
      return {
        fontSize: 1,
        foreColor: '#333333',
        bold: false
      }
    },

    filters: {
      convertFont (val) {
        switch (val) {
          case 1:
            return 12;
          case 2:
            return 14;
          case 3:
            return 16;
          case 4:
            return 18;
          case 5:
            return 24;
          case 6:
            return 28;
          case 7:
            return 32;
        }
      }
    }
	}
</script>