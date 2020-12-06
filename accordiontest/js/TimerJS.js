const counter = document.querySelector('.counter');
const secondsInput = document.getElementById('seconds');

var seconds;
var minuts;
var remseconds;
var toCount;
var toReset;
var intervalName;
var sound = document.getElementById("timerAlert");
document.getElementById("reset").style.display = "block";

function subm(){
    display("submit", "start");
    seconds = Number(secondsInput.value);
    secondsInput.style.display = "none";
    counting();
    toReset = false;
}

function display(first, second){
    document.getElementById(first).style.display = "none";
    document.getElementById(second).style.display = "block";
}

function resetTimer() {
    clearInterval(intervalName);
    counter.innerHTML="";
    secondsInput.style.display = "block";
    toReset = true;
    sound.pause();
    sound.currentTime=0;
}

function check(stat){
    toCount = stat.value;
    if(stat.id == "start"){
        display("start", "stop");
    }
    else if(stat.id == "stop"){
        display("stop", "continue");
    }
    else if (stat.id == "continue"){
        display('continue', "stop");
    } else {
        document.getElementById("submit").style.display = "block";
        document.getElementById("start").style.display = "none";
        document.getElementById("continue").style.display = "none";
        document.getElementById("stop").style.display = "none";
    }
}

function count(){
    if(seconds > 0){
        if(toCount == true){
            seconds--;
            remseconds = seconds % 60;
            minuts = Math.floor(seconds / 60);

            if(remseconds < 10){
                remseconds = "0" + remseconds;
            }

            if(minuts < 10){
                minuts = "0" + minuts;
            }

            counter.innerHTML = minuts + " : " + remseconds;
        }
    }
    else if (toReset == false){
        counter.innerHTML = "Done!";
        playSound();
        document.getElementById("stop").style.display = "none";
        document.getElementById("continue").style.display = "none";
        document.getElementById("reset").style.display = "block";
    }
}

function counting(){
    remseconds = seconds % 60;
    minuts = Math.floor(seconds / 60);

    if(remseconds < 10){
        remseconds = "0" + remseconds;
    }
    if(minuts < 10){
        minuts = "0" + minuts;
    }
    counter.innerHTML = minuts + " : " + remseconds;
    intervalName = setInterval(count, 1000);
}

function playSound() {
    sound.play();
}
