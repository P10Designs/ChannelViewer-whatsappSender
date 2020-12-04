// SETTING UP CONSTANTS
var users_phones = {}
var counter = 0;

// HANDLING BUTTONS CLICKS

// LIVES
$('#lives').click(async (event)=> {
  if (Object.values(users_phones) == 0) {
    alert('ADD USERS')
    return
  }else {
    console.log(users_phones);
    const req = await fetch('http://localhost:3000/lives',{
      method: 'POST',
      body: JSON.stringify(users_phones)
    })
  }
  event.preventDefault();
  console.log('Getting LIVES');
  startCounter('lives')
})

// SCHEDULE
$('#scheduled').click(async (event)=> {
  if (Object.values(users_phones) == 0) {
    alert('ADD USERS')
    return
  }else {
    console.log(users_phones);
    const req = await fetch('http://localhost:3000/lives',{
      method: 'POST',
      body: JSON.stringify(users_phones)
    })
  }
  event.preventDefault();
  console.log('Getting SCHEDULED');
  startCounter('scheduled')
})
//ALL
$('#all').click((event)=> {
  if (Object.values(users_phones) == 0) {
    alert('ADD USERS')
    return
  }
  event.preventDefault();
  console.log('Getting ALL');
  startCounter('all')
  $('#users').forEach((user)=>{
    console.log(user);
  })
})

async function startCounter(name){
  const time = 600000;
  $(`#${name}`).addClass('disabled')
  timer(name, time)
  await new Promise(resolve => setTimeout(resolve, time))
  $(`#${name}`).removeClass('disabled')
}

function timer(name, time) {
  var countDownDate = new Date().getTime()+time;

// Update the count down every 1 second
  var x = setInterval(function() {

  // Get today's date and time
  var now = new Date().getTime();

  // Find the distance between now and the count down date
  var distance = countDownDate - now;

  // Time calculations for days, hours, minutes and seconds
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // Display the result in the element with id="demo"
  const time = `${hours.toString().length == 2 ? hours : '0'+hours }:${minutes.toString().length == 2 ? minutes : '0'+minutes }:${seconds.toString().length == 2 ? seconds : '0'+seconds}`
  $(`.${name}_time`).html(time)
  // If the count down is finished, write some text
  if (distance < 0) {
    clearInterval(x);
  }
}, 1000);
}




$('#add').click((event) => {
  event.preventDefault();
  if ($('#icon_prefix').val() == ""){
    alert('FALTA NOMBRE')
    return
  }
  if ($('#icon_telephone').val() == ""){
    alert('FALTA TELEFONO')
    return
  }
  const name = $('#icon_prefix').val();
  const number = $('#icon_telephone').val();
  users_phones[counter] = number;
  $('.collection').append(`<li class="collection-item"><div>${name}<span class="spacer-list">${number}</span><a id="delete" href="#!" class="secondary-content"><i idp="counter" class="material-icons">delete</i></a></div></li>`)
  $('#icon_prefix').val("")
  $('#icon_telephone').val("")
  $(document).on('click', '#delete', function() {
    console.log($(this).closest('div')[0].children[0].innerText)
    if (Object.values(users_phones).indexOf($(this).closest('div')[0].children[0].innerText) > -1) {
      console.log('FOUND');
      const index = Object.values(users_phones).indexOf($(this).closest('div')[0].children[0].innerText);
      delete users_phones[index]
    }
    $(this).closest('li').remove();
  });
  counter += 1;
})
