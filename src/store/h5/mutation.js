export default {
  // 选中元件与取消选中
  select (state, payload) {
    state.type = payload.type;
    state.index = payload.index;
    var target = state[payload.type]
    if (Array.isArray(target)) {
      state.activeElement = state[payload.type][payload.index];
    } else {
      state.activeElement = state[payload.type]
    }
  },

  // 设置 mousemove 操作的初始值
  initmove (state, payload) {
    state.startX = payload.startX;
    state.startY = payload.startY;
    state.originX = payload.originX;
    state.originY = payload.originY;
    state.moving = true;
  },

  // 元件移动结束
  stopmove (state) {
    state.moving = false;
  },

  // 移动元件
  move (state, payload) {
    var target = state.activeElement;
    var dx = payload.x - state.startX;
    var dy = payload.y - state.startY;
    var left = state.originX + Math.floor(dx * 100 / state.zoom);
    var top = state.originY + Math.floor(dy * 100 / state.zoom);

    target.left = left > 0 ? left : 0;
    target.top = top > 0 ? top : 0;
  },

  // 调整元件尺寸
  resize (state, payload) {
    var dx = payload.x - state.startX;
    var dy = payload.y - state.startY;

    if (payload.type === 'right') {
      var value = state.originX + Math.floor(dx * 100 / state.zoom);
      state.activeElement.width = value > 10 ? value : 10;
      return;
    }

    if (payload.type === 'down') {
      var value = state.originX + Math.floor(dy * 100 / state.zoom);
      state.activeElement.height = value > 10 ? value : 10;
      return;
    }

    if (payload.type === 'left') {
      var left = state.originX + Math.floor(dx * 100 / state.zoom);
      var width = state.originY - Math.floor(dx * 100 / state.zoom);
      state.activeElement.left = left > 0 ? left : 0;
      state.activeElement.width = width > 10 ? width : 10;
      return;
    }

    if (payload.type === 'up') {
      var top = state.originX + Math.floor(dy * 100 / state.zoom);
      var height = state.originY - Math.floor(dy * 100 / state.zoom);
      state.activeElement.top = top > 0 ? top : 0;
      state.activeElement.height = height > 10 ? height : 10;
    }
  },

  // 复制元件
  copy (state, payload) {
    if (state.type === 'image' || state.type === 'text' || state.type === 'container') {
      var copy = Object.assign({}, state.activeElement);

      // 由于容器的名称必须是唯一的，故复制容器需作处理
      if (state.type === 'container') {
        var name = state.activeElement.name;
        if (name) {
          // 设置容器副本的名称
          var copyName = name.split('-')[0] + '-' + state.counter;
          copy.name = copyName;

          // 复制容器内的图片和文本
          for (var i = 0, len = state.image.length; i < len; i++) {
            if (state.image[i].belong === name) {
              state.image.push(Object.assign({}, state.image[i], {belong: copyName}))
            }
          }
          for (var i = 0, len = state.text.length; i < len; i++) {
            if (state.text[i].belong === name) {
              state.text.push(Object.assign({}, state.text[i], {belong: copyName}))
            }
          }

          state.counter += 1;
        } else {
          $communicator.$emit('notify', {
            info: '只有命名容器才能复制，请先命名',
            type: false
          })
        }
      }

      state[state.type].push(copy)
    }
  },

  // 更新元件初始 top 值
  updateSrollTop (state, top) {
    state.top = top;
  },

  // 页面缩放
  zoom (state, val) {
    state.zoom = val
  },

  // 初始化选中对象
  initActive (state) {
    state.activeElement = state.page;
  },

  // 删除选中元件
  delete (state) {
    var type = state.type;
    if (type === 'page') return;
    
    // 如果删除的是容器，须将内部元件一并删除
    if (type === 'container') {
      var name = state.activeElement.name;

      for (var i = 0; i < state.image.length; i++) {
        if (state.image[i].belong === name) {
          state.image.splice(i, 1)
        }
      }
      for (var i = 0; i < state.text.length; i++) {
        if (state.text[i].belong === name) {
          state.text.splice(i, 1)
        }
      }
    }

    // 删除元件
    if (Array.isArray(state[type])) {
      state[type].splice(state.index, 1);
    } else {
      state[type] = null;
    }

    // 重置 activeElement
    state.activeElement = state.page;
    state.type = 'page';
    state.index = -1;
  },

  // 添加背景图
  addBackImage (state, payload) {
    var base = {
      type: 'bgImage',
      href: '',
      belong: 'page'
    }

    payload.forEach(function (val) {
      state.bgImage.push(Object.assign({}, base, val))
    })
  },

  // 添加图片
  addImage (state, payload) {
    var base = {
      type: 'image',
      left: 0,
      z: 0,
      href: '',                         // 超链接
      hoverPic: '',                     // hover 图片预览的 url（base64 或 线上路径）
      hoverSrc: '',                     // hover 图片实际的 url
      expirePic: '',                    // 结束状态 图片预览的 url（base64 或 线上路径）
      expireSrc: '',                    // 结束状态 图片实际的 url
      belong: 'page',                   // 属于哪个容器
      animationName: ''
    }

    payload.forEach(function (val) {
      state.image.push(Object.assign({}, base, val))
    })
  },

  // 添加 hover 图片
  addHoverPic (state, payload) {
    state.activeElement.hoverPic = payload[0].url;
    state.activeElement.hoverSrc = payload[0].src;
  },

  // 添加 结束状态 图片
  addExpirePic (state, payload) {
    state.activeElement.expirePic = payload[0].url;
    state.activeElement.expireSrc = payload[0].src;
  },

  // 替换图片
  replaceImage (state, payload) {
    state.activeElement.width = payload[0].width;
    state.activeElement.url = payload[0].url;
  },

  // 添加文本
  addText (state) {
    state.text.push({
      type: 'text',
      width: 650,
      height: 100,
      left: 50,
      top: state.top,
      z: 0,
      lineHeight: 1.6,
      text: '',
      href: '',
      belong: 'page',
      animationName: ''
    });
  },

  // 更新文本
  updateText (state, payload) {
    var target = state.text[payload.index];
    if (target) {
      target.text = payload.text;
    }
  },

  // 添加容器
  addContainer (state) {
    state.container.push({
      type: 'container',
      name: '',
      width: 650,
      height: 300,
      left: 50,
      top: state.top,
      z: 0,
      display: 'flex',
      bgColor: '',
      backPic: '',
      backPicUrl: '',
      radius: 0,
      borderColor: '',
      borderWidth: 0,
      dir: 'row',
      justify: 'flex-start',
      align: 'flex-start',
      belong: 'page',
      animationName: ''
    });
  },

  // 添加容器背景图
  addContainerBackPic (state, payload) {
    state.activeElement.backPic = payload[0].url;
    state.activeElement.backPicUrl = payload[0].src;
    state.activeElement.width = payload[0].width;
    state.activeElement.height = payload[0].height;
  },

  // 添加注册组件
  addSignup (state) {
    state.signup = {
      type: 'signup',
      width: 650,
      height: 700,
      left: 50,
      top: 0,
      z: 0,
      belong: 'page',
      phoneIcon: '',                        // 手机图标
      phoneIconSrc: '',                     // 手机图标路径
      passIcon: '',                         // 密码图标
      passIconSrc: '',                      // 密码图标路径
      graphIcon: '',                        // 图形验证码图标
      graphIconSrc: '',                     // 图形验证码图标路径
      valiIcon: '',                         // 短信验证码图标
      valiIconSrc: '',                      // 短信验证码图标路径
      inviteIcon: '',                       // 邀请图标
      inviteIconSrc: '',                    // 邀请图标路径
      bottom: 80,                           // 注册按钮位置
      hideSignIn: false,
      hideInvite: false,
      toggleVali: true,
      btn: {}
    }
  },

  // 添加注册组件的图标
  addSignIcon (state, payload) {
    var sign = state.signup;
    var name = payload.name;
    sign[name] = payload.payload.url;
    sign[name + 'Src'] = payload.payload.src;
  },

  // 添加动画
  addAnimation (state) {
    state.animation.push({
      name: '',
      duration: 3,
      delay: 0,
      iteration: 1,
      timing: 'linear',
      direction: 'normal',
      fill: 'none',
      keyframes: [
        {
          stop: 0,
          css: ''
        }
      ]
    })
  },

  copykeyframe (state, copy) {
    state.animation.push(copy)
  },

  // 为动画添加 keyframe
  addkeyframe (state, name) {
    state.animation.map(val => {
      if (val.name === name) {
        val.keyframes.push({
          stop: 0,
          css: ''
        });
        return;
      }
    })
  },

  // 动画的播放与停止
  setAnimation (state, status) {
    state.playState = status;
  }
}