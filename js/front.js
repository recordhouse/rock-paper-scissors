/*
 * @object name: 
 * @info: 
 * @date: 
 * @author: 기록맨
 */

var hand = null,
    handNum = 0,
    handMoveSet = null,
    btnCoin = null,
    roulette = null,
    btnControl = null,
    btnRock = null,
    btnPaper = null,
    coinMoveSet = null,
    msgArea = null,
    coinMoveNum = 0,
    rouletteIng = false,
    rouletteMoveSet = null,
    handBasicMoveSet = null,
    gameIng = false,
    gameResultTxt = '',
    rewardNum = 0,
    msgViewWinSet = null;
    hand = document.getElementById('hand');
    btnCoin = document.getElementById('btnCoin');
    roulette = document.getElementById('roulette');
    btnControl = document.getElementById('btnControl');
    btnRock = document.getElementById('btnRock');
    btnPaper = document.getElementById('btnPaper');
    msgArea = document.getElementById('msgArea');
    
btnCoin.addEventListener('click', function() {
    if (!gameIng) {
        gameIng = true;
        handMove(50);
        clearInterval(rouletteMoveSet);
        clearInterval(handBasicMoveSet);
        
        
        rouletteMove(200);
        roulette.children[rewardNum].classList.remove('on');
        for (var i = 0; i < msgArea.children.length; i++ ) {
            msgArea.children[i].classList.remove('on');
        }
        console.log('게임 시작');
    }
});

btnControl.addEventListener('click', function(e) {
    if (gameIng && rouletteIng) {
        if (e.target.id === 'btnScissors') {
            console.log('가위를 냄');
            if (handNum === 0) {
                gameResult('tie');
            } else if (handNum === 1) {
                gameResult('lose');
            } else if (handNum === 2) {
                gameResult('win');
            }
        } else if (e.target.id === 'btnRock') {
            console.log('바위를 냄');
            if (handNum === 0) {
                gameResult('win');
            } else if (handNum === 1) {
                gameResult('tie');
            } else if (handNum === 2) {
                gameResult('lose');
            }
        } else if (e.target.id === 'btnPaper') {
            console.log('보를 냄');
            if (handNum === 0) {
                gameResult('lose');
            } else if (handNum === 1) {
                gameResult('win');
            } else if (handNum === 2) {
                gameResult('tie');
            }
        }
    }
});

function gameResult(res) {
    gameResultTxt = res;
    if (gameResultTxt ==='tie') {
        clearInterval(handMoveSet);
        rouletteIng = false;
        msgResult(gameResultTxt);
        console.log('비겼다');
        setTimeout(function() {
            handMove(50);
        }, 350);
    } else if (gameResultTxt ==='lose') {
        clearInterval(handMoveSet);
        rouletteIng = false;
        gameIng = false;
        msgResult(gameResultTxt);
        clearInterval(rouletteMoveSet);
        rouletteMove(1000);
        handBasicMove(1000);
        console.log('졌다');
    } else if (gameResultTxt ==='win') {
        clearInterval(handMoveSet);
        rouletteIng = false;
        console.log('이겼다');
        setTimeout(function() {
            msgResult(gameResultTxt);
            coinMove();
        }, 350);
    }
}

function handMove(time) {
    if (!rouletteIng) {
        rouletteIng = true;
        handMoveSet = setInterval(function() {
            handNum++;
            if (handNum >= 3) {
                handNum = 0;
            }
            if (handNum === 0) {
                handShape(0, 1, 2);
            } else if (handNum === 1) {
                handShape(1, 2, 0);
            } else if (handNum === 2) {
                handShape(2, 0, 1);
            }
        }, time);
    }
}

function handShape(res1, res2, res3) {
    hand.children[res1].classList.add('on');
    hand.children[res2].classList.remove('on');
    hand.children[res3].classList.remove('on');
}

function coinMove() {
    rewardNum = Math.floor((Math.random() * 12));
    coinMoveNum = rewardNum;
    coinMoveSet = setInterval(function() {
        coinMoveNum++;
        if (coinMoveNum >= roulette.children.length) {
            coinMoveNum = 0;
        }
        roulette.children[coinMoveNum].classList.add('on');
        if (coinMoveNum === 0) {
            roulette.children[11].classList.remove('on');
        } else {
            roulette.children[coinMoveNum - 1].classList.remove('on');
        }
    }, 50);
    setTimeout(function() {
        clearInterval(coinMoveSet);
        clearInterval(rouletteMoveSet);
        clearInterval(msgViewWinSet);
        rouletteMove(1000);
        handBasicMove(1000);
        gameIng = false;
    }, 3000)
}


function msgResult() {
    if (gameResultTxt ==='tie') {
        for (var i = 0; i < msgArea.children.length; i++ ) {
            msgView(i, 2);
        }
    } else if (gameResultTxt ==='lose') {
        for (var i = 0; i < msgArea.children.length; i++ ) {
            msgView(i, 3);
        }
    } else if (gameResultTxt ==='win') {
        msgViewWin();
    }
}

function msgView(i, res) {
    msgArea.children[i].classList.remove('on');
    msgArea.children[res].classList.add('on');
    setTimeout(function() {
        for (var i = 0; i < msgArea.children.length; i++ ) {
            msgArea.children[i].classList.remove('on');
        }
    }, 500)
}

function msgViewWin() {
    var prev = 0,
        next = 0;
    msgViewWinSet = setInterval(function(){
        next++;
        if (next > 1) {
            next = 0;
        }
        msgArea.children[next].classList.add('on');
        msgArea.children[prev].classList.remove('on');
        prev = next;
    }, 100);
}

function rouletteMove(time) {
    var rouletteMoveNum = 0;
    rouletteMoveSet = setInterval(function() {
        rouletteMoveNum++;
        if (rouletteMoveNum % 2 === 0) {
            roulette.classList.add('on');
        } else {
            roulette.classList.remove('on');
        }
    }, time);
}

function handBasicMove(time) {
    var prev = handNum,
        next = handNum;
        console.log(handNum)
    handBasicMoveSet = setInterval(function() {
        next++;
        if (next >= 3) {
            next = 0;
        }
        hand.children[next].classList.add('on');
        hand.children[prev].classList.remove('on');
        prev = next;
    }, time);
}

rouletteMove(1000);
handBasicMove(1000);