<template>
  <div class="panel-wrap" v-if="tab === 3">
    <div class="func" style="right: 100px" v-show="currentAnimation">
      <i class="material-icons" @click="copy" style="font-size: 16px">content_copy</i>
    </div>

    <div class="func" style="right: 60px">
      <i class="material-icons" @click="addAnimation">add</i>
    </div>

    <div class="func" style="right: 20px; transform: rotate(30deg); padding-top: 3px;">
      <i class="material-icons" @click="play" style="font-size: 20px">details</i>
    </div>

    <div class="panel-row" flex>
      <i class="material-icons">bookmark_border</i>
      <div class="panel-label">选择动画</div>
      <div class="panel-value">
        <select v-model="currentName">
          <option value="">无</option>
          <option v-for="val in animationNames" :value="val">{{ val }}</option>
        </select>
      </div>
    </div>

    <div v-if="currentAnimation">
      <hr>
      <div class="panel-row" flex>
        <i class="material-icons">title</i>
        <div class="panel-label">动画名称</div>
        <div class="panel-cell">
          <input type="text" v-model.trim="currentAnimation.name" @input="validateName" placeholder="动画名称，仅限英文" @blur="checkDuplication">
        </div>
      </div>

      <div class="panel-row" flex>
        <i class="material-icons">alarm</i>
        <div class="panel-label">动画时长</div>
        <div class="panel-value">
          <input type="text" v-model.number="currentAnimation.duration" placeholder="请输入大于0的数字">
        </div>
      </div>

      <div class="panel-row" flex>
        <i class="material-icons">hourglass_empty</i>
        <div class="panel-label">动画延迟</div>
        <div class="panel-value">
          <input type="text" v-model.number="currentAnimation.delay" placeholder="请输入不小于0的数字">
        </div>
      </div>

      <div class="panel-row" flex>
        <i class="material-icons">cached</i>
        <div class="panel-label">动画循环</div>
        <div class="panel-cell">
          <input type="text" v-model.number="currentAnimation.iteration" placeholder="输入0表示无限循环">
        </div>
      </div>

      <div class="panel-row" flex>
        <i class="material-icons">show_chart</i>
        <div class="panel-label">缓动函数</div>
        <div class="panel-value">
          <select v-model="currentAnimation.timing">
            <option>linear</option>
            <option>ease</option>
            <option>ease-in</option>
            <option>ease-out</option>
            <option>ease-in-out</option>
          </select>
        </div>
      </div>

      <div class="panel-row" flex>
        <i class="material-icons">swap_vert</i>
        <div class="panel-label">动画方向</div>
        <div class="panel-value">
          <select v-model="currentAnimation.direction">
            <option>normal</option>
            <option>reverse</option>
            <option>alternate</option>
            <option>alternate-reverse</option>
          </select>
        </div>
      </div>

      <div class="panel-row" flex>
        <i class="material-icons">power_settings_new</i>
        <div class="panel-label">fill-mode</div>
        <div class="panel-value">
          <select v-model="currentAnimation.fill">
            <option>none</option>
            <option>forwards</option>
            <option>backwards</option>
            <option>both</option>
          </select>
        </div>
      </div>

      <hr>
  
      <div v-for="(val, i) in currentAnimation.keyframes">
        <div class="panel-row" flex>
          <i class="material-icons">star_border</i>
          <div class="panel-label">stop - {{ i }}</div>
          <div class="panel-value">{{ val.stop }}%</div>
          <div class="panel-slider-wrap">
            <slider :step="1" v-model="val.stop" />
          </div>
        </div>
        <textarea placeholder="IMPORTANT: use rem, not px" v-model="val.css"></textarea>
        <i 
          class="material-icons addframe" 
          v-if="i + 1 === currentAnimation.keyframes.length"
          @click="addkeyframe">
          add
        </i>
      </div>
    </div>
  </div>
</template>

<script>
  import { getAnimateCss } from '@/utils/css-generate.js'
  export default {
    props: ['activeElement', 'tab'],

    data () {
      return {
        currentName: '',
        currentAnimation: null,
        base: 0
      }
    },

    computed: {
      animationNames () {
        var arr = [];
        this.$store.state.h5.animation.map(val => arr.push(val.name));

        return arr
      }
    },

    methods: {
      addAnimation () {
        // 检查是否存在未命名动画，避免重复添加
        if (this.$store.state.h5.animation.some(val => val.name === '')) {
          $communicator.$emit('notify', {
            info: '还有未命名动画，请先命名',
            type: false
          })
          return;
        }
        this.$store.commit('addAnimation');
        this.currentName = '';
        this.getCurrentAnimation('');
      },

      getCurrentAnimation (name) {
        var result = this.$store.state.h5.animation.filter(val => val.name === name);
        this.currentAnimation = result[0];
      },

      addkeyframe () {
        var name = this.currentAnimation.name;
        if (name === '') {
          $communicator.$emit('notify', {
            info: '请先为动画命名'
          })
          return;
        }
        this.$store.commit('addkeyframe', name)
      },

      validateName (e) {
        var value = e.target.value;
        if (value === '') return;
        if (!/^[a-zA-Z]/.test(value)) {
          this.$nextTick(() => {
            this.currentAnimation.name = '';
          })
          $communicator.$emit('notify', {
            info: '动画名称必须以英文开头',
            type: false
          });
        }

        if (/\W/g.test(value)) {
          this.$nextTick(() => {
            this.currentAnimation.name = value.replace(/\W/g, '');
          })
          $communicator.$emit('notify', {
            info: '请勿使用英文和数字以外的字符',
            type: false
          });
        }
      },

      play () {
        // stop animation if any
        this.$store.commit('setAnimation', false);

        setTimeout(() => {
          var animations = this.$store.state.h5.animation;
          if (animations.length === 0) return;

          animations.map(val => {
            // build style code and insert into document
            var id = 'anm-' + val.name;
            var styleNode = document.getElementById(id);

            if (styleNode) {
              styleNode.innerHTML = getAnimateCss(val.name, val, val.keyframes, false);
            } else {
              var style = document.createElement('style');
              style.id = id;
              style.innerHTML = getAnimateCss(val.name, val, val.keyframes, false);
              document.head.append(style)
            }
          })

          this.$store.commit('setAnimation', true);
        }, 200)
      },

      copy () {
        var name = this.currentAnimation.name;
        if (name === '') {
          $communicator.$emit('notify', {
            info: '请先为动画命名'
          })
          return;
        }
        name = (name.split('-')[0] + '-' + this.base);
        this.base += 1;

        var cp = JSON.parse(JSON.stringify(this.currentAnimation));
        cp.name = name;
        this.$store.commit('copykeyframe', cp)
      },

      checkDuplication (e) {
        var arr = [];
        this.$store.state.h5.animation.map(val => {
          if (arr.indexOf(val.name) >= 0) {
            $communicator.$emit('notify', {
              info: '动画名称不可重复',
              type: false
            })

            e.target.focus();
            return
          } else {
            arr.push(val.name)
          }
        })
      }
    },

    watch: {
      currentName: function (val) {
        // 设置选中元件的动画名称
        if (this.activeElement.animationName !== undefined) {
          this.activeElement.animationName = val;
        }
        this.getCurrentAnimation(val)
      },

      // 选中元件变化，动画参数面板相应变化
      activeElement: function (val) {
        if (val.animationName !== undefined) {
          this.currentName = val.animationName;
        } else {
          this.currentName = '';
        }
      }
    }
  }
</script>

<style scoped>
  .func {
    width: 32px;
    height: 32px;
    line-height: 32px;
    border-radius: 50%;
    transition: all, .3s;
    text-align: center;
    position: absolute;
    top: 16px;
    color: var(--main);
    cursor: pointer;
  }
  .func i {
    line-height: inherit;
  }
  .func:hover {
    background-color: #f5f5f5;
  }
  textarea {
    width: 290px;
    height: 100px;
    resize: none;
    border-radius: 4px;
    padding: 4px 6px;
    margin-left: 20px;
    border-color: #ccc;
  }
  .addframe {
    cursor: pointer;
    font-size: 18px;
    transition: all .3s;
    margin-left: 10px;
    vertical-align: bottom;
    color: var(--main-light);
  }
  .addframe:hover {
    color: var(--main);
  }
</style>