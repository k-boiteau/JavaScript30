const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');

function getVideo() {
  navigator.mediaDevices.getUserMedia({video: true, audio : false})
  .then(localMediaStream => {
    console.log(localMediaStream);
    video.src = window.URL.createObjectURL(localMediaStream);
    video.play();
  })
  .catch(err => {
    console.log(`OH NOOOO !!!`, err);
  });
}

function paintToCanvas() {
  const width = video.videoWidth;
  const height = video.videoHeight;
  canvas.width = width;
  canvas.height = height;

  return setInterval( () => {
    ctx.drawImage(video, 0, 0, width, height);
  }, 16);
}

function takePhoto() {
  // play sound
  snap.currentTime = 0;
  snap.play();

  //take pics
  const data = canvas.toDataURL('image/jpeg');
  const link = document.createElement('a');
  link.href = data;
  link.setAttribute('download', "BG");
  link.innerHTML = `<img src="${data}" alt="BG">`;
  strip.insertBefore(link, strip.firstChild);
}

// NB : les filtres et autres options de couleurs cf. corrigés car moins applicables.

getVideo();
video.addEventListener('canplay', paintToCanvas);

