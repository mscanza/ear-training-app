$(document).ready(function() {

var game = 'high-note'
  //sound database
  const sounds = [
    ['a4', "./resources/audio-files/a4.wav"],
    ['asharp4', "./resources/audio-files/asharp4.wav"],
    ['b4', "./resources/audio-files/b4.wav"],
    ['c5', "./resources/audio-files/c5.wav"],
    ['csharp5', "./resources/audio-files/csharp5.wav"],
    ['d5', "./resources/audio-files/d5.wav"],
    ['dsharp5', "./resources/audio-files/dsharp5.wav"],
    ['e5', "./resources/audio-files/e5.wav"],
    ['f5', "./resources/audio-files/f5.wav"],
    ['fsharp5', "./resources/audio-files/fsharp5.wav"],
    ['g5', "./resources/audio-files/g5.wav"],
    ['gsharp5', "./resources/audio-files/gsharp5.wav"],
    ['a5', "./resources/audio-files/a5.wav"]
  ]

  $('#highNote-button').click(function() {
    game = 'high-note';
    switchGame(game)
    $(this).css({'background-color': 'dodgerblue', 'color': 'white'})
    $('#intervals-button').css({'background-color': 'white', 'color': 'black'})

  })

  $('#intervals-button').click(function() {
    game = 'intervals'
    switchGame(game)
    $(this).css({'background-color': 'dodgerblue', 'color': 'white'})
    $('#highNote-button').css({'background-color': 'white', 'color': 'black'})

  })
  let pitch1;
  let pitch2;

  let pitch1Audio;
  let pitch2Audio;

  initialize()

  function switchGame(game) {
    if (game === 'intervals') {
      $('.instructions').html('Ear Training is the ability to understand how one pitch or note relates to another, and how multiple pitches combine to form chords. With some practice, you will be able to recognize how these notes and chords relate to eachother in all music you listen to! <h2>Intervals</h2> Intervals takes High Note a step further.  Interval training involves determining the distance from one note to another. <a target="_blank" href="https://en.wikipedia.org/wiki/Interval_(music)#targetText=In%20music%20theory%2C%20an%20interval,such%20as%20in%20a%20chord.">Click here for a detailed description</a>.<br><br> Listen to both pitches and choose the correct interval. Make sure your sound is on low and have fun!')

      $('#final-instructions').html('Adjust volume to low. Listen to both pitches. Select the correct interval.')

      $('.radio-container').html('<div><input type="radio" name="pitch" value="1st" required><label for="1st">Unison (same pitch)</label></div><div><input type="radio" name="pitch" value="2nd" required><label for="2nd">2nd</label></div><div><input type="radio" name="pitch" value="3rd" required><label for="3rd">3rd</label></div><div><input type="radio" name="pitch" value="4th" required><label for="4th">4th</label></div><div><input type="radio" name="pitch" value="5th" required><label for="5th">5th</label></div><div><input type="radio" name="pitch" value="6th" required><label for="6th">6th</label></div><div><input type="radio" name="pitch" value="7th" required><label for="7th">7th</label></div><div><input type="radio" name="pitch" value="8th" required><label for="8th">Octave (8th)</label></div>')



return;
    }
    if (game === 'high-note') {
      $('.instructions').html('Ear Training is the ability to understand how one pitch or note relates to another, and how multiple pitches combine to form chords. With some practice, you will be able to recognize how these notes and chords relate to eachother in all music you listen to! <h2>High Note</h2> One basic way to do this is to compare 2 pitches, and discern which pitch has a higher frequency than the other, or if they are in fact the same pitch. (Also called "unison")<br><br>Listen to both pitches and determine which is higher. Make sure your sound is on low and have fun!')

      $('#final-instructions').html('Adjust volume to low. Listen to both pitches. Which pitch is higher?')

      $('.radio-container').html('<div><input type="radio" name="pitch"value="pitch1" required><label for="pitch1">Pitch 1</label></div><div><input type="radio" name="pitch"value="pitch2" required><label for="pitch2">Pitch 2</label></div><div><input type="radio" name="pitch"value="same" required><label for="same">Pitches are the same.</label></div>')
    }
  }


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

  $('#stats-toggle').click(function() {

    $('#userStats').slideToggle('fast');
  })



//login click handlers
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



//answer question
  $('#question').submit(function(e) {
    let userData = JSON.parse(localStorage.getItem($('#username').val()))
    e.preventDefault();
    let guess = $('input[name=pitch]:checked', '#question').val()
    if (checkAnswer(guess) === true) {
      alert('Congratulations! That is correct.')


      userData.score[0]++;
      userData.currentStreak++;
      if (userData.currentStreak > userData.longestStreak) {
        userData.longestStreak = userData.currentStreak;
      }

    } else {
      alert('Sorry. That is incorrect.')
      userData.currentStreak = 0;
    }
    userData.score[1]++;
    localStorage.setItem($('#username').val(), JSON.stringify(userData));
    updateScore($('#username').val());
    updateStats($('#username').val());
    initialize();
    return;
  })

  $('#reset-stats').click(function(){
    if (!confirm('Are you sure you want to reset all stats?')) {
      return;
    }
    localStorage.setItem($('#username').val(), JSON.stringify({ score: [0, 0], currentStreak: 0, lastLogin: Date.now(), longestStreak: 0, level: 'beginner' }))
    updateStats($('#username').val());
    return;
  })

  $('#logout').click(function() {
    $('.splash-screen').css('display', 'flex');
    updateDate()
    $('#username').val('');
    initialize();
  })

  //functions

  function get(user) {
    if (!localStorage.getItem(user)) {
      let date = Date.parse(Date.now())
      localStorage.setItem(user, JSON.stringify({ score: [0, 0], currentStreak: 0, lastLogin: Date.now(), longestStreak: 0, level: 'beginner' }))
      $('.welcome').html(`Welcome, ${user}!`)
    } else {
      localStorage.getItem(user)
      $('.welcome').html(`Welcome back, ${user}!`)
    }
    $('.splash-screen').css('display', 'none');
    updateScore(user)
    updateStats(user)
    return;
  }

//update date
function updateDate() {
  let userData = JSON.parse(localStorage.getItem($('#username').val()));
  userData.lastLogin = Date.now();
  localStorage.setItem($('#username').val(), JSON.stringify(userData));
}

  //update user stats
  function updateStats(user) {
    let userData = JSON.parse(localStorage.getItem(user))
    $('#name').text(user)
    $('#login').text(new Date(userData.lastLogin).toDateString())
    $('#current-streak').text(userData.currentStreak)
    $('#longest-streak').text(userData.longestStreak)
    $('#level').text(userData.level)
    $('#accuracy').text(Math.floor(Number(userData.score[0]) / Number(userData.score[1]) * 100) + "%")
    $('#stats-score').text(`${userData.score[0]} / ${userData.score[1]}`)
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

function checkInterval(guess) {

}

  function checkAnswer(guess) {
    if (game === 'high-note') {
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
    if (game === 'intervals') {
      let interval = Math.abs(sounds.indexOf(pitch1) - sounds.indexOf(pitch2));
      if (guess === '1st') {
        return interval === 0;
      }
      if (guess === '2nd') {
        return interval === 1 || interval === 2;
      }
      if (guess === '3rd') {
        return interval === 3 || interval === 4;
      }
      if (guess === '4th') {
        return interval === 5;
      }
      if (guess === '5th') {
        return interval === 6 || interval === 7;;
      }
      if (guess === '6th') {
        return interval === 8 || interval === 9;
      }
      if (guess === '7th') {
        return interval === 10 || interval === 11;
      }
      if (guess === '8th') {
        return interval === 12;
      }
    }
    }


  function initialize() {
    document.getElementById('question').reset()
    pitch1 = sounds[Math.floor(Math.random() * sounds.length)];
    pitch2 = sounds[Math.floor(Math.random() * sounds.length)];

    pitch1Audio = document.createElement('audio');
    pitch1Audio.setAttribute('src', pitch1[1]);
    pitch2Audio = document.createElement('audio')
    pitch2Audio.setAttribute('src', pitch2[1]);
  }
})
