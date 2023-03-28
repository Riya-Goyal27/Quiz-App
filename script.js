const ques = document.querySelector('.ques');
const opt1 = document.querySelector('#opt1');
const opt2 = document.querySelector('#opt2');
const opt3 = document.querySelector('#opt3');
const opt4 = document.querySelector('#opt4');
const next = document.querySelector('.btn');
const input = document.querySelectorAll('input');
const stopwatch = document.querySelector('.time');
const container = document.querySelector('.quiz');
const number = document.querySelector('#number');
const scoreelement = document.querySelector('.score');
let quiz = [];
let question_number=0, score=0, time = 30;

//function to shuffle aray so that options can be shuffled
function shuffleArray(array) {
    return array.sort( ()=>Math.random()-0.5 );
}
const arr = [0, 1, 2, 3];

//update new question 
function loadques(){
    shuffleArray(arr);
    ques.innerHTML = quiz[question_number].question;
    opt1.innerHTML = quiz[question_number].options[arr[0]];
    opt2.innerHTML = quiz[question_number].options[arr[1]];
    opt3.innerHTML = quiz[question_number].options[arr[2]];
    opt4.innerHTML = quiz[question_number].options[arr[3]];
    
}


function nextques(){
    for(let i=0;i<input.length;i++){
        if(input[i].checked){
            if(input[i].nextElementSibling.innerHTML == quiz[question_number].correct){
                score++;
            }
            input[i].checked=false;
        }
    }
    //updating score
    scoreelement.innerHTML = score;
    //incrementing question number 
    question_number++;
    //question number(it will be 1 more than index)
    number.innerHTML = question_number+1;
    //calling load function when there are more questions to display 
    if(question_number<quiz.length){
    loadques();
    time=30;
    }
    else{//else displaying results
        container.innerHTML=`<h1 style='margin:3rem'>Thanks for giving the quiz!!!</h1><h2 style='margin-bottom:3rem'>You got ${score}/10 correct answers.`;
        container.style.textAlign = 'center';
        next.innerHTML = 'RELOAD';
        next.addEventListener('click', () => {
            location.reload();
        });
        time=0;
    }
}

//fetching api
fetch('https://opentdb.com/api.php?amount=10&category=27&difficulty=easy&type=multiple')
.then((response)=>response.json())
.then((data) => {
    //creating quiz array
    for(let i=0;i<data.results.length;i++){
        console.log(data.results[i].correct_answer);
        quiz.push({
            question: data.results[i].question,
            correct: data.results[i].correct_answer,
            options: [data.results[i].correct_answer, ...data.results[i].incorrect_answers]
        });
    }
    //first call
    loadques();
    
    //event on clicking next button
    next.addEventListener('click', () => {
        nextques();
    });
});

//stopwatch functionality
setInterval(() => {
    time--;
    if(time<0){
        nextques();
    }
    if(time<10)
    stopwatch.innerHTML = '00:0'+time;
    else
    stopwatch.innerHTML = '00:'+time;
}, 1000);
