let score = JSON.parse(localStorage.getItem('score')) || {
  wins: 0, 
  loses: 0,
  ties: 0
  };
  
updatescore();

let isAutoPlaying = false;
let intervalId;

function autoPlay() {
  if (!isAutoPlaying) {
    intervalId = setInterval(() =>  {
      const playerMove = pickCom();
      playGame(playerMove);
    }, 1000)
    isAutoPlaying = true;
  } else {
    clearInterval(intervalId);
    isAutoPlaying = false;
  }
}

document.querySelector('.js-rock-button').addEventListener('click', () => {
  playGame('rock');
});

document.querySelector('.js-paper-button').addEventListener('click', () => {
  playGame('paper');
});

document.querySelector('.js-scissors-button').addEventListener('click', () => {
  playGame('scissors');
});

document.querySelector('.js-auto').addEventListener('click', () => {
  autoPlay();
  autoText();
  
});

function autoText() {
  const autobtn = document.querySelector('.js-auto');
  if (autobtn.innerText === 'Auto Play') {
    autobtn.innerHTML = 'Stop Playing';
  } else {
    autobtn.innerHTML = 'Auto Play';
  }
}

//para ni sa keyboard 
document.body.addEventListener('keydown', (event) => {
  if (event.key === 'r') {
    playGame('rock');
  } else if (event.key === 'p') {
    playGame('paper');
  } else if (event.key === 's') {
    playGame('scissors');
  } else if (event.key === 'Backspace') {
    resetChoices();
  }
});

document.querySelector('.resetbtn').addEventListener('click', () =>  {
  resetChoices();
  /*
  score.wins = 0;
  score.loses = 0;
  score.ties = 0;
  localStorage.removeItem('score');
  updatescore();
  */
})


function playGame(playerMove) {
  const compMove = pickCom();
  
  let result = '';
  
  if (playerMove === 'scissors') {
    if (compMove === 'rock') {
      result = 'You lose.';
    } else if (compMove === 'paper') {
      result = 'You win.';
    } else if (compMove === 'scissors') {
      result = 'Tie.';
    }
  } else if (playerMove === 'paper') {
    if (compMove === 'rock') {
      result = 'You win.';
    } else if (compMove === 'paper') {
      result = 'Tie.';
    } else if (compMove === 'scissors') {
      result = 'You lose.';
    }
  } else if (playerMove === 'rock') {
    if (compMove === 'rock') {
      result = 'Tie.';
    } else if (compMove === 'paper') {
      result = 'You lose.';
    } else if (compMove === 'scissors') {
      result = 'You win.';
    }
  }
  
  if (result === 'You win.') {
    score.wins += 1;
  } else if (result === 'You lose.') {
    score.loses += 1;
  } else if (result === 'Tie.') {
    score.ties += 1;
  }
  
  localStorage.setItem('score', JSON.stringify(score))
  
  updatescore();
  document.querySelector('.js-result')
  .innerHTML = result;
  document.querySelector('.js-moves').innerHTML = `You 
  <img src="JavaScript/${playerMove}-emoji.png" class="mob">
  <img src="JavaScript/${compMove}-emoji.png" class="mob"> Computer`
  
  /*
  alert(`You picked ${playerMove}. Computer picked ${compMove}. ${result}
Wins: ${score.wins} Loses: ${score.loses} Ties: ${score.ties}`);
  */
}


function updatescore() {
  document.querySelector('.js-upScore')
  .innerHTML = `Wins: ${score.wins} Loses: ${score.loses} Ties: ${score.ties}`;
}



function pickCom() {
  const randomNum = Math.random();
  
  let compMove = '';
  
  if (randomNum >= 0 && randomNum < 1 / 3) {
    compMove = 'rock';
  } else if (randomNum >= 1 / 3 && randomNum < 2 / 3) {
    compMove = 'paper';
  } else if (randomNum >= 2 / 3 && randomNum < 1) {
    compMove = 'scissors'
  }
  return compMove;
}


function resetChoices() {
  document.querySelector('.resetChoice').innerHTML = `
    Are you sure you want to reset the score? 
    <button onclick="
      score.wins = 0;
      score.loses = 0;
      score.ties = 0;
      localStorage.removeItem('score');
      updatescore();
      choiceHide();
    " class="yesBtn">Yes</button>
    <button onclick="
      choiceHide();
    " class="noBtn">No</button>
  `;
  
}
function choiceHide() {
  const resetp = document.querySelector('.resetChoice');
    resetp.innerHTML = '';
  }