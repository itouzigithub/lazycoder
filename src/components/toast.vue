<template>
  <transition name="drop">
    <div class="toast" v-show="show">{{ info }}</div>
  </transition>
</template>

<script>
  export default {
    data () {
      return {
        info: '',
        type: true,
        show: false
      }
    },
    mounted () {
      $communicator.$on('notify', (option) => {
        this.notify(option.info, option.type)
      })
    },
    methods: {
      notify (info, type) {
        if (this.show) return;
        this.info = info || 'Success!';
        this.type = type || true;
        this.show = true;
        setTimeout(() => {
          this.show = false;
        }, 2000)
      }
    }
  }
</script>

<style scoped>
  .toast {
    width: 240px;
    height: 50px;
    line-height: 50px;
    text-align: center;
    border-radius: 25px;
    background-color: var(--sub);
    color: #fff;
    position: absolute;
    left: 0;
    right: 0;
    margin: 0 auto;
    box-shadow: 0 8px 20px -4px #666;
    top: 70px;
    transition: all .3s;
  }
  .drop-enter, .drop-leave-active {
    opacity: 0;
    top: 60px;
  }
</style>