
document.addEventListener('DOMContentLoaded', function () {
    let holaLabel = document.getElementById('hola-label');
    let amorLabel = document.getElementById('amor-label');
    let corazonFlecha = document.getElementById('corazon-flecha');
    let pandaRojo = document.getElementById('panda-rojo');
    let titulo1 = document.getElementById('titulo-1');
    let texto1 = document.getElementById('texto-1');
    let hr1 = document.getElementById('hr-1');
    let hani1 = document.getElementById('hani-1');
    window.addEventListener('scroll', function () {
        let value = window.scrollY;
        holaLabel.style.opacity = 1 - value / 100;
        holaLabel.style.marginLeft = -value * 2 + 'px';
        amorLabel.style.opacity = 1 - value / 500;
        amorLabel.style.right = -value + 'px';
        corazonFlecha.style.opacity = 1 - value / 500;
        pandaRojo.style.bottom = -value / 12 + 'px';
        titulo1.style.opacity = 0 + value / 350;
        texto1.style.opacity = 0 + value / 350;
        hr1.style.opacity = 0 + value / 350;
        hani1.style.opacity = 0 + value / 350;
    });
    let startBtn = document.getElementById('start-btn');
    startBtn.addEventListener('click', function () {
        //Game
        let game = document.getElementById('game');
        let player = document.getElementById('player');
        let hueco = document.getElementById('hueco');
        let gameOver = document.getElementById('game-over');
        let restartBtn = document.getElementById('restart-btn');
        let score = 0;
        
        startBtn.style.display = 'none';
        game.style.display = 'block';
        //añadirle la clase jump cuando se hace tap, click, spacebar o la flecha arriba
        game.addEventListener('keydown', function (event) {
            if (event.keyCode === 32) {
                jump();
            }
        }
        );
        game.addEventListener('click', function () {
            jump();
        });
        document.addEventListener('animationend', function () {
            player.classList.remove('jump');
        });
        function jump() {
            if (player.classList != 'jump') {
                player.classList.add('jump');
            }
        }
        let scoreInterval = setInterval(function () {
            score++;
            document.getElementById('score-num').innerHTML = score;
        }, 1000);
        function detectarColision (player, hueco, paddingTop, paddingBottom, paddingLeft, paddingRight) {
            let playerRect = player.getBoundingClientRect();
            let enemyRect = hueco.getBoundingClientRect();
            
            return !(
                ((playerRect.top + paddingTop) > (enemyRect.bottom - paddingBottom)) ||
                ((playerRect.bottom - paddingBottom) < (enemyRect.top + paddingTop)) ||
                ((playerRect.right - paddingRight) < (enemyRect.left + paddingLeft)) ||
                ((playerRect.left + paddingLeft) > (enemyRect.right - paddingRight))               
            );
        }
        let gameOverInterval = setInterval(function () {
            if(detectarColision(player, hueco,10,15,20,30)) {              
                gameOver.style.display = 'flex';
                document.getElementById('game-over-score').innerHTML = score;                            
                clearInterval(scoreInterval);
            }
        }, 10);
        restartBtn.addEventListener('click', function () {
            score = 0;
            document.getElementById('score-num').innerHTML = score;
            gameOver.style.display = 'none';
            game.style.display = 'none';
            startBtn.style.display = 'block';
            clearInterval(gameOverInterval);
            return;
        });     
    });

});
