// yazıları kesmek ıcın kulaldıgımız fonksıyon
function trimString(str, max) {
    // metin 50 karakterden kısaysa oldugu gıbı gonderıyoruz
    if (str.length < max) return str;

    // metnin harf uzunlugu 50 karakterden uzunsa 
    // 50 ye kadar olan kısmı kes sonrasına ... koy
    // yeni metni fonksiyonun calıstırıldıgı yere gonder 
    return str.slice(0, max) + "...";
}


/*
*ekrana mailleri listeleyecek fonksiyon
*outlet:ekranın hangi kısmına mudahale edilecek
*data:hangi verileri ekrana basıcaz
*/
export function renderMails(outlet, data) {
    if (!data) return;
    // herbir mail objesı ıcın bir maılı temsıl eden html olustur
    // olusan mail htmlini mailler alanına gonder(ekran bas)
    outlet.innerHTML = data
        .map(
            (mail) => `
          <div class="mail">
                    <div class="left">
                        <input type="checkbox">
                        <i class="bi bi-star"></i>
                        <span>${mail.sender}</span>
                    </div>
                    <div class="right">
                        <p class="message-title">${trimString(mail.title, 30)}</p>
                        <p class="message-desc">${trimString(mail.message, 40)}</p>
                        <p class="message-date">${mail.date}</p>

                
                            <button id="delete">SİL</button>
                        
                    </div>
                </div>
    `)
        .join(' ');
}

// ekrana mail olusturma penceresı acıcak fonk.
export function showModal(modal, willOpen) {
    modal.style.display = willOpen ? 'grid' : 'none';

}