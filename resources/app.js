$(document).ready(function() {


  //sound database
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


  //click handlers

  $('#logout').click(function() {
    $('.splash-screen').css('display', 'flex');
    initialize();
  })


  $('#toggle-instructions').click(function() {
    $('.instructions').slideToggle('fast')
  })

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

  $('#deleteAll').click(function() {
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


  //functions

  function get(user) {
    if (!localStorage.getItem(user)) {
      localStorage.setItem(user, JSON.stringify({ score: [0, 0] }))
      $('.welcome').html(`Welcome, ${user}!`)
    } else {
      localStorage.getItem(user)
      $('.welcome').html(`Welcome back, ${user}!`)
    }
    $('.splash-screen').css('display', 'none');
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


})
