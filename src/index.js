import _ from 'lodash';

const AudioContext = window.AudioContext || window.webkitAudioContext;
const context = new AudioContext();
const gainNode = context.createGain();
gainNode.connect(context.destination);

const sounds = {
  click: {
    path: 'https://raw.githubusercontent.com/sfxjs/sfxjs/master/media/i.wav'
  },
  pong: {
    path: 'https://raw.githubusercontent.com/sfxjs/sfxjs/master/media/pong.wav'
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
          if (allLoaded && _.isFunction(callback)){
            callback();
          }
        }
      );
    };

    request.onerror = (error) => {
      console.error('BufferLoader XHR error: ', error); // eslint-disable-line no-console
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

const setVolume = (volume) => gainNode.gain.setTargetAtTime(volume / 100, context.currentTime, 0);

const sfx = {
  play,
  setVolume
};

module.exports = sfx;
