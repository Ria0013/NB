/* =====================================================
   Library Ghost Project
   script.js
===================================================== */


/* ===========================
   START / LOADING
=========================== */


const startBtn = document.getElementById("startBtn");

const startScreen = document.getElementById("startScreen");

const loadingScreen = document.getElementById("loadingScreen");

const loadingProgress = document.querySelector(".loadingProgress");

const story = document.getElementById("story");



startBtn.addEventListener("click",()=>{


startScreen.style.display="none";


loadingScreen.style.display="flex";



let progress = 0;



const loading = setInterval(()=>{


progress += 2;


loadingProgress.style.width = progress + "%";



if(progress >= 100){


clearInterval(loading);



setTimeout(()=>{


loadingScreen.style.display="none";

story.style.display="block";



window.scrollTo({

top:0,

behavior:"instant"

});



startReading();


},200);



}



},30);



});




/* ===========================
   STORY START
=========================== */


function startReading(){


const sections = document.querySelectorAll(".storySection");



sections.forEach(section=>{


section.classList.remove("active");



});



observeSections();



calculateReadingTime();



restorePosition();



}




/* ===========================
   SCROLL ANIMATION
=========================== */


const observer = new IntersectionObserver((entries)=>{


entries.forEach(entry=>{


if(entry.isIntersecting){


entry.target.classList.add("active");


}

else if(entry.boundingClientRect.top < 0){


entry.target.classList.add("past");


}


});


},{

threshold:0.35

});



function observeSections(){


document.querySelectorAll(".storySection")

.forEach(section=>{


observer.observe(section);


});


}




/* ===========================
   PROGRESS BAR
=========================== */


const progressBar = document.getElementById("progress");



window.addEventListener("scroll",()=>{


const scrollTop = window.scrollY;


const height = document.documentElement.scrollHeight - window.innerHeight;



const percent = (scrollTop / height) * 100;



progressBar.style.width = percent + "%";



savePosition();



parallax();



});




/* ===========================
   READING TIME
=========================== */


function calculateReadingTime(){



const text = document.querySelector("#story").innerText;



const count = text.replace(/\s/g,"").length;



const minutes = Math.ceil(count / 450);



const display = document.getElementById("readingTime");



if(display){


display.innerText =

String(minutes).padStart(2,"0")

+" MIN";


}



}




/* ===========================
   HERO PARALLAX
=========================== */


const heroImage = document.querySelector(".hero img");



function parallax(){


if(!heroImage) return;



const scroll = window.scrollY;



heroImage.style.transform =

"translateY(" + scroll * 0.08 + "px)";



}




/* ===========================
   SAVE POSITION
=========================== */


function savePosition(){


localStorage.setItem(

"novelScroll",

window.scrollY

);


}



function restorePosition(){


const saved = localStorage.getItem(

"novelScroll"

);



if(saved){


setTimeout(()=>{


window.scrollTo({

top:Number(saved),

behavior:"smooth"

});


},500);


}


}




/* ===========================
   RESET OPTION
=========================== */


window.resetNovelPosition = function(){


localStorage.removeItem(

"novelScroll"

);



window.scrollTo({

top:0,

behavior:"smooth"

});


};
