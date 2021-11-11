
var questions = [];
var questionCounter = 0;
var playerScore = 0;
let interval;
var timerWidth = 0;
var hasWon = [false, false, false]



document.addEventListener("DOMContentLoaded", () => {

    var elems = document.querySelectorAll('.modal');
    var instances = M.Modal.init(elems);
    questions.push({
        question: "When living in marine waters, at what length (cm) does the lates calcarifer change its sex?",
        answers: ["60", "80", "90", "100"],
        correctIndex: 1
    });
    questions.push({
        question: "How many days elapsed between leaving Melbourne and arriving in Townsville?",
        answers: ["11", "12", "13", "14"],
        correctIndex: 1
    });
    
    questions.push({
        question: "What road were we on when we decided to be together?",
        answers: ["Monash Freeway", "Westgate Freeway", "Domain Tunnel", "Bolte Bridge"],
        correctIndex: 1
    });

   

    questions.push({
        question: "What was the name of the town we stayed in on our first night on the road?",
        answers: ["Tocumwal", "Dubbo", "Narrandera", "Farmstay not near any town"],
        correctIndex: 2
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

    questions.push({
        question: "What were we doing when we had our first kiss?",
        answers: ["Dancing", "Sitting on a step in an alleyway", "Walking to your apartment", "On your balcony"],
        correctIndex: 1
    });

    questions.push({
        question: "Butt to nose, Stevie is how many cm long?",
        answers: ["68.50", "59.50", "71.00", "65.20"],
        correctIndex: 0
    });

    questions.push({
        question: "As of today, how many days old are you?",
        answers: ["8401", "8760", "8740", "8766"],
        correctIndex: 3
    });

    questions.push({
        question: "What % of their total consumable meat does a typical tropical rock lobster have in its tail?",
        answers: ["28%", "25%", "31%", "33%"],
        correctIndex: 3
    });



  

    document.getElementById('start-game').onclick = () => {
        document.getElementById('stat-display').innerHTML = `
        <div class = "col s12" style = "padding-top: 2vh">
            <div class = "col s4 compact">Score: </div>
            <div class = "col s4 compact" id = "player-score"></div>
        </div>
        
        <div class = "col s12">
                <div class = "col s4 compact">Questions left: </div>
                <div class = "col s1 compact" id = "questions-left"></div>
        </div>
        <div class = "row compact">
            <div class = "col s4" id = "prize1">
                    <img class = "icon" src = "../resources/present.svg">
                    <p class = "center">3 points</p>

                </div>
                <div class = "col s4" id = "prize2">
                    <img class = "icon" src = "../resources/present.svg">
                    <p class = "center">5 points</p>

                </div>
                <div class = "col s4" id = "prize3">
                    <img class = "icon" src = "../resources/present.svg">
                    <p class = "center">7 points</p>
            </div>
         </div>
            
        
            `;
        document.getElementById('timer').innerHTML = `
            <div id = "timer-bar">
                <div id = "live-timer"></div>
            </div>
        `;
        document.getElementById('player-score').innerText = playerScore/10;
        document.getElementById('questions-left').innerHTML = `${questions.length-questionCounter}`;

           
        changeQuestion();

        

        
    }



});




var questionContainer = document.getElementById('question-container');



const changeQuestion = () => {


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
            <p id = "answer${i}">
                <label >
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
    document.getElementById('questions-left').innerHTML = `${questions.length-questionCounter}`;

    document.getElementById('next-question').onclick = changeQuestion;
}

const handlePrizes = () => {
    let elems = document.querySelectorAll('.modal');
    let instances = M.Modal.init(elems);

    switch(playerScore){
        
        case 30: 
            if (!hasWon[0]){
                document.getElementById('modal-content-container').innerHTML = `
                <p class = "center">Woohooo</p>
                <p class = "center" >You win your first prize!!</p>`;
                instances[0].open(); 
                document.getElementById('prize1').innerHTML = 
                `<img class = "icon"  src = "../resources/present-won.svg">
                <p class = "center">Volleyball!</p>`
                hasWon[0] = true;
            }
           
        break;

        case 50:
            if (!hasWon[1]){
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
                <p><em>There will be complimentary snacks and beverages (of course)</em></p>`;
            instances[0].open();
            document.getElementById('prize2').innerHTML = 
            `<img class = "icon"  src = "../resources/present-won.svg">
            <p class = "center">Home spa day!</p>`
            hasWon[1] = true;
            }
            

        break;

        case 70:
            if (!hasWon[2]){
                window.open ('../resources/almas_ticket.pdf')
                document.getElementById('prize3').innerHTML = 
                `<img class = "icon"  src = "../resources/present-won.svg">
                <p class = "center">Cape Tribulation Adventure!`
                hasWon[2] = true;
            }
           

        break;

    }
}