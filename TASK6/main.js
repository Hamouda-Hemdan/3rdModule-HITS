var canvas;
var Drawing = false;
var canvas = document.querySelector("canvas");
canvas.width = 280;
canvas.height = 280;
var ctx = canvas.getContext("2d");
var prevX = 0;
var StartX = 0;
var prevY = 0;
var StartY = 0;
var paths = []; // recording paths
var lineWidth = 20;


function pencil() {
    canvas.addEventListener("mousedown", startPos);
    canvas.addEventListener("mouseup", endPos);
    canvas.addEventListener("mousemove", drawPencil);
}

function startPos(e) {
    Drawing = true;

    var x = e.pageX - window.innerWidth + window.innerWidth  + 100 ;
    var y = e.pageY - window.innerHeight + window.innerHeight  + 100;

    var i = Math.floor(x) * 400;
    var j = Math.floor(y) * 400;

    drawRec(i, j);

   

}
// it sets the drawing state to false "when the mouse is lifted up"
function endPos() {
    Drawing = false;
}

// It checks if the drawing state is true and then calculates the X and Y positions of the mouse within the canvas
// It then passes those positions to the drawRec function
function drawPencil(e) {

    if (!Drawing) return;

    //returns mouse position of user
    var x = e.pageX - window.innerWidth + window.innerWidth / 2 + 100;
    var y = e.pageY - window.innerHeight + window.innerHeight / 2 + 100;

    var i = Math.floor(x / 6) * 6;
    var j = Math.floor(y / 6) * 6;

    drawRec(i, j);
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    document.getElementById("number").innerHTML = "";
}

function drawRec(x, y) {
    ctx.fillStyle = "black";

    ctx.beginPath();
    ctx.rect(x, y, 6, 6);
    ctx.fill();
}

//When res is equal to 'move', findxy checks if the drawing state is true
// If it is, findxy sets the previous X and Y positions to the starting X and Y positions 
// then calculates the new starting X and Y positions of the mouse within the canvas 
//It updates the currPath variable in the paths array with the new X and Y positions 
// then passes the previous and current X and Y positions to the draw function 


function findxy(res, e) {
    if (res == 'down') {
        if (e.pageX != undefined && e.pageY != undefined) {
            StartX = e.pageX - canvas.offsetLeft;
            StartY = e.pageY - canvas.offsetTop;
        } else {
            StartX = e.clientX + document.body.scrollLeft
                + document.documentElement.scrollLeft
                - canvas.offsetLeft;
                StartY = e.clientY + document.body.scrollTop
                + document.documentElement.scrollTop
                - canvas.offsetTop;
        }
        //draw a circle
        ctx.beginPath();
        ctx.lineWidth = 1;
        ctx.arc(StartX, StartY, lineWidth / 2, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.closePath();
        ctx.fill();

        paths.push([[StartX], [StartY]]);
        Drawing = true;
    }
    if (res == 'up' || res == "out") {
        Drawing = false;
    }

    if (res == 'move') {
        if (Drawing) {
            // draw a line to previous point
            prevX = StartX;
            prevY = StartY;
            if (e.pageX != undefined && e.pageY != undefined) {
                StartX = e.pageX - canvas.offsetLeft;
                StartY = e.pageY - canvas.offsetTop;
               
            } else {
                StartX = e.clientX + document.body.scrollLeft
                    + document.documentElement.scrollLeft
                    - canvas.offsetLeft;
                    StartY = e.clientY + document.body.scrollTop
                    + document.documentElement.scrollTop
                    - canvas.offsetTop;
            }
            currPath = paths[paths.length - 1];
            currPath[0].push(StartX);
            currPath[1].push(StartY);
            paths[paths.length - 1] = currPath;
            draw(ctx, lineWidth, prevX, prevY, StartX, StartY);
        }
    }
}

// draws a line from (x1, y1) to (x2, y2) with nice rounded caps
function draw(ctx, lineWidth, x1, y1, x2, y2) {
    ctx.beginPath();
    ctx.lineWidth = lineWidth;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
    ctx.closePath();
}

