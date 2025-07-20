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