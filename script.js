const songs = [
    {
      title: "Heavy Is The Crown",
      artist: "Linkin Park",
      src: "songs/heavy is the crown.mp3",
      cover: "img/heavy-is-the-crown.jpg",
    },
    {
      title: "IGYEIH",
      artist: "Linkin Park",
      src: "songs/IGYEIH.mp3",
      cover: "img/linkin-park-default.jpg",
    },
    {
      title: "The Emptiness Machine",
      artist: "Linkin Park",
      src: "songs/The Emptiness Machine.mp3",
      cover: "img/linkin-park-default.jpg",
    },
  ];
  

let currentSongIndex = 0;
const audio = new Audio();
const playButton = document.getElementById('play');
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const coverImage = document.getElementById('cover');
const songsList = document.getElementById('songs-list');

function loadSong(songIndex) {
  const song = songs[songIndex];
  audio.src = song.src;
  coverImage.src = song.cover;
  updatePlaylistHighlight();
}

function playSong() {
  audio.play();
  playButton.textContent = '❚❚';
}

function pauseSong() {
  audio.pause();
  playButton.textContent = '▷';
}

function togglePlayPause() {
  if (audio.paused) {
    playSong();
  } else {
    pauseSong();
  }
}

function playNext() {
  currentSongIndex = (currentSongIndex + 1) % songs.length;
  loadSong(currentSongIndex);
  playSong();
}

function playPrevious() {
  currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
  loadSong(currentSongIndex);
  playSong();
}

function updateProgress() {
  const currentTime = audio.currentTime;
  const duration = audio.duration;
  progress.value = (currentTime / duration) * 100;
  currentTimeEl.textContent = formatTime(currentTime);
  durationEl.textContent = formatTime(duration || 0);
}

function setProgress(e) {
  const duration = audio.duration;
  const newTime = (e.target.value / 100) * duration;
  audio.currentTime = newTime;
}

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60).toString().padStart(2, '0');
  return `${minutes}:${remainingSeconds}`;
}

function updatePlaylistHighlight() {
  const items = songsList.querySelectorAll('li');
  items.forEach((item, index) => {
    item.style.fontWeight = index === currentSongIndex ? 'bold' : 'normal';
  });
}

function createPlaylist() {
  songs.forEach((song, index) => {
    const li = document.createElement('li');
    li.textContent = `${song.title} - ${song.artist}`;
    li.addEventListener('click', () => {
      currentSongIndex = index;
      loadSong(currentSongIndex);
      playSong();
    });
    songsList.appendChild(li);
  });
}

playButton.addEventListener('click', togglePlayPause);
nextButton.addEventListener('click', playNext);
prevButton.addEventListener('click', playPrevious);
audio.addEventListener('timeupdate', updateProgress);
progress.addEventListener('input', setProgress);
audio.addEventListener('ended', playNext);

createPlaylist();
loadSong(currentSongIndex);
