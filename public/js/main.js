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

$(document).ready(function() {
  $("#kuruyemisler-link").mouseenter(function() {
    $(".kuruyemis-menu").addClass("show");
    $(".bakliyatlar-menu").removeClass("show");

  });

  $("#bakliyatlar-link").mouseenter(function() {
    $(".bakliyatlar-menu").addClass("show");
    $(".kuruyemisler-menu").removeClass("show");
  });

$(".dropdown-menu").mouseleave(function() {
    $(".kuruyemis-menu").removeClass("show");
    $(".bakliyatlar-menu").removeClass("show");
  });
  

  // BU KOD DA SIKINTI THİS İFADESİ TÜM DROPDOWN-MENU LERİ KASTEDİYOR AMA BİZ KURUYEMİS-MENU BAKLİYAT-MENU KISIMLARINDAN BAHSETTİĞİMİZ İÇİN ONLARI AYRI YAMAMIZ LAZIMMIŞ 
  // $(".dropdown-menu").mouseleave(function() {
  //   $(this).removeClass("show");
  // }); 

  


  // bunlara gerek yokmuş chatgpt reis bunları da ekledi de gerek yok ama sağol chat baba
  // $(".dropdown-itemm").mouseenter(function() {
  //   $(this).closest('.dropdown-menu').addClass("show");
  // });

  // $(".dropdown-itemm").mouseleave(function() {
  //   // Check if the mouse is not entering any other dropdown menu
  //   if ($(".dropdown-menu:hover").length === 0) {
  //     $(this).closest('.dropdown-menu').removeClass("show");
  //   }
  // });
});






