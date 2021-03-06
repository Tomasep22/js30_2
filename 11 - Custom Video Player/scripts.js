const player = document.querySelector(".player");
const video = player.querySelector(".viewer");
const progress = player.querySelector(".progress");
const progressBar = player.querySelector(".progress__filled");
const toggle = player.querySelector(".toggle");
const skipBtn = player.querySelectorAll("[data-skip]");
const ranges = player.querySelectorAll(".player__slider");
const fullScreen = player.querySelector('.fullScreen');

function togglePlay() {
video.paused ? video.play() : video.pause();
}

function handleToggleBtn() {
const icon = video.paused ? '►' : '❚ ❚';
toggle.textContent = icon;
}

function skip() {
video.currentTime += parseFloat(this.dataset.skip);
}

function handleRange() {
    video[this.name] = this.value;
}


function HandleProgress() {
const percent = (video.currentTime / video.duration) * 100
progressBar.style.flexBasis = `${percent}%`;
} 

function scrub(e) {
video.currentTime = (e.offsetX / this.offsetWidth) * video.duration;
}

function toggleFullscreen() {
  
    player.requestFullscreen = player.requestFullscreen || player.mozRequestFullscreen
            || player.msRequestFullscreen || player.webkitRequestFullscreen;
  
    if (!document.fullscreenElement) {
        player.requestFullscreen().then({}).catch(err => {
        alert(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
      });
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  }

fullScreen.addEventListener('click', toggleFullscreen);


video.addEventListener('click', togglePlay);
toggle.addEventListener('click', togglePlay);

video.addEventListener('play', handleToggleBtn);
video.addEventListener('pause', handleToggleBtn);
video.addEventListener('timeupdate', HandleProgress);

skipBtn.forEach(button => button.addEventListener('click', skip));
ranges.forEach(range => range.addEventListener('change', handleRange));
ranges.forEach(range => range.addEventListener('mousemove', handleRange));

let mouseDown = false;

progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mouseDown && scrub(e));
progress.addEventListener('mousedown', () => mouseDown = true);
progress.addEventListener('mousedown', () => mouseDown = false);
