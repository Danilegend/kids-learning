// App State
const appState = {
    currentSubject: null,
    currentQuestionIndex: 0,
    score: 0,
    coins: parseInt(localStorage.getItem('coins')) || 0,
    answerSubmitted: false,
    purchasedItems: JSON.parse(localStorage.getItem('purchasedItems')) || [],
    isSoundOn: localStorage.getItem('isSoundOn') !== 'false',
    quizzesCompleted: parseInt(localStorage.getItem('quizzesCompleted')) || 0,
    currentQuestions: [],
    quizMode: 'basic' // 'basic' or 'advanced'
};

// Static Questions for Basic Mode (Grade 2-5) - Expanded to 10 questions per subject
const questionsData = {
    categories: [
        {
            name: 'Math',
            questions: [
                { question: 'What is 7 + 5?', type: 'multiple_choice', options: ['10', '12', '11', '13'], answer: '12' },
                { question: 'Solve: 3 × 4', type: 'fill_blank', answer: '12' },
                { question: 'What is 10 - 6?', type: 'multiple_choice', options: ['4', '5', '3', '6'], answer: '4' },
                { question: 'How many sides does a triangle have?', type: 'fill_blank', answer: '3' },
                { question: 'What is 2 + 8?', type: 'multiple_choice', options: ['9', '10', '11', '12'], answer: '10' },
                { question: 'Solve: 5 × 2', type: 'fill_blank', answer: '10' },
                { question: 'What is 15 - 7?', type: 'multiple_choice', options: ['6', '7', '8', '9'], answer: '8' },
                { question: 'How many sides does a square have?', type: 'fill_blank', answer: '4' },
                { question: 'What is 4 + 3?', type: 'multiple_choice', options: ['6', '7', '8', '9'], answer: '7' },
                { question: 'Solve: 6 ÷ 2', type: 'fill_blank', answer: '3' },
                { question: 'Which is greater: 14 or 19?', type: 'multiple_choice', options: ['14', '19'], answer: '19' },
                { question: 'What is 9 + 6?', type: 'multiple_choice', options: ['14', '15', '16', '13'], answer: '15' },
                { question: 'Solve: 8 ÷ 4', type: 'fill_blank', answer: '2' },
                { question: 'What is 12 - 5?', type: 'multiple_choice', options: ['6', '7', '8', '9'], answer: '7' },
                { question: 'How many corners does a rectangle have?', type: 'fill_blank', answer: '4' },
                { question: 'What is 7 × 2?', type: 'multiple_choice', options: ['12', '14', '16', '18'], answer: '14' },
                { question: 'Solve: 10 ÷ 5', type: 'fill_blank', answer: '2' },
                { question: 'What is 3 + 9?', type: 'multiple_choice', options: ['11', '12', '13', '14'], answer: '12' },
                { question: 'How many legs does a spider have?', type: 'fill_blank', answer: '8' },
                { question: 'What is 11 - 3?', type: 'multiple_choice', options: ['7', '8', '9', '10'], answer: '8' }
            ]
        },
        {
            name: 'English',
            questions: [
                { question: 'What is the opposite of big?', type: 'multiple_choice', options: ['Small', 'Large', 'Huge', 'Tall'], answer: 'Small' },
                { question: 'Spell the word for a flying insect: B _ _', type: 'fill_blank', answer: 'bee' },
                { question: 'What is the opposite of happy?', type: 'multiple_choice', options: ['Sad', 'Glad', 'Mad', 'Big'], answer: 'Sad' },
                { question: 'Spell the word for a color: R _ _', type: 'fill_blank', answer: 'red' },
                { question: 'What is the opposite of up?', type: 'multiple_choice', options: ['Down', 'Left', 'Right', 'Over'], answer: 'Down' },
                { question: 'Spell the word for a pet: C _ _', type: 'fill_blank', answer: 'cat' },
                { question: 'What is the opposite of fast?', type: 'multiple_choice', options: ['Slow', 'Quick', 'Big', 'Tall'], answer: 'Slow' },
                { question: 'Spell the word for a number: T _ _', type: 'fill_blank', answer: 'two' },
                { question: 'What is the opposite of hot?', type: 'multiple_choice', options: ['Cold', 'Warm', 'Cool', 'Big'], answer: 'Cold' },
                { question: 'Spell the word for a fruit: A _ _ _ _', type: 'fill_blank', answer: 'apple' },
                { question: 'What is the opposite of short?', type: 'multiple_choice', options: ['Tall', 'Big', 'Small', 'Wide'], answer: 'Tall' },
                { question: 'Spell the word for a farm animal: P _ _', type: 'fill_blank', answer: 'pig' },
                { question: 'What is the opposite of open?', type: 'multiple_choice', options: ['Close', 'Shut', 'Stop', 'Start'], answer: 'Close' },
                { question: 'Spell the word for a fruit: O _ _ _ _', type: 'fill_blank', answer: 'orange' },
                { question: 'What is the opposite of night?', type: 'multiple_choice', options: ['Morning', 'Sunset', 'Afternoon', 'Day'], answer: 'Day' },
                { question: 'Spell the word for a color: B _ _ _', type: 'fill_blank', answer: 'blue' },
                { question: 'What is the opposite of cold?', type: 'multiple_choice', options: ['Hot', 'Cool', 'Warm', 'Chilly'], answer: 'Hot' },
                { question: 'Spell the word for a school object: P _ _ _ _ _', type: 'fill_blank', answer: 'pencil' },
                { question: 'What is the opposite of hard?', type: 'multiple_choice', options: ['Soft', 'Tough', 'Rough', 'Smooth'], answer: 'Soft' },
                { question: 'Spell the word for an animal: D _ _', type: 'fill_blank', answer: 'dog' }
            ]
        },
        {
            name: 'Science',
            questions: [
                { question: 'What planet do we live on?', type: 'multiple_choice', options: ['Mars', 'Earth', 'Jupiter', 'Venus'], answer: 'Earth' },
                { question: 'What gas do plants need to grow?', type: 'fill_blank', answer: 'carbon dioxide' },
                { question: 'What color is the sky on a clear day?', type: 'multiple_choice', options: ['Blue', 'Green', 'Red', 'Yellow'], answer: 'Blue' },
                { question: 'What do we call a baby frog?', type: 'fill_blank', answer: 'tadpole' },
                { question: 'What is the biggest star in our solar system?', type: 'multiple_choice', options: ['Moon', 'Sun', 'Earth', 'Mars'], answer: 'Sun' },
                { question: 'What do bees make?', type: 'fill_blank', answer: 'honey' },
                { question: 'What do we use to see faraway stars?', type: 'multiple_choice', options: ['Telescope', 'Microscope', 'Binoculars', 'Glasses'], answer: 'Telescope' },
                { question: 'What do plants need to make food?', type: 'fill_blank', answer: 'sunlight' },
                { question: 'What animal lives in water and has gills?', type: 'multiple_choice', options: ['Fish', 'Dog', 'Bird', 'Cat'], answer: 'Fish' },
                { question: 'What is the weather like when it’s raining?', type: 'fill_blank', answer: 'wet' },
                { question: 'What do humans breathe in to survive?', type: 'multiple_choice', options: ['Oxygen', 'Carbon dioxide', 'Nitrogen', 'Helium'], answer: 'Oxygen' },
                { question: 'What do you call frozen water?', type: 'fill_blank', answer: 'ice' },
                { question: 'What planet is known as the Red Planet?', type: 'multiple_choice', options: ['Mars', 'Venus', 'Saturn', 'Earth'], answer: 'Mars' },
                { question: 'What helps you hear sounds?', type: 'fill_blank', answer: 'ears' },
                { question: 'What is the main source of light during the day?', type: 'multiple_choice', options: ['Sun', 'Moon', 'Stars', 'Bulb'], answer: 'Sun' },
                { question: 'What body part helps you see?', type: 'fill_blank', answer: 'eyes' },
                { question: 'What do we call the movement of the Earth around the sun?', type: 'multiple_choice', options: ['Rotation', 'Revolution', 'Orbit', 'Spin'], answer: 'Revolution' },
                { question: 'What do you use to taste food?', type: 'fill_blank', answer: 'tongue' },
                { question: 'What is H2O?', type: 'multiple_choice', options: ['Water', 'Oxygen', 'Hydrogen', 'Salt'], answer: 'Water' },
                { question: 'What do we call animals that eat plants?', type: 'fill_blank', answer: 'herbivores' }
            ]
        },
        {
            name: 'General Knowledge',
            questions: [
                { question: 'What is the capital of France?', type: 'multiple_choice', options: ['Paris', 'London', 'Berlin', 'Madrid'], answer: 'Paris' },
                { question: 'What animal is known as man’s best friend?', type: 'fill_blank', answer: 'dog' },
                { question: 'What color is a banana?', type: 'multiple_choice', options: ['Yellow', 'Blue', 'Red', 'Green'], answer: 'Yellow' },
                { question: 'What do you wear on your head?', type: 'fill_blank', answer: 'hat' },
                { question: 'What is the tallest animal?', type: 'multiple_choice', options: ['Giraffe', 'Elephant', 'Lion', 'Bear'], answer: 'Giraffe' },
                { question: 'What do you use to write on a chalkboard?', type: 'fill_blank', answer: 'chalk' },
                { question: 'What is the shape of a wheel?', type: 'multiple_choice', options: ['Circle', 'Square', 'Triangle', 'Rectangle'], answer: 'Circle' },
                { question: 'What do you call a baby cow?', type: 'fill_blank', answer: 'calf' },
                { question: 'What animal has a long trunk?', type: 'multiple_choice', options: ['Elephant', 'Giraffe', 'Lion', 'Tiger'], answer: 'Elephant' },
                { question: 'What do you drink that comes from a cow?', type: 'fill_blank', answer: 'milk' },
                { question: 'What is the capital of the USA?', type: 'multiple_choice', options: ['Washington, D.C.', 'New York', 'Los Angeles', 'Chicago'], answer: 'Washington, D.C.' },
                { question: 'What do you wear on your feet?', type: 'fill_blank', answer: 'shoes' },
                { question: 'Which animal says "meow"?', type: 'multiple_choice', options: ['Dog', 'Cat', 'Cow', 'Bird'], answer: 'Cat' },
                { question: 'What day comes after Friday?', type: 'fill_blank', answer: 'Saturday' },
                { question: 'Which season comes after summer?', type: 'multiple_choice', options: ['Autumn', 'Spring', 'Winter', 'Rainy'], answer: 'Autumn' },
                { question: 'What do you use to eat soup?', type: 'fill_blank', answer: 'spoon' },
                { question: 'What is the opposite of north?', type: 'multiple_choice', options: ['South', 'East', 'West', 'Top'], answer: 'South' },
                { question: 'What month comes after December?', type: 'fill_blank', answer: 'January' },
                { question: 'Which shape has three sides?', type: 'multiple_choice', options: ['Triangle', 'Square', 'Circle', 'Rectangle'], answer: 'Triangle' },
                { question: 'What do you use to cut paper?', type: 'fill_blank', answer: 'scissors' }
            ]
        }
    ]
};


// Map subjects to Open Trivia DB categories for Advanced Mode
const categoryMapping = {
    'math': 19, // Mathematics
    'english': 10, // Books (proxy for English)
    'science': 17, // Science & Nature
    'general knowledge': 9 // General Knowledge
};

// DOM Elements
const homeScreen = document.getElementById('homeScreen');
const questionScreen = document.getElementById('questionScreen');
const rewardsShop = document.getElementById('rewardsShop');
const certificateScreen = document.getElementById('certificateScreen');
const resultsScreen = document.getElementById('resultsScreen');
const appContent = document.getElementById('appContent');
const loadingSpinner = document.getElementById('loadingSpinner');
const coinsDisplay = document.getElementById('coins');
const shopCoinsDisplay = document.getElementById('shopCoins');

// Audio Elements
const clickSound = document.getElementById('clickSound');
const correctSound = document.getElementById('correctSound');
const incorrectSound = document.getElementById('incorrectSound');

// Initialize App
function init() {
    if (localStorage.getItem('darkMode') === 'true') {
        appContent.classList.add('dark');
        document.body.classList.add('dark');
        document.getElementById('darkModeToggle').checked = true;
    }
    document.getElementById('soundToggle').checked = appState.isSoundOn;
    updateCoinsDisplay();
    document.getElementById('darkModeToggle').addEventListener('change', toggleDarkMode);
    document.getElementById('soundToggle').addEventListener('change', toggleSound);
    document.querySelectorAll('button, a').forEach(el => {
        el.addEventListener('click', () => playSound(clickSound));
        if (el.href && el.classList.contains('btn-primary')) {
            el.addEventListener('click', handleDonationClick);
        }
    });
}

// Show Advanced Subject Selection Modal
function showAdvancedSubjectSelection() {
    playSound(clickSound);
    Swal.fire({
        title: 'Select a Subject for Advanced Questions',
        html: `
            <div class="grid grid-cols-2 gap-4 max-w-md mx-auto">
                <button onclick="loadSubject('math', 'advanced')" class="subject-btn bg-blue-500 hover:bg-blue-600 text-white py-4 rounded-xl shadow-lg">
                    <i class="fas fa-calculator text-3xl mb-2"></i>
                    <h2 class="text-xl font-bold">Math</h2>
                </button>
                <button onclick="loadSubject('english', 'advanced')" class="subject-btn bg-green-500 hover:bg-green-600 text-white py-4 rounded-xl shadow-lg">
                    <i class="fas fa-book text-3xl mb-2"></i>
                    <h2 class="text-xl font-bold">English</h2>
                </button>
                <button onclick="loadSubject('science', 'advanced')" class="subject-btn bg-yellow-500 hover:bg-yellow-600 text-white py-4 rounded-xl shadow-lg">
                    <i class="fas fa-flask text-3xl mb-2"></i>
                    <h2 class="text-xl font-bold">Science</h2>
                </button>
                <button onclick="loadSubject('general knowledge', 'advanced')" class="subject-btn bg-red-500 hover:bg-red-600 text-white py-4 rounded-xl shadow-lg">
                    <i class="fas fa-globe-americas text-3xl mb-2"></i>
                    <h2 class="text-xl font-bold">General Knowledge</h2>
                </button>
            </div>
        `,
        showConfirmButton: false,
        showCancelButton: true,
        cancelButtonText: 'Close',
        customClass: { popup: appContent.classList.contains('dark') ? 'dark' : '' },
        buttonsStyling: false,
        customClass: {
            cancelButton: 'btn-primary bg-gray-500 hover:bg-gray-600 dark:bg-gray-600 dark:hover:bg-gray-500 text-white py-2 px-4 rounded-lg transition'
        }
    });
}

// Fetch Questions from Open Trivia DB (Advanced Mode)
async function fetchQuestions(subject) {
    const categoryId = categoryMapping[subject];
    const url = `https://opentdb.com/api.php?amount=10&category=${categoryId}&type=multiple`;
    
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('API request failed');
        const data = await response.json();
        if (data.response_code !== 0) throw new Error('API returned an error');
        
        return data.results.map(q => {
            const options = [...q.incorrect_answers, q.correct_answer];
            shuffleArray(options);
            return {
                question: decodeHTML(q.question),
                type: 'multiple_choice',
                options: options.map(decodeHTML),
                answer: decodeHTML(q.correct_answer)
            };
        });
    } catch (error) {
        console.error('Error fetching questions:', error);
        Swal.fire({
            title: 'Oops!',
            text: 'Unable to fetch advanced questions. Please try again later.',
            icon: 'error',
            confirmButtonText: 'OK',
            customClass: { popup: appContent.classList.contains('dark') ? 'dark' : '' }
        });
        return [];
    }
}

// Utility: Decode HTML entities
function decodeHTML(html) {
    const txt = document.createElement('textarea');
    txt.innerHTML = html;
    return txt.value;
}

// Utility: Shuffle array (for options)
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Toggle Dark Mode
function toggleDarkMode() {
    appContent.classList.toggle('dark');
    document.body.classList.toggle('dark');
    localStorage.setItem('darkMode', appContent.classList.contains('dark'));
    playSound(clickSound);
}

// Toggle Sound
function toggleSound() {
    appState.isSoundOn = document.getElementById('soundToggle').checked;
    localStorage.setItem('isSoundOn', appState.isSoundOn);
    playSound(clickSound);
}

// Play Sound Effect
function playSound(audio) {
    if (appState.isSoundOn) {
        audio.currentTime = 0;
        audio.play().catch(err => console.log('Audio play failed:', err));
    }
}

// Handle Donation Click
function handleDonationClick(event) {
    const platform = event.target.textContent.includes('PayPal') ? 'PayPal' : 'Buy Me a Coffee';
    Swal.fire({
        title: `Support via ${platform}`,
        text: `You’re about to visit ${platform} to support Fun Learning! Thank you!`,
        icon: 'info',
        showCancelButton: true,
        confirmButtonText: 'Continue',
        cancelButtonText: 'Cancel',
        customClass: { popup: appContent.classList.contains('dark') ? 'dark' : '' }
    }).then((result) => {
        if (!result.isConfirmed) {
            event.preventDefault();
        }
    });
}

// Show Support Reminder Pop-up
function showSupportReminder() {
    Swal.fire({
        title: 'Support Fun Learning! 🎓',
        text: 'Support us to unlock more and unlimited learning! You can also continue learning for free.',
        icon: 'info',
        showCancelButton: true,
        confirmButtonText: 'Support Us',
        cancelButtonText: 'Continue for Free',
        customClass: { popup: appContent.classList.contains('dark') ? 'dark' : '' },
        buttonsStyling: false,
        customClass: {
            confirmButton: 'btn-primary bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition mr-2',
            cancelButton: 'btn-primary bg-gray-500 hover:bg-gray-600 dark:bg-gray-600 dark:hover:bg-gray-500 text-white py-2 px-4 rounded-lg transition'
        }
    }).then((result) => {
        playSound(clickSound);
        if (result.isConfirmed) {
            Swal.fire({
                title: 'Choose a Way to Support!',
                html: `
                    <div class="flex flex-col gap-3">
                        <a href="https://www.paypal.com/paypalme/DanielSema" target="_blank" rel="noopener noreferrer" class="btn-primary bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition flex items-center justify-center">
                            <i class="fab fa-paypal mr-2"></i> Donate via PayPal
                        </a>
                        <a href="https://buymeacoffee.com/danielsema" target="_blank" rel="noopener noreferrer" class="btn-primary bg-yellow-500 hover:bg-yellow-600 dark:bg-yellow-600 dark:hover:bg-yellow-500 text-white py-2 px-4 rounded-lg transition flex items-center justify-center">
                            <i class="fas fa-coffee mr-2"></i> Buy Me a Coffee
                        </a>
                    </div>
                `,
                showConfirmButton: false,
                showCancelButton: true,
                cancelButtonText: 'Close',
                customClass: { popup: appContent.classList.contains('dark') ? 'dark' : '' },
                buttonsStyling: false,
                customClass: {
                    cancelButton: 'btn-primary bg-gray-500 hover:bg-gray-600 dark:bg-gray-600 dark:hover:bg-gray-500 text-white py-2 px-4 rounded-lg transition'
                }
            }).then(() => {
                playSound(clickSound);
            });
        }
    });
}

// Update Coins Display
function updateCoinsDisplay() {
    coinsDisplay.textContent = appState.coins;
    shopCoinsDisplay.textContent = appState.coins;
    localStorage.setItem('coins', appState.coins);
}

// Show Loading Spinner
function showLoading() {
    loadingSpinner.classList.remove('hidden');
}

// Hide Loading Spinner
function hideLoading() {
    loadingSpinner.classList.add('hidden');
}

// Transition Between Screens
function transitionToScreen(showScreen, hideScreens) {
    showLoading();
    hideScreens.forEach(screen => {
        screen.classList.add('fade-out');
        setTimeout(() => {
            screen.classList.add('hidden');
            screen.classList.remove('fade-out');
        }, 300);
    });
    setTimeout(() => {
        showScreen.classList.remove('hidden');
        showScreen.classList.add('fade-in');
        setTimeout(() => {
            showScreen.classList.remove('fade-in');
            hideLoading();
        }, 300);
    }, 300);
}

// Load Subject
async function loadSubject(subject, mode) {
    appState.currentSubject = subject;
    appState.currentQuestionIndex = 0;
    appState.score = 0;
    appState.answerSubmitted = false;
    appState.quizMode = mode;

    // Close the modal if open (for advanced mode)
    if (mode === 'advanced') {
        Swal.close();
    }

    // Load questions based on mode
    if (mode === 'basic') {
        const subjectData = questionsData.categories.find(cat => cat.name.toLowerCase() === subject);
        appState.currentQuestions = subjectData.questions;
    } else if (mode === 'advanced') {
        showLoading();
        appState.currentQuestions = await fetchQuestions(subject);
        hideLoading();
        if (appState.currentQuestions.length === 0) {
            // If API fails, return to home
            transitionToScreen(homeScreen, [questionScreen, rewardsShop, certificateScreen, resultsScreen]);
            return;
        }
    }

    document.getElementById('subjectTitle').textContent = 
        (mode === 'advanced' ? 'Advanced ' : '') + 
        subject.charAt(0).toUpperCase() + subject.slice(1);
    document.getElementById('questionCount').textContent = `Question ${appState.currentQuestionIndex + 1} of ${appState.currentQuestions.length}`;
    transitionToScreen(questionScreen, [homeScreen, rewardsShop, certificateScreen, resultsScreen]);
    showQuestion();
}

// Show Question
function showQuestion() {
    if (appState.currentQuestionIndex >= appState.currentQuestions.length) {
        // Require at least 7 questions correct (score of 70)
        const passingScore = 70; // 7 correct answers × 10 points each
        if (appState.score >= passingScore) {
            showCertificate();
        } else {
            showResults();
        }
        return;
    }

    const question = appState.currentQuestions[appState.currentQuestionIndex];
    const container = document.getElementById('questionContainer');
    container.innerHTML = '';

    appState.answerSubmitted = false;

    const progressPercent = (appState.currentQuestionIndex / appState.currentQuestions.length) * 100;
    document.getElementById('progressBar').style.width = `${progressPercent}%`;
    document.getElementById('score').textContent = `Score: ${appState.score}`;
    document.getElementById('questionCount').textContent = `Question ${appState.currentQuestionIndex + 1} of ${appState.currentQuestions.length}`;

    const questionEl = document.createElement('div');
    questionEl.className = 'mb-6';

    const questionText = document.createElement('h3');
    questionText.className = 'text-xl font-bold mb-4';
    questionText.textContent = question.question;
    questionEl.appendChild(questionText);

    if (question.type === 'multiple_choice') {
        question.options.forEach((option, index) => {
            const optionBtn = document.createElement('button');
            optionBtn.className = 'w-full text-left bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 px-4 py-3 rounded-lg mb-2 transition-colors';
            optionBtn.textContent = option;
            optionBtn.setAttribute('aria-label', `Option ${index + 1}: ${option}`);
            optionBtn.onclick = () => selectAnswer(option, question.answer);
            questionEl.appendChild(optionBtn);
        });
    } else if (question.type === 'fill_blank') {
        const inputGroup = document.createElement('div');
        inputGroup.className = 'flex items-center';

        const input = document.createElement('input');
        input.type = 'text';
        input.className = 'border-2 border-gray-300 bg-gray-100 dark:border-gray-600 rounded-lg px-4 py-2 w-full focus:outline-none focus:border-blue-500 dark:focus:border-blue-400';
        input.placeholder = 'Type your answer here';
        input.id = 'fillBlankAnswer';
        input.value = '';
        input.autocomplete = 'off';
        input.setAttribute('aria-label', 'Enter your answer');

        const submitBtn = document.createElement('button');
        submitBtn.className = 'ml-2 btn-primary bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-500 text-white px-4 py-2 rounded-lg';
        submitBtn.textContent = 'Submit';
        submitBtn.setAttribute('aria-label', 'Submit answer');
        submitBtn.onclick = () => {
            const userAnswer = input.value.trim().toLowerCase();
            selectAnswer(userAnswer, question.answer.toLowerCase());
        };

        inputGroup.appendChild(input);
        inputGroup.appendChild(submitBtn);
        questionEl.appendChild(inputGroup);
    }

    container.appendChild(questionEl);
    document.getElementById('backBtn').disabled = appState.currentQuestionIndex === 0;
    document.getElementById('nextBtn').disabled = !appState.answerSubmitted;
}

// Select Answer
function selectAnswer(userAnswer, correctAnswer) {
    if (appState.answerSubmitted) return;
    appState.answerSubmitted = true;
    document.getElementById('nextBtn').disabled = false;

    const isCorrect = userAnswer.toLowerCase() === correctAnswer.toLowerCase();
    if (isCorrect) {
        appState.score += 10;
        appState.coins += 5;
        updateCoinsDisplay();
        playSound(correctSound);
        Swal.fire({
            title: 'Correct!',
            text: 'Great job! You earned 5 coins!',
            icon: 'success',
            confirmButtonText: 'Next',
            customClass: { popup: appContent.classList.contains('dark') ? 'dark' : '' }
        }).then(() => {
            nextQuestion();
        });
    } else {
        playSound(incorrectSound);
        Swal.fire({
            title: 'Oops!',
            text: `The correct answer was "${correctAnswer}". Try the next one!`,
            icon: 'error',
            confirmButtonText: 'Next',
            customClass: { popup: appContent.classList.contains('dark') ? 'dark' : '' }
        }).then(() => {
            nextQuestion();
        });
    }
}

// Next Question
function nextQuestion() {
    if (!appState.answerSubmitted) return;
    appState.currentQuestionIndex++;
    showQuestion();
}

// Previous Question
function previousQuestion() {
    if (appState.currentQuestionIndex > 0) {
        appState.currentQuestionIndex--;
        showQuestion();
    }
}

// Confirm Go Home
function confirmGoHome() {
    playSound(clickSound);
    Swal.fire({
        title: 'Are you sure?',
        text: 'Your progress in this quiz will be lost.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, go home',
        cancelButtonText: 'Stay',
        customClass: { popup: appContent.classList.contains('dark') ? 'dark' : '' }
    }).then((result) => {
        if (result.isConfirmed) {
            goHome();
        }
    });
}

// Go Home
function goHome() {
    transitionToScreen(homeScreen, [questionScreen, rewardsShop, certificateScreen, resultsScreen]);
    appState.currentSubject = null;
    appState.currentQuestionIndex = 0;
    appState.score = 0;
    appState.currentQuestions = [];
    appState.quizMode = 'basic';
}

// Show Rewards Shop
function showRewardsShop() {
    transitionToScreen(rewardsShop, [homeScreen, questionScreen, certificateScreen, resultsScreen]);
    updateCoinsDisplay();
}

// Hide Rewards Shop
function hideRewardsShop() {
    transitionToScreen(homeScreen, [rewardsShop, questionScreen, certificateScreen, resultsScreen]);
}

// Buy Item
function buyItem(item, cost) {
    playSound(clickSound);
    if (appState.coins >= cost) {
        appState.coins -= cost;
        appState.purchasedItems.push(item);
        localStorage.setItem('purchasedItems', JSON.stringify(appState.purchasedItems));
        updateCoinsDisplay();
        Swal.fire({
            title: 'Success!',
            text: `You purchased ${item}!`,
            icon: 'success',
            confirmButtonText: 'Great!',
            customClass: { popup: appContent.classList.contains('dark') ? 'dark' : '' }
        });
    } else {
        Swal.fire({
            title: 'Not Enough Coins',
            text: 'Answer more questions to earn coins!',
            icon: 'warning',
            confirmButtonText: 'OK',
            customClass: { popup: appContent.classList.contains('dark') ? 'dark' : '' }
        });
    }
}

// Show Premium Offer
function showPremiumOffer() {
    playSound(clickSound);
    Swal.fire({
        title: 'Premium Bundle',
        text: 'Unlock all rewards and exclusive content for €2!',
        icon: 'info',
        showCancelButton: true,
        confirmButtonText: 'Purchase',
        cancelButtonText: 'Cancel',
        customClass: { popup: appContent.classList.contains('dark') ? 'dark' : '' }
    });
}

// Show Results
function showResults() {
    const totalQuestions = appState.currentQuestions.length;
    const maxScore = totalQuestions * 10;
    const correctAnswers = appState.score / 10; // Number of correct answers
    
    document.getElementById('finalScore').textContent = appState.score;
    document.getElementById('maxScore').textContent = maxScore;
    document.getElementById('resultMessage').textContent = 
        `Nice try! You need to get at least 7 questions right to earn a certificate. You got ${correctAnswers} right. Keep learning and try again!`;
    
    transitionToScreen(resultsScreen, [homeScreen, questionScreen, rewardsShop, certificateScreen]);
    
    // Still increment quizzes completed and show support reminder
    appState.quizzesCompleted += 1;
    localStorage.setItem('quizzesCompleted', appState.quizzesCompleted);
    if (appState.quizzesCompleted % 2 === 0) {
        setTimeout(() => {
            showSupportReminder();
        }, 500);
    }
}

// Show Certificate
function showCertificate() {
    document.getElementById('certSubject').textContent = 
        (appState.quizMode === 'advanced' ? 'Advanced ' : '') + 
        appState.currentSubject.charAt(0).toUpperCase() + appState.currentSubject.slice(1);
    document.getElementById('certDate').textContent = new Date().toLocaleDateString();
    document.getElementById('childName').value = '';
    transitionToScreen(certificateScreen, [homeScreen, questionScreen, rewardsShop, resultsScreen]);
    
    appState.quizzesCompleted += 1;
    localStorage.setItem('quizzesCompleted', appState.quizzesCompleted);
    if (appState.quizzesCompleted % 2 === 0) {
        setTimeout(() => {
            showSupportReminder();
        }, 500);
    }
}

// Download Certificate
function downloadCertificate() {
    playSound(clickSound);
    const childName = document.getElementById('childName').value.trim();
    if (!childName) {
        Swal.fire({
            title: 'Enter a Name',
            text: 'Please enter a name for the certificate.',
            icon: 'warning',
            confirmButtonText: 'OK',
            customClass: { popup: appContent.classList.contains('dark') ? 'dark' : '' }
        });
        return;
    }
    const certificate = document.querySelector('.certificate');
    html2canvas(certificate).then(canvas => {
        const link = document.createElement('a');
        link.download = `${childName}_Certificate.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
    });
}

// Show Premium Certificate Offer
function showPremiumCertificateOffer() {
    playSound(clickSound);
    Swal.fire({
        title: 'Premium Certificate',
        text: 'Get a premium certificate with exclusive designs for €1!',
        icon: 'info',
        showCancelButton: true,
        confirmButtonText: 'Purchase',
        cancelButtonText: 'Cancel',
        customClass: { popup: appContent.classList.contains('dark') ? 'dark' : '' }
    });
}

// Initialize App
document.addEventListener('DOMContentLoaded', init);