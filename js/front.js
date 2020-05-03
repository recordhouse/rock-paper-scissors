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
    btnResult = null,
    btnRock = null,
    btnPaper = null,


    

    coinMoveSet = null,
    coinMoveNum = 0,
    rouletteIng = false;

    hand = document.getElementById('hand');
    btnCoin = document.getElementById('btnCoin');
    roulette = document.getElementById('roulette');
    btnResult = document.getElementById('btnResult');
    btnRock = document.getElementById('btnRock');
    btnPaper = document.getElementById('btnPaper');




    


    
btnCoin.addEventListener('click', function() {
    rouletteIng = true;
    clearInterval(handMoveSet);
    handMove(100);
});

btnResult.addEventListener('click', function(e) {

    if (rouletteIng) {
        
        clearInterval(handMoveSet);

        if (e.target.id === 'btnScissors') {
            if (handNum === 0) {
                clearInterval(handMoveSet);
                setTimeout(function() {
                    handMove(100);
                }, 250);
                console.log('비겼다');
            } else if (handNum === 1) {
                clearInterval(handMoveSet);
                handMove(1000);
                console.log('졌다');
            } else if (handNum === 2) {
                clearInterval(handMoveSet);
                coinMove();
                console.log('이겼다');
            }
        } else if (e.target.id === 'btnRock') {
            if (handNum === 0) {
                clearInterval(handMoveSet);
                coinMove();
                console.log('이겼다');
            } else if (handNum === 1) {
                clearInterval(handMoveSet);
                setTimeout(function() {
                    handMove(100);
                    console.log('비겼다');
                }, 250);
            } else if (handNum === 2) {
                clearInterval(handMoveSet);
                handMove(1000);
                console.log('졌다');
            }
        } else if (e.target.id === 'btnPaper') {
            if (handNum === 0) {
                clearInterval(handMoveSet);
                handMove(1000);
                console.log('졌다');
            } else if (handNum === 1) {
                clearInterval(handMoveSet);
                handMove(1000);
                console.log('졌다');
            } else if (handNum === 2) {
                clearInterval(handMoveSet);
                setTimeout(function() {
                    handMove(100);
                }, 250);
                console.log('비겼다');
            }

        }

    }



    
});


function handMove(time) {
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


function handShape(res1, res2, res3) {
    hand.children[res1].classList.add('on');
    hand.children[res2].classList.remove('on');
    hand.children[res3].classList.remove('on');
}

// 이겼을 때
function coinMove() {
    coinMoveSet = setInterval(function() {
        coinMoveNum++;
        
        if (coinMoveNum >= roulette.children.length) {
            coinMoveNum = 0;
        }
        console.log(coinMoveNum)
        roulette.children[coinMoveNum].classList.add('on');
        if (coinMoveNum === 0) {
            roulette.children[11].classList.remove('on');
        } else {
            roulette.children[coinMoveNum - 1].classList.remove('on');

        }
    }, 50);
    
}
handMove(1000);
// coinMove()