img = "";
status = "";
objects = [];

function preload(){
    img = loadImage('baby1.jpg');
}

function setup(){
    canvas = createCanvas(640, 420);
    canvas.center();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : detecting object";
}

function draw(){
    image(img, 0, 0, 640, 420);

    if(status != ""){
        for(i = 0; i < objects.length; i++){
            document.getElementById("status").innerHTML = "Status : Object detected"

            fill("#008000");
            precent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + precent + "%" , objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke("#008000");
            rect(objects[i].x, objects[i].y , objects[i].width , objects[i].height);
        }
    }
}

function modelLoaded(){
    console.log("Model Loaded!");
    status = true;
    objectDetector.detect(img, gotResult);
}

function gotResult(error, results){
    if(error) {
        console.log(error);
    }
    console.log(results);
    objects = results;
}
