import is from './util/is';
const AudioContext = window.AudioContext || window.webkitAudioContext;
const context = new AudioContext();
const gainNode = context.createGain();
gainNode.connect(context.destination);

const sounds = {
  click: {
    path: './src/media/i.wav'
  },
  pong: {
    path: './src/media/pong.wav'
  }
};

const loadSounds = (callback) => {
  Object.keys(sounds).forEach((sound) => {
    sound = sounds[sound];
    let request = new XMLHttpRequest();
    request.open("GET", sound.path, true);
    request.responseType = "arraybuffer";

    request.onload = () => {
      context.decodeAudioData(
        request.response,
        (buffer) => {
          if (!buffer) {
            alert('error decoding file data: ' + sound.path);
            return;
          }
          sound.buffer = buffer;
          let allLoaded = true;
          Object.keys(sounds).forEach((sound) => {
            sound = sounds[sound];
            if (!sound.buffer) {
              allLoaded = false;
            }
          });
          if (allLoaded && is.function(callback)){
            callback();
          }
        }
      );
    };

    request.onerror = () => {
      alert('BufferLoader: XHR error');
    };

    request.send();

  });
};

loadSounds();

const play = (soundName) => {
  // Create two sources and play them both together.
  const source = context.createBufferSource();
  source.buffer = sounds[soundName].buffer;

  source.connect(gainNode);
  source.start(0);
};

const setVolume = (volume) => gainNode.gain.value = volume / 100;

const sfx = {
  play,
  setVolume
};

export default sfx;
