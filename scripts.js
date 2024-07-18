//create a windows.onload event listener
window.onload = pageLoad;
//create a page load function
function pageLoad() {
    //create variables for various HTML elements
    const start = document.getElementById("btnStart");
    const hours = document.getElementById("hoursLeft");
    let hour = 0;
    const minutes = document.getElementById("minutesLeft");
    let minute = 0;
    const seconds = document.getElementById("secondsLeft");
    let second = 0;

    //when start is clicked get the int variable from the document
    //possibly improve the optimization of this because you are constantly runnnig these event listeners
    hours.addEventListener("change", e => {
        hour = e.target.value;
    });
    minutes.addEventListener("change", e => {
        minute = e.target.value;
    });
    seconds.addEventListener("change", e => {
        second = e.target.value;
    });

    //create a function that reduces the time every second
    

    //create a function to start the clock
    const startClock = () => {
        console.log("start clock");
        console.log(`hour: ${hour}`);
        console.log(`minute: ${minute}`);
        console.log(`second: ${second}`);
    }

    

    start.onclick = startClock;
}
    