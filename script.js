//! importlar (diger js dosyasından gelen degısken ve fonksıyonlar)
import { months } from "./constants.js"
import { renderMails, showModal } from "./ui.js";

// local storage dan veri alma
const strMailData = localStorage.getItem('data');
// gelen string veriyi obje ve dizileri cevırme
const mailData = JSON.parse(strMailData);

//! html den gelenler
const hamburgerMenu = document.querySelector('.menu');
const navigation = document.querySelector("nav");
const mailsArea = document.querySelector(".mails-area");
const createMailBtn = document.querySelector('.create-mail');
const closeMailBtn = document.querySelector('#close-btn');
const modal = document.querySelector(".modal-wrapper");
const form = document.querySelector("#create-mail-form");


//! olay izleyicileri
// ekranın yuklenme anında calısır
document.addEventListener("DOMContentLoaded", () => renderMails(mailsArea, mailData));

hamburgerMenu.addEventListener('click', handleMenu);
// modal işlemleri
createMailBtn.addEventListener('click', () => showModal(modal, true));
closeMailBtn.addEventListener('click', () => showModal(modal, false));
form.addEventListener("submit", sendMail);


//! fonksiyonlar
// navigasyonu acıp kapamaya yarayan fonksiyon
// hamburger menusune tıklanınca calısır
function handleMenu() {
    /* 
    classList.toggle():
    *ona parametre olarak verdıgımız class
    *yoksa ekler varsa cıkarır
    */
    navigation.classList.toggle("hide");
}
// tarih olusturan fonksıyon
function getDate() {
    // bugunun tarıhını almak
    const dateArr = new Date().toLocaleDateString().split('/');
    // tarih dizisinden gunu alma 
    const day = dateArr[0];
    // tarih dizisinden kacıncı ayda oldugumuz bılgısını alma 
    const monthNumber = dateArr[1];
    // ayın sırasına karsılık gelen ısmi tanımladık
    const month = months[monthNumber - 1];

    // fonksıyonun cagrıldıgı yere gonderılecek cevap
    return [day, month].join(' ');
}



function sendMail(e) {
    // sayfanın yenılenmesını engelleme 
    e.preventDefault();

    // formun ıcerısınde yer alan inputların 
    // degerlerıne erısme 
    const receiver = e.target[0].value;
    const title = e.target[1].value;
    const message = e.target[2].value;


    // yeni mail objesı olusturma 
    const newMail = {
        id: new Date().getTime(),
        sender: 'Furkan',
        receiver,
        title,
        message,
        date: getDate(),
    };


    // olusturdugumuz objeyı dızının basına ekleme
    mailData.unshift(newMail);

    //todo veritabanını guncelle(localstroge)
    // storage a gondermek ıcın stringe cevırıyoruz
    const strData = JSON.stringify(mailData);
    // storage a gonderme
    localStorage.setItem('data', strData);

    // ekranı guncelle
    renderMails(mailsArea, mailData);

    // modalı kapat
    showModal(modal, false);

    // modalı temizle
    e.target[0].value = ' ';
    e.target[1].value = ' ';
    e.target[2].value = ' ';
}

