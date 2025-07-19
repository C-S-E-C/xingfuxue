const windowInnerWidth = window.innerWidth;
const windowInnerHeight = window.innerHeight;
console.log("Window Width: " + windowInnerWidth);
console.log("Window Height: " + windowInnerHeight);
const isMobile = windowInnerHeight > windowInnerWidth;
// const isMobile = false;
if (!isMobile) {
    const path = window.location.pathname;
    const newPath = path.replace("/mobile","");
    console.log("Mobile device detected, redirecting to: " + newPath);
    window.location.href = newPath;
}