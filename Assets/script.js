var scores = 0;        
var timer = 45         
var interval;
var index = 0;
var saveHighScore = [];
var saveHighScoreObj;
var containerBtn = document.querySelector(".textAction");
var container = document.querySelector(".container");
var textQuestion = document.querySelector(".textCenter")
var answer = document.querySelector(".answer");
var remainTime = document.querySelector(".timer");
var linkScore = document.querySelector(".a-score");

var firstColor = "#252eda";
var textCnt = "left";
var secondColor = "#ffffff";
var thirdColor = "#8f7f7f"


initialContent();

//questions
//1
var questions = [{
  q : "which of the following are JavaScript Data Types?",
  a : "Number",
  b : "Boolean",
  c : "Both A and B",
  answer : "C"
},
//2
{
    q : "String values must be enclosed within ___________ when being assigned to variables",
    a : "Coma",
    b : "Curly Brackets",
    c : "Parenthesis",
    answer: "B"
},
//3
{
    q : "Commonly used data type Do NOT include: ",
    a : "Strings",
    b : "Booleans",
    c: "alerts",
    aswer: "B"
},
//4
{
    q : "What does event.preventDefault() do?",
    a : "It stops the browser from reloading the form submission event to occur",
    b : "It stops the browser from allowing the page upon a form submission",
    c : "All of them",
    answer: "A"
},
//5
{
    q : "What does the code 'console.log' perform ?",
    a : "Outputs a message to the web console.",
    b : "Outputs a message to webpage.",
    c : "Outputs a message in a window popup.",
    answer : "A"
},
//6
{
    q : "which one is a Boolean?",
    a : "True",
    b : "both A and C",
    c : "False",
    answer : "C"
},
//7
{
    q : "The condition in an if / else statement is enclosed with _____________",
    a : "Curly Brackets",
    b : "Quotes",
    c : "Square Brackets",
    answer: "A"
},
//8
{
    q : "True or False: DOM is built into a Javascript language",
    a : "True",
    b : "False",
    C : "None of Above",
    answer: "A"
}
];

// Functions 

function creatButton (id, txt){
    var button = document.createElement("button");
    button.setAttribute("id", id);
    button.textContent =txt;
    button.style.background = firstColor;
    button.style.color = secondColor;
    button.style.borderRadius = "10px"
    containerBtn.appendChild(button);
}


function initialContent()
{
   creatButton("start", "Start Quiz");
   highOption = 0;

}

var checkingTimer = function(){
    var eval = false;
    if(timer <= 0){
        timer = 0;
        eval = true
    }
    return eval;
};

var checkAnswer = function(str, x){

    if(x < questions.length)
    {
        var showAnswer = "";

        if (str === questions[x].answer){
            if(!checkingTimer()){
                showAnswer = "Correct!"; 
                scores+=10;
            }
        }
        else{
                if(!checkingTimer()){
                    timer-=10;          
                }       
                showAnswer = "Wrong!";
                
        }


        var elementNode = document.querySelector("#question-id");
        deleteChildNode(elementNode);
    
        index = showQuestion(index);
        answer.textContent = showAnswer;
    }
    else{

        var elementNode = document.querySelector("#question-id");
        deleteChildNode(elementNode);        
        answer.textContent = "";

        showInitialsScore();
    }
    
};

var showQuestion = function(x) {
   
   if(x < questions.length)
   {
       textQuestion.textContent = questions[x].q;

        var listUnOrdered = document.createElement("ul");
        listUnOrdered.setAttribute("id", "question-id");
        var op1 = document.createElement("li");
        var op2 = document.createElement("li");
        var op3 = document.createElement("li");

        listUnOrdered.style.color = secondColor;
        listUnOrdered.style.justifyContent = "space-between";
        listUnOrdered.style.listStyle = "none";
        op1.style.background =  firstColor;
        op1.style.justifyContent = textCnt;
        op1.style.borderRadius = "10px";
        op2.style.background =  firstColor;
        op2.style.justifyContent = textCnt;
        op2.style.borderRadius = "10px";
        op3.style.background =  firstColor;
        op3.style.justifyContent = textCnt;
        op3.style.borderRadius = "10px";

        
        op1.innerHTML = "<a href='#' onclick=checkAnswer('A'," + x + 
        ") style = 'text-decoration: none; color: #ffffff; '><div style = 'text-align: left;'>1. " 
        + questions[x].a + "</div></a>";

        op2.innerHTML = "<a href='#' onclick=checkAnswer('B'," + x + 
        ") style = 'text-decoration: none; color: #ffffff; '><div style = 'text-align: left;'>2. " 
        + questions[x].b + "</div></a>";

        op3.innerHTML = "<a href='#' onclick=checkAnswer('C'," + x + 
        ") style = 'text-decoration: none; color: #ffffff; '><div style = 'text-align: left;'>3. " 
        + questions[x].c + "</div></a>";
        
        listUnOrdered.appendChild(op1);
        listUnOrdered.appendChild(op2);
        listUnOrdered.appendChild(op3);
        container.appendChild(listUnOrdered);

        var button = document.querySelector("#start");
        deleteChildNode(button);
        deleteChildNode(document.querySelector("#go-back"));
        deleteChildNode(document.querySelector("#clear"));

        x++;
   }
   else{

       showInitialsScore();
   }
    return x;
};

var deleteChildNode = function(elementNode){

    if(elementNode){
        elementNode.parentNode.removeChild(elementNode);
    }
};

var displayErrorMessage = function(msg){
    alert(msg);  
};

var gettingArrayLocalStore = function(){
    var user = [];
    user = JSON.parse(localStorage.getItem("userScore"));
    return user;
};

var clearLocalStore = function(){
    localStorage.clear();
};

var retrieveHighScore = function(){

    saveHighScore = gettingArrayLocalStore();
    timer = 0;

    textQuestion.textContent = "High Scores";
    remainTime.textContent ="";
    linkScore.textContent = "";
    answer.textContent ="";

        if(!highOption){
            container.textContent = "";
            deleteChildNode(document.querySelector("#start"));
        }
        else{

            deleteChildNode(document.querySelector(".p-store"));
            deleteChildNode(document.querySelector(".form-store"));
            deleteChildNode(document.querySelector("#score-id"));
        }
    
    if(saveHighScore != null)
    {   

        console.log(saveHighScore.length);
        var listUnOrdered = document.createElement("ul");
        listUnOrdered.style.background = secondColor;
        listUnOrdered.style,justifyContent = "space-between";
        listUnOrdered.style.listStyle = "none";

        for(var i=0; i< saveHighScore.length; i++){
            var li = document.createElement("li");
            li.innerHTML = "<div style = 'text-align: left;'>" + (i+1) + ". " + 
                            JSON.stringify(saveHighScore[i].user) + " - " + JSON.stringify(saveHighScore[i].score) + 
                            "</div>";
            li.style.textAlign = textCnt;
            li.style.background = thirdColor;
            li.style.borderBottom = "10px";
            listUnOrdered.appendChild(li);
        }

        container.appendChild(listUnOrdered);

    }
    creatButton("go-back", "Go Back"); 
    creatButton("clear", "Clear High Scores");
    var btn1 = document.querySelector("#go-back");
    var btn2 = document.querySelector("#clear");
    btn1.addEventListener("click", function() {
        location.reload();
    });
    btn2.addEventListener("click", function() {
        clearLocalStore();
    });

    deleteChildNode(document.querySelector("#question-id"));
};

var saveScore = function(){

    event.preventDefault();

    var input = document.querySelector("#initials").value;

    if (input === "") {
        displayErrorMessage("You must bring your Initials for your Score");
    } else {
        displayErrorMessage( "Registered Your Score Successful");

        saveHighScore = gettingArrayLocalStore();

        if(saveHighScore == null)
        {
            saveHighScore = [];
        }

        saveHighScoreObj ={
                user: input,
                score: scores
            };

        saveHighScore.push(saveHighScoreObj);

        localStorage.setItem("userScore",JSON.stringify(saveHighScore));
        retrieveHighScore();
    }
};

var showInitialsScore = function () {

    textQuestion.textContent = "All done!";
    remainTime.textContent = "Time left :"+ timer;
    answer.textContent = "";

    var msg = document.createElement("p");
    msg.setAttribute("id", "score-id");

    msg.textContent = "Your final Score is: " + scores + " out of "+ (questions.length * 10);

    var span = document.createElement("span");
    span.setAttribute("id", "form-id");
    span.style.display = "flex";
    span.style.flexWrap = "wrap";
    span.style.justifyContent = "center";
    span.style.flex = "flex-wrap";
    span.innerHTML = "<p class='p-store' style ='text-align:left'> Enter Initials: </p>" +
                        "<form class='form-store' style='padding:12px'><input type='text' name='initials placeholder='Enter initials' id='initials'/>"+
                        "<button id='save' type='submit' onclick='saveScore()' style = 'background:" + firstColor + 
                        "; color:" + secondColor +"; border-radius:10px'>Submit</button></form>";
                                            
    container.appendChild(msg);
    container.appendChild(span);
};
var clockTime = function () {
    
    if(checkingTimer()){
        clearInterval(interval);

        var elementNode = document.querySelector("#question-id");
        if(elementNode != null && answer != null){
            deleteChildNode(elementNode);
            answer.textContent ="";

        showInitialsScore();
        }
    }else{
            if(index < questions.length){

                timer--;
                remainTime.textContent = "Time left :"+ timer;
            }
    }
};

var startHandler = function(){
    container.textContent = "";
    highOption = 1; 
    
    interval = setInterval(clockTime,1000);

    index = showQuestion(index);
    
};

var button = document.querySelector("#start");
button.addEventListener("click", startHandler);
linkScore.addEventListener("click", retrieveHighScore);