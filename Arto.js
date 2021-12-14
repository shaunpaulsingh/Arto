var nPoints = 3000;

var vertices = new Array(nPoints);

var triangles;

var img;

var borde = 50;

var input;

var generateFlag = false;

function setup() {

   //createCanvas(img.width,img.height);
   createCanvas(2000,2000);
   background(255);
   //noLoop();
   input = createFileInput(handleFile);
   input.position(0, 0);

  
}

function handleFile(file) {
    console.log(file);
  text("The name of the file selected is: "+
                                file.name, 20, 80);
  text("The extension of the file selected is: "+ 
                               file.subtype, 20, 100);
  text("The type of the file selected is: "+
                                  file.type, 20, 120);
  text("The size of the file selected is: "+ 
                                  file.size, 20, 140);
  
  if (file.type === 'image') {
    img = loadImage(file.data);
    
    //img.hide();
    generateFlag = true;
  } else {
    img = null;
  }
  
}

/////////////////////////
// generate random points
/////////////////////////

function generatePoints() {

   var i = 0;

   while (i < nPoints)
   {
       var x = random(borde,img.width-borde);
       var y = random(borde,img.height-borde);
       vertices[i] = [x,y];
       i++;
   }

   triangles = Delaunay.triangulate(vertices);
  
}


//////////////
// triangulate
//////////////

function triangulate() {
  
  for(i = triangles.length; i; )
  {
      --i;
      var p1X = vertices[triangles[i]][0];
      var p1Y = vertices[triangles[i]][1];
      vertex(p1X,p1Y);
      --i;
      var p2X = vertices[triangles[i]][0];
      var p2Y = vertices[triangles[i]][1];
      vertex(p2X,p2Y);
      --i;
      var p3X = vertices[triangles[i]][0];
      var p3Y = vertices[triangles[i]][1];

      var centroidX = floor((p1X + p2X + p3X)/3.0);
      var centroidY = floor((p1Y + p2Y + p3Y)/3.0);

      var colortoadd = img.get(centroidX,centroidY);
      var coloralpha = color(red(colortoadd),green(colortoadd),blue(colortoadd),50);
      
      fill(coloralpha);
      stroke(coloralpha);
    
      beginShape();
      vertex(p1X,p1Y);
      vertex(p2X,p2Y);
      vertex(p3X,p3Y);
      endShape();
  }
}


function draw() {

  //clear();
  if(generateFlag == true){
    console.log("DRAWING");
    generatePoints();
    triangulate();
  }
  

}

function generate(){
  
}
