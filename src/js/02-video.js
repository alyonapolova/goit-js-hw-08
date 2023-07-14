import throttle from 'lodash.throttle';
import Player from '@vimeo/player';

const iframe = document.querySelector('iframe');

const player = new Player(iframe);

const onPlay = function (data) {
  console.log(data.seconds);
  const currentTime = data.seconds;
  //console.log(typeof currentTime);
  localStorage.setItem('videoplayer-current-time', JSON.stringify(currentTime));
  // data is an object containing properties specific to that event
};
player.on('timeupdate', throttle(onPlay, 1000));

const newTime = localStorage.getItem('videoplayer-current-time');
const savedTime = JSON.parse(newTime);

console.log(typeof savedTime);

if (savedTime !== null) {
  player
    .setCurrentTime(savedTime)
    .then(function (seconds) {
      // seconds = the actual time that the player seeked to
    })
    .catch(function (error) {
      switch (error.name) {
        case 'RangeError':
          // the time was less than 0 or greater than the video’s duration
          break;

        default:
          // some other error occurred
          break;
      }
    });
}
