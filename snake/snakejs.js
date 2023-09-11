var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d"); //取得CanvasRenderingContext2D介面的實體物件

var snake = [] ;
var fruit = {} ;

var snakelength = 1;
var maxlength = 0;
var direction ="up"
var speed = 10;
let levelSpeedCountDown = 0;

var myStatus = "opening";

maxlength = getCookie("yokensnakemaxlength");

function MVC(){
    if (myStatus == "opening"){
        document.getElementById("myP").innerHTML = "按空白鍵開始遊戲";
    }
    else if (myStatus == "playing"){
        /*if(maxlength == 0) document.getElementById("myP").innerHTML = "目前速度: " + Math.floor(1000/speed,-1) +  " | 目前長度: " + snakelength;
        else document.getElementById("myP").innerHTML = "目前速度: " + Math.floor(1000/speed,-1) +  " | 目前長度: " + snakelength + " | 最高紀錄: " + maxlength;
        */
        if(maxlength == 0) document.getElementById("myP").innerHTML = "目前長度: " + snakelength;
        else document.getElementById("myP").innerHTML = "目前長度: " + snakelength + " | 最高紀錄: " + maxlength;
        
        if (levelSpeedCountDown == 0){
            update();
            levelSpeedCountDown += ((30-snakelength) / 3);
        }
        levelSpeedCountDown --;
        if (levelSpeedCountDown <= 0) levelSpeedCountDown = 0;
    }
    else if (myStatus == "pause"){
        ctx.fillStyle = '#555';
        ctx.font="120px Helvetica";
        ctx.fillText("Pause", 120, 300);
    }
    else if (myStatus == "gameover"){
        document.getElementById("myP").innerHTML = "遊戲結束，長度：" + snakelength + "，按R鍵重新開始遊戲";
    }
}
clearBoard();
initialValue();

setInterval("MVC()",speed);


//當在加載完目標資源後，開始偵聽canvas的keydown事件
window.addEventListener('load',function(){
    window.addEventListener('keydown',keydown);
});
function keydown(e){
    var keyID = e.code;
    console.log(keyID);

    if(keyID == "ArrowUp" || keyID == "Numpad8" || keyID == "KeyW") {
        if(snakelength >= 2){
            if(snake[0].y-1 != snake[1].y) direction = "up";
        }
        else direction = "up";
    }
    else if (keyID == "ArrowDown" || keyID == "Numpad2" || keyID == "KeyS"){
        if(snakelength >= 2){
            if(snake[0].y+1 != snake[1].y) direction = "down";
        }
        else direction = "down";
    }
    else if (keyID == "ArrowLeft" || keyID == "Numpad4" || keyID == "KeyA"){
        if(snakelength >= 2){
            if(snake[0].x-1 != snake[1].x) direction = "left";
        }
        else direction = "left";
    }
    else if (keyID == "ArrowRight" || keyID == "Numpad6" || keyID == "KeyD"){
        if(snakelength >= 2){
            if(snake[0].x+1 != snake[1].x) direction = "right";
        }
        else direction = "right";
    }
    else if (keyID == "Space"){
        if(myStatus == "opening" || myStatus == "pause"){
            myStatus = "playing";
        }
        else if(myStatus == "playing"){
            myStatus = "pause";
        }
        
    }
    else if (keyID == "KeyR"){
        if(myStatus == "gameover"){
            for (let i = 0 ; i < snakelength; i ++){
                snake.pop();
            }  
            initialValue();
            myStatus = "playing";
        }
    }
    console.log(direction);
}


function update(){
    clearBoard();
    snake.push({});
    snakelength ++;
    for (let i = snakelength - 1; i > 0 ; i --){
        snake[i].x = snake[i-1].x;
        snake[i].y = snake[i-1].y;
    }

    if (direction == "up"){
        snake[0].x = snake[1].x;
        snake[0].y = snake[1].y-1;
    }
    else if (direction == "down"){
        snake[0].x = snake[1].x;
        snake[0].y = snake[1].y+1;
    }
    else if (direction == "left"){
        snake[0].x = snake[1].x-1;
        snake[0].y = snake[1].y;
    }
    else if (direction == "right"){
        snake[0].x = snake[1].x+1;
        snake[0].y = snake[1].y;
    }

    //吃掉fruit
    if (snake[0].x == fruit.x && snake[0].y == fruit.y){
        fruitReset();
    }
    else{
        snake.pop();
        snakelength --;
    }
    isGameover();
    //levelUpdate();
    drawBoard();
}

function clearBoard(){
    ctx.fillStyle = '#333';
    ctx.fillRect(-550, -550, canvas.width+1100, canvas.height+1100);
    ctx.fillStyle = '#FFF';
    ctx.fillRect(10, 10, canvas.width-20, canvas.height-20);
}

function drawBoard(){
    for (let i = 0; i < snakelength; i ++){
        ctx.fillStyle = '#333';
        ctx.fillRect(snake[i].x*10, snake[i].y*10, 10, 10);
    }  
    ctx.fillStyle = '#00F';
    ctx.fillRect(fruit.x*10, fruit.y*10, 10, 10);
}

function fruitReset(){
    var fruitnotOK = true;
    while(fruitnotOK){
        fruitnotOK = false;
        fruit.x = Math.ceil(Math.random() * 53 + 1);
        fruit.y = Math.ceil(Math.random() * 53 + 1);
        for (let i = 0; i < snakelength; i ++){
            if (snake[i].x == fruit.x && snake[i].y == fruit.y) fruitnotOK = true;
        }  
    }
}

function levelUpdate(){
    if(speed >= 10){
        speed = 50 - snakelength;
    }
    else if(speed < 10){
        speed = 10;
    }
}

function isGameover(){
    if(snake[0].x <= 0 || snake[0].x > 55 || snake[0].y <= 0 || snake[0].y > 55){
        myStatus = "gameover";
        if(snakelength >= maxlength) maxlength = snakelength;
        //speed = 50;
        document.cookie="yokensnakemaxlength=John Smith; expires=Thu, 18 Dec 2043 12:00:00 GMT; path=/";
        setCookie("yokensnakemaxlength",maxlength,30);
    }
    if (snakelength >= 2){
        for (let i = 1; i < snakelength; i ++){
            if(snake[0].x == snake[i].x && snake[0].y == snake[i].y){
                myStatus = "gameover";
                if(snakelength >= maxlength) maxlength = snakelength;
                //speed = 50;
                setCookie("yokensnakemaxlength",maxlength,30);
            }
        }  
    }
}

function initialValue(){
    snake.push({});
    snake[0].x = 28;
    snake[0].y = 28;
    snakelength = 1;
    direction = "up";
    fruitReset();
}

function setCookie(cname,cvalue,exdays)
{
  var d = new Date();
  d.setTime(d.getTime()+(exdays*24*60*60*1000));
  var expires = "expires="+d.toGMTString();
  document.cookie = cname + "=" + cvalue + "; " + expires;
}

function getCookie(cname)
{
  var name = cname + "=";
  var ca = document.cookie.split(';');
  for(var i=0; i<ca.length; i++) 
  {
    var c = ca[i].trim();
    if (c.indexOf(name)==0) return c.substring(name.length,c.length);
  }
  return 0;
}