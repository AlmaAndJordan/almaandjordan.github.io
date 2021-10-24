var questions = [];
var questionCounter = 0;
var playerScore = 0;
let interval;
var timerWidth = 0;



document.addEventListener("DOMContentLoaded", () => {
    var elems = document.querySelectorAll('.modal');
    var instances = M.Modal.init(elems);

    questions.push({
        question: "What road were we on when we decided to be together?",
        answers: ["Monash Freeway", "Westgate Freeway", "Domain Tunnel", "Bolte Bridge"],
        correctIndex: 1
    });

    questions.push({
        question: "What were we doing when we had our first kiss?",
        answers: ["Dancing", "Sitting on a step in an alleyway", "Walking to your apartment"],
        correctIndex: 1
    });

    questions.push({
        question: "What was the name of the town we stayed in on our first night on the road?",
        answers: ["Tocumwal", "Dubbo", "Narrandera", "Farmstay not near any town"],
        correctIndex: 2
    });

    questions.push({
        question: "How many days elapsed between leaving Melbourne and arriving in Townsville?",
        answers: ["11", "12", "13", "14"],
        correctIndex: 1
    });

    questions.push({
        question: "What is the name of the town we made our NSW/QLD border crossing at?",
        answers: ["Toowoomba", "Narrabri", "Goondiwindi", "Callandoon"],
        correctIndex: 2
    });

    questions.push({
        question: "What did we eat for dinner when we stayed at the Toowoomba Showgrounds Caravan Park?",
        answers: ["Pasta", "Fish and Chips", "Curry", "Steak and Mash"],
        correctIndex: 3
    });

    document.getElementById('start-game').onclick = () => {
        document.getElementById('stat-display').innerHTML = `
        <div class = "col s12" style = "padding-top: 2vh">
            <div class = "col s4 compact">Score: </div>
            <div class = "col s4 compact" id = "player-score"></div>
        </div>
        <div class = "col s12">
            <div class = "col s4 compact">Rewards at: </div>
            <div class = "col s4 compact"> 3, 5 and 7</div>        
        </div>
        <div class = "col s12">
                <div class = "col s4 compact">Questions left: </div>
                <div class = "col s1 compact" id = "questions-left"></div>
        </div>`;
        document.getElementById('timer').innerHTML = `
            <div id = "timer-bar">
                <div id = "live-timer"></div>
            </div>
        `;
        document.getElementById('player-score').innerText = playerScore/10;

        changeQuestion();

        

        
    }



});




var questionContainer = document.getElementById('question-container');



const changeQuestion = () => {
    document.getElementById('questions-left').innerHTML = `${questions.length-questionCounter}`;


    document.getElementById('answer-btn-container').innerHTML = `
        <div class = "col s12" >
            <button type = "button" class = "btn _btn" id = "answer-question">Answer</button>
        </div>`;
        document.getElementById('answer-question').onclick = () => {
            finishRound(interval);
            document.getElementById('player-score').innerText = playerScore/10;
        };
   

    let questionObject = questions[questionCounter];
    let questionHtml = "<ul>";

    let i = 0;
    for (i; i < questionObject.answers.length; i++){
        questionHtml += `
        <li style = "padding-bottom: 2vh">
            <p>
                <label id = "answer${i}">
                    <input name="answers" type="radio"/>
                    <span>${questionObject.answers[i]}</span>
                </label>
            </p>
        </li>
        
        `;
    }
  

    questionHtml += '</ul>';

    let html = `
        <p>${questionObject.question}</p>
        ${questionHtml}
    `;

    questionContainer.innerHTML = html;
    startTimer();

}


const startTimer = () => {
    document.getElementById('live-timer').style.width = '0%';
    timerWidth = 0;
    interval = setInterval(function(){
        if (timerWidth == 100){
            finishRound(interval);
        } else {
            timerWidth++;
            document.getElementById('live-timer').style.width = timerWidth + "%";
        }
       
    }, 150);

}



const finishRound = (interval) => {
    clearInterval(interval);
    let answer = $('input[name=answers]:checked').next().text();
    let answeredIndex = questions[questionCounter].answers.indexOf(answer.toString());

    console.log(questionCounter)
    // console.log(questions[questionCounter].correctIndex)
    if (answeredIndex == questions[questionCounter].correctIndex){

        playerScore = playerScore + 10;
        document.getElementById('player-progress').style.width = playerScore + "%";
        document.getElementById(`answer${answeredIndex}`).classList.add('correct-answer');
    } else {
        document.getElementById(`answer${answeredIndex}`).classList.add('incorrect-answer');
        document.getElementById(`answer${questions[questionCounter].correctIndex}`).classList.add('correct-answer');
    }

    document.getElementById('answer-btn-container').innerHTML = `
        <div class = "col s12" >
            <button type = "button" class = "btn _btn" id = "next-question">Next Question</button>
        </div>`;

    handlePrizes();


    questionCounter++;

    document.getElementById('next-question').onclick = changeQuestion;
}

const handlePrizes = () => {
    switch(playerScore){
        case 30:
            document.getElementById('modal-content-container').innerHTML = `
            
                <p class = "center">Woohooo!!!</p>
                <p>You have won a pamper afternoon! You are entitled to:</p>
                <ul class = "prize-list">
                    <li>a 30 minute full body massage in our light and sound controlled pamper room</li>
                    <br>
                    <li>to have your toe and fingernails painted</li>
                    <br>
                    <li>our expert hairdresser will wash, dry and comb your hair</li>
                </ul>
                <p><em>There will be complimentary snacks and beverages (of course)</em></p>

            `;

            
            let elems = document.querySelectorAll('.modal');
            let instances = M.Modal.init(elems);
            instances[0].open();
        break;

        case 20:

        break;
    }
}