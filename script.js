function secReset(){
    document.querySelectorAll(".sec").forEach(
        i => {
            i.classList.remove('visible')
        }
    )
    document.querySelectorAll(".btn1").forEach(
        i =>{
            i.classList.remove('btnX')
        }
    )
    // document.querySelectorAll(".subH").forEach(
    //     i =>{
    //         i.classList.remove('visibleB');
    //     }
    // )
}
function subHtoggle(a){
     document.getElementsByClassName('subH')[a].classList.toggle('visibleB');
      document.getElementsByClassName('arrow')[a].classList.toggle('Darrow');
}
function home(){
    secReset();
    document.querySelectorAll(".btn1")[0].classList.add('btnX');
    document.querySelectorAll(".sec")[0].classList.add('visible');
}
function char(){
    secReset();
    document.querySelectorAll(".btn1")[1].classList.add('btnX');
      document.querySelectorAll(".sec")[1].classList.add('visible');
      document.querySelectorAll(".sec")[1].scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "start"
      });
}
function map(){
    secReset();
     document.querySelectorAll(".btn1")[2].classList.add('btnX');
    document.querySelectorAll(".sec")[2].classList.add('visible');
}
function items(){
    secReset();
     document.querySelectorAll(".btn1")[3].classList.add('btnX');
    document.querySelectorAll(".sec")[3].classList.add('visible');
}
let homeFunc = ["NPCs","Claris","Chase","Bosses","map()","Edna","Elze","char()"]
let homeData;
async function loadData() {
    const response = await fetch("home.json");
    homeData = await response.json();
}
loadData().then(
    ()=>{
        homeData.images.forEach(
            (e,i) => {
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
            (e,i) => {
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
            (e,i) => {
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
            (e,i) => {
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
        )
    }
)
