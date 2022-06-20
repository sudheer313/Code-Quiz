//Created variable which holds the questions and answer
var questions =[{
    question: "Which of the following best describes JavaScript ?",
    choices: ["an object-oriented scripting language" , "high level programming language.","low level programming language" ,"none of the above"],
    answer: "an object-oriented scripting language"
},
{
    question: "Which JavaScript operator is used to determine the type of a variable?",
    choices: ["typeof", "TypeOf", "typeOf", "sizeof"],
    answer: "typeof"
},
{
    question: "Which property is used to get the length of a string in JavaScript?",
    choices: ["()", "{}", "<>", "[]"],
    answer: "[]"
},
{
    question: "Which method of an Array object adds and/or removes elements from an array.",
    choices: ["Reverse","shift", "slice", "splice"],
    answer: "splice"
},
{
    question: "What does '===' mean in javascript when comparing two things?",
    choices: ["They have the same value", "They are the same type", "They are the same value and type", "None of the above"],
    answer: "They are the same value and type"
},
{
    question: "Which JavaScript method is used to write on browser's console?",
    choices: ["console.write()", "console.output()", "console.log()", "console.writeHTML()"],
    answer: "console.log()"
},
{
    question: "Which JavaScript keyword is used to declare a variable?",
    choices: ["Var", "var", "Let", "All of the above"],
    answer: "var"  
},
];
//Global Variables
var headerEl = document.getElementById("welcome")
var mainEl = document.getElementById("quiz")
var startButton = document.getElementById("startQuiz");
startButton.addEventListener("click",startQuiz);
var timerEl = document.querySelector("#timer");
//input score page elements
var inputScoreEl = document.querySelector("#inputscore");
var initialsEl = document.querySelector("#initials");
var submitInitial = document.querySelector("#submitInitials");
var scoreEl = document.querySelector("#score");
var score = 0;
//Render High Scores Page Elements 
var highScoresEl = document.querySelector("#highscore");
var scoresEl = document.querySelector("#scores");
var goBackEl = document.querySelector("#goback");
var clearScoresEl = document.querySelector("#clearscores");
var highscores = JSON.parse(localStorage.getItem("highscores"))||[];
//Viewhigh score and timer page elements
var viewHighScoresBtnEl = document.querySelector("#viewhighscores");
var timerEl = document.querySelector("#timer");
//Start quiz function
function startQuiz(){
    reset();
    headerEl.style.display="none";//hide welcome
    mainEl.style.display="block";//displays the quiz screen by setting up to block
    renderQuestion();
    startTimer();
}
//Starts and update timer
var timeGiven = 45;
var timerEl = document.querySelector("#timer");
var interval;
function startTimer() {
    interval= setInterval(function () {
        if (timeGiven > 0){
            timerEl.textContent = timeGiven + " secs";
            timeGiven--;        
         }
        else if(timeGiven === 0){
            endGame();
        }
        else {
            timerEl.style.display = "none";
            timerEl.textContent = '';
            clearInterval(interval);
        }
    },1000);
}
//Function to end game and show the final score
function endGame () {
    timeGiven = 0;
    clearInterval(interval);
    mainEl.style.display = "none";
    timerEl.parentElement.style.display = "none";
    inputScoreEl.style.display="block";
    scoreEl.textContent = score;
}
           
//Renders current question
var questionEl = document.querySelector("#question");
var answersEl = document.querySelector("#answers");
var currentQ =0;
function renderQuestion() {
    questionEl.textContent = questions[currentQ].question;
    for (i = 0; i < answersEl.children.length; i++) {
        answersEl.children[i].children[0].textContent = `${(i + 1)}: ${questions[currentQ].choices[i]}`;
    }
}
//Reset local variables
function reset() {
    score = 0;
    currentQ = 0;
    timeGiven= 45;
}
//checks answer based on current question and updates the user score
function checkAnswer(answer){
    if (questions[currentQ].answer == questions[currentQ].choices[answer.id]){
        score += 5 ;
      displayMessage("Awesome...its correct!");
    }
    else{
        timeGiven -= 10;
        displayMessage("Oops..that is incorrect...");
    }
    if (currentQ < questions.length -1){
        currentQ++;
        renderQuestion();
    }
}
    
//display message correct or incorrect for few seconds
function displayMessage(m) {
    let messageHr = document.createElement("hr");
    let messageEl = document.createElement("div");
    messageEl.textContent = m;
    document.querySelector("#quiz").appendChild(messageHr);
    document.querySelector("#quiz").appendChild(messageEl);
    setTimeout(function () {
            messageHr.remove();
            messageEl.remove();
    }, 1000);

}
    //Calls to check if the answer is selected
     answersEl.addEventListener("click" , function(e){
      if (e.target.matches("button")){
          currentQ++;
          if (currentQ == questions.length){
              endGame();
          }
          else{
            checkAnswer(e.target);
          }
      }
    });
//Event listener to post the score
    submitInitial.addEventListener("click",function(e){
        var scoreData = {
         score:score,
         initials:initialsEl.value,
        }
    console.log(scoreData);
    highscores.push(scoreData);//Pushing the data to scoreData array
    localStorage.setItem("highscores",JSON.stringify(highscores));
    initialsEl.value = '';
    inputScoreEl.style.display = "none";
    highScoresEl.style.display = "block";
    timerEl.parentElement.style.display = "none";
    scoresEl.innerHTML = "";
        for (i = 0;i < highscores.length; i++){
            var createLi=document.createElement("li");//creating a list
            createLi.classList.add ("row");//adding to the classlist row
            createLi.setAttribute("style", "background-color:PaleTurquoise;");//setting style to the row
            createLi.textContent = `${highscores[i].initials}: ${highscores[i].score}`;//addiing text to show the score
            scoresEl.append(createLi);//appending the scores to the li
        }    
    });

    //Adding event listener to View High score button 
    viewHighScoresBtnEl.addEventListener("click",function ViewHighScore(){
    headerEl.style.display ="none";    
    inputScoreEl.style.display = "none";
    highScoresEl.style.display = "block";
    scoresEl.innerHTML = "";
        for (i = 0;i < 4; i++){//it will only show upto 4 scores
            var createLi = document.createElement("li");
            createLi.classList.add ("row");
            createLi.setAttribute("style", "background-color:PaleTurquoise;");
            createLi.textContent = `${highscores[i].initials}: ${highscores[i].score}`;
            scoresEl.append(createLi);
        }    
    });
    //Adding event listener to Clear score button 
    clearScoresEl.addEventListener("click",function clearScores(){
        scoresEl.innerHTML = "";
        localStorage.removeItem("highscores");//removing data from the local storage
    });
    //Adding event listener to goback button 
    goBackEl.addEventListener("click",function goBack(){
        reset();
        highScoresEl.style.display="none";
        headerEl.style.display="block";
        timerEl.parentElement.style.display="block";
    });


















  