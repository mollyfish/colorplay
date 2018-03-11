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
  var matches = {};

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
    var neutralCheck = checkForNeutralPairs();
    var colorsByBlock = mapBlocksByColorName();

    // white center
    var neutralCheck = {
      Apricot:1,
      Autumn:1,
      Baltic:1,
      Brass:0,
      Cactus:1,
      Cadet:1,
      Canyon:1,
      Chartreuse:1,
      Cherry:1,
      Clay:1,
      Cosmic_Blue:1,
      Denim:1,
      Flamingo:1,
      Freedom_Blue:1,
      Garden:1,
      Jade:1,
      Kumquat:1,
      Licorice:1,
      Light_Jade:1,
      Macaw:1,
      Mango:1,
      Meadow:1,
      Mesa:1,
      Mineral:1,
      Olive:1,
      Orange:1,
      Petunia:1,
      Pomegranate:1,
      Reef:1,
      Royal:1,
      Saffron:1,
      Sap:1,
      Seaweed:1,
      Serpent:1,
      Shadow:0,
      Sky:1,
      Solar:1,
      Sunset:1,
      Tart:1,
      Terra:1,
      Thistle:1,
      Tropical:1,
      Velvet:1
    }


    // colored center
    // var neutralCheck = {
    //   Asparagus:1,
    //   Autumn:0,
    //   Baltic:1,
    //   Brass:1,
    //   Brown:1,
    //   Cactus:1,
    //   Cadet:1,
    //   Camel:1,
    //   Caribbean_Sea:1,
    //   Cherry:1,
    //   Clay:1,
    //   Cloud:1,
    //   Cosmic_Blue:1,
    //   Denim:1,
    //   Desert:1,
    //   Dogwood:1,
    //   Flamingo:0,
    //   Freedom_Blue:1,
    //   Jade:1,
    //   Jungle:1,
    //   Kumquat:0,
    //   Licorice:1,
    //   Light_Jade:1,
    //   Macaw:1,
    //   Malachite:1,
    //   Manatee:1,
    //   Mineral:1,
    //   Orange:0,
    //   Petunia:1,
    //   Reef:1,
    //   Sand_Dune:1,
    //   Serpent:1,
    //   Shadow:1,
    //   Silver:1,
    //   Sky:1,
    //   Slate_gray:1,
    //   Sycamore:1,
    //   Tart:1,
    //   Terra:1,
    //   Thistle:1,
    //   Tweed:1,
    //   Vino:1
    // }

    // white center
    var colorsByBlock = [   
      {outer: "Terra", inner: "Mist", neutral: "Mist", color: "Terra"},
      {outer: "Shell", inner: "Chartreuse", neutral: "Shell", color: "Chartreuse"},
      {outer: "Sap", inner: "Mist", neutral: "Mist", color: "Sap"},
      {outer: "Shell", inner: "Macaw", neutral: "Shell", color: "Macaw"},
      {outer: "Jade", inner: "Mist", neutral: "Mist", color: "Jade"},
      {outer: "Baltic", inner: "Mist", neutral: "Mist", color: "Baltic"},
      {outer: "Chamois", inner: "Serpent", neutral: "Chamois", color: "Serpent"},
      {outer: "Apricot", inner: "Mist", neutral: "Mist", color: "Apricot"},
      {outer: "Mist", inner: "Mango", neutral: "Mist", color: "Mango"},
      {outer: "Licorice", inner: "Shell", neutral: "Shell", color: "Licorice"},
      {outer: "Mist", inner: "Saffron", neutral: "Mist", color: "Saffron"},
      {outer: "Solar", inner: "Mist", neutral: "Mist", color: "Solar"},
      {outer: "Mist", inner: "Light_Jade", neutral: "Mist", color: "Light_Jade"},
      {outer: "Cactus", inner: "Mist", neutral: "Mist", color: "Cactus"},
      {outer: "Mist", inner: "Clay", neutral: "Mist", color: "Clay"},
      {outer: "Mist", inner: "Thistle", neutral: "Mist", color: "Thistle"},
      {outer: "Freedom_Blue", inner: "Shell", neutral: "Shell", color: "Freedom_Blue"},
      {outer: "Mist", inner: "Cosmic_Blue", neutral: "Mist", color: "Cosmic_Blue"},
      {outer: "Mesa", inner: "Mist", neutral: "Mist", color: "Mesa"},
      {outer: "Mist", inner: "Kumquat", neutral: "Mist", color: "Kumquat"},
      {outer: "Orange", inner: "Chamois", neutral: "Chamois", color: "Orange"},
      {outer: "Mist", inner: "Reef", neutral: "Mist", color: "Reef"},
      {outer: "Sky", inner: "Mist", neutral: "Mist", color: "Sky"},
      {outer: "Chamois", inner: "Cherry", neutral: "Chamois", color: "Cherry"},
      {outer: "Canyon", inner: "Fern", neutral: "Fern", color: "Canyon"},
      {outer: "Tart", inner: "Rugby", neutral: "Rugby", color: "Tart"},
      {outer: "Mist", inner: "Petunia", neutral: "Mist", color: "Petunia"},
      {outer: "Royal", inner: "Mist", neutral: "Mist", color: "Royal"},
      {outer: "Mist", inner: "Mineral", neutral: "Mist", color: "Mineral"},
      {outer: "Sunset", inner: "Shell", neutral: "Shell", color: "Sunset"},
      {outer: "Mist", inner: "Seaweed", neutral: "Mist", color: "Seaweed"},
      {outer: "Cadet", inner: "Mist", neutral: "Mist", color: "Cadet"},
      {outer: "Shell", inner: "Tropical", neutral: "Shell", color: "Tropical"},
      {outer: "Pomegranate", inner: "Evergreen", neutral: "Evergreen", color: "Pomegranate"},
      {outer: "Olive", inner: "Mist", neutral: "Mist", color: "Olive"},
      {outer: "Garden", inner: "Chamois", neutral: "Chamois", color: "Garden"},
      {outer: "Flamingo", inner: "Jungle", neutral: "Jungle", color: "Flamingo"},
      {outer: "Mist", inner: "Autumn", neutral: "Mist", color: "Autumn"},
      {outer: "Velvet", inner: "Mist", neutral: "Mist", color: "Velvet"},
      {outer: "Chamois", inner: "Denim", neutral: "Chamois", color: "Denim"},
      {outer: "Chamois", inner: "Denim", neutral: "Chamois", color: "Denim"},
      {outer: "Velvet", inner: "Mist", neutral: "Mist", color: "Velvet"},
      {outer: "Mist", inner: "Autumn", neutral: "Mist", color: "Autumn"},
      {outer: "Flamingo", inner: "Jungle", neutral: "Jungle", color: "Flamingo"},
      {outer: "Garden", inner: "Chamois", neutral: "Chamois", color: "Garden"},
      {outer: "Olive", inner: "Mist", neutral: "Mist", color: "Olive"},
      {outer: "Pomegranate", inner: "Evergreen", neutral: "Evergreen", color: "Pomegranate"},
      {outer: "Shell", inner: "Tropical", neutral: "Shell", color: "Tropical"},
      {outer: "Cadet", inner: "Mist", neutral: "Mist", color: "Cadet"},
      {outer: "Mist", inner: "Seaweed", neutral: "Mist", color: "Seaweed"},
      {outer: "Sunset", inner: "Shell", neutral: "Shell", color: "Sunset"},
      {outer: "Mist", inner: "Mineral", neutral: "Mist", color: "Mineral"},
      {outer: "Royal", inner: "Mist", neutral: "Mist", color: "Royal"},
      {outer: "Mist", inner: "Petunia", neutral: "Mist", color: "Petunia"},
      {outer: "Tart", inner: "Rugby", neutral: "Rugby", color: "Tart"},
      {outer: "Canyon", inner: "Fern", neutral: "Fern", color: "Canyon"},
      {outer: "Chamois", inner: "Cherry", neutral: "Chamois", color: "Cherry"},
      {outer: "Sky", inner: "Mist", neutral: "Mist", color: "Sky"},
      {outer: "Mist", inner: "Reef", neutral: "Mist", color: "Reef"},
      {outer: "Orange", inner: "Chamois", neutral: "Chamois", color: "Orange"},
      {outer: "Mist", inner: "Kumquat", neutral: "Mist", color: "Kumquat"},
      {outer: "Mesa", inner: "Mist", neutral: "Mist", color: "Mesa"},
      {outer: "Mist", inner: "Cosmic_Blue", neutral: "Mist", color: "Cosmic_Blue"},
      {outer: "Freedom_Blue", inner: "Shell", neutral: "Shell", color: "Freedom_Blue"},
      {outer: "Mist", inner: "Thistle", neutral: "Mist", color: "Thistle"},
      {outer: "Mist", inner: "Clay", neutral: "Mist", color: "Clay"},
      {outer: "Cactus", inner: "Mist", neutral: "Mist", color: "Cactus"},
      {outer: "Mist", inner: "Light_Jade", neutral: "Mist", color: "Light_Jade"},
      {outer: "Solar", inner: "Mist", neutral: "Mist", color: "Solar"},
      {outer: "Mist", inner: "Saffron", neutral: "Mist", color: "Saffron"},
      {outer: "Licorice", inner: "Shell", neutral: "Shell", color: "Licorice"},
      {outer: "Mist", inner: "Mango", neutral: "Mist", color: "Mango"},
      {outer: "Apricot", inner: "Mist", neutral: "Mist", color: "Apricot"},
      {outer: "Chamois", inner: "Serpent", neutral: "Chamois", color: "Serpent"},
      {outer: "Baltic", inner: "Mist", neutral: "Mist", color: "Baltic"},
      {outer: "Jade", inner: "Mist", neutral: "Mist", color: "Jade"},
      {outer: "Shell", inner: "Macaw", neutral: "Shell", color: "Macaw"},
      {outer: "Sap", inner: "Mist", neutral: "Mist", color: "Sap"},
      {outer: "Shell", inner: "Chartreuse", neutral: "Shell", color: "Chartreuse"},
      {outer: "Terra", inner: "Mist", neutral: "Mist", color: "Terra"}
    ]


    // colored center
    // var colorsByBlock = [
    //   {outer: "Licorice", inner: "Mist", neutral: "Mist", color: "Licorice"},
    //   {outer: "Mist", inner: "Slate_gray", neutral: "Mist", color: "Slate_gray"},
    //   {outer: "Shadow", inner: "Mist", neutral: "Mist", color: "Shadow"},
    //   {outer: "Mist", inner: "Light_Jade", neutral: "Mist", color: "Light_Jade"},
    //   {outer: "Cactus", inner: "Mist", neutral: "Mist", color: "Cactus"},
    //   {outer: "Macaw", inner: "Mist", neutral: "Mist", color: "Macaw"},
    //   {outer: "Mist", inner: "Jade", neutral: "Mist", color: "Jade"},
    //   {outer: "Brass", inner: "Mist", neutral: "Mist", color: "Brass"},
    //   {outer: "Mist", inner: "Desert", neutral: "Mist", color: "Desert"},
    //   {outer: "Terra", inner: "Chamois", neutral: "Chamois", color: "Terra"},
    //   {outer: "Mist", inner: "Vino", neutral: "Mist", color: "Vino"},
    //   {outer: "Manatee", inner: "Mist", neutral: "Mist", color: "Manatee"},
    //   {outer: "Mist", inner: "Cloud", neutral: "Mist", color: "Cloud"},
    //   {outer: "Sky", inner: "Shell", neutral: "Shell", color: "Sky"},
    //   {outer: "Mist", inner: "Cherry", neutral: "Mist", color: "Cherry"},
    //   {outer: "Shell", inner: "Camel", neutral: "Shell", color: "Camel"},
    //   {outer: "Jungle", inner: "Mist", neutral: "Mist", color: "Jungle"},
    //   {outer: "Mist", inner: "Malachite", neutral: "Mist", color: "Malachite"},
    //   {outer: "Dogwood", inner: "Mist", neutral: "Mist", color: "Dogwood"},
    //   {outer: "Mist", inner: "Sand_Dune", neutral: "Mist", color: "Sand_Dune"},
    //   {outer: "Sycamore", inner: "Mist", neutral: "Mist", color: "Sycamore"},
    //   {outer: "Mist", inner: "Asparagus", neutral: "Mist", color: "Asparagus"},
    //   {outer: "Caribbean_Sea", inner: "Mist", neutral: "Mist", color: "Caribbean_Sea"},
    //   {outer: "Mist", inner: "Thistle", neutral: "Mist", color: "Thistle"},
    //   {outer: "Clay", inner: "Mist", neutral: "Mist", color: "Clay"},
    //   {outer: "Mineral", inner: "Mist", neutral: "Mist", color: "Mineral"},
    //   {outer: "Mist", inner: "Denim", neutral: "Mist", color: "Denim"},
    //   {outer: "Baltic", inner: "Mist", neutral: "Mist", color: "Baltic"},
    //   {outer: "Chamois", inner: "Serpent", neutral: "Chamois", color: "Serpent"},
    //   {outer: "Silver", inner: "Mist", neutral: "Mist", color: "Silver"},
    //   {outer: "Mist", inner: "Brown", neutral: "Mist", color: "Brown"},
    //   {outer: "Tweed", inner: "Mist", neutral: "Mist", color: "Tweed"},
    //   {outer: "Mist", inner: "Tart", neutral: "Mist", color: "Tart"},
    //   {outer: "Petunia", inner: "Mist", neutral: "Mist", color: "Petunia"},
    //   {outer: "Shell", inner: "Orange", neutral: "Shell", color: "Orange"},
    //   {outer: "Mist", inner: "Kumquat", neutral: "Mist", color: "Kumquat"},
    //   {outer: "Freedom_Blue", inner: "Mist", neutral: "Mist", color: "Freedom_Blue"},
    //   {outer: "Mist", inner: "Cosmic_Blue", neutral: "Mist", color: "Cosmic_Blue"},
    //   {outer: "Cadet", inner: "Mist", neutral: "Mist", color: "Cadet"},
    //   {outer: "Mist", inner: "Reef", neutral: "Mist", color: "Reef"},
    //   {outer: "Mist", inner: "Reef", neutral: "Mist", color: "Reef"},
    //   {outer: "Cadet", inner: "Mist", neutral: "Mist", color: "Cadet"},
    //   {outer: "Mist", inner: "Cosmic_Blue", neutral: "Mist", color: "Cosmic_Blue"},
    //   {outer: "Freedom_Blue", inner: "Mist", neutral: "Mist", color: "Freedom_Blue"},
    //   {outer: "Shell", inner: "Autumn", neutral: "Shell", color: "Autumn"},
    //   {outer: "Mist", inner: "Flamingo", neutral: "Mist", color: "Flamingo"},
    //   {outer: "Petunia", inner: "Mist", neutral: "Mist", color: "Petunia"},
    //   {outer: "Mist", inner: "Tart", neutral: "Mist", color: "Tart"},
    //   {outer: "Tweed", inner: "Mist", neutral: "Mist", color: "Tweed"},
    //   {outer: "Mist", inner: "Brown", neutral: "Mist", color: "Brown"},
    //   {outer: "Silver", inner: "Mist", neutral: "Mist", color: "Silver"},
    //   {outer: "Chamois", inner: "Serpent", neutral: "Chamois", color: "Serpent"},
    //   {outer: "Baltic", inner: "Mist", neutral: "Mist", color: "Baltic"},
    //   {outer: "Mist", inner: "Denim", neutral: "Mist", color: "Denim"},
    //   {outer: "Mineral", inner: "Mist", neutral: "Mist", color: "Mineral"},
    //   {outer: "Clay", inner: "Mist", neutral: "Mist", color: "Clay"},
    //   {outer: "Mist", inner: "Thistle", neutral: "Mist", color: "Thistle"},
    //   {outer: "Caribbean_Sea", inner: "Mist", neutral: "Mist", color: "Caribbean_Sea"},
    //   {outer: "Mist", inner: "Asparagus", neutral: "Mist", color: "Asparagus"},
    //   {outer: "Sycamore", inner: "Mist", neutral: "Mist", color: "Sycamore"},
    //   {outer: "Mist", inner: "Sand_Dune", neutral: "Mist", color: "Sand_Dune"},
    //   {outer: "Dogwood", inner: "Mist", neutral: "Mist", color: "Dogwood"},
    //   {outer: "Mist", inner: "Malachite", neutral: "Mist", color: "Malachite"},
    //   {outer: "Jungle", inner: "Mist", neutral: "Mist", color: "Jungle"},
    //   {outer: "Shell", inner: "Camel", neutral: "Shell", color: "Camel"},
    //   {outer: "Mist", inner: "Cherry", neutral: "Mist", color: "Cherry"},
    //   {outer: "Sky", inner: "Shell", neutral: "Shell", color: "Sky"},
    //   {outer: "Mist", inner: "Cloud", neutral: "Mist", color: "Cloud"},
    //   {outer: "Manatee", inner: "Mist", neutral: "Mist", color: "Manatee"},
    //   {outer: "Mist", inner: "Vino", neutral: "Mist", color: "Vino"},
    //   {outer: "Terra", inner: "Chamois", neutral: "Chamois", color: "Terra"},
    //   {outer: "Mist", inner: "Desert", neutral: "Mist", color: "Desert"},
    //   {outer: "Brass", inner: "Mist", neutral: "Mist", color: "Brass"},
    //   {outer: "Mist", inner: "Jade", neutral: "Mist", color: "Jade"},
    //   {outer: "Macaw", inner: "Mist", neutral: "Mist", color: "Macaw"},
    //   {outer: "Cactus", inner: "Mist", neutral: "Mist", color: "Cactus"},
    //   {outer: "Mist", inner: "Light_Jade", neutral: "Mist", color: "Light_Jade"},
    //   {outer: "Shadow", inner: "Mist", neutral: "Mist", color: "Shadow"},
    //   {outer: "Mist", inner: "Slate_gray", neutral: "Mist", color: "Slate_gray"},
    //   {outer: "Licorice", inner: "Mist", neutral: "Mist", color: "Licorice"}
    // ]

    console.log(colorsByBlock);
    console.log(neutralCheck);
    var asterisk = "";
    var misMatches;
    for (var i = 0; i < colorsByBlock.length; i++) {
      console.log("---------------------------------");
      if (neutralCheck[colorsByBlock[i].color] === 0) {
        asterisk = "*";
        misMatches = true;
      }
      $("#toPrint").append("<li>" + (i + 1) + ": " + colorsByBlock[i].outer + " / " + colorsByBlock[i].inner + asterisk + "</li>");
      asterisk = "";   
    };
    if (misMatches) {
      $("#toPrint").append("<li>* These blocks cannot be assembled using the face-to-face half-square triangle technique; you must cut the triangles and then assemble the block.</li>");
    }
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
              matches[indeces[0]] = 1;
              matchFound = true;
              break;
          } else {
            // console.log("Found both blocks, neutrals DO NOT match");
            match = false;
          }
        }
      }
      
      if (!matchFound) {
        matches[indeces[0]] = 0;
      }
    
      indeces = [];
    }
    console.log(matches);
    return matches;
  }

  function checkForNeutralPairs() {
    logColors();
    var colorsByBlock = mapBlocksByColorName();
    
    // var colorIndexPairs = getArrayDuplicates(colorsByBlock, "color");
    // console.log(colorIndexPairs);
    // var neutralIndexPairs = getArrayDuplicates(colorsByBlock, "neutral");
    // console.log(neutralIndexPairs);

    // white center
    var colorIndexPairs = {
      Apricot: [7, 72],
      Autumn: [37, 42],
      Baltic: [5, 74],
      Cactus: [13, 66],
      Cadet: [31, 48],
      Canyon: [24, 55],
      Chartreuse: [1, 78],
      Cherry: [23, 56],
      Clay: [14, 65],
      Cosmic_Blue: [17, 62],
      Denim: [39, 40],
      Flamingo: [36, 43],
      Freedom_Blue: [16, 63],
      Garden: [35, 44],
      Jade: [4, 75],
      Kumquat: [19, 60],
      Licorice: [9, 70],
      Light_Jade: [12, 67],
      Macaw: [3, 76],
      Mango: [8, 71],
      Mesa: [18, 61],
      Mineral: [28, 51],
      Olive: [34, 45],
      Orange: [20, 59],
      Petunia: [26, 53],
      Pomegranate: [33, 46],
      Reef: [21, 58],
      Royal: [27, 52],
      Saffron: [10, 69],
      Sap: [2, 77],
      Seaweed: [30, 49],
      Serpent: [6, 73],
      Sky: [22, 57],
      Solar: [11, 68],
      Sunset: [29, 50],
      Tart: [25, 54],
      Terra: [0, 79],
      Thistle: [15, 64],
      Tropical: [32, 47],
      Velvet: [38, 41]
    }

    // colored center
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

    // white center
    var neutralIndexPairs = {
      Chamois:[6, 20, 23, 35, 39, 40, 44, 56, 59, 73],
      Evergreen:[33, 46],
      Fern:[24, 55],
      Jungle:[36, 43],
      Mist:[0, 2, 4, 5, 7, 8, 10, 11, 12, 13, 14, 15, 17, 18, 19, 21, 22, 26, 27, 28, 30, 31, 34, 37, 38, 41, 42, 45, 48, 49, 51, 52, 53, 57, 58, 60, 61, 62, 64, 65, 66, 67, 68, 69, 71, 72, 74, 75, 77, 79],
      Rugby:[25, 54],
      Shell:[1, 3, 9, 16, 29, 32, 47, 50, 63, 70, 76, 78]
    }


    // colored center
    // var neutralIndexPairs = {
    //   Chamois:[11, 29, 50, 68],
    //   Mist:[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 13, 14, 15, 17, 18, 19, 20, 21, 22, 23, 25, 26, 27, 28, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 51, 52, 53, 54, 56, 57, 58, 59, 60, 61, 62, 64, 65, 66, 67, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79],
    //   Shell:[16, 24, 55, 63]
    // }

    var matchCheck = compareObjects(neutralIndexPairs, colorIndexPairs);
    console.log(matchCheck);
    return matchCheck;
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