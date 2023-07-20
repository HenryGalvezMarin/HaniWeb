
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
    //reproductor de musica
    const dataMusic = [
        {
            name: 'Bonita!',
            src: 'music/Bonita!!.m4a',
        },
        {
            name: 'Cha Cha Cha!',
            src: 'music/Chachachá!.m4a',
        },
        {
            name: 'Hani!',
            src: 'music/Hani!.m4a',
        },
        {
            name: 'Que se siente!',
            src: 'music/Que se siente!.m4a',
        },
        {
            name: 'Piel canela!',
            src: 'music/Piel Canela!.m4a',
        },
        {
            name: 'Café con leche!',
            src: 'music/Café con leche!.m4a',
        },
        {
            name: 'Honey!',
            src: 'music/Honey!.m4a',
        },
        {
            name: 'Mi lugar!',
            src: 'music/Mi lugar!.m4a',
        },
        {
            name: 'Morena mía!',
            src: 'music/Morena mía!!.m4a',
        },
        {
            name: 'Palabras de amor!',
            src: 'music/Palabras de amor!.m4a',
        },
        {
            name: 'Tú geografía!',
            src: 'music/Tú Geografía!!!.m4a',
        },

        {
            name: 'Tomándote!',
            src: 'music/Tomándote!.m4a',
        },
        
        {
            name: 'Cardo o ceniza!',
            src: 'music/CardoOCeniza!.m4a',
        },
        {
            name: 'Amor de mis amores!',
            src: 'music/Amor de mis amores!.m4a',
        },
        {
            name: 'Por que te fuiste!',
            src: 'music/Por que te fuiste!.m4a',
        },
    ];
    
    const btnPlayMusic = document.getElementById('btn-play-music');
    const btnPrevSong = document.getElementById('btn-prev-song');
    const btnNextSong = document.getElementById('btn-next-song');
    const songs = document.getElementById('songs');
    const cover = document.getElementById('cover');
    const audio = document.getElementById('audio');
    const progress = document.getElementById('progress');
    const progressContainer = document.getElementById('progress-container');
    const titleSong = document.getElementById('title-song');
    const loadSongs = () => {
        dataMusic.forEach((song, index) => {
            songs.innerHTML += `<li><a data-id="${index}" class="song" href="##">${song.name}</a></li>`;
        });
    };
    const loadSong = (songIndex) => {
        const song = dataMusic[songIndex];
        audio.src = song.src;
        audio.play();
        cover.classList.add('cover-girar');
        titleSong.innerHTML = song.name;
        cover.style.animationPlayState = 'running';
        btnPlayMusic.innerHTML = '<i class="fas fa-pause"></i>';
    };
    loadSongs();
    const songsList = document.querySelectorAll('.song');
    songsList.forEach((song) => {
        song.addEventListener('click', (event) => {
            const songIndex = event.target.dataset.id;
            songsList.forEach((song) => {
                song.classList.remove('active');
            });
            event.target.classList.add('active');
            btnPlayMusic.innerHTML = '<i class="fas fa-pause"></i>';
            loadSong(songIndex);
        });
    });
    btnPlayMusic.addEventListener('click', () => {
        if (songsList.length > 0) {
            let active = false;
            songsList.forEach((song) => {
                if (song.classList.contains('active')) {
                    active = true;
                }
            });
            if (!active) {
                songsList[0].classList.add('active');
                loadSong(0);
                return;
            }
        }
        if (audio.paused) {
            audio.play();
            cover.style.animationPlayState = 'running';
            btnPlayMusic.innerHTML = '<i class="fas fa-pause"></i>';
        }
        else {
            audio.pause();
            cover.style.animationPlayState = 'paused';
            btnPlayMusic.innerHTML = '<i class="fas fa-play"></i>';
        }       
    });
    audio.addEventListener('timeupdate', (event) => {
        const { currentTime, duration } = event.target;
        const progressPercent = (currentTime / duration) * 100;
        progress.style.width = `${progressPercent}%`;
    });
    audio.addEventListener('ended', () => {
        let activeSong = document.querySelector('.song.active');
        let nextSong = activeSong.parentElement.nextElementSibling;
        activeSong.classList.remove('active');
        if (!nextSong) {
            btnPlayMusic.innerHTML = '<i class="fas fa-play"></i>';
            cover.style.animationPlayState = 'paused';    
        } else {
            nextSong.children[0].classList.add('active');
            loadSong(nextSong.children[0].dataset.id);
        }
    });
    progressContainer.addEventListener('click', (event) => {
        const width = event.target.clientWidth;
        const clickX = event.offsetX;
        const duration = audio.duration;
        if (!isNaN(duration)) {
            audio.currentTime = (clickX / width) * duration;
        }
    });
    btnPrevSong.addEventListener('click', () => {
        let activeSong = document.querySelector('.song.active');
        if(!activeSong) return;
        let prevSong = activeSong.parentElement.previousElementSibling;
        activeSong.classList.remove('active');
        if (!prevSong) {
            prevSong = songsList[songsList.length - 1];
            prevSong.classList.add('active');
            loadSong(prevSong.dataset.id);
        } else {
            prevSong.children[0].classList.add('active');
            console.log(prevSong.dataset)
            loadSong(prevSong.children[0].dataset.id);
        }
    });
    btnNextSong.addEventListener('click', () => {
        let activeSong = document.querySelector('.song.active');
        if(!activeSong) return;
        let nextSong = activeSong.parentElement.nextElementSibling;
        activeSong.classList.remove('active');
        if (!nextSong) {
            nextSong = songsList[0];
            nextSong.classList.add('active');
            loadSong(nextSong.dataset.id);
        } else {
            nextSong.children[0].classList.add('active');
            loadSong(nextSong.children[0].dataset.id);
        }
    });
});
