let timers = [];

function startNewTimer() {
    const hours = parseInt(document.getElementById('hours').value) || 0;
    const minutes = parseInt(document.getElementById('minutes').value) || 0;
    const seconds = parseInt(document.getElementById('seconds').value) || 0;

    if (hours === 0 && minutes === 0 && seconds === 0) {
        alert('Please enter a valid time.');
        return;
    }

    const totalSeconds = hours * 3600 + minutes * 60 + seconds;
    const timer = {
        totalTime: totalSeconds,
        timeRemaining: totalSeconds,
        intervalId: setInterval(() => {
            updateTimer(timer);
        }, 1000),
    };

    timers.push(timer);
    updateTimerDisplay();
}

function updateTimer(timer) {
    if (timer.timeRemaining > 0) {
        timer.timeRemaining--;
    } else {
        clearInterval(timer.intervalId);
        playAudioAlert();
    }

    updateTimerDisplay();
}

function stopTimer(index) {
    clearInterval(timers[index].intervalId);
    timers.splice(index, 1);
    updateTimerDisplay();
}

function updateTimerDisplay() {
    const activeTimersContainer = document.getElementById('active-timers');
    activeTimersContainer.innerHTML = '';

    timers.forEach((timer, index) => {
        const timerElement = document.createElement('div');
        timerElement.classList.add('timer');
        if (timer.timeRemaining === 0) {
            timerElement.classList.add('timer-ended');
        }
        timerElement.textContent = formatTime(timer.timeRemaining);

        const stopButton = document.createElement('button');
        stopButton.classList.add('stop-timer');
        stopButton.textContent = 'Stop Timer';
        stopButton.onclick = () => stopTimer(index);

        const timerButtons = document.createElement('div');
        timerButtons.classList.add('timer-buttons');
        timerButtons.appendChild(stopButton);

        timerElement.appendChild(timerButtons);
        activeTimersContainer.appendChild(timerElement);
    });
}

function formatTime(seconds) {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${padZero(h)}:${padZero(m)}:${padZero(s)}`;
}

function padZero(num) {
    return num < 10 ? `0${num}` : num;
}

function playAudioAlert() {
    const audio = new Audio('music.mp3');
    audio.play();
}
