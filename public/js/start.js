
document.getElementById('alma').addEventListener("touchstart", (event) => {
   
    event.target.style.opacity = '0.7';
})

document.getElementById('alma').addEventListener('touchend', (event) => {
    event.target.style.opacity = '1';
})


document.getElementById('jordan').addEventListener("touchstart", (event) => {
    let jordan = event.target;
    jordan.style.opacity = '0.7';
})

const startAlma = () => {
    top.location.href = "../html/almaStart.html"
}