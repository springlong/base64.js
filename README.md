# base64.js

Base64编码，是一种基于64个可打印字符（A-Z,a-z,0-9,+/这64个字符）来表示二进制数据的表示方法。

关于Base64编码的更多内容请参见 [Base64编码的原理与应用](http://blog.xiayf.cn/2016/01/24/base64-encoding/)。

原生JavaScript提供了 `window.btoa` (编码) 和 `window.atob` (解码) 用来支持Base64的编码和解码，但是不允许超出8位ASCII编码的字符范围，否则会抛出异常。也就是说，这两个方法并不支持中文汉字的编码和解码。同时这两个方法的浏览器支持为：Chrome/Firefox/IE10+/Opera/Safari，在IE8~10中不被支持。

所以目前浏览器端如果需要使用Base64的编码和解码时，大多数还是采用第三方的Base64编码工具。

## 使用base64

### base64的编码

```js

base64.encode('1234abcd编码测试');

```

### base64的解码

```js

base64.decode('MTIzNGFiY2TnvJbnoIHmtYvor5U');

```