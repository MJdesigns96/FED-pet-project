//create a windows.onload event listener
window.onload = pageLoad;
//create a page load function
function pageLoad() {
    //create variables for various HTML elements
    const countdownTimer1 = document.getElementById("countdown-container1");
    const countdownMsg1 = document.getElementById("countdown-message1");
    const countdownTimer2 = document.getElementById("countdown-container2");
    const countdownMsg2 = document.getElementById("countdown-message2");
    const alarm1 = document.getElementById("alarm-1");
    const addTimer2 = document.getElementById("addtimer2");
    const timer2 = document.getElementById("timer-2");
    //buttons
    const start1 = document.getElementById("btnStart1");
    const stop1 = document.getElementById("btnStop1");
    const reset1 = document.getElementById("resetBtn1");
    const start2 = document.getElementById("btnStart2");
    const stop2 = document.getElementById("btnStop2");
    const reset2 = document.getElementById("resetBtn2");
    //time elemeents
    const minutes1 = document.getElementById("minutesLeft1");
    const seconds1 = document.getElementById("secondsLeft1");
    const minutes2 = document.getElementById("minutesLeft2");
    const seconds2 = document.getElementById("secondsLeft2");

    //save data to an object
    const timer1OBJ = {
        timer:0,
        minute: 0,
        second: 0,
        alarmSet: false,
        isPaused:true
    };

    const timer2OBJ = {
        timer:0,
        minute: 0,
        second: 0,
        alarmSet: false,
        isPaused:true
    };

    //when start is clicked get the int variable from the document
    minutes1.addEventListener("change", e => {
        timer1OBJ.minute = e.target.value;
    });
    seconds1.addEventListener("change", e => {
        timer1OBJ.second = e.target.value;
    });
    minutes2.addEventListener("change", e => {
        timer2OBJ.minute = e.target.value;
    });
    seconds2.addEventListener("change", e => {
        timer2OBJ.second = e.target.value;
    });

    //create a function that reduces the time every second
    //entry
    function countdown(entry) {
        let temp;
        let foo;
        let bar;

        if (entry === timer1OBJ) {
            temp = countdownMsg1;
            foo = minutes1;
            bar = seconds1;
        } else {
            temp = countdownMsg2;
            foo = minutes2;
            bar = seconds2;
        };

        if (entry.timer > 0 && entry.isPaused === false) {
            entry.timer -= 1000;
            entry.second--;
           if (entry.minute === 0 && entry.second === 0) {
            temp.innerHTML = `0 mins 0 secs`;
            } else if (entry.second <= 0) {
                entry.minute--;
                entry.second = 60;
            } 
            if (entry.minute < 10 && entry.second < 10) {
                temp.innerHTML = `0${entry.minute} mins 0${entry.second} secs`;
            } else if (entry.minute < 10 && entry.second >= 10) {
                temp.innerHTML = `0${entry.minute} mins ${entry.second} secs`;
            } else {
                temp.innerHTML = `${entry.minute} mins ${entry.second} secs`;
            }
            return entry.timer;
        };
        
        if (entry.timer === 0 && entry.alarmSet) {
            foo.innerHTML = 0;
            bar.innerHTML = 0;
            alarm1.loop = false;
            entry.alarmSet = false;
            entry.isPaused = true;
            alarm1.play();
        };
    };
    
    //create a function to start the clock
    const startClock = (entry) => {
        let temp;
        if (entry === timer1OBJ) {
            temp = countdownTimer1;
        } else {
            temp = countdownTimer2
        };
        temp.style.display = "flex";
        let milliMins = entry.minute * 60000;
        let milliSecs = entry.second * 1000;
        if (entry.timer === 0) {
            entry.timer = milliMins + milliSecs;
        };
        entry.isPaused = false;
        entry.alarmSet = true;
    };

    function resetTimer(entry) {
        let temp;
        let foo;
        let bar;
        if (entry === timer1OBJ) {
            temp = countdownTimer1;
            foo = minutes1;
            bar = seconds1;
        } else {
            temp = countdownTimer2;
            foo = minutes2;
            bar = seconds2;
        };
        temp.style.display = "none";
        entry.timer = 0;
        entry.minute = 0;
        entry.second = 0;
        entry.isPaused = true;
        entry.alarmSet = false;
        foo.value = "0";
        bar.value = "0";
    };

    function addTimer() {
        addTimer2.style.display = "none";
        timer2.style.display = "block";
    };

    //timer1 event handlers
    start1.addEventListener("click", e => {
        startClock(timer1OBJ);
        setInterval(function() {
            countdown(timer1OBJ)
        }, 1000);
    });
    stop1.addEventListener("click", e => {
        timer1OBJ.isPaused = true;
        if (alarm1.duration < 5.77 && alarm1.duration > 0) {
            alarm1.pause();
        }
    });
    reset1.addEventListener("click", e => {
        resetTimer(timer1OBJ);
    });

    //add second timer
    addTimer2.onclick = addTimer;

    //timer 2 event handlers
    start2.addEventListener("click", e => {
        startClock(timer2OBJ);
        setInterval(function() {
            countdown(timer2OBJ)
        }, 1000);
    });
    stop2.addEventListener("click", e => {
        timer2OBJ.isPaused = true;
        if (alarm1.duration < 5.77 && alarm1.duration > 0) {
            alarm1.pause();
        }
    });
    reset2.addEventListener("click", e => {
        resetTimer(timer2OBJ);
    });
}
    