document.addEventListener("DOMContentLoaded", function () {
        const squares = document.querySelectorAll('.square');
        const timeLeft = document.querySelector('#time-left');
        const score = document.querySelector('#score');
    
        let result = 0;
        let hitPosition;
        let previousHitPosition;
        let currentTime = 20; 
        let timerId = null;
    
        function resetGame() {
            clearInterval(timerId);
            result = 0;
            score.textContent = result;
            currentTime = 20;
            timeLeft.textContent = 'Time: ' + currentTime;
        }
    
        function randomSquare() {
            squares.forEach(square => {
                square.classList.remove('mole');
            });
    
            // Generate a random square that is different from the previous hit position
            do {
                let randomSquareIndex = Math.floor(Math.random() * 9);
                hitPosition = squares[randomSquareIndex].id;
            } while (hitPosition === previousHitPosition);
    
            squares[hitPosition - 1].classList.add('mole');
            previousHitPosition = hitPosition;
        }
    
        squares.forEach(square => {
            square.addEventListener('mousedown', () => {
                if (square.id == hitPosition) {
                    result++;
                    score.textContent = result;
                    hitPosition = null;
                }
            });
        });
    
        function moveMole() {
            randomSquare();
            timerId = setTimeout(function () {
                randomSquare();
                moveMole();
            }, 1000); // Change interval to 1000ms (1 second)
        }
    
        moveMole();
    
        function countDown() {
            currentTime--;
            timeLeft.textContent = 'Time:' + currentTime;
    
            if (currentTime == 0) {
                alert('GAME OVER! Your Score: ' + result);
                resetGame();
                moveMole(); // Restart the game
            }
        }
    
        let countDownTimerId = setInterval(countDown, 1000); // Keep interval at 1000ms (1 second)
    });
    