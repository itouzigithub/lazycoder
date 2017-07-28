var baseCSS = 
`
<style>
  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }
  html,
  body {
    height: 100%;
  }
  html {
    font-size: 14px;
  }
  @media (min-width > 400px) {
    html {
      font-size: 16px;
    }
  }
  @media (max-width < 350px) {
    html {
      font-size: 13px; 
    }
  }
  body {
    -webkit-font-smoothing: antialiased;
    text-size-adjust: 100%;
    font-size: 0;
  }
  a {
    color: inherit;
    text-decoration: none;
  }
  input,
  input:focus,
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
    border: 0;
  }
  .container {
    width: 100%;
    position: relative;
  }
  .wrapper {
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    position: absolute;
  }
  [data-hover="true"]:active,
  [data-hover="true"]:focus {
    opacity: 0;
  }
  font[size="1"] {
    font-size: .85rem;
  }
  font[size="2"] {
    font-size: 1rem;
  }
  font[size="3"] {
    font-size: 1.14rem;
  }
  font[size="4"] {
    font-size: 1.286rem;
  }
  font[size="5"] {
    font-size: 1.71rem;
  }
  font[size="6"] {
    font-size: 2rem;
  }
  font[size="7"] {
    font-size: 2.29rem;
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

  /* 图片组件 */
  .lz-image img,
  .lz-image a {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
  }
  .lz-image a {
    display: 'block';
  }

  /* 文本组件 */
  .lz-text {
    font-size: 1rem;
  }

  /* 容器组件 */
  .lz-container {
    background-repeat: no-repeat;
    background-position: center;
    background-size: 100%;
    border-style: solid;
    position: absolute;
  }
</style>
`

var signupCSS =
`
<style>
  /* 注册组件 */
  .sign-up-row {
    position: relative;
    width: 100%;
    height: 3rem;
    margin-bottom: .6rem;
    background-color: #fff;
  }
  .sign-up--l {
    width: 2rem;
    height: 100%;
    background: no-repeat center/12px;
  }
  .sign-up--m {
    flex-grow: 1;
    position: relative;
    height: 100%;
  }
  .sign-up--r {
    min-width: 2rem;
    height: 100%;
    position: relative;
  }
  /* 获取验证码按钮 */
  .sign-up-btn {
    width: 6.5rem;
    height: 100%;
    border: none;
    outline: none;
    box-shadow: none;
    opacity: .6;
    font-size: .875rem;
  }
  .sign-up-btn.forbid {
    pointer-events: none;
    opacity: .4;
  }
  .sign-up-btn:active {
    opacity: 1;
  }

  .sign-up-icon--close,
  .sign-up-icon--eye {
    display: block;
    height: 100%;
    background: no-repeat center/14px;
    position: absolute;
    top: 0;
  }
  .sign-up-icon--close {
    width: 2rem;
    right: 0;
    display: none;
    background-image: url("https://www.itouzi.com/static/wap/img/newreg/clear.png");
  }
  .sign-up-icon--eye {
    width: 100%;
    left: 0;
    background-image: url("https://www.itouzi.com/static/wap/img/newreg/eye_n.png");
  }
  .sign-up-icon--eye.enable {
    background-image: url("https://www.itouzi.com/static/wap/img/newreg/eye_y.png");
  }
  .vcode-wrapper {
    display: block;
    width: 6.5rem;
  }
  .sign-up-row input {
    border: none;
    width: 100%;
    height: 100%;
    font-size: .875rem;
  }
  .sign-up-row input::-webkit-input-placeholder {
    color: #ccc;
  }
  .sign-up-submit {
    width: 100%;
    position: absolute;
    height: 2rem;
  }
  .sign-up-submit img {
    left: 50%;
    -webkit-transform: translate(-50%);
    transform: translate(-50%);
  }
  .sign-up-login {
    position: absolute;
    font-size: .875rem;
    width: 60%;
    height: 2rem;
    line-height: 2rem;
    left: 0;
    right: 0;
    bottom: 0;
    margin: 0 auto;
    text-align: center;
  }
  .sign-up-error {
    position: absolute;
    left: 0;
    top: 28px;
    z-index: 2;
    font-size: .875rem;
    color: #ff4444;
  }
  .enable {
    display: block;
    background-color: #fff;
    z-index: 2;
  }
</style>
`

export { baseCSS, signupCSS }