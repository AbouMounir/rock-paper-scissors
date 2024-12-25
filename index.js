let pickersValues = ['rock','scissors','paper']
let textResults = ""
let winDivs = `<div class="first_spirale"></div> <div class="sec_spirale"></div> <div class="third_spirale"></div>` 

let card_rules = document.querySelector(".card_rules")
let pickers = document.querySelectorAll(".img_card")
let bottom_card = document.querySelector(".bottom_card")
let bottom_card_step_2 = document.querySelector(".bottom_card_step_2")
let playerImage = document.querySelector('#player_img')
let score = 0;
let btn_results = document.querySelector(".btn_results")
const playerPicked = document.querySelector(".player_picked");
const ordPicked = document.querySelector(".ord_picked");

card_rules.style.display = "none"

btn_results.addEventListener('click', function () {
    bottom_card.style.display = "block";
    bottom_card_step_2.style.display = "none";
    document.querySelector('.card_results').style.display = "none";
    playerPicked.classList.remove('card_picked');
    ordPicked.classList.remove('card_picked');
    ordPicked.style.background = "none";
    ordPicked.children[0].children[0].setAttribute('src',``);
    for (var i = 0; i < 3; i++) {
        if (textResults == "YOU WIN") {
            playerPicked.parentElement.removeChild(playerPicked.parentElement.lastElementChild);
        } else if (textResults == "YOU LOSE") {        
            ordPicked.parentElement.removeChild(ordPicked.parentElement.lastElementChild);
        } 
    }
});

function toggleCardRules() {
    
    if (card_rules.style.display == "none") {
         card_rules.style.display = "block";
    } else {
        card_rules.style.display = "none";
    }  
}

for (var i = 0; i < pickers.length; i++) {
    pickers[i].addEventListener('click', function () {
        let randomNumber = Math.floor(Math.random()*3)
        const ordPickedValue = pickersValues[randomNumber]
        const ordPickedColor = document.querySelector(`.card_${ordPickedValue}`);
        const computedStyle = window.getComputedStyle(this.parentElement);
        const ordPickedStyle = window.getComputedStyle(ordPickedColor);
        const background = computedStyle.background
        const imageAttribute = (this.children.length > 0) ? this.children[0].src : this.src ;
        const playerPickedValue = this.parentElement.classList[1].split('_')[1]

        const indexPlayerPickedValue = pickersValues.indexOf(playerPickedValue)
        
        if (indexPlayerPickedValue === randomNumber) { 
            textResults = "DRAW"; 
        } 
        else if ( (indexPlayerPickedValue === 0 && randomNumber === 1) || (indexPlayerPickedValue === 1 && randomNumber === 2) || (indexPlayerPickedValue === 2 && randomNumber === 0)) { 
            textResults = "YOU WIN"; 
            score++; 
        } 
        else { 
            textResults = "YOU LOSE"; 
            score--; 
        }  
        
        console.log(indexPlayerPickedValue + ' vs ' + randomNumber);
        
        
        bottom_card.style.display = "none";
        bottom_card_step_2.style.display = "flex";
        
        playerImage.setAttribute('src',imageAttribute);
        
        
        playerPicked.style.background = background;
        playerPicked.classList.add('card_picked');
        ordPicked.children[0].style.background = "hsl(223.08deg 45.88% 16.67%)" ;

        setTimeout(() => {
            console.log(this);
            ordPicked.style.background = ordPickedStyle.background;
            ordPicked.classList.add('card_picked');
            ordPicked.children[0].children[0].setAttribute('src',`/images/icon-${ordPickedValue}.svg`);
            setTimeout(() => {
                document.querySelector('.title_results').innerHTML = textResults;
                document.querySelector('.card_results').style.display = "block";
                document.querySelector('#score').innerHTML = score;
               
                if (textResults == "YOU WIN") {
                    playerPicked.parentElement.style.position = "relative";
                    playerPicked.insertAdjacentHTML('afterend',winDivs);
                } else if (textResults == "YOU LOSE") {
                    ordPicked.parentElement.style.position = "relative";
                    ordPicked.insertAdjacentHTML('afterend',winDivs);
                } 
                
            },1000)
        },2000)
                 
        //document.querySelectorAll('link')[1].href = "http://127.0.0.1:5500/index4.css"
        console.log(document.querySelectorAll('link')[1].href)
    });
}

/*
    
for (let picker in pickers) {
    console.log(pickers);
    console.log(picker);
    picker.addEventListener('onclick',function () {
        console.log(pickers);
    });*/
