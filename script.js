function secReset() {
    document.querySelectorAll(".sec").forEach(
        i => {
            i.classList.remove('visible')
        }
    )
    document.querySelectorAll(".btn1").forEach(
        i => {
            i.classList.remove('btnX')
        }
    )
    // document.querySelectorAll(".subH").forEach(
    //     i =>{
    //         i.classList.remove('visibleB');
    //     }
    // )
}
function subHtoggle(a) {
    document.getElementsByClassName('subH')[a].classList.toggle('visibleB');
    document.getElementsByClassName('arrow')[a].classList.toggle('Darrow');
}
function home() {
    secReset();
    document.querySelectorAll(".btn1")[0].classList.add('btnX');
    document.querySelectorAll(".sec")[0].classList.add('visible');
}
function char() {
    secReset();
    document.querySelectorAll(".btn1")[1].classList.add('btnX');
    document.querySelectorAll(".sec")[1].classList.add('visible');
    document.querySelectorAll(".sec")[1].scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "start"
    });
}
function map() {
    secReset();
    document.querySelectorAll(".btn1")[2].classList.add('btnX');
    document.querySelectorAll(".sec")[2].classList.add('visible');
}
function items() {
    secReset();
    document.querySelectorAll(".btn1")[3].classList.add('btnX');
    document.querySelectorAll(".sec")[3].classList.add('visible');
}
let homeFunc = ["NPCs", "Claris", "Chase", "Bosses", "map()", "Edna", "Elze", "char()"]
let homeData;
async function loadData() {
    const response = await fetch("home.json");
    homeData = await response.json();
}
loadData().then(
    () => {
        homeData.images.forEach(
            (e, i) => {
                document.getElementById('homeGrid').innerHTML += ` <div class="card1" onclick="${homeFunc[i]}">
                    <img src= ${e} class="img2" alt="">
                    <img src="assets/shade.png" class="img2" alt="">
                    <p class="T1"> ${homeData.captions[i]} </p>
                </div>`
            }
        )
    }
)
let charData;
async function loadCharData() {
    const response = await fetch("characters.json");
    charData = await response.json();
}
loadCharData().then(
    () => {
        charData.heros.forEach(
            (e, i) => {
                document.getElementById('heros').innerHTML += ` <div class="card2">
                    <img src="${e.img}" class="img3" alt="">
                    <ul class="charData">
                        <li><b>Name:</b> ${e.name}</li>
                        <li><b>Weapon:</b> ${e.weapon}</li>
                        <li><b>Role:</b> ${e.role}</li>
                    </ul>
                </div>`
            }
        )
        charData.NPCs.forEach(
            (e, i) => {
                document.getElementById('NPCs').innerHTML += ` <div class="card2">
                    <img src="${e.img}" class="img3" alt="">
                    <ul class="charData charData1">
                        <li><b>Name:</b> ${e.name}</li>
                        <li><b>Location:</b> ${e.location}</li>
                        <li><b>Role:</b> ${e.role}</li>
                        <li><b>Relation:</b> ${e.relation}</li>
                    </ul>
                </div>`
            }
        );
        charData.bosses.forEach(
            (e, i) => {
                document.getElementById('bosses').innerHTML += ` <div class="card2">
                    <img src="${e.img}" class="img3" alt="">
                    <ul class="charData charData1">
                        <li><b>Name:</b> ${e.name}</li>
                        <li><b>Location:</b> ${e.location}</li>
                        <li><b>Level:</b> ${e.level}</li>
                        <li><b>Attack:</b> ${e.attack}</li>
                    </ul>
                </div>`
            }
        );
        charData.demons.forEach(
            (e, i) => {
                document.getElementById('demons').innerHTML += ` <div class="card2">
                    <img src="${e.img}" class="img3" alt="">
                    <ul class="charData charData1">
                        <li><b>Name:</b> ${e.name}</li>
                        <li><b>Location:</b> ${e.location}</li>
                        <li><b>Attack:</b> ${e.attack}</li>
                    </ul>
                </div>`
            }
        )
        charData.beasts.forEach(
            (e, i) => {
                document.getElementById('beasts').innerHTML += ` <div class="card2">
                    <img src="${e.img}" class="img3" alt="">
                    <ul class="charData charData1">
                        <li><b>Name:</b> ${e.name}</li>
                        <li><b>Location:</b> ${e.location}</li>
                        <li><b>Attack:</b> ${e.attack}</li>
                    </ul>
                </div>`
            }
        )
    }
)
const mapWindow = document.getElementById('Map');
const FullMap = document.getElementById('FullMap');
let scale = 1;
let PositionX = 0;
let PositionY = 0;
let isDragging = false;
let startX, startY;
const zoomSpeed = 0.0015;
const minZoom = 0.5;
const maxZoom = 4;
function updatePosition() {
    FullMap.style.transform = `translate(${PositionX}px,${PositionY}px) scale(${scale})`;
}
function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
}
function clampPosition() {
    const vw = mapWindow.clientWidth;
    const vh = mapWindow.clientHeight;

    const iw = FullMap.naturalWidth;
    const ih = FullMap.naturalHeight;

    const scaledW = iw * scale;
    const scaledH = ih * scale;

    if (scaledW <= vw) {
        PositionX = (vw - scaledW) / 2;
    } else {
        PositionX = clamp(PositionX, vw - scaledW, 0);
    }

    if (scaledH <= vh) {
        PositionY = (vh - scaledH) / 2;
    } else {
        PositionY = clamp(PositionY, vh - scaledH, 0);
    }
}
mapWindow.addEventListener(
    "wheel", (e) => {
        e.preventDefault();
        const rect = mapWindow.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const worldX = (mouseX - PositionX) / scale;
        const worldY = (mouseY - PositionY) / scale;
        let zoomFactor = 1 - e.deltaY * zoomSpeed;
        scale = clamp(scale * zoomFactor, minZoom, maxZoom);
        PositionX = mouseX - worldX * scale;
        PositionY = mouseY - worldY * scale;
        clampPosition();
        updatePosition();
    }, { passive: false }
)
mapWindow.addEventListener(
    "pointerdown", (e) => {
        activePointers.set(e.pointerId, e);
        mapWindow.setPointerCapture(e.pointerId);
    if(activePointers.size === 1){
        isDragging = true;
        startX = (e.clientX - PositionX) / scale;
        startY = (e.clientY - PositionY) / scale;
        mapWindow.style.cursor = "grabbing";
        e.preventDefault();
    }
    }
)
window.addEventListener( "pointerup", endPointer);
window.addEventListener( "pointercancel", endPointer);
function endPointer(e){
     activePointers.delete(e.pointerId);
     if(activePointers.size < 2) pinchDistance = null;
       if(activePointers.size === 0)  isDragging = false;
        mapWindow.style.cursor = "grab";
        mapWindow.releasePointerCapture(e.pointerId)
}
window.addEventListener(
    "pointermove", (e) => {
        if(!activePointers.has(e.pointerId)) return;
        activePointers.set(e.pointerId,e);
        if (activePointers.size === 1 && isDragging){
        PositionX = e.clientX - startX * scale;
        PositionY = e.clientY - startY * scale;
        clampPosition();
        updatePosition();
        }
         if (activePointers.size === 2 && isDragging){
            const [p1,p2] = [...activePointers.values()];
            const dx = p2.clientX - p1.clientX;
            const dy = p2.clientY - p1.clientY;
            const distance = Math.hypot(dx,dy);
         if(!pinchDistance){
            pinchDistance = distance;
            return
         }
         const pinchFactor = distance/pinchDistance;
         const newScale = clamp(scale*pinchFactor,minZoom,maxZoom);
         if(newScale === scale) return;
         const rect = mapWindow.getBoundingClientRect();
         const centerX = (p1.clientX + p2.clientX)/2 - rect.left;
         const centerY = (p1.clientY + p2.clientY)/2 - rect.top;
         const worldX = (centerX - PositionX)/scale;
         const worldY = (centerY - PositionY)/scale;
         scale = newScale;
         PositionX = centerX - worldX*scale;
         PositionY = centerY - worldY*scale;
         pinchDistance = distance;
         clampPosition();
         updatePosition();
    }}
)
const activePointers = new Map();
let pinchDistance = null;


