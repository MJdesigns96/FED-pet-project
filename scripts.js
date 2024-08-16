//create a windows.onload event listener
window.onload = pageLoad;

//get api data from spoonacular to get cook time information
async function getAPIData(id) {
    const url = `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/${id}/information`;
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': '5227520509mshf288125ae7b78bep16d80ejsn69bb2f2a643d',
		    'x-rapidapi-host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.text();
        const json = JSON.parse(result);
        const cookTime = json.readyInMinutes;
        return cookTime;
    } catch (error) {
        console.error(error);
    };
};
    
//create a page load function
function pageLoad() {
    //timer
    let timers = 3;
    let timerOBJ = [];

    //create objects for each timer and save respective DOM elements to them
    for (let i = 0; i < timers; i++) {
        let use = i +1;
        timerOBJ[i] = {
            timerId: i,
            timer: 0,
            minute: 0,
            second: 0,
            alarmSet: false,
            isPaused: true,
            countdownTimer: document.getElementById(`countdown-container${use}`),
            countdownMsg: document.getElementById(`countdown-message${use}`),
            alarm: document.getElementById(`alarm-${use}`),
            startBtn: document.getElementById(`btnStart${use}`),
            stopBtn: document.getElementById(`btnStop${use}`),
            resetBtn: document.getElementById(`resetBtn${use}`),
            minutesLeft:document.getElementById(`minutesLeft${use}`),
            secondsLeft: document.getElementById(`secondsLeft${use}`)
        };
    };

    // //create variables for various HTML elements
    const addTimer2 = document.getElementById("addtimer2");
    const timer2 = document.getElementById("timer-2");
    const timer3 = document.getElementById("timer-3");

    //set even listeners for input changes
    for (let j = 0; j < timers; j++) {
        timerOBJ[j].minutesLeft.addEventListener("change", e => {
            timerOBJ[j].minute = e.target.value;
            timerOBJ[j].alarmSet = true;
        });
        timerOBJ[j].secondsLeft.addEventListener("change", e => {
            timerOBJ[j].second = e.target.value;
            timerOBJ[j].alarmSet = true;
        });
    };

    //create a function that reduces the time every second
    function countdown(entry) {
        let temp = entry.countdownMsg;
        let foo = entry.minutesLeft;
        let bar = entry.secondsLeft;

        if (entry.timer > 0 && entry.isPaused === false) {
            entry.timer -= 1000;
            entry.second--;
            if (entry.minute === 0 && entry.second === 0) {
            temp.innerHTML = `0 mins 0 secs`;
            } else if (entry.second <= 0) {
                entry.minute--;
                entry.second = 60;
            };
            if (entry.minute < 10 && entry.second < 10) {
                temp.innerHTML = `0${entry.minute} mins 0${entry.second} secs`;
            } else if (entry.minute < 10 && entry.second >= 10) {
                temp.innerHTML = `0${entry.minute} mins ${entry.second} secs`;
            } else {
                temp.innerHTML = `${entry.minute} mins ${entry.second} secs`;
            };
            return entry.timer;
        };
        
        if (entry.timer === 0 && entry.alarmSet) {
            foo.innerHTML = 0;
            bar.innerHTML = 0;
            entry.alarm.loop = false;
            entry.alarmSet = false;
            entry.isPaused = true;
            entry.alarm.play();
        };
    };
    
    //create a function to start the clock
    const startClock = (entry) => {
        let temp = entry.countdownTimer;
        temp.style.display = "flex";
        let milliMins = entry.minute * 60000;
        let milliSecs = entry.second * 1000;
        if (entry.timer === 0) {
            entry.timer = milliMins + milliSecs;
        };
        entry.isPaused = false;
        entry.alarmSet = true;
    };

    //create a function to reset the timer
    function resetTimer(entry) {
        let temp = entry.countdownTimer;
        let foo = entry.minutesLeft;
        let bar = entry.secondsLeft;
        temp.style.display = "none";
        entry.timer = 0;
        entry.minute = 0;
        entry.second = 0;
        entry.isPaused = true;
        entry.alarmSet = false;
        foo.value = "0";
        bar.value = "0";
    };

    //function to add a timer
    let foo = timers -1;
    function addTimer() {
        let timerToRemove = document.getElementById(`addtimer${foo}`);
        timerToRemove.remove();
        timer2.style.display = "block";

        if (foo === 2) {
            const newDiv = document.createElement("div");
            const temp = document.createElement("h1");
            const newContent = document.createElement("a");
            const newInner = document.createTextNode("+");
            newContent.appendChild(newInner);
            temp.appendChild(newContent);
            newDiv.appendChild(temp);
            newDiv.setAttribute("id",`addtimer${foo +1}`);
            newDiv.setAttribute("class",`addtimer`);
            document.getElementById("container").appendChild(newDiv);
            newDiv.onclick = addTimer;
            foo++;
        } else {
            timerToRemove = document.getElementById(`addtimer${foo +1}`);
            timer3.style.display = "block";
        };     
    };

    //timer event handlers
    for (let k = 0; k < timers; k++) {
        timerOBJ[k].startBtn.addEventListener("click", e => {
            startClock(timerOBJ[k]);
            setInterval(function() {
                countdown(timerOBJ[k])
            }, 1000);
        });
        timerOBJ[k].stopBtn.addEventListener("click", e => {
            timerOBJ[k].isPaused = true;
            !timerOBJ[k].paused ? timerOBJ[k].alarm.pause() : "";
        });
        timerOBJ[k].resetBtn.addEventListener("click", e => {
            resetTimer(timerOBJ[k]);
        });
    };

    //add second timer
    addTimer2.onclick = addTimer;

    //preset the timers with api information
    let preLoad = 0;
    async function presetAlarm (value) {
        preload = await getAPIData(value);
        for (let i = 0; i < timers; i++) {
            if (timerOBJ[i].alarmSet === false) {
                timerOBJ[i].minute = preload;
                timerOBJ[i].minutesLeft.placeholder = preload;
                timerOBJ[i].alarmSet = true;
                break;
            };
        };
    };

    //preset cook time ids
    const roastChicken = 660133; //45
    const mashedPoatoes = 1022743; //20
    const burger = 663050; //15

    //get buttons from DOM to set the timers
    const chickenButton = document.getElementById("chknBtn");
    const potatoButton = document.getElementById("potatoBtn");
    const BurgerButton = document.getElementById("burgerBtn");

    //set the next open timer with preset function
    chickenButton.addEventListener("click", e => {
        presetAlarm(roastChicken);
    });
    potatoButton.addEventListener("click", e => {
        presetAlarm(mashedPoatoes);
    });
    BurgerButton.addEventListener("click", e => {
        presetAlarm(burger);
    });
}
    