function getInspirations() {
    return [
      {
        name: "Bear specimen", 
        assetUrl: "https://cdn.glitch.global/9a8d7528-cedf-40c6-995f-94b824fbce04/2024-05-06%20210404.png?v=1715054801545",
        credit: "Shot on American Museum of Natural History"
      },
      {
        name: "Che Guevara", 
        assetUrl: "https://cdn.glitch.global/9a8d7528-cedf-40c6-995f-94b824fbce04/2024-05-06%20210112.png?v=1715054798045",
        credit: "Che Guevara, René Burri, 1963"
      },
      {
        name: "Churchill", 
        assetUrl: "https://cdn.glitch.global/9a8d7528-cedf-40c6-995f-94b824fbce04/2024-05-07%20174133.png?v=1715128915274",
        credit: "Shot on UCSC campus"
      },
    ];
  }  

  function initDesign(inspiration) {
    let canvasContainer = $('.image-container'); // Select the container using jQuery
    let canvasWidth = canvasContainer.width() / 5; // Get the width of the container
    resizeCanvas(inspiration.image.width / 5, inspiration.image.height / 5);
    $(".caption").text(inspiration.credit); // Set the caption text

    // add the original image to #original
    const imgHTML = `<img src="${inspiration.assetUrl}" style="width:${canvasWidth}px;">`
    $('#original').empty();
    $('#original').append(imgHTML);
    
    let design = {
      bg: 128,
      fg: []
    }
    
    for(let i = 0; i < 1000; i++) {
      design.fg.push({x: random(width),
                      y: random(height),
                      w: random(width/15),
                      h: random(height/15),
                      fill: random(255)})
    }
    return design;
  }
  
  function renderDesign(design, inspiration) {
      background(design.bg);
      noStroke();
      for (let box of design.fg) {
          fill(box.fill, 200);
          if (inspiration.name === "Bear specimen") {
              // Use circle for Bear specimen
              let diameter = (box.w + box.h) / 2;
              circle(box.x, box.y, diameter);
          } else if (inspiration.name === "Che Guevara") {
              // Use triangle for Che Guevara
              triangle(box.x, box.y, box.x - box.w / 2, box.y + box.h, box.x + box.w / 2, box.y + box.h);
          } else if (inspiration.name === "Churchill") {
              // Use rect for Churchill
              rect(box.x, box.y, box.w, box.h);
          }
      }
  }
  
  function mutateDesign(design, inspiration, rate) {
    design.bg = mut(design.bg, 0, 255, rate);
    for(let box of design.fg) {
      box.fill = mut(box.fill, 0, 255, rate);
      box.x = mut(box.x, 0, width, rate);
      box.y = mut(box.y, 0, height, rate);
      box.w = mut(box.w, 0, width/2, rate);
      box.h = mut(box.h, 0, height/2, rate);
    }
  }
  
  
  function mut(num, min, max, rate) {
      return constrain(randomGaussian(num, (rate * (max - min)) / 10), min, max);
  }
  