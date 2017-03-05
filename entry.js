require("./base.css") // 载入 style.css

//引用module1.js
var m1 = require('./module1.js');
m1.AA();
m1.BB();

//引用module2.js
var m2 = require('./module2.js');
m2.ShowModule2();
document.write(m2.text_title); 






