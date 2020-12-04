const express = require('express');
const morgan = require('morgan');
const { 
  logIn,
  sendTextMessage,
  live,
  upcoming }  = require('./helpers');

const app = express();
const port = process.env.PORT || 3000;

app.use(morgan('tiny'))


// INITIATE WATSHAPP
logIn();
console.log('Logged In');


// SEND NOTIFICATIONS OF NEXT EVENTS TO USERS 
app.post('/all', async (req,res) => {
  const lives = await live();
  const upcomings = await upcoming();
  await new Promise(resolve => setTimeout(resolve, 2000))
  var message = '';
  if(lives.length > -1){
    message += '*EVENTOS EN DIRECTO*'};
  Object.values(lives).forEach((live) => {
    message += `- ${live.title}\n${live.url.short}`;
  });
  if(upcoming.length > -1 && message.length != 0) {
    message += '\n*- PROXIMOS EVENTOS -*\n\n';
  }else if (upcoming.length > -1){
    message += '*- PROXIMOS EVENTOS -*\n\n';
  }
  Object.values(upcomings).forEach((upcoming) => {
    message += `- ${upcoming.title}\n${upcoming.stream_url.short}`;
  });
  sendTextMessage(id, message);
  res.status(200);
  res.send('Messages were sent')
});


// JUST SEND LIVES
app.post('/lives', async (req,res) => {
  const lives = await live();
  var message = '';
  if(lives.length > -1){
    message += '*EVENTOS EN DIRECTO*'};
  Object.values(lives).forEach((live) => {
    message += `- ${live.title}\n${live.url.short}`;
  });
  sendTextMessage(id, message);
  res.status(200);
  res.send('Messages were sent')
})


// SEND UPCOMING EVENTS
app.post('/next', async (req,res) =>{
  const upcomings = await upcoming();
  var message = '';
  Object.values(upcomings).forEach((upcoming) => {
    message += `- ${upcoming.title}\n${upcoming.stream_url.short}`;
  });
  sendTextMessage(id, message);
  res.status(200);
  res.send('Messages were sent')
})

app.use('/assets', express.static('client/assets'))

app.get('/' ,async (req,res)=>{
  const options = {
    root: './client',
    dotfiles: 'deny',
    headers: {
      'x-timestamp': Date.now(),
      'x-sent': true
    }
  }
  const fileName= 'index.html';
  res.sendFile(fileName, options, function (err) {
    if (err) {
      next(err)
    } else {
      console.log('Sent:', fileName)
    }
  });
})

app.listen(port,()=>{
  console.log(`App listening on http://localhost:3000`);
})