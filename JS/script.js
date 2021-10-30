const playerContainer = document.getElementById('player-container')
const playBtn = document.getElementById('play')
const prevBtn = document.getElementById('prev')
const nextBtn = document.getElementById('next')
const audio = document.getElementById('audio')
const progress = document.getElementById('progress')
const progressContainer = document.getElementById('progress-container')

const infoSong = document.getElementById('info-song')

const currTime = document.querySelector('#currTime');
const durTime = document.querySelector('#durTime');
// const currTime = window.window.getComputedStyle(
// 	progressContainer, ':before')
//     console.log(progressContainer)
const indTime = document.getElementById('progress-ind')

// Album titles
const songs = [
    '01. BLOOD.',
    '02. DNA.',
    '03. YAH.',
    '04. ELEMENT.',
    '05. FEEL.',
    '06. LOYALTY. (FEAT. RIHANNA.)',
    '07. PRIDE.',
    '08. HUMBLE.',
    '09. LUST.',
    '10. LOVE. (FEAT. ZACARI.)',
    '11. XXX. (FEAT. U2.)',
    '12. FEAR.',
    '13. GOD.',
    '14. DUCKWORTH'

];

// Keep track of song
let songIndex = 0;

// Initially load song details into DOM
loadSong(songs[songIndex]);

// Update song details
function loadSong(song) {
  infoSong.innerText = song;
  audio.src = `music/${song}.mp3`
//   cover.src = `images/${song}.jpg`;
}

// Play song
function playSong() {
  playerContainer.classList.add('play')
  playBtn.querySelector('i.fas').classList.remove('fa-play')
  playBtn.querySelector('i.fas').classList.add('fa-pause')

  audio.play();
}

// Pause song
function pauseSong() {
  playerContainer.classList.remove('play');
  playBtn.querySelector('i.fas').classList.add('fa-play');
  playBtn.querySelector('i.fas').classList.remove('fa-pause');

  audio.pause();
}

// Previous song
function prevSong() {
  songIndex--;

  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }

  loadSong(songs[songIndex]);

  playSong();
}

// Next song
function nextSong() {
  songIndex++;

  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }

  loadSong(songs[songIndex]);

  playSong();
}

// Update progress bar
function updateProgress(e) {
  const { duration, currentTime } = e.srcElement;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;
  indTime.style.left = `${progressPercent}%`;
}

// Set progress bar
function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;

  audio.currentTime = (clickX / width) * duration;
  
}


// Event listeners
playBtn.addEventListener('click', () => {
  const isPlaying = playerContainer.classList.contains('play');

  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});

// Change song
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);

// Time/song update
audio.addEventListener('timeupdate', updateProgress);

// Click on progress bar
progressContainer.addEventListener('click', setProgress);

// Song ends
audio.addEventListener('ended', nextSong);

// Time of song
audio.addEventListener('timeupdate', durTime);