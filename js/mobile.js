const windowInnerWidth  = window.innerWidth;
const windowInnerHeight = window.innerHeight;
console.log("Window Width: " + windowInnerWidth);
console.log("Window Height: " + windowInnerHeight);
let isMobile = false;
if (windowInnerWidth < windowInnerHeight) {
    isMobile = true;
} else {
    isMobile = isMobile;
}
var path = window.location.pathname;
var path = path.split("/");
var new_path = path[-1];
path = path[1:-2];
var new_path = path+"/mobile/"+new_path;
alert("mobile devices detected,redicting to:"+new_path);
window.location.href = new_path;