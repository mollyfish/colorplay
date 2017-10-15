(function() {
  
  var chosenColor = "#dd0000";

  $(".colorChoice").on("click", function() {
    chosenColor = $(this).attr("fill");
    console.log('you chose ' + chosenColor);
    $(".chosenColor").attr("fill", chosenColor);
  })
  $(".piece").on("click", function() {
    $(this).attr("fill", chosenColor);
  })

}());