<template>
  <div class="panel-wrap" v-if="!activeElement.page && tab === 1">
    <!-- 公共属性 -->
    <div class="panel-row" flex>
      <i class="material-icons">layers</i>
      <div class="panel-label">层级</div>
      <div class="panel-value">{{ activeElement.z }}</div>
      <div class="panel-slider-wrap">
        <slider v-model="activeElement.z" :step="1" :max="20" />
      </div>
    </div>

    <div class="panel-row" flex>
      <i class="material-icons">border_horizontal</i>
      <div class="panel-label">宽度</div>
      <div class="panel-value">{{ activeElement.width }}</div>
      <div class="panel-slider-wrap">
        <slider v-model="activeElement.width" :step="1" :max="750" />
      </div>
    </div>

    <div class="panel-row" flex>
      <i class="material-icons">border_vertical</i>
      <div class="panel-label">高度</div>
      <div class="panel-value">{{ activeElement.height }}</div>
      <div class="panel-slider-wrap">
        <slider v-model="activeElement.height" :step="1" :max="height" />
      </div>
    </div>

    <div class="panel-row" flex>
      <i class="material-icons">arrow_back</i>
      <div class="panel-label">横坐标</div>
      <div class="panel-value">{{ activeElement.left }}</div>
      <div class="panel-slider-wrap">
        <slider v-model="activeElement.left" :step="1" :max="750" />
      </div>
    </div>

    <div class="panel-row" flex>
      <i class="material-icons">arrow_upward</i>
      <div class="panel-label">纵坐标</div>
      <div class="panel-value">{{ activeElement.top }}</div>
      <div class="panel-slider-wrap">
        <slider v-model="activeElement.top" :step="1" :max="height" />
      </div>
    </div>

    <!-- 文本样式 -->
    <txt-style :activeElement="activeElement"></txt-style>
    
    <!-- 容器样式 -->
    <contain-style :activeElement="activeElement"></contain-style>

    <!-- 注册组件样式 -->
    <signup-style :activeElement="activeElement"></signup-style>

    <!-- 添加到容器 -->
    <div v-if="activeElement.type === 'image' || activeElement.type === 'text'">
      <hr>
      <div class="panel-row" flex>
        <i class="material-icons">move_to_inbox</i>
        <div class="panel-label">所属容器</div>
        <div class="panel-value">
          <select v-model="activeElement.belong">
            <option>page</option>
            <option v-for="val in containerName">{{ val }}</option>
          </select>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import txt from '@/components/elements/txt/style.vue'
  import contain from '@/components/elements/container/style.vue'
  import signup from '@/components/elements/signup/style.vue'

	export default {
    components: {
      'txt-style': txt,
      'contain-style': contain,
      'signup-style': signup
    },

    props: ['activeElement', 'tab'],

		computed: {
      // 页面高度
      height () {
        return this.$store.state.h5.page.height
      },

      // 容器名称
      containerName () {
        return this.$store.getters.containerName
      }
    }
	}
</script>