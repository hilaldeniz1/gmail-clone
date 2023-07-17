//! importlar (diger js dosyasından gelen degısken ve fonksıyonlar)
import { months, categories } from "./constants.js"
import { renderMails, showModal, renderCategories } from "./ui.js";

// local storage dan veri alma
const strMailData = localStorage.getItem('data');
// gelen string veriyi obje ve dizileri cevırme
const mailData = JSON.parse(strMailData);

//! html den gelenler
const hamburgerMenu = document.querySelector('.menu');
const navigation = document.querySelector('nav');
const mailsArea = document.querySelector('.mails-area');
const createMailBtn = document.querySelector('.create-mail');
const closeMailBtn = document.querySelector('#close-btn');
const modal = document.querySelector('.modal-wrapper');
const form = document.querySelector('#create-mail-form');
const categoryArea = document.querySelector('nav .middle');
const searchButton = document.querySelector('#search-icon');
const searchInput = document.querySelector('#search-input');


//! olay izleyicileri
// ekranın yuklenme anında calısır
document.addEventListener("DOMContentLoaded", () => {
    renderCategories(categoryArea,categories, 'Gelen Kutusu');
renderMails(mailsArea, mailData);
if (window.innerWidth < 1100) {
    navigation.classList.add('hide');
}
});
// pencerenın genıslıgını degısmesını ızleme
window.addEventListener('resize', (e) =>{
const width = e.target.innerWidth
if(width<1100){
    navigation.classList.add('hide');
}else{
    navigation.classList.remove('hide');
}
});

hamburgerMenu.addEventListener('click', handleMenu);

searchButton.addEventListener("click",searchMails)


// modal işlemleri
createMailBtn.addEventListener('click', () => showModal(modal, true));
closeMailBtn.addEventListener('click', () => showModal(modal, false));
form.addEventListener("submit", sendMail);

// mail alanında olan tıklamalar
mailsArea.addEventListener("click",updateMail);

// sidebar alanindaki tiklamalar
categoryArea.addEventListener('click',watchCategory);


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
    const dateArr = new Date().toLocaleDateString().split('.');
    // tarih dizisinden gunu alma 
    const day = dateArr[0];
    // tarih dizisinden kacıncı ayda oldugumuz bılgısını alma 
    const monthNumber = dateArr[1];
    // ayın sırasına karsılık gelen ısmi tanımladık
    const month = months[monthNumber - 1];

    // fonksıyonun cagrıldıgı yere gonderılecek cevap
    return day + ' ' + month;
}


// maili gonderme
function sendMail(e) {
    // sayfanın yenılenmesını engelleme 
    e.preventDefault();

    // formun ıcerısınde yer alan inputların 
    // degerlerıne erısme 
    const receiver = e.target[0].value;
    const title = e.target[1].value;
    const message = e.target[2].value;

    if(!receiver || !title || !message){
        // notıfıkasyon ver
        Toastify({
            text: "Lütfen Formu Doldurun",
            close: true,
            gravity: "top",
            position: "right",
            stopOnFocus: true,
            duration: 3000,
            style: {
                background: 'rgb(193,193,0)',
                borderRadius: "4px",              
            },
        }).showToast();

        // alttaki kodların calısmasını engelle
        return;
    }


    // yeni mail objesı olusturma 
    const newMail = {
        id: new Date().getTime(),
        sender: 'Furkan',
        receiver,
        title,
        message,
        stared: false,
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

     // notıfıkasyon ver
     Toastify({
        text: "mail başarıyla gönderildi",
        close: true,
        gravity: "top",
        position: "right",
        stopOnFocus: true,
        duration: 3000,
        style: {
            background: '#7CFC00',
            color: 'white',
            borderRadius: "4px",              
        },
    }).showToast();
}

// mail alanında bır tıklanma olunca calısır
function updateMail(e) {
     // güncellenecek maili belirleme
     const mail = e.target.parentElement.parentElement;

     //mailin dizideki verilerini bulmak ıcın id sine erisme
     const mailId = mail.dataset.id;

    // sil butonuna tıklanınca calısır
    if(e.target.id === "delete"){
         //! localstoragedan kaldır

        // id degerini bildiğimiz elemanı dızıden cıkarma 
        const filtredData = mailData.filter((i) => i.id != mailId);

        // diziyi stringe cevırme
        const strData = JSON.stringify(filtredData);

        // localstorage a gonderme
        localStorage.setItem("data",strData);

       // !maili htmlden kaldırır
        mail.remove();
    }

    // yıldıza tıklanınca calısır
    if(e.target.id ==='star'){
       

    // id sinden yola cıkarak mail objesını bulma 
    const foundItem = mailData.find((i) => i.id == mailId);
    // buldugumuz elemanın stared degerını tersıne cevırme
    const updatedItem = {...foundItem, stared: !foundItem.stared };

    // güncellenecek elemanın dizideki sırasını bulma
    const index = mailData.findIndex((i) => i.id == mailId);
    
    // dizideki elemanı güncelleme
    mailData[index] = updatedItem;

    // local storage a güncel diziyi aktarma
    localStorage.setItem("data",JSON.stringify(mailData));

    // html i güncelleme
    renderMails(mailsArea,mailData);
    }
}

// kategorileri izleyip degistirecegimiz fonksiyon

function watchCategory(e) {
    const selectedCategory = e.target.dataset.name;
    // navigasyon alanını güncelleme
    renderCategories(categoryArea,categories,selectedCategory);

    if(selectedCategory === 'Yıldızlı'){
        // stared degerı true olanalrı secme
        const filtred = mailData.filter((i)=>i.stared === true)
        // sectıklerımızı ekrana basma
        renderMails(mailsArea,filtred);

        return;
    }

    // yıldızlı dısında bır kategorıye tıklanırsa hepsını goster
    renderMails(mailsArea,mailData);
}


function searchMails(){
    // arama terimini iceren mailleri alma 
   const filtred = mailData.filter((i) =>
   i.message.toLowerCase().includes(searchInput.value.toLowerCase())
   );

//    mailleri ekrana basma
renderMails(mailsArea, filtred);
}










// spread : dagıtma ıslemı(...objeIsmı)
// verdıgımız objenın butun degerlerıne farklı bır objeye aktarır




