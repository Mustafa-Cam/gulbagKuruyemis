
{/* <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script> */}

function scrollToSection() {
  const targetElement = document.getElementById('gothere');
  targetElement.scrollIntoView({ behavior: 'smooth' });
}

// function calculatePrice() {
//   var gramAmount = document.getElementById("gramAmount").value;
//   var kilogramPrice = document.getElementById("price").innerText.split(" ")[0];
//   var totalPrice = (gramAmount / 1000) * kilogramPrice;
//   // document.querySelectorAll(".calculatedPrice").value = totalPrice.toFixed(2) + " TL";

//   const fiyatlar =document.querySelectorAll(".calculatedPrice")
//   fiyatlar.forEach(element=>{
//     element.value =totalPrice.toFixed(2)+"TL";
//   })
// }

  function calculateValues(type) {
    // Gram miktarı ve fiyat alanlarına erişim
    var gramAmountInput = document.getElementById('gramAmount');
    var priceInput = document.getElementById('price');
    let kgPrice = document.getElementById('pricee').innerText.split(" ")[0];
    // Girilen değerleri al
    var gramAmountValue = parseFloat(gramAmountInput.value) || 0;
    var priceValue = parseFloat(priceInput.value) || 0;

    // Hesaplamaları yap
    if (type === 'gram') {
      // Eğer gram miktarı değiştiyse, fiyatı güncelle
      console.log(kgPrice);
      priceInput.value =Math.ceil((gramAmountValue/1000*kgPrice).toFixed(2)); // Örnek bir hesaplama, isteğinize göre değiştirebilirsiniz
    } else if (type === 'price') {
      // Eğer fiyat değiştiyse, gram miktarını güncelle
      gramAmountInput.value =Math.ceil((1000*(priceValue/kgPrice)).toFixed(2)); // Örnek bir hesaplama, isteğinize göre değiştirebilirsiniz
    }
  }

// DOM'dan gerekli elementleri seç
var gramAmountInput = document.getElementById('gramAmount');
var priceInput = document.getElementById('price');
var addToCartButton = document.getElementById('custom-border');

// Form submit olduğunda tetiklenecek fonksiyon
function handleFormSubmit(event) {
  // Gram miktarı ve fiyatı al
  var gramAmountValue = parseFloat(gramAmountInput.value) || 0;
  var priceValue = parseFloat(priceInput.value) || 0;

  // Kontrolleri yap
  if (gramAmountValue <= 0 || priceValue <= 0 || priceValue < 50) {
    // Kullanıcıya hata mesajı göster
    alert('Lütfen geçerli bir gram miktarı ve fiyat girin (Fiyat en az 50 TL olmalıdır).');
    // Formun submitini iptal et
    event.preventDefault();
  }
}

// Form submit olduğunda handleFormSubmit fonksiyonunu çağır
document.querySelector('form').addEventListener('submit', handleFormSubmit);

  
 //! burda işlemimizi javascript yoluyla yapalım dedik ama node.js document gibi işlemleri tanımıyormuş yani app.js den göndermemiz gerektiği için sonucu orda node.js çalıştığı için document gibi işlemleri tanımıyor o yüzden ejs ikullanıyoruz zaten 
//#region
// senttobasket=()=>{
//   var name=document.getElementById("name").innerText
//   var amount=document.getElementById("gramAmount").value
//   var price = document.getElementById("pricee").value
  
  
//     const product = {name:name,gram:amount,price:price}
//     addtocart(product) 
//   }

//   function addtocart(product){
//     cartitems.push(product)
//     console.log(product)
//     window.location.href = "/sepet";
//   }

  // module.exports=senttobasket
//#endregion



  //! BU KOD DA SIKINTI THİS İFADESİ TÜM DROPDOWN-MENU LERİ KASTEDİYOR AMA BİZ KURUYEMİS-MENU BAKLİYAT-MENU KISIMLARINDAN BAHSETTİĞİMİZ İÇİN ONLARI AYRI YAMAMIZ LAZIMMIŞ 
  // $(".dropdown-menu").mouseleave(function() {
  //   $(this).removeClass("show");
  // }); 
  
  


  //! bunlara gerek yokmuş chatgpt reis bunları da ekledi de gerek yok ama sağol chat baba
  // $(".dropdown-itemm").mouseenter(function() {
    //   $(this).closest('.dropdown-menu').addClass("show");
    // });
    
    // $(".dropdown-itemm").mouseleave(function() {
      //   // Check if the mouse is not entering any other dropdown menu
      //   if ($(".dropdown-menu:hover").length === 0) {
        //     $(this).closest('.dropdown-menu').removeClass("show");
        //   }
        // });
      
      
      
      
      

      