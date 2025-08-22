////////////////////////////////////////////////////////////////////
//                          _ooOoo_                               //
//                         o8888888o                              //
//                         88" . "88                              //
//                         (| ^_^ |)                              //
//                         O\  =  /O                              //
//                      ____/`---'\____                           //
//                    .'  \\|     |//  `.                         //
//                   /  \\|||  :  |||//  \                        //
//                  /  _||||| -:- |||||-  \                       //
//                  |   | \\\  -  /// |   |                       //
//                  | \_|  ''\---/''  |   |                       //
//                  \  .-\__  `-`  ___/-. /                       //
//                ___`. .'  /--.--\  `. . ___                     //
//              ."" '<  `.___\_<|>_/___.'  >'"".                  //
//            | | :  `- \`.;`\ _ /`;.`/ - ` : | |                 //
//            \  \ `-.   \_ __\ /__ _/   .-` /  /                 //
//      ========`-.____`-.___\_____/___.-`____.-'========         //
//                           `=---='                              //
//      ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^        //
//                  佛祖保佑       永不宕机     永无BUG             //
////////////////////////////////////////////////////////////////////
function test(){
var windowInnerWidth = window.innerWidth;
var windowInnerHeight = window.innerHeight;
console.log("Window Width: " + windowInnerWidth);
console.log("Window Height: " + windowInnerHeight);
var isMobile = windowInnerHeight > windowInnerWidth;
// var isMobile = false;
if (!isMobile) {
    var path = window.location.pathname;
    var newPath = path.replace("/mobile","");
    console.log("Mobile device detected, redirecting to: " + newPath);
    window.location.href = newPath;
}
}
setInterval('test();', 1000);

document.addEventListener('DOMContentLoaded', function() {
  var menuBtn = document.getElementById('menu-btn');
  var navMenu = document.getElementById('nav-menu');
  if (menuBtn && navMenu) {
    menuBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      // Toggle .active and set display based on class
      if (navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        navMenu.style.display = 'none';
      } else {
        navMenu.classList.add('active');
        navMenu.style.display = 'flex';
      }
    });
    // Optional: close menu when clicking outside
    document.addEventListener('click', function(e) {
      if (
        navMenu.classList.contains('active') &&
        !navMenu.contains(e.target) &&
        e.target !== menuBtn
      ) {
        navMenu.classList.remove('active');
        navMenu.style.display = 'none';
      }
    });
  }
});
