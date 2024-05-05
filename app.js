const container = document.querySelector(".container");
const image = document.querySelector("#music-image");
const audio = document.querySelector("#audio");
const title = document.querySelector("#music-details .title");
const singer = document.querySelector("#music-details .singer");
const prev = document.querySelector("#controls #prev");
const play = document.querySelector("#controls #play");
const next = document.querySelector("#controls #next");
const repeatbtn = document.querySelector("#ended");

const duration = document.querySelector("#duration");
const currentTime = document.querySelector("#current-time");

const progresBar = document.querySelector("#progress-bar");

const volume = document.querySelector("#volume");
const volumeBar = document.querySelector("#volume-bar");

const ul = document.querySelector("ul");

const player = new MusicPlayer(musicList);

// title.innerHTML = music.getName();
window.addEventListener("load", () => {
  let music = player.getMusic();
  displayMusic(music);
  displayMusicList(player.musicList);
  isPlayingNow();
});

function displayMusic(music) {
  title.innerText = music.getName();
  singer.innerText = music.singer;
  image.src = music.img;
  audio.src = music.file;
}

play.addEventListener("click", () => {
  const isMusicPlay = container.classList.contains("playing");
  isMusicPlay ? pauseMusic() : playMusic();
});

function pauseMusic() {
  container.classList.remove("playing");
  play.querySelector("i").classList = "fa-solid fa-play";
  audio.pause();
}

function playMusic() {
  container.classList.add("playing");
  play.querySelector("i").classList = "fa-solid fa-pause";
  audio.play();
}

next.addEventListener("click", () => {
  nextMusic();
});

function nextMusic() {
  player.next();
  let music = player.getMusic();
  displayMusic(music);
  playMusic();
  isPlayingNow();
}

prev.addEventListener("click", () => {
  prevMusic();
});

function prevMusic() {
  player.prev();
  let music = player.getMusic();
  displayMusic(music);
  playMusic();
  isPlayingNow();
}

const calculateTime = (Totalseconds) => {
  const second = Math.floor(Totalseconds / 60);
  const minute = Math.floor(Totalseconds % 60);
  const updateMinute = minute < 10 ? `0${minute}` : `${minute}`;
  const result = `${second}:${updateMinute}`;
  return result;
};

audio.addEventListener("loadedmetadata", () => {
  duration.textContent = calculateTime(audio.duration);
  progresBar.max = Math.floor(audio.duration);
});

audio.addEventListener("timeupdate", () => {
  progresBar.value = Math.floor(audio.currentTime);
  currentTime.textContent = calculateTime(progresBar.value);
});

progresBar.addEventListener("input", () => {
  currentTime.textContent = calculateTime(progresBar.value);
  audio.currentTime = progresBar.value;
});

let isMuted = false;
volume.addEventListener("click", () => {
  if (isMuted) {
    audio.muted = false;
    isMuted = false;
    volume.classList = "fa-solid fa-volume-high";
  } else {
    audio.muted = true;
    isMuted = true;
    volume.classList = "fa-solid fa-volume-xmark";
  }
});

volumeBar.addEventListener("input", (e) => {
  const value = e.target.value;
  audio.volume = value / 100; // 0 ile 1 arasında değer alır

  if (audio.volume === 0) {
    audio.muted = true;
    isMuted = true;
    volume.classList = "fa-solid fa-volume-xmark";
  } else {
    audio.muted = false;
    isMuted = false;
    volume.classList = "fa-solid fa-volume-high";
  }
});

const displayMusicList = (list) => {
  for (let i = 0; i < list.length; i++) {
    let liTag = `
  <li li-index="${i}" onclick="selectedMusic(this)" class="list-group-item d-flex align-items-center justify-content-between">
   <span>${list[i].getName()}</span>
   <span  id ="music-${i}"  class="badge bg-primary rounded-pill"></span>
   <audio class="music-${i}" src="${list[i].file}"></audio>
  </li>`;
    ul.insertAdjacentHTML("beforeend", liTag);

    let liAudioDuration = ul.querySelector(`#music-${i}`);
    let liAudioTag = ul.querySelector(`.music-${i}`);

    liAudioTag.addEventListener("loadeddata", () => {
      liAudioDuration.innerText = calculateTime(liAudioTag.duration);
    });
  }
};

const selectedMusic = (li) => {
  player.index = li.getAttribute("li-index");
  displayMusic(player.getMusic());
  isPlayingNow();
};

const isPlayingNow = () => {
  for (let li of ul.querySelectorAll("li")) {
    if (li.classList.contains("playing")) {
      li.classList.remove("playing");
    }
    if (li.getAttribute("li-index") == player.index) {
      li.classList.add("playing");
    }
  }
};

repeatbtn.addEventListener("click", () => {
  audio.addEventListener("ended", () => {
    nextMusic();
  });
  repeatbtn.classList.add("btn-primary");
});
