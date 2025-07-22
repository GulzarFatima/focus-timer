window.onload = function () {
    let interval;
    let isPaused = false;
    let isBreak = false;
    let remainingTime = 0;
    let focusDuration = 0;
    let breakDuration = 0;
  
    const display = document.getElementById('display');
    const focusMusic = document.getElementById('focusMusic');
    const breakMusic = document.getElementById('breakMusic');
    const beep = document.getElementById('beep');
    const pauseBtn = document.getElementById('pauseBtn');
  
    function startTimer() {
      if (interval) clearInterval(interval);
  
      if (!isPaused) {
        const [focus, rest] = document.getElementById('session').value.split('-').map(Number);
        focusDuration = focus * 60;
        breakDuration = rest * 60;
        remainingTime = isBreak ? breakDuration : focusDuration;
  
        if (!isBreak) focusMusic.play();
      } else {
        if (!isBreak) focusMusic.play();
      }
  
      interval = setInterval(countdown, 1000);
      isPaused = false;
      pauseBtn.textContent = 'Pause';
    }
  
    function countdown() {
      const minutes = Math.floor(remainingTime / 60);
      const seconds = remainingTime % 60;
      display.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
      if ([4, 3, 2].includes(remainingTime)) beep.play();
      if (remainingTime <= 0) {
        clearInterval(interval);
        beep.play();
        isBreak = !isBreak;
        isPaused = false;
        focusMusic.pause();
        breakMusic.pause();
        startTimer();
      }
      remainingTime--;
    }
  
    function pauseTimer() {
      if (!isPaused) {
        clearInterval(interval);
        isPaused = true;
        pauseBtn.textContent = 'Resume';
        focusMusic.pause();
      } else {
        isPaused = false;
        pauseBtn.textContent = 'Pause';
        if (!isBreak) focusMusic.play();
        interval = setInterval(countdown, 1000);
      }
    }
  
    function resetTimer() {
      clearInterval(interval);
      display.textContent = "00:00";
      isPaused = false;
      isBreak = false;
      focusMusic.pause();
      breakMusic.pause();
      focusMusic.currentTime = 0;
      breakMusic.currentTime = 0;
      pauseBtn.textContent = 'Pause';
    }
  
    // expose functions to window
    window.startTimer = startTimer;
    window.pauseTimer = pauseTimer;
    window.resetTimer = resetTimer;
  
    // background color cycling
    const softColors = [
      '#b8e0d2', '#fceabb', '#fcd5ce', '#d0e8f2', '#ffd6e0',
      '#e2f0cb', '#cce2cb', '#f6dfeb', '#ffe8cc', '#e0c3fc'
    ];
    let colorIndex = 0;
    function cycleBackground() {
      document.body.style.backgroundColor = softColors[colorIndex];
      colorIndex = (colorIndex + 1) % softColors.length;
    }
    setInterval(cycleBackground, 30000);
  };
  