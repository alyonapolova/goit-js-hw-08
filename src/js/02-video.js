import throttle from 'lodash.throttle';
import Player from '@vimeo/player';

const iframe = document.querySelector('iframe');

const player = new Player(iframe);

const onPlay = function (data) {
  console.log('currentTime:', data.seconds);
  const currentTime = data.seconds;
  //console.log(typeof currentTime);
  localStorage.setItem('videoplayer-current-time', JSON.stringify(currentTime));
  // data is an object containing properties specific to that event
};
player.on('timeupdate', throttle(onPlay, 1000));

const newTime = localStorage.getItem('videoplayer-current-time');
const savedTime = JSON.parse(newTime);

//console.log(typeof savedTime);

player.setCurrentTime(savedTime || 0);
