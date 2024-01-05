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
  });

  