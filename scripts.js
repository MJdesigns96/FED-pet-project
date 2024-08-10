//create a windows.onload event listener
window.onload = pageLoad;
//create a page load function
function pageLoad() {
    //create variables for various HTML elements
    const countdownTimer = document.getElementById("countdown-container");
    const countdownMsg = document.getElementById("countdown-message");
    const alarm1 = document.getElementById("alarm-1");
    //buttons
    const start = document.getElementById("btnStart");
    const stop = document.getElementById("btnStop");
    const reset = document.getElementById("resetBtn");
    //time elemeents
    const minutes = document.getElementById("minutesLeft");
    const seconds = document.getElementById("secondsLeft");

    //save data to an object
    const timer1 = {
        timer:0,
        minute: 0,
        second: 0,
        alarmSet: false,
        isPaused:true
    }

    //when start is clicked get the int variable from the document
    minutes.addEventListener("change", e => {
        timer1.minute = e.target.value;
    });
    seconds.addEventListener("change", e => {
        timer1.second = e.target.value;
    });

    //create a function that reduces the time every second
    function countdown () {
        if (timer1.timer > 0 && timer1.isPaused === false) {
            timer1.timer -= 1000;
            timer1.second--;
           if (timer1.minute === 0 && timer1.second === 0) {
                countdownMsg.innerHTML = `0 mins 0 secs`;
            } else if (timer1.second <= 0) {
                timer1.minute--;
                timer1.second = 60;
            } 
            if (timer1.minute < 10 && timer1.second < 10) {
                countdownMsg.innerHTML = `0${timer1.minute} mins 0${timer1.second} secs`;
            } else if (timer1.minute < 10 && timer1.second >= 10) {
                countdownMsg.innerHTML = `0${timer1.minute} mins ${timer1.second} secs`;
            } else {
                countdownMsg.innerHTML = `${timer1.minute} mins ${timer1.second} secs`;
            }
            return timer1.timer;
        } 
        
        if (timer1.timer === 0 && timer1.alarmSet) {
            minutes.innerHTML = 0;
            seconds.innerHTML = 0;
            alarm1.loop = false;
            timer1.alarmSet = false;
            timer1.isPaused = true;
            alarm1.play();
        }
    }
    
    setInterval(countdown, 1000);

    //create a function to start the clock
    const startClock = () => {
        countdownTimer.style.display = "flex";
        let milliMins = timer1.minute * 60000;
        let milliSecs = timer1.second * 1000;
        if (timer1.timer === 0) {
            timer1.timer = milliMins + milliSecs;
        }
        timer1.isPaused = false;
        timer1.alarmSet = true;
    };

    function resetTimer() {
        countdownTimer.style.display = "none";
        timer1.timer = 0;
        timer1.minute = 0;
        timer1.second = 0;
        timer1.isPaused = true;
        timer1.alarmSet = false;
    }

    //event handlers
    start.onclick = startClock;
    stop.addEventListener("click", e => {
        timer1.isPaused = true;
        if (alarm1.duration < 5.77 && alarm1.duration > 0) {
            alarm1.pause();
        }
    });
    reset.onclick = resetTimer;
}
    