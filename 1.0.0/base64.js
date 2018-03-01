/**
 * @file        base64的编码与解码
 * @version     1.0.0
 * @author      龙泉 <yangtuan2009@126.com>
 */
(function (root, factory) {

    if (typeof define === 'function' && define.amd) {
        // AMD module
        define(factory);
    }
    else if(typeof module !== "undefined" && module.exports) {
        // Node/CommonJS
        // Seajs build
        module.exports = factory();
    }
    else {
        // 浏览器全局模式
        root.base64 = factory();
    }

})(this, function () {
    
    var baseDatas = {
        encodeChars: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/',
        decodechars: [- 1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1, -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1]
    };
    
    var base64 = {

        /**
         * base64的编码
         * @param  {string} str 需要编码的字符串
         * @return {string}     编码后的字符串
         */
        encode: function(str) {

            var c1,
                c2,
                c3,
                str = base64.utf16To8(str),
                len = str.length,
                i = 0,
                ut = '',
                out = '',
                tempChars = baseDatas.encodeChars;
            
            while (i < len) {

                c1 = str.charCodeAt(i++) & 0xff;
                
                if (i == len) {

                    out += tempChars.charAt(c1 >> 2);
                    out += tempChars.charAt((c1 & 0x3) << 4);
                    out += '==';
                    break;
                }
                
                c2 = str.charCodeAt(i++);
                
                if (i == len) {

                    out += tempChars.charAt(c1 >> 2);
                    out += tempChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xf0) >> 4));
                    out += tempChars.charAt((c2 & 0xf) << 2);
                    out += '=';
                    break;
                }
                
                c3 = str.charCodeAt(i++);
                out += tempChars.charAt(c1 >> 2);
                out += tempChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xf0) >> 4));
                out += tempChars.charAt(((c2 & 0xf) << 2) | ((c3 & 0xc0) >> 6));
                out += tempChars.charAt(c3 & 0x3f);
            }
            
            return out;
        },
        

        /**
         * base64的解码
         * @param  {string} str 需要解码的字符串
         * @return {string}     解码后的字符串
         */
        decode: function(str) {

            var c1,
                c2,
                c3,
                c4,             
                len = str.length,
                i = 0,
                ut = '',
                out = '',
                tempChars = baseDatas.decodechars;
            
            while (i < len) {

                do {
                    c1 = tempChars[str.charCodeAt(i++) & 0xff];
                } while( i < len && c1 == - 1 );
                
                if (c1 == -1) {
                    break;
                }
                
                do {
                    c2 = tempChars[str.charCodeAt(i++) & 0xff];
                } while( i < len && c2 == - 1 );
                
                if (c2 == -1) {
                    break;
                }
                
                out += String.fromCharCode((c1 << 2) | ((c2 & 0x30) >> 4));
                
                do {
                    c3 = str.charCodeAt(i++) & 0xff;
                    if (c3 == 61) return out;
                    c3 = tempChars[c3];
                } while( i < len && c3 == - 1 );
                
                if (c3 == -1) {
                    break;
                }
                
                out += String.fromCharCode(((c2 & 0xf) << 4) | ((c3 & 0x3c) >> 2));
                
                do {
                    c4 = str.charCodeAt(i++) & 0xff;
                    if (c4 == 61) return out;
                    c4 = tempChars[c4];
                } while( i < len && c4 == - 1 );
                
                if (c4 == -1) {
                    break;
                }
                
                out += String.fromCharCode(((c3 & 0x03) << 6) | c4);
            }
            
            out = base64.utf8To16(out);
            
            return out;
        },
        

        // utf16 to utf8
        utf16To8: function(str)
        {
            var i,
                c,
                out = '',
                len = str.length;
            
            for(i = 0; i < len; i++) {

                c = str.charCodeAt(i);
                
                if((c >= 0x0001) && (c <= 0x007F)) {
                    out += str.charAt(i);

                } else if(c > 0x07FF) {
                    out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F));
                    out += String.fromCharCode(0x80 | ((c >>  6) & 0x3F));
                    out += String.fromCharCode(0x80 | ((c >>  0) & 0x3F));

                } else {
                    out += String.fromCharCode(0xC0 | ((c >>  6) & 0x1F));
                    out += String.fromCharCode(0x80 | ((c >>  0) & 0x3F));
                }
            }
            
            return out;
        },


        // utf8 to utf16
        utf8To16: function(str)
        {
            var c,
                char2,
                char3,
                out = '',
                len = str.length,
                i = 0;
            
            while(i < len) {

                c = str.charCodeAt(i++);

                switch(c >> 4) { 
                    
                  case 0: case 1: case 2: case 3: case 4: case 5: case 6: case 7:
                    // 0xxxxxxx
                    out += str.charAt(i-1);
                    break;
                
                  case 12:
                  case 13:
                    // 110x xxxx   10xx xxxx
                    char2 = str.charCodeAt(i++);
                    out += String.fromCharCode(((c & 0x1F) << 6) | (char2 & 0x3F));
                    break;
                
                  case 14:
                    // 1110 xxxx  10xx xxxx  10xx xxxx
                    char2 = str.charCodeAt(i++);
                    char3 = str.charCodeAt(i++);
                    out += String.fromCharCode(((c & 0x0F) << 12) | ((char2 & 0x3F) << 6) | ((char3 & 0x3F) << 0));
                    break;
                }
            }
        
            return out;
        }
    };

    return base64;
});