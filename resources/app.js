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

const highNoteArray = ['pitch1', 'pitch2', 'same']
const intervalsArray = ['1st','2nd','3rd','4th','5th','6th','7th','8th']



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

  let pitch1Index;
  let pitch2Index;

  let pitch1Audio;
  let pitch2Audio;

  let chart1;
  let chart2;
  let chart3;

  initialize()

  function switchGame(game) {
    if (game === 'intervals') {
      $('.instructions').html('Ear Training is the ability to understand how one pitch or note relates to another, and how multiple pitches combine to form chords. With some practice, you will be able to recognize how these notes and chords relate to eachother in all music you listen to! <h2>Intervals</h2> Intervals takes High Note a step further.  Interval training involves determining the distance from one note to another. <a target="_blank" href="https://en.wikipedia.org/wiki/Interval_(music)#targetText=In%20music%20theory%2C%20an%20interval,such%20as%20in%20a%20chord.">Click here for a detailed description</a>.<br><br> Listen to both pitches and choose the correct interval. Make sure your sound is on low and have fun!')

      $('#final-instructions').html('Adjust volume to low. Listen to both pitches. Select the correct interval.')

      $('.radio-container').html('<div><label for="1st"><input type="radio" id="1st" name="pitch" value="1st" required> Unison (same pitch)</label></div><div><label for="2nd"><input type="radio" name="pitch" id="2nd" value="2nd" required> 2nd</label></div><div><label for="3rd"><input type="radio" name="pitch" id="3rd" value="3rd" required> 3rd</label></div><div><label for="4th"><input type="radio" name="pitch" id="4th" value="4th" required> 4th</label></div><div><label for="5th"><input type="radio" name="pitch" id="5th" value="5th" required> 5th</label></div><div><label for="6th"><input type="radio" name="pitch" id="6th" value="6th" required> 6th</label></div><div><label for="7th"><input type="radio" name="pitch" id="7th" value="7th" required> 7th</label></div><div><label for="8th"><input type="radio" name="pitch" id="8th" value="8th" required> Octave (8th)</label></div>')



return;
    }
    if (game === 'high-note') {
      $('.instructions').html('Ear Training is the ability to understand how one pitch or note relates to another, and how multiple pitches combine to form chords. With some practice, you will be able to recognize how these notes and chords relate to eachother in all music you listen to! <h2>High Note</h2> One basic way to do this is to compare 2 pitches, and discern which pitch has a higher frequency than the other, or if they are in fact the same pitch. (Also called "unison")<br><br>Listen to both pitches and determine which is higher. Make sure your sound is on low and have fun!')

      $('#final-instructions').html('Adjust volume to low. Listen to both pitches. Which pitch is higher?')

      $('.radio-container').html('<div><label for="pitch1"><input type="radio" name="pitch" id="pitch1" value="pitch1" required> Pitch 1</label></div><div><label for="pitch2"><input type="radio" name="pitch" id="pitch2" value="pitch2" required> Pitch 2</label></div><div><label for="same"><input type="radio" name="pitch" id="same" value="same" required> Pitches are the same.</label></div>')
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

  // $('#analysis').click(function() {
  //   updateChart();

  //   $('#chart1-container').slideToggle('fast')
  //   $('#chart2-container').slideToggle('fast')
  // });


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
    let user = $('#username').val();
    let userData = JSON.parse(localStorage.getItem(user))
    e.preventDefault();
    let guess = $('input[name=pitch]:checked', '#question')
    let correctAnswer = getCorrectAnswer();
    let guessLabel = $('input[name=pitch]:checked', '#question').parent();
    let correctLabel = $('#' + correctAnswer).parent()

    if (guess.val() === correctAnswer) {
      guessLabel.css('background-color','#50c878')
      setTimeout(function(){
        alert('Congratulations! That is correct.')
        guessLabel.css('background','none')
      },0)

      userData.score[0]++;
      userData.currentStreak++;


      if (userData.currentStreak > userData.longestStreak) {
        userData.longestStreak = userData.currentStreak;
      }

    } else {
      correctLabel.css('background-color', '#50c878')
      guessLabel.css('background-color', '#ff9999')
      setTimeout(function() {
        alert('Sorry. That is incorrect. The correct answer is: ' + correctLabel.text())
        guessLabel.css('background','none');
        correctLabel.css('background', 'none');
      },0)

      userData.gameType[game][correctAnswer]++;
      userData.currentStreak = 0;
    }
    userData.score[1]++;
    userData.gameType[game].total++;
    localStorage.setItem(user, JSON.stringify(userData));
    updateScore(user);
    updateStats(user);
    initialize();
    return;
  })

  $('#reset-stats').click(function(){
    let user = $('#username').val()
    if (!confirm('Are you sure you want to reset all stats?')) {
      return;
    }
    initialStats(user);
    updateStats(user);
    updateScore(user)
    return;
  })

  $('#logout').click(function() {
    $('.splash-screen').css('display', 'flex');
    updateDate()
    $('#username').val('');
    unloadChart()
    initialize();
  })

  //functions

  function get(user) {
    if (!localStorage.getItem(user)) {
      initialStats(user)
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

function updateChart() {
  let userData = JSON.parse(localStorage.getItem($('#username').val()))
  let highNoteData = 0;
  let intervalsData = 0;
  for (let key in userData.gameType['high-note']) {
    if (key !== 'total') {
      highNoteData += userData.gameType['high-note'][key];
    }
  }
  for (let key in userData.gameType['intervals']) {
    if (key !== 'total') {
      intervalsData += userData.gameType['intervals'][key];
    }
  }
if (!chart1) {
  chart1 = c3.generate({
    bindto: '#chart1',
    size: {
      height: 240,
      width: 240
    },
    data: {
        columns: [
            ['correct', userData.score[0]],
            ['incorrect', userData.score[1] - userData.score[0]],
        ],
        type : 'pie',
        colors: {
          'correct': '#50c878',
          'incorrect': '#ff9999'
        }
    }
});

} else {
  chart1.load({
    columns: [
      ['correct', userData.score[0]],
      ['incorrect', userData.score[1] - userData.score[0]]
    ]
  })
}
if (!chart2) {
  chart2 = c3.generate({
    bindto: '#chart2',
    size: {
      height: 240,
      width: 240
    },
    data: {
        columns: [
            ['correct', userData.gameType['high-note'].total - highNoteData],
            ['incorrect', highNoteData]
        ],
        type : 'pie',
        colors: {
          'correct': '#50c878',
          'incorrect': '#ff9999'
        }
    }
});

} else {
  chart2.load({
    columns: [
      ['correct', userData.gameType['high-note'].total - highNoteData],
      ['incorrect', highNoteData]
    ]
  })
}
if (!chart3) {
  chart3 = c3.generate({
    bindto: '#chart3',
    size: {
      height: 240,
      width: 240
    },
    data: {
        columns: [
            ['correct', userData.gameType['intervals'].total - intervalsData],
            ['incorrect', intervalsData]
        ],
        type : 'pie',
        colors: {
          'correct': '#50c878',
          'incorrect': '#ff9999'
        }
    }
});

} else {
  chart3.load({
    columns: [
      ['correct', userData.gameType['intervals'].total - intervalsData],
      ['incorrect', intervalsData]
    ]
  })
}
}

function unloadChart() {
  chart1.unload({
    ids: 'correct'
});
chart1.unload({
  ids: 'incorrect'
})
}


//update date
function updateDate() {
  let userData = JSON.parse(localStorage.getItem($('#username').val()));
  userData.lastLogin = Date.now();
  localStorage.setItem($('#username').val(), JSON.stringify(userData));
}

  //update user stats
  function updateStats(user) {
    let date = Date.parse(Date.now())
    let userData = JSON.parse(localStorage.getItem(user))
    $('#name').text(user)
    $('#login').text(new Date(userData.lastLogin).toDateString())
    $('#current-streak').text(userData.currentStreak)
    $('#longest-streak').text(userData.longestStreak)
    $('#level').text(userData.level)
    $('#accuracy').text(Number(userData.score[1]) * 100 === 0 ? 'N / A' : Math.floor(Number(userData.score[0]) / Number(userData.score[1]) * 100) + "%")
    $('#stats-score').text(`${userData.score[0]} / ${userData.score[1]}`)
    updateChart()
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

  function initialStats(user) {
    localStorage.setItem(user, JSON.stringify({ score: [0, 0], currentStreak: 0, lastLogin: Date.now(), longestStreak: 0, level: 'beginner', gameType: {'high-note': {'pitch1': 0, 'pitch2': 0, 'same': 0, 'total': 0}, 'intervals': {'1st': 0, '2nd': 0, '3rd': 0, '4th': 0, '5th': 0, '6th': 0, '7th': 0, '8th': 0, 'total': 0}} }))
  }
  function updateScore(user) {
    let userData = JSON.parse(localStorage.getItem(user));
    if (userData) {
      $('#score').html(`Score: ${userData.score[0]} / ${userData.score[1]}`)
    }
  }

  function checkAnswer(guess) {
    if (game === 'high-note') {
      if (guess === 'pitch1') {
        return pitch1Index > pitch2Index;
      }
      if (guess === 'pitch2') {
        return pitch2Index > pitch1Index;
      }
      if (guess === 'same') {
        return pitch1Index === pitch2Index;
      }
    }
    if (game === 'intervals') {
      let interval = Math.abs(pitch1Index - pitch2Index);
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

    function getCorrectAnswer() {
      if (game === 'high-note') {
        for (let i = 0; i < highNoteArray.length; i++) {
          if (checkAnswer(highNoteArray[i])) {
            return highNoteArray[i];
          }
        }
      }
      if (game === 'intervals') {
        for (let i = 0; i < intervalsArray.length; i++) {
          if (checkAnswer(intervalsArray[i])) {
            return intervalsArray[i];
          }
        }
      }
    }


  function initialize() {
    document.getElementById('question').reset()
    pitch1 = sounds[Math.floor(Math.random() * sounds.length)];
    pitch2 = sounds[Math.floor(Math.random() * sounds.length)];

     pitch1Index = sounds.indexOf(pitch1);
     pitch2Index = sounds.indexOf(pitch2);

    pitch1Audio = document.createElement('audio');
    pitch1Audio.setAttribute('src', pitch1[1]);
    pitch2Audio = document.createElement('audio')
    pitch2Audio.setAttribute('src', pitch2[1]);
  }
})
