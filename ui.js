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
          <div class="mail" data-id=${mail.id}>
                    <div class="left">
                        <input type="checkbox">
                        <i id="star" class="bi bi-star ${
                            mail.stared && 'star-active'
                         }"></i>
                        <span>${mail.sender}</span>
                    </div>
                    <div class="right">
                        <p class="message-title">${trimString(mail.title, 80)}</p>
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

// kategorileri ekrana basma methodu
export function renderCategories(outlet,data,selectedCategory) {
    // eski kategorileri sil
    outlet.innerHTML = '';
    




    // bize gelen diziyi dönme
    data.forEach((category)=>{
         const categoryItem = document.createElement('a');

        //  kategorı ekranına verı ekleme
         categoryItem.dataset.name = category.title;

        //  aktif olan kategoriye active classı eklme
         categoryItem.className = selectedCategory === category.title && 'active-category';

         categoryItem.innerHTML = `
         <i class="${category.class}"></i>
         <span>${category.title}</span>
          `;
          outlet.appendChild(categoryItem);

    });
}