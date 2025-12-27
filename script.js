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
    );
    document.querySelectorAll(".sec")[1].scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "start"
    });
    document.getElementById('nav').style.backgroundColor = "rgba(128,128,128,0.5)";
}
function mnav(i){
    secReset();
    document.getElementById('navm').querySelectorAll(".btn1")[i].classList.add('btnX');
    document.querySelectorAll(".sec")[i].classList.add('visible');
}
function subHtoggle(a) {
    document.getElementsByClassName('subH')[a].classList.toggle('visibleB');
    document.getElementsByClassName('arrow')[a].classList.toggle('Darrow');
}
function home() {
    secReset();
    document.querySelectorAll(".btn1")[0].classList.add('btnX');
    document.querySelectorAll(".sec")[0].classList.add('visible');
    document.getElementById('navm').querySelectorAll(".btn1")[0].classList.add('btnX');
}
function char() {
    secReset();
    document.querySelectorAll(".btn1")[1].classList.add('btnX');
    document.querySelectorAll(".sec")[1].classList.add('visible');
    document.getElementById('navm').querySelectorAll(".btn1")[1].classList.add('btnX');
}
function map() {
    secReset();
    document.querySelectorAll(".btn1")[2].classList.add('btnX');
    document.querySelectorAll(".sec")[2].classList.add('visible');
    document.getElementById('navm').querySelectorAll(".btn1")[2].classList.add('btnX');
    document.getElementById('nav').style.backgroundColor = "rgba(71, 71, 71, 1)";
}
function items() {
    secReset();
    document.querySelectorAll(".btn1")[3].classList.add('btnX');
    document.querySelectorAll(".sec")[3].classList.add('visible');
    document.getElementById('navm').querySelectorAll(".btn1")[3].classList.add('btnX');
}
const charP = ["NPCs","bosses"]
function charPf(i){
    char();
    document.getElementById(charP[i]).scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "start"
    });
}
let homeFunc = ["charPf(0)", "popC(0)", "popC(1)", "charPf(1)", "map()", "popC(2)", "popC(3)", "char()"];
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
                document.getElementById('herosG').innerHTML += ` <div class="card2" id="hero${i}">
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
                document.getElementById('NPCsG').innerHTML += ` <div class="card2">
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
                document.getElementById('bossesG').innerHTML += ` <div class="card2">
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
                document.getElementById('demonsG').innerHTML += ` <div class="card2">
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
                document.getElementById('beastsG').innerHTML += ` <div class="card2">
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
const mediaQuery = window.matchMedia('(max-width: 800px)');
const mapWindow = document.getElementById('Map');
const FullMap = document.getElementById('FullMap');
const world = document.getElementById('world');
let scale = 1;
let PositionX = 0;
let PositionY = 0;
let isDragging = false;
let startX, startY;
const zoomSpeed = 0.0015;
const minZoom = 0.5;
const maxZoom = 4;
let lastScale = scale;
function updatePosition() {
    world.style.transform = `translate(${PositionX}px,${PositionY}px) scale(${scale})`;
if(scale !== lastScale){
    document.querySelectorAll(".labels").forEach( (e,i) =>{
        e.style.transform = `scale(${mapData.labels[i].scale*(1/scale)*1.5})`;
    })}
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
    else{
            isDragging = false;
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
         if (activePointers.size === 2){
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
         pinchDistance = distance;
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
const labelsLayer = document.getElementById('labels');
function createLabels(){
    mapData.labels.forEach( e =>{
        const el = document.createElement('div');
        el.className = "labels";
        el.textContent = e.name;
        el.style.top = e.y+"px";
        el.style.left = e.x+"px";
        el.style.transform = `scale(${Number(e.scale)*1.2})`;
        el.style.textShadow = `0 0 2px ${e.strock}`;
        labelsLayer.appendChild(el);
    })
}
let mapData
async function loadMap() {
    const response = await fetch("maps.json");
    mapData = await response.json();
}
loadMap().then( ()=>{
    FullMap.onload = ()=>{
        createLabels();
    }
    if(FullMap.complete && FullMap.naturalWidth !== 0){FullMap.onload()};
}
)
const place = [
    {"x":"-900", "y":"-900"},
    {"x":"-1500", "y":"-825"},
    {"x":"-1225", "y":"-105"},
    {"x":"0", "y":"-840"}
]
function jump(i){
    map();
    PositionX = place[i].x;
    PositionY = place[i].y;
    scale = 1;
    clampPosition();
    updatePosition();
}
if(mediaQuery.matches){PositionX = -1200; PositionY = -450; scale = 0.8; updatePosition();};
let itemsDAta;
async function loadItem() {
    const response = await fetch("items.json");
    itemsDAta = await response.json();
}
loadItem().then(()=>{
    itemsDAta.weapons.forEach(e =>{
        let li = document.createElement("li");
        li.textContent = e;
        document.getElementById('wep').appendChild(li);
    })
    itemsDAta.armors.forEach(e =>{
        let li = document.createElement("li");
        li.textContent = e;
        document.getElementById('gear').appendChild(li);
    })
    itemsDAta.Resources.metals.forEach(e =>{
        let li = document.createElement("li");
        li.textContent = e;
        document.getElementById('metals').appendChild(li);
    })
    itemsDAta.Resources.souls.forEach(e =>{
        let li = document.createElement("li");
        li.textContent = e;
        document.getElementById('souls').appendChild(li);
    })
    itemsDAta.Resources.souls.forEach((e,i) =>{
        let li = document.createElement("li");
        li.textContent = `${itemsDAta.Resources.metals[i]} -> ${e}`;
        document.getElementById('upgrad').appendChild(li);
    })
    itemsDAta.Resources.Bones.forEach(e =>{
        let li = document.createElement("li");
        li.textContent = e;
        document.getElementById('bone').appendChild(li);
    })
    itemsDAta.Resources.Hides.forEach(e =>{
        let li = document.createElement("li");
        li.textContent = e;
        document.getElementById('hide').appendChild(li);
    })
    itemsDAta.Resources.Mana.forEach(e =>{
        let li = document.createElement("li");
        li.textContent = e;
        document.getElementById('mana').appendChild(li);
    })
    itemsDAta.consumables.shrooms.forEach(e =>{
        let li = document.createElement("li");
        li.textContent = e;
        document.getElementById('sh').appendChild(li);
    })
    itemsDAta.consumables.fishes.forEach(e =>{
        let li = document.createElement("li");
        li.textContent = e;
        document.getElementById('fish').appendChild(li);
    })
    itemsDAta.consumables.heal.forEach(e =>{
        let li = document.createElement("li");
        li.textContent = e;
        document.getElementById('heal').appendChild(li);
    })
    itemsDAta.consumables.potions.HP.forEach(e =>{
        let li = document.createElement("li");
        li.textContent = e;
        document.getElementById('HPot').appendChild(li);
    })
    itemsDAta.consumables.potions.MP.forEach(e =>{
        let li = document.createElement("li");
        li.textContent = e;
        document.getElementById('MPot').appendChild(li);
    })
    itemsDAta.consumables.potions.att.forEach(e =>{
        let li = document.createElement("li");
        li.textContent = e;
        document.getElementById('APot').appendChild(li);
    })
    itemsDAta.runes.forEach((e,i) =>{
        let dt = document.createElement("dt");
        dt.textContent = e;
        dt.style.textShadow = "none";
        if(i>=0 && i<4){
            dt.style.color = "green";
        }
        else if(i>=4 && i<8){
            dt.style.color = "blue";
        }
        else if(i>=8 && i<12){
            dt.style.color = "red";
        }
        document.getElementById('rune').appendChild(dt);
        let dd = document.createElement('dd');
        dd.textContent = itemsDAta.runeDef[i];
        document.getElementById('rune').appendChild(dd);
    })
}
)
let intro = false;
const popA = ["hero0", "hero1", "hero3", "hero6"];
function popC(i){
    intro = true;
    document.querySelectorAll(".card2").forEach(e=>{
        e.classList.add('lockUI');
    })
    char();
    document.getElementById(popA[i]).scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "center"
    });
    document.getElementById(popA[i]).classList.add('popH');
    document.getElementById(popA[i]).addEventListener("animationend",()=>{
        document.getElementById(popA[i]).classList.add('finalState');
    })
}
function IntroOut(){
    if(!intro) return;
    intro = false;
    popA.forEach(e=>{
        document.getElementById(e).classList.remove('popH');
        document.getElementById(e).classList.remove('finalState');
    })
    document.querySelectorAll(".card2").forEach(e=>{
        e.classList.remove('lockUI');
    })
   
}
window.addEventListener("pointerdown",IntroOut);
window.addEventListener("wheel",IntroOut);
window.addEventListener("mousedown",IntroOut);


