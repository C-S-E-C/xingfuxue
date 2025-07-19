const windowInnerWidth = window.innerWidth;
const windowInnerHeight = window.innerHeight;
console.log("Window Width: " + windowInnerWidth);
console.log("Window Height: " + windowInnerHeight);
const isMobile = windowInnerHeight > windowInnerWidth;

if (isMobile) {
    const path = window.location.pathname;
    const pathParts = path.split("/").filter(part => part.length > 0);
    
    // Get the last part
    const lastPart = pathParts.length > 0 ? pathParts[pathParts.length - 1] : '';
    
    // Get all parts except the last
    const allExceptLast = pathParts.length > 1 ? 
        pathParts.slice(0, pathParts.length - 1).join("/") + "/" : 
        "";
    
    const newPath = "/" + allExceptLast + "mobile/" + lastPart;
    
    console.log("Mobile device detected, redirecting to: " + newPath);
    window.location.href = newPath;
}