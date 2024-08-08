//create a windows.onload event listener
window.onload = pageLoad;
//create a page load function
function pageLoad() {
    //create variables for various HTML elements
    const countdownTimer = document.getElementById("countdown-container");
    const countdownMsg = document.getElementById("countdown-message");
    const alarm1 = document.getElementById("alarm-1");

    const start = document.getElementById("btnStart");
    const stop = document.getElementById("btnStop");
    const minutes = document.getElementById("minutesLeft");
    let minute = 0;
    const seconds = document.getElementById("secondsLeft");
    let second = 0;
    let timer = 0;
    let alarmSet = false;

    //when start is clicked get the int variable from the document
    //possibly improve the optimization of this because you are constantly runnnig these event listeners
    minutes.addEventListener("change", e => {
        minute = e.target.value;
    });
    seconds.addEventListener("change", e => {
        second = e.target.value;
    });

    let isPaused = true;

    //create a function that reduces the time every second
    function countdown () {
        if (timer > 0 && !isPaused) {
            timer -= 1000;
            second--;
           if (minute <= 0 && second === 0) {
                countdownMsg.innerHTML = `0 mins 0 secs`;
            } else if (second === 0) {
                minute--;
                second = 60;
            } 
            countdownMsg.innerHTML = `${minute} mins ${second} secs`;
            console.log(timer);
            return timer;
        }
        if (timer === 0 && alarmSet) {
            alarm1.play();
            alarm1.addEventListener("ended", () => {
                alarm1.pause();
            })
        }
    }
    
    setInterval(countdown, 1000);

    //create a function to start the clock
    const startClock = () => {
        countdownTimer.style.display = "flex";
        let milliMins = minute * 60000;
        let milliSecs = second * 1000;
        if (timer === 0) {
            timer = milliMins + milliSecs;
        }
        isPaused = false;
        alarmSet = true;
    };

    

    start.onclick = startClock;
    stop.addEventListener("click", e => {
        isPaused = true;
    });
}
    