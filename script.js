// html den gelenler
const hamburgerMenu = document.querySelector('.menu');
const navigation = document.querySelector("nav");

// olay izleyicileri
hamburgerMenu.addEventListener('click',handleMenu);

// navigasyonu acıp kapamaya yarayan fonksiyon
// hamburger menusune tıklanınca calısır
function handleMenu(){
    /* 
    classList.toggle():
    *ona parametre olarak verdıgımız class
    *yoksa ekler varsa cıkarır
    */ 
    navigation.classList.toggle("hide");
}