<template>
  <div style="width: 0">
    <div style="display: none" id="generator">

      <div v-if="reset" class="container" :style="{ paddingTop: height / 750 * 100 + '%' }">
        <div class="wrapper">
          <template v-if="bgImage.length > 0">+- 背景图 -+</template>
          <img v-for="val in bgImage" width="100%" :data-src="val.src">

          <template v-if="image.length > 0">+- 图片 -+</template>
          <div v-for="val in image" abs class="lz-image"
            :class="[val.animationName ? 'anm-' + val.animationName : '']"
            :style="{
              width: val.width / 7.5 + '%',
              height: val.height / height * 100 + '%',
              left: val.left / 7.5 + '%',
              top: val.top / height * 100 + '%',
              zIndex: val.z
            }">
            <!-- hover 图片 -->
            <img v-if="val.hoverPic" :data-src="val.hoverSrc">
            <!-- 带超链接的图 -->
            <a v-if="val.href" :href="val.href">
              <img :data-hover="!!val.hoverPic"
                :data-src="val.src"
                :data-expire="val.expireSrc">
            </a>
            <!-- 不带超链接的图 -->
            <img v-else
              :data-hover="!!val.hoverPic"
              :data-src="val.src"
              :data-expire="val.expireSrc">
          </div>

          <template v-if="text.length > 0">+- 文本 -+</template>
          <div v-for="val in text" class="lz-text" abs v-html="val.text"
            :class="[val.animationName ? 'anm-' + val.animationName : '']"
            :style="{
              width: val.width / 7.5 + '%',
              height: val.height / height * 100 + '%',
              left: val.left / 7.5 + '%',
              top: val.top / height * 100 + '%',
              lineHeight: val.lineHeight,
              zIndex: val.z
            }">
          </div>

          <template v-if="container.length > 0">+- 容器 -+</template>
          <div v-for="(val, i) in container" class="lz-container"
            :class="[val.animationName ? 'anm-' + val.animationName : '', 'lz-container-' + i]"
            :style="{
              width: val.width / 7.5 + '%',
              height: val.height / height * 100 + '%',
              left: val.left / 7.5 + '%',
              top: val.top / height * 100 + '%',
              zIndex: val.z
            }">
            <!-- 图片 -->
            <div v-for="item in val.image" rel class="lz-image"
              :class="[item.animationName ? 'anm-' + item.animationName : '']"
              :style="{
                width: item.width / val.width * 100 + '%',
                height: item.height / val.height * 100 + '%'
              }">
              <img v-if="item.hoverSrc" :data-src="item.hoverSrc">
              <!-- 带超链接的图 -->
              <a v-if="item.href" :href="item.href">
                <img :data-hover="!!item.hoverPic"
                  :data-src="item.src"
                  :data-expire="item.expireSrc">
              </a>
              <!-- 不带超链接的图 -->
              <img v-else :data-hover="!!item.hoverPic"
                :data-src="item.src"
                :data-expire="item.expireSrc">
            </div>
            <!-- 文本 -->
            <div v-for="item in val.text" v-html="item.text"
              :class="[item.animationName ? 'anm-' + item.animationName : '']"
              class="lz-text"
              :style="{
                width: item.width / val.width * 100 + '%',
                height: item.height / val.height * 100 + '%',
                lineHeight: item.lineHeight,
                zIndex: item.z
              }">
            </div>
          </div>
          
          <template v-if="signup">+- 注册组件 -+</template>
          <signup :data="signup" :height="height"></signup>
        </div>
      </div>

    </div><!-- end of generator -->

    <!-- 选择生成哪些代码 -->
    <popbox ref="popbox" title="是否需要以下模块" @confirm="build">
      <div>
        <label>
          <input type="checkbox" name="which" value="bridge" v-model="contain">
          JS Bridge　
        </label>
        <label>
          <input type="checkbox" name="which" value="stats" v-model="contain">
          JS Stats
        </label>
      </div>
    </popbox>

    <!-- 用于复制代码 -->
    <textarea type="text" id="copy" style="height: 0; width: 0"></textarea>
  </div>
</template>

<script>
  import Stats from './stats.js'
  import Bridge from './bridge.js'
  import { baseCSS, signupCSS } from './style.js'
  import { getAnimateCss } from '@/utils/css-generate.js'
  import signup from '@/components/elements/signup/build.vue'

  export default {
    data () {
      return {
        height: 0,
        title: '',
        endTime: '',
        bgImage: [],
        image: [],
        text: [],
        container: [],
        signup: null,
        contain: ['bridge', 'stats'],
        animation: [],
        reset: false
      }
    },

    components: {
      signup: signup
    },

    methods: {
      showDialog () {
        this.$refs.popbox.show = true;
      },

      build () {
        this.reset = false;

        setTimeout(() => {
          this.getData();
          this.reset = true;
        }, 0)

        setTimeout(() => {
          // 去掉某些空属性
          var imgs = document.getElementsByTagName('img');
          for (var i = 0; i < imgs.length; i++) {
            if (!imgs[i].getAttribute('data-expire')) {
              imgs[i].removeAttribute('data-expire')
            }
          }
          // 整合数据
          this.joinData();
        }, 200)
      },

      // 获取并处理源数据
      getData () {
        var image = this.$store.state.h5.image;
        var text = this.$store.state.h5.text;
        var signup = this.$store.state.h5.signup;
        var page = this.$store.state.h5.page;
        this.animation = this.$store.state.h5.animation;
        this.image = image.filter(val => val.belong === 'page');
        this.text = text.filter(val => val.belong === 'page');
        this.bgImage = this.$store.state.h5.bgImage;
        this.container = this.$store.state.h5.container;
        this.title = page.title;
        this.height = page.height;
        this.endTime = page.endTime;

        // 将属于容器的图片和文本添加到容器对象中
        this.container.forEach(val => {
          val.image = [];
          val.text = [];

          for (var i = 0; i < image.length; i++) {
            if (image[i].belong === val.name) {
              val.image.push(image[i])
            }
          }

          for (var i = 0; i < text.length; i++) {
            if (text[i].belong === val.name) {
              val.text.push(text[i])
            }
          }
        });

        // 判断注册组件是否存在
        if (signup) {
          this.signup = signup;

          // 将按钮图片添加到注册组件对象
          var arr = image.filter(val => val.belong === 'signup');
          this.signup.btn = arr[0] || {};
        }
      },

      // 整合数据
      joinData () {
        var title = this.title;
        var time = (new Date(this.endTime)).getTime();

        // 生成动画 CSS
        var animateCss = this.buildAnimateCss();

        // 生成 container css
        var containerCss = this.buildContainerCss();

        var head = 
`<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>${ title }</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no">
</head>
`
+ baseCSS
+ (this.signup ? signupCSS : '')
+ animateCss
+ containerCss
+
`
<body>
`
        // 获取 js bridge 代码
        var bridge = this.contain.indexOf('bridge') > -1 ? Bridge : '';

        // 获取 dom 代码并格式化
        var rootElm = document.getElementById('generator');
        this.walk(rootElm.firstElementChild, this.addIndent, 0);
        var body = this.formatCode(rootElm.innerHTML);

        // 获取注册组件 js 代码
        var signup = !this.signup 
        ? ''
        :
`
<script src="https://js1-itzcdn-com.alikunlun.com/static_res/js/third/jquery-1.9.1.js">\<\/script\>
<script>window.itz = window.itz || {}; window.itz.wap = window.itz.wap || {}\<\/script\>
<script src="https://js1-itzcdn-com.alikunlun.com/static/wap/js/newreg.min.js">\<\/script\>
<script>
  new itz.wap.register({})
\<\/script\>
`
        var js = signup +
`
<script>
  // 项目是否过期
  var isExpired = ${ time } + 24 * 3600 * 1000 < (new Date()).getTime();

  // 设置图片 src
  var imgs = document.getElementsByTagName('img');
  if (isExpired) {
    for (var i = 0; i < imgs.length; i++) {
      var src = imgs[i].getAttribute('data-src');
      var _src = imgs[i].getAttribute('data-expire');
      imgs[i].src = _src || src;
    }
  } else {
    for (var i = 0; i < imgs.length; i++) {
      imgs[i].src = imgs[i].getAttribute('data-src');
    }
  }
\<\/script\>
`
        // 统计代码
        var stats = this.contain.indexOf('stats') > -1 ? Stats : '';

        var tail = 
`</body>
</html>`
  
        // 最终代码字符串
        var output = head + bridge + body + js + stats + tail;

        // 将代码复制到剪贴板
        this.copy2clipboard(output);
      },

      // 代码格式化
      formatCode (str) {
        // 去除某些符号
        str = str.replace(/\=\"\"/g, '');
        str = str.replace(/\<\!\-\-\-\-\>/g, '');

        // 注释
        str = str.replace(/\+\-/g, '\n\n\t\t<!--');
        str = str.replace(/\-\+/g, '-->');

        return str
      },

      // 遍历节点（深度优先遍历）
      walk (node, func, i) {
        func(node, i);
        node = node.firstElementChild;
        i += 1;
        while (node) {
          this.walk(node, func, i);
          node = node.nextElementSibling;
        }
      },

      // 添加代码缩进
      addIndent (node, i) {
        var text = '\r';
        while (i--) {
          text += '\t'
        }
        if (node.firstElementChild) {
          node.appendChild(document.createTextNode(text));
        }
        node.parentNode.insertBefore(document.createTextNode(text), node);
      },

      /**
       * 复制代码到剪贴板
       * 首先将模板字符串添加到 textarea 中
       * 再执行 document.execCommand('copy') 方法
       */
      copy2clipboard (output) {
        this.$refs.popbox.show = false;

        document.getElementById('copy').value = output;
        document.getElementById('copy').select();

        try {
          if (document.execCommand('copy')) {
            $communicator.$emit('notify', {
              info: 'Copied to clipboard !',
              type: true
            })
          } else {
            throw new Error('failed')
          }
        } catch (e) {
          alert(e)
        }
      },

      // 生成动画的 css 代码字符串
      buildAnimateCss () {
        if (this.animation.length === 0) return '';
        var css = '<style>';
        this.animation.map(val => {
          css += getAnimateCss(val.name, val, val.keyframes)
        })
        return css + '</style>'
      },

      // 生成 container css 代码字符串
      buildContainerCss () {
        if (this.container.length === 0) return '';

        var css = '\r<style>\r';
        var i = 0;
        var ref = {
          display: '\r\t\tdisplay: ',
          bgColor: ';\r\t\tbackground-color: ',
          backPicUrl: ';\r\t\tbackground-image: ',
          radius: ';\r\t\tborder-radius: ',
          borderColor: ';\r\t\tborder-color: ',
          borderWidth: ';\r\t\tborder-width: ',
          dir: ';\r\t\tflex-direction: ',
          justify: ';\r\t\tjustify-content: ',
          align: ';\r\t\talign-items: ',
          animationName: ';\r\t\tanimation-name: '
        }

        this.container.map(obj => {
          css += '\t.lz-container-' + i + ' {';
          for (var key in ref) {
            if (!obj[key] || obj[key] === 'row' || obj[key] === 'flex-start') continue;

            if (key === 'backPicUrl') {
              css += (ref[key] + 'url(' + obj[key] + ')');
              continue;
            }

            if (key === 'radius' || key === 'borderWidth') {
              css += (ref[key] + obj[key] + 'px');
              continue;
            }
            css += (ref[key] + obj[key]);
          }

          css += ';\r\t}\r';
          i += 1;
        });

        return css + '</style>'
      }
    }
  }
</script>