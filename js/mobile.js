function test(){
var windowInnerWidth = window.innerWidth;
var windowInnerHeight = window.innerHeight;
console.log("Window Width: " + windowInnerWidth);
console.log("Window Height: " + windowInnerHeight);
var isMobile = windowInnerHeight > windowInnerWidth;
// var isMobile = false;
if (isMobile) {
    var path = window.location.pathname;
    var pathParts = path.split("/").filter(part => part.length > 0);
    
    // Get the last part
    var lastPart = pathParts.length > 0 ? pathParts[pathParts.length - 1] : '';
    
    // Get all parts except the last
    var allExceptLast = pathParts.length > 1 ? 
        pathParts.slice(0, pathParts.length - 1).join("/") + "/" : 
        "";
    
    var newPath = "/" + allExceptLast + "mobile/" + lastPart;
    
    console.log("Mobile device detected, redirecting to: " + newPath);
    window.location.href = newPath;
}
}
setInterval('test();', 1000);