// SETTING UP CONSTANTS FOR TIMEOUTS
var all_lastClicked;
var scheduled_lastClicked;
var lives_lastClicked;


// HANDLING BUTTONS CLICKS

// LIVES
$('#lives').click((event)=> {
  event.preventDefault();
  console.log('Getting LIVES');
})

// SCHEDULE
$('#scheduled').click((event)=> {
  event.preventDefault();
  console.log('Getting SCHEDULED');
})

//ALL
$('#all').click((event)=> {
  event.preventDefault();
  console.log('Getting ALL');
})