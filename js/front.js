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
    gameIng = false,
    gameResultTxt = '',
    rewardNum = 0;

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
        console.log('게임 시작')
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
        console.log('졌다');
    } else if (gameResultTxt ==='win') {
        clearInterval(handMoveSet);
        rouletteIng = false;
        msgResult(gameResultTxt);
        console.log('이겼다');
        setTimeout(function() {
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

// 이겼을 때
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
        clearInterval(coinMoveSet)

    }, 3000)
}


function msgResult() {
    if (gameResultTxt ==='tie') {
        msgView(0, 1, 2);
    } else if (gameResultTxt ==='lose') {
        msgView(1, 2, 0);
    } else if (gameResultTxt ==='win') {
        msgView(2, 0, 1);
    }
}

function msgView(res1, res2, res3) {
    msgArea.children[res1].classList.add('on');
    msgArea.children[res2].classList.remove('on');
    msgArea.children[res3].classList.remove('on');
    setTimeout(function() {
        msgArea.children[res1].classList.remove('on');
    }, 350)
}


