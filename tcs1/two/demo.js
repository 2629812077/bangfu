var sd=100;
var snakeMove;
var startGameBool = true;/*标识游戏开始*/
var startPauseBool = true;/*暂停的标识*/
var scoreBox = document.getElementById('score');
var content = document.getElementById('content');/*中心区域*/
var lose = document.getElementById('loser');/*输的显示*/
var loserScore = document.getElementById('loserScore');/*最终的分*/
var startPaush = document.getElementById('startPaush');/**/
var closeBtn = document.getElementById('close');/*关闭图片*/
var startBtn = document.getElementById('startBtn');/*开始的按钮*/
var startPage = document.getElementById('startPage');
function SD() {
    var sd1=document.getElementById("btn1").getAttribute("sd");
    var sd2=document.getElementById("btn2").getAttribute("sd");
    var sd3=document.getElementById("btn3").getAttribute("sd");
    if(sd1!='null'){
        return 200;
    }else if(sd2!='null'){
        return 100;
    }else if(sd3!='null'){
        return 800;
    }
}
init();
/*移动速度*/







/*游戏初始化参数*/
function init() {


    //地图属性（计算出宽高）
    this.mapW = parseInt(window.getComputedStyle(content).width);
    this.mapH = parseInt(window.getComputedStyle(content).height);
    this.mapDiv = content;/*显示的区域*/
    //食物属性
    this.foodW = 20;/*宽*/
    this.foodH = 20;/*高*/
    this.foodX = 0;/*坐标*/
    this.foodY = 0;
    this.foodColor = '#00F';/*食物颜色*/
    //蛇属性
    this.snake;
    this.snakeW = 20;/*蛇的宽高*/
    this.snakeH = 20;


    /*将蛇定义为一个二维数组，每一个以为数组中有三个数据，位置(x,y)和标志*/
    this.snakeBody = [[3, 0, 'head'], [2, 0, 'body'], [1, 0, 'body']];
    //游戏属性
    this.direct = 'right';/*出生的默认方向为右*/
    this.left = false;/*不可以直接反向*/
    this.right = false;
    this.up = true;
    this.down = true;

    /*分数初始化*/
    this.score = 0;
    scoreBox.innerHTML = this.score;/*在分数框内显示分数*/
    bindEvent();/*绑定事件*/
}
/*游戏开始*/
function startGame() {
    startPage.style.display = 'none';/*游戏开始时游戏开始按钮 不会被显示。*/
    startPaush.style.display = 'block';/*此元素将显示为块级元素，此元素前后会带有换行符。*/
    /*刷新游戏和蛇*/
    food();
    snake();
}
/*定义食物*/
function food() {
    var food = document.createElement('div');/*添加一个新的div*/
    // 设置宽高
    food.style.width = this.foodW + 'px';/*init中的宽高*/
    food.style.height =this .foodH + 'px';
    food.style.borderRadius = '50%';/*圆角边框*/
    /*食物位置随机刷新*/
    this.foodX = Math.floor(Math.random() * (this.mapW / this.foodW));
    this.foodY = Math.floor(Math.random() * (this.mapH / this.foodH));

    food.style.left = this.foodX * this.foodW + 'px';
    food.style.top = this.foodY * this.foodH + 'px';

    food.style.position = 'absolute';
    this.mapDiv.appendChild(food).setAttribute('class', 'food');
}
/*蛇的定义*/
function snake() {
    var speed=200;
    for (var i = 0; i < this.snakeBody.length; i++) {
       /* 设置蛇的身体的 每个部位的属性*/
       var snake = document.createElement('div');/*创建一个新的节点*/
       /*设置宽高*/
        snake.style.width = this.snakeW + 'px';
        snake.style.height = this.snakeH + 'px';
        /*圆角边框*/
        snake.style.borderRadius = '50%';
        /*位置决对*/
        snake.style.position = 'absolute';
        /*身体位置*/
        snake.style.left = this.snakeBody[i][0] * 20 + 'px';/*蛇的身体节点X坐标*/
        snake.style.top = this.snakeBody[i][1] * 20 + 'px';/*蛇的身体Y坐标*/
        snake.classList.add(this.snakeBody[i][2]);/*将蛇的标志加入类中*/
        this.mapDiv.appendChild(snake).classList.add('snake');/*添加到主界面中的类*/
        switch (this.direct) {/*状态*/
            case 'right':
                break;
            case 'up':
                snake.style.transform = 'rotate(270deg)'/*利用旋转达到转弯的效果*/
                break;
            case 'left':
                snake.style.transform = 'rotate(180deg)'
                break;
            case 'down':
                snake.style.transform ='rotate(90deg)';
                break;
            default:
                break;
        }
    }
}
/*蛇的移动*/

function move() {

    //蛇身位置
    for (var i = this.snakeBody.length - 1; i > 0; i--) {
        /*将蛇的前一个的节点坐标给后一个节点*/
        this.snakeBody[i][0] = this.snakeBody[i - 1][0];
        this.snakeBody[i][1] = this.snakeBody[i - 1][1];
    }
    //蛇头位置
    switch (this.direct) {
        case 'right':
            this.snakeBody[0][0] += 1;/*蛇头的X坐标+1*/
            break;
        case 'up':
            this.snakeBody[0][1] -= 1;/*蛇头的Y坐标-1*/
            break;
        case 'left':
            this.snakeBody[0][0] -= 1;/*蛇头的X坐标-1*/
            break;
        case 'down':
            this.snakeBody[0][1] += 1;/*蛇头的Y坐标+1*/
            break;
        default:
            break;

    }
    //删除之前蛇的节点 再渲染从新绘制蛇
    removeClass('snake');
    snake();
    // 如果蛇头的x y和食物x y同时相等 代表吃到食物
    if (this.snakeBody[0][0] == this.foodX && this.snakeBody[0][1] == this.foodY) {
        /*记录下蛇尾的坐标*/

        var snakeTailX = this.snakeBody[this.snakeBody.length - 1][0];
        var snakeTailY = this.snakeBody[this.snakeBody.length - 1][1];
       /*吃到苹果了就增加一个一维数组*/
        /*相当于在蛇的末尾增加一个节点*/
        switch (this.direct) {
            case 'right':
                this.snakeBody.push([snakeTailX + 1, snakeTailY, 'body']);

                break;
            case 'up':
                this.snakeBody.push([snakeTailX, snakeTailY - 1, 'body']);
                break;
            case 'left':
                this.snakeBody.push([snakeTailX - 1, snakeTailY, 'body']);
                break;
            case 'down':
                this.snakeBody.push([snakeTailX, snakeTailY + 1, 'body']);
                break;
            default:
                break;
        }
        /*更新分数*/
        this.score += 2;
        scoreBox.innerHTML = this.score;

        /*alert(this.sd);*/
        /*更新食物*/
        removeClass('food');
        food();


    }
    // 判断撞到边界
    if (this.snakeBody[0][1] < 0 || this.snakeBody[0][1] >= this.mapH / this.snakeH) {
        this.reloadGame();
    }
    if (this.snakeBody[0][0] < 0 || this.snakeBody[0][0] >= this.mapW / this.snakeW) {
        this.reloadGame();
    }
    /*撞到自己也判断为死亡*/
    var snakeHeaderX = this.snakeBody[0][0];
    var snakeHeaderY = this.snakeBody[0][1];
    for (var i = 1; i < this.snakeBody.length; i++) {
        var snakeBodyX = this.snakeBody[i][0];
        var snakeBodyY = this.snakeBody[i][1];
        if (snakeHeaderX == snakeBodyX && snakeHeaderY == snakeBodyY) {
            this.reloadGame();
        }
    }
}
/*改变蛇的运动方向通过键盘的上下左右键来改变的*/
function setDerict(code) {
    switch (code) {
        case 37:
            if (this.left) {
                this.direct = 'left';
                this.left = false;
                this.right = false;/*不可以直接反向*/
                this.up = true;
                this.down = true;
            }
            break;
        case 38:
            if (this.up) {
                this.direct = 'up';
                this.left = true;
                this.right = true;
                this.up = false;
                this.down = false;/*不可以直接反向*/
            }
            break;
        case 39:
            if (this.right) {
                this.direct = 'right';
                this.left = false;/*不可以直接反向*/
                this.right = false;
                this.up = true;
                this.down = true;
            }
            break;
        case 40:
            if (this.down) {
                this.direct = 'down';
                this.left = true;
                this.right = true;
                this.up = false;/*不可以直接反向*/
                this.down = false;
            }
            break;
        default:
            break;
    }

}
/*重新开始游戏--死亡之后*/
function reloadGame() {
    /*移除之前的蛇和苹果*/
    removeClass('snake');
    removeClass('food');
    clearInterval(snakeMove);
    /*游戏暂停，将图片按钮切换到开始的图片*/
    startPaush.setAttribute('src', './img/start.png');
    this.snakeBody = [[3, 0, 'head'], [2, 0, 'body'], [1, 0, 'body']];
    this.direct = 'right';
    this.left = false;
    this.right = false;
    this.up = true;
    this.down = true;
    startPauseBool = true;
    startGameBool = true;
    lose.style.display = 'block';/*此元素将显示为块级元素，此元素前后会带有换行符。*/
    loserScore.innerHTML = this.score;/*最终分数*/
    this.score = 0;/*将分数值置为零*/
    scoreBox.innerHTML = this.score;
}
/*移除类*/
function removeClass(calssName) {
    var ele = document.getElementsByClassName(calssName);/*得到节点*/
    while (ele.length > 0) {
        ele[0].parentNode.removeChild(ele[0]);/*移除子节点*/
    }
}
/*绑定事件*/
function bindEvent() {
    /*开始按钮*/
    startBtn.onclick = function(){
        startAndPauseGame();
    }
    /*暂停按钮*/
    startPaush.onclick = function () {
        startAndPauseGame();
    }
    /*关闭*/
    closeBtn.onclick = function () {
        lose.style.display = 'none';/*隐藏*/
    }
}

//开始和暂停游戏 逻辑封装
function startAndPauseGame() {
    if (startPauseBool) {
        if (startGameBool) {
            startGame();
            startGameBool = false;
        }
        /*图片显示为暂停按钮*/
        startPaush.setAttribute('src', './img/pause.png');
        /*蛇按照规定的速度移动*/
        snakeMove = setInterval(function () {
            move();

            },sd);

        /*按键按下事件*/
        document.onkeydown = function (e) {
            var code = e.keyCode;
            /*改变蛇的运动状态*/
            setDerict(code);
        };
        startPauseBool = false;
    } else {
        //暂停
        startPaush.setAttribute('src', './img/start.png');
        /*显示当前时间 ( setInterval() 函数会每秒执行一次函数，类似手表)。
        使用 clearInterval() 来停止执行:*/
        clearInterval(snakeMove);
        document.onkeydown = function (e) {
            e.returnValue = false;
            return false;
        };
        startPauseBool = true;
    }
}

