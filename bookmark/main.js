let contenido1=document.querySelector(".contenido1");
let contenido2=document.querySelector(".contenido2");
let contenido3=document.querySelector(".contenido3");
let a1=document.querySelector(".sidebar1");
let a2=document.querySelector(".sidebar2");
let a3=document.querySelector(".sidebar3");

contenido1.style.display = 'block';

a1.addEventListener('click',(e)=>{
    a1.classList.add("active");
    a2.classList.remove("active");
    a3.classList.remove("active");
    contenido1.style.display = 'block';
    contenido2.style.display = 'none';
    contenido3.style.display = 'none';

});
a2.addEventListener('click',(e)=>{
    a1.classList.remove("active");
    a2.classList.add("active");
    a3.classList.remove("active");
    contenido1.style.display = 'none';
    contenido2.style.display = 'block';
    contenido3.style.display = 'none';
});
a3.addEventListener('click',(e)=>{
    a1.classList.remove("active");
    a2.classList.remove("active");
    a3.classList.add("active");
    contenido1.style.display = 'none';
    contenido2.style.display = 'none';
    contenido3.style.display = 'block';
});





