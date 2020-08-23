const word = document.getElementById('word');
const text = document.getElementById('text');
const scoreElement = document.getElementById('score');
const timeElement = document.getElementById('time');
const endgameElement = document.getElementById('end-game-container');
const settingsBtn = document.getElementById('settings-btn');
const settings = document.getElementById('settings');
const settingsForm = document.getElementById('settings-form');
const difficultySelect = document.getElementById('difficulty');

// Game words
const words = [
    'sigh',
    'tense',
    'airplane',
    'ball',
    'pies',
    'juice',
    'warlike',
    'bad',
    'north',
    'dependent',
    'steer',
    'silver',
    'highfalutin',
    'superficial',
    'quince',
    'eight',
    'feeble',
    'admit',
    'drag',
    'loving'
];

let randomWord;
let score = 0;
let time = 10;

// Set difficulty to value in local storage or medium
let difficulty = localStorage.getItem('difficulty') !== null ? localStorage.getItem('difficulty') : 'medium';

// Set difficulty select value
difficultySelect.value = localStorage.getItem('difficulty') !== null ? localStorage.getItem('difficulty') : 'medium';

text.focus();

// Start timer
const timeInterval = setInterval(updateTime, 1000);

// Get random word from array of words
function getRandomWord() {
    return words[Math.floor(Math.random() * words.length)];
}

// Display word
function displayWord() {
    randomWord = getRandomWord();
    word.innerHTML = randomWord;
}

function updateScore() {
    score++;
    scoreElement.innerHTML = score;
}

function updateTime() {
    time--;
    timeElement.innerHTML = time + 's';

    if (time === 0) {
        // Stop timer
        clearInterval(timeInterval);
        // End game
        gameOver();
    }
}

// Display end game screen
function gameOver() {
    endgameElement.innerHTML = `
        <h1>Time ran out</h1>
        <p>Your final score is ${score}</p>
        <button onclick="location.reload()">Play again</button>
    `;

    endgameElement.style.display = 'flex';
}

// Event listeners
// Typing
text.addEventListener('input', e => {
    const insertedText = e.target.value;
    if (insertedText === randomWord) {
        displayWord();
        updateScore();
        e.target.value = '';

        // Increment time by difficulty
        if (difficulty === 'hard') {
            time += 2;
        } else if (difficulty === 'medium') {
            time += 3;
        } else {
            time += 5;
        }
        updateTime();
    }
});

// Settings btn click
settingsBtn.addEventListener('click', () => {
    settings.classList.toggle('hide');
});

// Settings selected
settingsForm.addEventListener('change', e => {
    difficulty = e.target.value;
    localStorage.setItem('difficulty', difficulty);
});

displayWord();
