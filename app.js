(function() {

var colorIndex = {
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

var neutralsIndex = {
  a: {  name: "Mist",
        hex: "#fcfbf2"    },
  b: {  name: "Chamois",
        hex: "#f2ebbf"    },
  c: {  name: "Shell",
        hex: "#f7edd3"    }
}

  var colorsInUse = [];
  var colorNamePairs = [];
  var fillNumberPairs = [];
  var indices = [];
  var chosenColor = neutralsIndex.a.hex;
  var fillColorId;
  var fillColorName;
  var parentClasses;
  var pieceClasses;
  var pieceId;
  var showColors;
  var neutralNames;
  var neutralFills;
  var matches = [];

  function logColors() {
    colorsInUse = [];
    $(".piece").each(function(i) {
      colorsInUse.push($(this).attr("fill"));
    });
  }

  function mapBlocksByColorName() {
    colorNamePairs = [];
    logColors();
    var colorPair = {};
    $(".block svg").each(function(i) {
      var outerFill = $(this).children(".outer").attr("fill");
      var outerColor = getKeyByValue(colorIndex, outerFill);
      var innerFill = $(this).children(".inner").attr("fill");
      var innerColor = getKeyByValue(colorIndex, innerFill);
      colorPair.outer = outerColor;
      colorPair.inner = innerColor;
      var neutrals = getNeutralNames();
      if (neutrals.includes(colorPair.outer)) {
        colorPair.neutral = colorPair.outer;
        colorPair.color = colorPair.inner;
      } else {
        colorPair.neutral = colorPair.inner;
        colorPair.color = colorPair.outer;
      }
      colorNamePairs.push(colorPair);
      colorPair = {};
    })
    // console.log(colorNamePairs);
    return colorNamePairs;
  }

  function mapBlocksByFillNumber() {
    fillNumberPairs = [];
    logColors();
    var fillPair = {};
    $(".block svg").each(function(i) {
      var outerFill = $(this).children(".outer").attr("fill");
      var innerFill = $(this).children(".inner").attr("fill");
      fillPair.outer = outerFill;
      fillPair.inner = innerFill;

      var neutrals = getNeutralFills();
      if (neutrals.includes(fillPair.outer)) {
        fillPair.neutral = fillPair.outer;
        fillPair.fill = fillPair.inner;
      } else {
        fillPair.neutral = fillPair.inner;
        fillPair.fill = fillPair.outer;
      }

      fillNumberPairs.push(fillPair);
      fillPair = {};
    })
    // console.log(fillNumberPairs);
    return fillNumberPairs;
  }

  function displayColors() {
    logColors();
    var colorsByBlock = mapBlocksByColorName();
    for (var i = 0; i < colorsByBlock.length; i++) {
      $("#toPrint").append("<li>"+ (i + 1) + ": " + colorsByBlock[i].outer + " / " + colorsByBlock[i].inner + "</li>");
    };
  }

  function getArrayDuplicates(arr, option) {
    var duplicates = {};
    if (option === "color") {
      // console.log('color');
      for (var i = 0; i < arr.length; i++) {
        if (duplicates.hasOwnProperty(arr[i].color)) {
          duplicates[arr[i].color].push(i);
        } else if (arr.lastIndexOf(arr[i].color) !== i) {
          duplicates[arr[i].color] = [i];
        }
      }
      return duplicates;
    } else if (option === "fill") {
      // console.log('fill');
      for (var i = 0; i < arr.length; i++) {
        if (duplicates.hasOwnProperty(arr[i].fill)) {
          duplicates[arr[i].fill].push(i);
        } else if (arr.lastIndexOf(arr[i].fill) !== i) {
          duplicates[arr[i].fill] = [i];
        }
      }
      return duplicates;
    } else if (option === "neutral") {
      // console.log('neutral');
      for (var i = 0; i < arr.length; i++) {
        if (duplicates.hasOwnProperty(arr[i].neutral)) {
          duplicates[arr[i].neutral].push(i);
        } else if (arr.lastIndexOf(arr[i].neutral) !== i) {
          duplicates[arr[i].neutral] = [i];
        }
      }
      return duplicates;
    } else {
      return duplicates;
    }
  }

  function compareObjects(neutralIndeces,fillIndeces) {
    // for each item in fillIndeces, are the indeces included in any of the neutralIndeces items?

    var indeces = [];    
    var fillKeys = Object.keys(fillIndeces);
    var neutralKeys = Object.keys(neutralIndeces);

    
    for (var i = 0; i < fillKeys.length; i++) {
      console.log("indeces for " + fillKeys[i]);
      console.log("i: " + i);
      indeces.push(fillKeys[i]);
      var j = 0;
      for (var location in fillIndeces) {
        
        console.log("j: " + j);
        console.log(indeces);
        console.log(fillKeys[i])
        if (j < 2) {
          if (fillIndeces[fillKeys[i]][j] != undefined) {
            indeces.push(fillIndeces[fillKeys[i]][j]);
          }
        } else {break}
        j = j + 1;
      };
  
      var includesFirstIndex = false;
      var includesSecondIndex = false;
      
      var matchFound = false;
      var m = 0;
      for(var neutral in neutralIndeces) {
        console.log("length: " + indeces.length);
        if (indeces.length > 1) {
          console.log(neutralIndeces[neutralKeys[m]]);
          console.log(indeces);
          includesFirstIndex = neutralIndeces[neutralKeys[m]].includes(indeces[1]);
          if (includesFirstIndex) {
            includesSecondIndex = neutralIndeces[neutralKeys[m]].includes(indeces[2]);
          }
          m = m + 1;
          if (includesFirstIndex && includesSecondIndex) {
              // console.log("Found both blocks, neutrals MATCH");
              // var colorName = ;
              var obj = {};
              obj[indeces[0]] = 1;
              matches.push(obj);
              matchFound = true;
              break;
          } else {
            // console.log("Found both blocks, neutrals DO NOT match");
            match = false;
          }
        }
      }
      
      if (!matchFound) {
        var obj = {};
        obj[indeces[0]] = 0;
        matches.push(obj);
      }
    
      indeces = [];
    }
    return matches;
  }

  function checkForNeutralPairs() {
    logColors();
    var colorsByBlock = mapBlocksByColorName();
    
    var colorIndexPairs = getArrayDuplicates(colorsByBlock, "color");
    // console.log(colorIndexPairs);
    var neutralIndexPairs = getArrayDuplicates(colorsByBlock, "neutral");
    // console.log(neutralIndexPairs);

    // var colorIndexPairs = {
    //   Apricot: [23, 56],
    //   Asparagus: [4, 75],
    //   Autumn: [36, 43],
    //   Baltic: [28, 51],
    //   Brown: [8, 71],
    //   Burst: [33, 46],
    //   Cactus: [21, 58],
    //   Cadet: [17, 62],
    //   Canyon: [29, 50],
    //   Caribbean_Sea: [3, 76],
    //   Chocolate: [19, 60],
    //   Chona_Brown: [9, 70],
    //   Cloud: [13, 66],
    //   Fern:[34],
    //   Flamingo: [25, 54],
    //   Garden:[44],
    //   Jade: [30, 49],
    //   Jungle: [39, 40],
    //   Kumquat: [15, 64],
    //   Licorice: [20, 59],
    //   Light_Jade: [22, 57],
    //   Macaw: [31, 48],
    //   Malachite: [38, 41],
    //   Manatee: [10, 69],
    //   Mango: [24, 55],
    //   Mesa: [14, 65],
    //   Oak: [18, 61],
    //   Olive:[45],
    //   Pomegranate: [32, 47],
    //   Reef: [16, 63],
    //   Sap:[35],
    //   Seaweed: [6, 73],
    //   Serpent: [27, 52],
    //   Shadow: [1, 78],
    //   Silver: [2, 77],
    //   Sky: [12, 67],
    //   Slate_gray: [11, 68],
    //   Sunset: [26, 53],
    //   Tropical: [37, 42],
    //   Tweed: [7, 72],
    //   Velvet: [5, 74],
    //   Vino: [0, 79],
    // }

    // var neutralIndexPairs = {
    //   Chamois:[11, 29, 50, 68],
    //   Mist:[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 13, 14, 15, 17, 18, 19, 20, 21, 22, 23, 25, 26, 27, 28, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 51, 52, 53, 54, 56, 57, 58, 59, 60, 61, 62, 64, 65, 66, 67, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79],
    //   Shell:[16, 24, 55, 63]
    // }

    var matchCheck = compareObjects(neutralIndexPairs, colorIndexPairs);
    console.log(matchCheck);
  };



  function countOccurences(arr, lookFor) {
    indices = [];
    var element = lookFor;
    var idx = arr.indexOf(element);
    while (idx != -1) {
      indices.push(idx);
      idx = arr.indexOf(element, idx + 1);
    }
    return indices;
  }

  function getNeutralNames() {
    neutralNames = [];
    var neutrals = Object.values(neutralsIndex);
    for (var i = 0; i < neutrals.length; i++) {
      neutralNames.push(neutrals[i].name);
    };
    return neutralNames;
  }

  function getNeutralFills() {
    neutralFills = [];
    var neutrals = Object.values(neutralsIndex);
    for (var i = 0; i < neutrals.length; i++) {
      neutralFills.push(neutrals[i].hex);
    };
    return neutralFills;
  }

  function checkChoice(obj) {
    logColors();
    var color = obj.attr("fill");
    var count = countOccurences(colorsInUse, color);
    // allow neutrals to be used more than twice
    var neutrals = getNeutralFills();
    if (!neutrals.includes(color)) {
    if (count.length > 1) {
        alert("You have already used that color twice - please choose another");
        return false;
      }
      return true;
    }
    return true;
  }

  function checkUsage(color) {
    logColors();
    var count = countOccurences(colorsInUse, color);
    var neutrals = getNeutralFills();
    if (!neutrals.includes(color)) {
    if (count.length > 1) {
        alert("You have already used that color twice - please choose another");
        return false;
      }
      return true;
    }
    return true;
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
    var allowChoice = checkChoice($(this));
    chosenColor = $(this).attr("fill");
    chosenLabel = $(this).attr("id");
    $(".chosenLabel").text(chosenLabel);
    $(".chosenColor").attr("fill", chosenColor);
    // console.log('you chose ' + chosenLabel);
  })
  $(".piece").on("click", function() {
    var performFill = checkUsage(chosenColor);
    if (performFill) {
      $(this).attr("fill", chosenColor);
    }
  })
  $("#clearBlock").on("click", function() {
    $(".piece").attr("fill", neutralsIndex.a.hex);
    $("#toPrint").empty();
  })
  $("#logBlock").on("click", function() {
    logColors();
    console.log(colorsInUse);
  })
  $("#checkMatches").on("click", function() {
    checkForNeutralPairs();
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