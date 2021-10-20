
document.getElementById('alma').addEventListener("touchstart", (event) => {
    let alma = event.target;
    alma.style.opacity = '0.8';
})

document.getElementById('jordan').addEventListener("touchstart", (event) => {
    let jordan = event.target;
    jordan.style.opacity = '0.8';
})
const startAlma = () => {
    top.location.href = "../html/alma_start.html"
}