
setInterval(function() {
  $('#current-date').text(dayjs().format('MMMM DD,YYYY'))
  $('#current-time').text(dayjs().format('hh:mm:ssA'))
  $('#day-one').text(dayjs().format('ddd MMM D'))
  $('#day-two').text(dayjs().format('ddd MMM D'))
  $('#day-three').text(dayjs().format('ddd MMM D'))
  $('#day-four').text(dayjs().format('ddd MMM D'))
  $('#day-five').text(dayjs().format('ddd MMM D'))

}, 1000);



let searchBtn = $('#search');

searchBtn.on('click', function() {
  if (searchBtn)
  alert('Please enter a City or Zip code');

})