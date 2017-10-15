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
  $("#clearBlock").on("click", function() {
    $(".piece").attr("fill", "#fff");
  })
  $("#repeatBlock").on("click", function() {
    // add functionality to do something other than 3x3 repeat
    $(".quilt").empty();
    var block = $(".block");
    console.dir(block);
    var setOfBlocks = [];
    for (var i = 0; i < 9; i++) {
      setOfBlocks[i] = block.clone();
      // use switch here once the option to choose XxY repeat is implemented
      if (i < 3) {
        setOfBlocks[i].attr("x",i*150);
      } else if (i > 5) {
        setOfBlocks[i].attr("x",(i-6)*150);
        setOfBlocks[i].attr("y", 300);
      } else {
        setOfBlocks[i].attr("x",(i-3)*150);
        setOfBlocks[i].attr("y", 150);
      }
    };
    for (var i = 0; i < 9; i++) {
      $(".quilt").append(setOfBlocks[i]);
    }
  })
  $("#clearQuilt").on("click", function() {
    $(".quilt").empty();
  })  
}());