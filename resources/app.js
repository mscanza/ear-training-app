$(document).ready(function() {

const sounds = [
  ['a', 'sounds a url'],
  ['b', 'sounds a url'],
  ['c', 'sounds a url'],
  ['d', 'sounds a url'],
  ['e', 'sounds a url'],
  ['f', 'sounds a url'],
  ['g', 'sounds a url']
]
let pitch1;
let pitch2;
  console.log('jquery works!')

$('#logout').click(function() {
  $('.splash-screen').css('display','flex');
  initialize();
})


  $('#toggle-instructions').click(function() {
    $('.instructions').slideToggle('fast')
  })

  function get(user) {
    if (!localStorage.getItem(user)) {
        localStorage.setItem(user, JSON.stringify({score: [0,0]}))
        $('.welcome').html(`Welcome, ${user}!`)
    } else {
      localStorage.getItem(user)
      $('.welcome').html(`Welcome back, ${user}!`)
    }
    $('.splash-screen').css('display','none');
    updateScore(user)
    $('#username').val('')
    return;
  }

  function remove(user) {
    localStorage.removeItem(user);
    $('.welcome').html('')
    updateScore(user)
    return;
  }

  function removeAll() {
    localStorage.clear()
    $('.welcome').html('')
    return;
  }

function updateScore(user) {
  let userData = JSON.parse(localStorage.getItem(user));
  if (userData) {
    $('#score').html(`Score: ${userData.score[0]} / ${userData.score[1]}`)
  }
}

function checkAnswer(guess) {
  if (guess === 'pitch1') {
    return sounds.indexOf(pitch1) > sounds.indexOf(pitch2);
  }
  if (guess === 'pitch2') {
    return sounds.indexOf(pitch2) > sounds.indexOf(pitch1);
  }
  if (guess === 'same') {
    return sounds.indexOf(pitch1) === sounds.indexOf(pitch2);
  }
}

function initialize() {
  document.getElementById('question').reset()
  pitch1 = sounds[Math.floor(Math.random() * sounds.length)];
  pitch2 = sounds[Math.floor(Math.random() * sounds.length)];
}

  $('#submitUser').click(function() {
    if ($('#username').val() === '') {
      alert('Please enter a username')
      return;
    }
    get($('#username').val())
  })

$('#deleteUser').click(function() {
  if (!localStorage.getItem($('#username').val())) {
    alert('User does not exist')
  } else {
    remove($('#username').val())
    alert($('#username').val() + ' successfully deleted')
    $('#username').val('')
  }
  return;
})

$('#deleteAll').click(function(){
  removeAll()
  $('#username').val('')
  return;
});

$('#question').submit(function(e) {
  e.preventDefault();
  let guess = $('input[name=pitch]:checked', '#question').val()
  if (checkAnswer(guess) === true) {
    alert('Congratulations! That is correct.')
  } else {
      alert('Sorry. That is incorrect.')
  }
  initialize();
  return;
})


})



/*
Use local storage to add a user and keep tracker of their progress
If user is new, output  "Welcome, user!" else, "Welcome back, user!"

Have a closeable directions div.


have a game div which has 2 pitches which can be played.
have a radio syle form which has user options to input the answer.
a next button will check the current answer, and move on to the next.
There will be a reset button which can start to game from scratch, otherwise the score will keep track of how many questions the user has attempted.

data:
User:
will add a key to local storage for each new user.
if user already exists in database, welcome back user.
delete user - removes user from local storage.
reset progress, clears score to [0,0]
each key will hold an object that will hold information, starting with score:
score[0] = correct answers
score[1] = questions attempted.
{
  'michael': {score: [0,0]},
  'joe': {score: [1,2]}
}

sounds will be stored in an array of arrays, along with their urls or audio files, sorted from lowest to highest:
MVP - will start with only 1 octave, but can increase as needed.

const sounds = [['A','audio file url'],['B','audio file url'],['C','audio file url'],['D','audio file url'],['E','audio file url'],['F','audio file url'],['G','audio file url']]

questions will randomly select 2 indeces from this array, ie:

sound1 : sounds[1] => ['B','audio file url']
sound2:  sounds[3] => ['D','audio file url']

determine which index is lower, ie 'B' is a lower note than 'D', (in this example), and the index (1) is lower than index (3)

Radio buttons for answers will include:

Pitch 1 is higher     => sounds.indexOf(sound1) > sounds.indexOf(sound2);
Pitch2 is higher      => sounds.indexOf(sound2) > sounds.indexOf(sound1)
Pitches are the same  => sounds.indexOf(sound1) === sounds.indexOf(sound2)

If answer returns true, answer is correct. Is false, answer is incorrect.
Score gets updated.

Exmaple:
user 'michael' get first question wrong.
{'michael': {score: [0,1]}}
user 'michael' get second question right.
{'michael': {score: [1,2]}}
*/
