/* Get all elements needed */
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
/*const video = player.querySelector('video');*/

const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');

const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');
const play = player.querySelector('.toggle');
const full= player.querySelector('[data-size]');
/* Build your function */
function playVideo() {
  video.paused ? video.play() : video.pause();
}
/*
function togglePlay() {
const method = video.paused ? 'play' : 'pause';
video[method]();
};*/

function playVideoSpace(e) {
    console.log(e.keyCode);
  if (e.keyCode === 32 ) {
    video.paused ? video.play() : video.pause();
  }
}

function updateButton() {
 const method = this.paused ? '►' : '❚❚';
 /*play.innerHTML = method;*/
 play.textContent = method
}

function skipVideo() {
  const skip = this.dataset.skip;
  /*console.log(typeof skip)*/;
  return video.currentTime += parseFloat(skip);
};

function changeRange() {
  // if (this.name === 'volume'){
  // video.volume = this.value;
  // }
  // else if (this.name === 'playbackRate') {
  // video.playbackRate = this.value;
  // }
  video[this.name] = this.value;
};

function updateTime() {
// var time = (video.duration - video.currentTime) / video.duration;
// var videoProgress = progress.offsetWidth * time;
// var barWidth = progress.offsetWidth - videoProgress;
// progressBar.style.flexBasis = `${barWidth}px`;
  var percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`
}

function changeTime(e) {
  console.log(e.offsetX);
  var percent = (e.layerX / progress.offsetWidth);
  video.currentTime = video.duration * percent;
};

function fullscreen() {
if (video.requestFullscreen) {
  video.requestFullscreen();
} else if (video.mozRequestFullScreen) {
  video.mozRequestFullScreen();
} else if (video.webkitRequestFullscreen) {
  video.webkitRequestFullscreen();
}
};

/* Envents listener configuration */
document.addEventListener('keydown', playVideoSpace);
video.addEventListener('click',playVideo);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
play.addEventListener('click', playVideo);

skipButtons.forEach(button => button.addEventListener('click', skipVideo));
ranges.forEach(range => range.addEventListener('change', changeRange));
ranges.forEach(range => range.addEventListener('mousemove', changeRange));

let mousedown = false;
video.addEventListener('timeupdate', updateTime);
progress.addEventListener('click', changeTime);
progress.addEventListener('mousemove', (e) =>  mousedown && changeTime(e));


progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);

full.addEventListener('click', fullscreen);




