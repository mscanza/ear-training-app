$(document).ready(function() {


  //sound database
  const sounds = [
    ['a4', "./resources/audio-files/a4.wav"],
    ['b4', "./resources/audio-files/b4.wav"],
    ['c5', "./resources/audio-files/c5.wav"],
    ['d5', "./resources/audio-files/d5.wav"],
    ['e5', "./resources/audio-files/e5.wav"],
    ['f5', "./resources/audio-files/f5.wav"],
    ['g5', "./resources/audio-files/g5.wav"]
  ]
  let pitch1;
  let pitch2;

  let pitch1Audio;
  let pitch2Audio;

  initialize()

  //click handlers
  $('#playPitch1').click(function() {
    pitch1Audio.play()
  })

  $('#playPitch2').click(function() {
    pitch2Audio.play()
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
    let parsedScore = JSON.parse(localStorage.getItem($('#username').val())).score
    e.preventDefault();
    let guess = $('input[name=pitch]:checked', '#question').val()
    if (checkAnswer(guess) === true) {
      alert('Congratulations! That is correct.')
      parsedScore[0]++;

    } else {
      alert('Sorry. That is incorrect.')
    }
    parsedScore[1]++
    localStorage.setItem($('#username').val(), JSON.stringify({ score: parsedScore }))
    updateScore($('#username').val())
    initialize();
    return;
  })

  $('#logout').click(function() {
    $('.splash-screen').css('display', 'flex');
    $('#username').val('');
    initialize();
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
    return;
  }

  function remove(user) {
    localStorage.removeItem(user);
    $('.welcome').html('')
    return;
  }

  function removeAll() {
    localStorage.clear()
    $('.welcome').html('')
    alert('All users successfully deleted.')
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

    pitch1Audio = document.createElement('audio'); pitch1Audio.setAttribute('src', pitch1[1]);
    pitch2Audio = document.createElement('audio')
    pitch2Audio.setAttribute('src', pitch2[1]);
  }
})
