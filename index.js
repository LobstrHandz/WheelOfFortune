// TODO: Сделать правильный рассчёт left для childText в init()
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
    const playArea = document.getElementById('play-area');
    const resultBlock = document.getElementById('result');
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
        const circleContainerStep = 500 * 4 / values.length / 2;
        let deg = 0;

        circleStep = 360 / values.length;

        values.forEach((item) => {
            let child = document.createElement('span');
            let childText = document.createElement('span');

            child.classList.add('triangle');
            child.style.transform = `rotate(${deg}deg)`;
            child.style.borderWidth = `250px ${circleContainerStep}px`;
            child.style.left = `calc(50% - ${circleContainerStep}px`;
            childText.innerText = item.value;

            child.append(childText);
            circle.append(child);

            let childTextDimentions = childText.getBoundingClientRect();
            childText.style.top = `-${225 - childTextDimentions.width}px`;
            childText.style.left = `-${childTextDimentions.height / 2}px`;

            deg += circleStep;
        })
    }

    function start() {
        playButton.classList.add('hidden');
        logo.classList.remove('hidden');
        introSound.play();

        setTimeout(() => {
            logo.classList.add('hidden');
            playArea.classList.remove('hidden');
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
            resultBlock.innerText = 'Вращаем барабан...';
            disableSpin();
            spinMusicSound.play();
            selectedSegment = getRandomNumber(0, values.length - 1);
            circlePointerPosition = getRandomNumber(circleStep * (selectedSegment), circleStep * (selectedSegment + 1) - 1);
            currentSpins += getRandomNumber(5, 8);
            circle.style.transform = `rotate(-${currentSpins * 360 + circlePointerPosition}deg)`;

            setTimeout(() => {
                spinMusicSound.pause();
                spinMusicSound.currentTime = 0;
                resultBlock.innerText = values[selectedSegment].value;

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
