(function() {

  var colorIndex = {
    Burst: "#fab899",
    Apricot: "#f6947e",
    Mango: "#f69266",
    Mesa: "#f37645",
    Orange: "#f7951e",
    Kumquat: "#f16035",
    Candy: "#f9c3c4",
    Flamingo: "#f16269",
    Sunset: "#f05146",
    Autumn: "#ee2736",
    Tropical: "#c1196f",
    Pomegranate: "#983261",
    Chocolate: "#57382b",
    Canyon: "#663629",
    Oak: "#6a5141",

    Tweed: "#937c67",
    Brown: "#8c5e2a",
    Camel: "#ce9c72",
    Cherry: "#761532",
    Clay: "#855853",
    Thistle: "#b285a2",
    Petunia: "#a95ea2",
    Tart: "#906794",
    Cosmic_Blue: "#39536b",
    Freedom_Blue: "#2b375b",
    Denim: "#44749f",
    Mineral: "#035179",
    Royal: "#204294",
    Velvet: "#166ba9",
    Seaweed: "#0086ae",

    Terra: "#4e453a",
    Evergreen: "#394f38",
    Rugby: "#255f4a",
    Fern: "#017f51",
    Garden: "#7ab87a",
    Meadow: "#4fbc7e",
    Olive: "#84a265",
    Citron: "#d0e5a6",
    Neon: "#aed9a8",
    Sap: "#b1c887",
    Chartreuse: "#bbc85e",
    Solar: "#efca40",
    Spark_Gold: "#c59c30",
    Saffron: "#fec037",
    Lemon: "#fbee78",

    Reef: "#35a9d1",   
    Cadet: "#6ba2c1",   
    Serpent: "#0e575f",   
    Baltic: "#007886",   
    Malachite: "#709ba1",   
    Jungle: "#44816b",   
    Jade: "#009e94",   
    Macaw: "#3abfb1",   
    Cactus: "#70c295",   
    Light_Jade: "#6cc8ba",   
    Sky: "#5ac0de",   
    Cloud: "#a1dcf1",   
    Caribbean_Sea: "#a9ddd7",   
    Asparagus: "#9baf94",   
    Sycamore: "#bda98e",   

    Salt: "#cabc95",
    Chamois: "#f2ebbf",
    Mist: "#fcfbf2",
    Shell: "#f7edd3",
    Silver: "#aeb7bd",
    Sand_Dune: "#ccc0b9",
    Dogwood: "#afa99e",
    Desert: "#97827d",
    Brass: "#a39986",
    Shadow: "#8c918f",
    Slate_gray: "#6f7579",
    Manatee: "#515659",
    Licorice: "#1d1d23",
    Vino: "#4e2130",
    Chona_Brown: "#46332b"
}

  var colorsInUse = [];
  var blocks = [];
  var indices = [];
  var chosenColor = "#fcfbf2";
  var fillColorId;
  var fillColorName;
  var parentClasses;
  var pieceClasses;
  var pieceId;
  var showColors;

  function logColors() {
    colorsInUse = [];
    $(".piece").each(function(i) {
      colorsInUse.push($(this).attr("fill"));
    });
  }

  function mapBlocks() {
    var shortBlocks = [];
    blocks = [];
    $(".block svg").each(function(i) {
      var classes = $(this).attr("class");
      classes = classes.replace(/\s+/g, '');
      console.log(classes);
      blocks.push(classes);
    })



    return blocks;
  }

  function displayColors() {
    logColors();
    var blockList = mapBlocks();
    console.log(blockList.length);
    console.log(colorsInUse.length);
    for (var i = 0; i < colorsInUse.length; i++) {
      var color = getKeyByValue(colorIndex, colorsInUse[i]);
      $("#toPrint").append("<li>" + color + "</li>");
    };
  }

  function countOccurences(arr, lookFor) {
    indices = [];
    var element = lookFor;
    var idx = arr.indexOf(element);
    while (idx != -1) {
      indices.push(idx);
      idx = arr.indexOf(element, idx + 1);
    }
    return indices;
    // [0, 2, 4]
  }

  function checkUsage(obj) {
    logColors();
    var color = obj.attr("fill");
    var count = countOccurences(colorsInUse, color);
    // allow neutrals to be used more than twice
    if (color != "#fcfbf2" && color != "#f2ebbf" && color != "#f7edd3") {
    if (count.length > 1) {
        alert("You have already used that color twice - please choose another");
      }
    }
  }

  function getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value);
  }

  $("#enableTooltips").on("change", function() {
    if($("#enableTooltips").is(':checked')) {
    showColors = true;  // checked
  } else {
    showColors = false;
  } 
  })


  $(".piece").hover(function() {
    if (showColors) {
      fillColorId = $(this).attr("fill");
      fillColorName = getKeyByValue(colorIndex, fillColorId);
      parentClasses = $(this).parent().attr("class");
      parentClasses = parentClasses.replace(/\s+/g, '');
      pieceClasses = $(this).attr("class");
      pieceClasses = pieceClasses.replace("piece ", "");
      pieceId = parentClasses + pieceClasses;
  
      $("#"+pieceId+"").text('');
      $("#"+pieceId+"").text(fillColorName);
      $("#"+pieceId+"").removeClass('hidden');
    }
  }, function() {
    if (showColors){
    $("#"+pieceId+"").addClass('hidden');
    }
  });



  $(".colorChoice").on("click", function() {
    var chosenLabel = '';
    $(".chosenLabel").text(chosenLabel);
    checkUsage($(this));
    chosenColor = $(this).attr("fill");
    chosenLabel = $(this).attr("id");
    console.log('you chose ' + chosenLabel);
    $(".chosenLabel").text(chosenLabel);
    $(".chosenColor").attr("fill", chosenColor);
  })
  $(".piece").on("click", function() {
    $(this).attr("fill", chosenColor);
  })
  $("#clearBlock").on("click", function() {
    $(".piece").attr("fill", "#fff");
  })
  $("#logBlock").on("click", function() {
    logColors();
    console.log(colorsInUse);
    // colorsInUse = [];
  })
  $("#displayBlock").on("click", function() {
    $("#toPrint").empty();
    displayColors();
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