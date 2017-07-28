<template>
  <div class="panel-wrap" v-if="tab === 2">
    <div class="panel-row" flex>
      <i class="material-icons">touch_app</i>
      <div class="panel-label">点击时</div>
    </div>

    <div class="panel-row" flex v-if="activeElement.href !== undefined">
      <div class="panel-label">链接至</div>
      <div class="cell">
        <input type="text" v-model="activeElement.href" placeholder="绝对路径，以https://开头">
      </div>
    </div>

    <div class="panel-row" flex v-if="activeElement.href !== undefined">
      <div class="panel-label">跳转至</div>
      <div class="cell">
        <select>
          <option>无</option>
          <option>投资列表</option>
          <option>首投抽奖</option>
          <option>邀请好友</option>
        </select>
      </div>
    </div>

    <div class="panel-row" flex v-if="activeElement.hoverPic !== undefined">
      <div class="panel-label">hover 图片</div>
      <div class="cell">
        <div class="panel-preview"
          @click="addPic('addHoverPic')"
          :style="{ backgroundImage: 'url(' + activeElement.hoverPic + ')' }">
          <i class="material-icons" v-show="!activeElement.hoverPic">add</i>
        </div>
      </div>
    </div>

    <hr>

    <div class="panel-row" flex>
      <i class="material-icons">history</i>
      <div class="panel-label">活动结束时</div>
    </div>

    <div class="panel-row" flex v-if="activeElement.expirePic !== undefined">
      <div class="panel-label">结束图片</div>
      <div class="cell">
        <div class="panel-preview"
          @click="addPic('addExpirePic')"
          :style="{ backgroundImage: 'url(' + activeElement.expirePic + ')' }">
          <i class="material-icons" v-show="!activeElement.expirePic">add</i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['activeElement', 'tab'],
    methods: {
      /**
       * 添加/替换图片
       * 
       * @param type { String } 添加图片类型
       */
      addPic (type) {
        $communicator.$emit('upload', (payload) => {
          this.$store.commit(type, payload)
        })
      }
    }
  }
</script>

<style scoped>
  .cell {
    flex-grow: 1;
    padding-left: 20px;
  }
  select {
    height: 100%;
  }
  input {
    width: 100%;
  }
</style>