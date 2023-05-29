
{/* <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script> */}

function scrollToSection() {
  const targetElement = document.getElementById('gothere');
  targetElement.scrollIntoView({ behavior: 'smooth' });
}

function calculatePrice() {
  var gramAmount = document.getElementById("gramAmount").value;
  var kilogramPrice = document.getElementById("price").innerText.split(" ")[0];
  var totalPrice = (gramAmount / 1000) * kilogramPrice;
  // document.querySelectorAll(".calculatedPrice").value = totalPrice.toFixed(2) + " TL";

  const fiyatlar =document.querySelectorAll(".calculatedPrice")
  fiyatlar.forEach(element=>{
    element.value =totalPrice.toFixed(2)+"TL";
  })
}


  


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
      
      
      
      
      

      