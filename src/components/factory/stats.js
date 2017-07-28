export default 
`
<!-- GrowingIO SDK -->
<script>
  var _vds = _vds || [];
  window._vds = _vds;
  (function(){
    _vds.push(['setAccountId', '88fa8d8d5e33b245']);
    (function() {
      var vds = document.createElement('script');
      vds.type='text/javascript';
      vds.async = true;
      vds.src = ('https:' == document.location.protocol ? 'https://' : 'http://') + 'dn-growing.qbox.me/vds.js';
      var s = document.getElementsByTagName('script')[0];
      s.parentNode.insertBefore(vds, s);
    })();
  })();
  // itouzi market code
  (function(){
    var params = location.search.slice(1).split("&");
    function paramSplit(b){
      var a = [];
      for(var i=0;i<b.length;i++){
        var c=b[i].split('=');
        if (c[1] && (c[0] == 's_label' || c[0] == 'in_param' || c[0] == 'kw_id' || c[0] == 'u')) {
          a.push(b[i]);
        }
      }
      return (a.length != 0) ? ("&"+a.join("&")) : "";
    }
    (new Image()).src = "/newuser/union/flowStat?ref="+encodeURIComponent(document.referrer)+"&local="+encodeURIComponent(location.href)+paramSplit(params);
  })();
\<\/script\>

<!-- m.itouzi.com baidu code -->
<script>
  var _hmt = _hmt || [];
  (function() {
  var hm = document.createElement("script");
  hm.src = "https://hm.baidu.com/hm.js?f7ebd662ec86045e2ef33796e4b3a2c4";
  var s = document.getElementsByTagName("script")[0]; 
  s.parentNode.insertBefore(hm, s);
  })();
\<\/script\>

<!-- google code -->
<script>
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o), m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');
  ga('create', 'UA-46797696-3', 'auto');
  ga('require', 'displayfeatures');
  ga('send', 'pageview');
\<\/script\>

`