(function() {
    const values = [ 
        { value: 1, bad: false },
        { value: 2, bad: true },
        { value: 3, bad: false },
        { value: 4, bad: true },
        { value: 5, bad: false },
        { value: 6, bad: true },
        { value: 7, bad: false },
        { value: 8, bad: true },
        { value: 9, bad: false },
        { value: 10, bad: true },
        { value: 11, bad: false },
        { value: 12, bad: true },
        { value: 13, bad: false },
        { value: 14, bad: true },
        { value: 15, bad: false },
        { value: 16, bad: true }
    ];
    const playButton = document.getElementById('play-button');
    const logo = document.getElementById('logo');
    const circleContainer = document.getElementById('circle-container');
    const circle = document.getElementById('circle');
    const introSound = new Audio('./assets/sounds/intro.mp3');
    const spinSound = new Audio('./assets/sounds/spin.mp3');
    const spinMusicSound = new Audio('./assets/sounds/spin-music.mp3');
    const dingSound = new Audio('./assets/sounds/ding.mp3');
    const dangSound = new Audio('./assets/sounds/dang.mp3');

    let circleStep;
    let selectedSegment = 0;
    let circlePointerPosition = 0;
    let currentSpins = 0;
    let spinAllowed = false;
    
    function init() {
        circleStep = 360 / values.length;
    }

    function start() {
        playButton.classList.add('hidden');
        logo.classList.remove('hidden');
        introSound.play();

        setTimeout(() => {
            logo.classList.add('hidden');
            circleContainer.classList.remove('hidden');
            spinSound.play();
            enableSpin();
        }, 9000);
    }
    
    function enableSpin() {
        circle.classList.remove('disabled');
        spinAllowed = true;
    }
    
    function disableSpin() {
        spinAllowed = false;
        circle.classList.add('disabled');
    }

    function spinCircle() {
        if (spinAllowed) {
            disableSpin();
            spinMusicSound.play();
            selectedSegment = getRandomNumber(0, values.length - 1);
            console.log(values[selectedSegment].value);
            circlePointerPosition = getRandomNumber(circleStep * (selectedSegment), circleStep * (selectedSegment + 1) - 1);
            currentSpins += getRandomNumber(5, 8);
            circle.style.transform = `rotate(-${currentSpins * 360 + circlePointerPosition}deg)`;

            setTimeout(() => {
                spinMusicSound.pause();
                spinMusicSound.currentTime = 0;

                if (!values[selectedSegment].bad) {
                    dingSound.play();
                } else {
                    dangSound.play();
                }
            }, 10000);

            setTimeout(() => {
                spinSound.play();
                enableSpin();
            }, 13000);
        }
    }
    
    function getRandomNumber(min, max) {
        return Math.round(Math.random() * (max - min)) + min;
    }
    
    playButton.onclick = start;
    circle.onclick = spinCircle;

    init();
})();
