// -------------------------------------------- //
// CONSTANTS
// -------------------------------------------- //
// Global
require('dotenv').config();

// For Whatsapp
const WhatsAppWeb = require('baileys'); // Library
const client = new WhatsAppWeb()        // Client

// For Youtube
const idChannel = 'UCmnyHFx7JRca0jjRxnHVn6w'; // Channel Id
const url = 'https://youtube.googleapis.com/youtube/v3/search?part=snippet' // Base youtube url
const api_key = process.env.API_KEY; // API KEY from .env
const fetch = require('node-fetch');  // Node fetch

// -------------------------------------------- //
// FUNCTIONS 
// -------------------------------------------- //
// Function for sending Messages
function sendTextMessage(id, message, options) {
  console.log(`id: ${id} message:${message} options:${options}`);
  client.sendTextMessage(id,message,options);
}

// Function for login 
async function logIn() {
  await client.connect()
  .then (([user]) => {
    console.log (`Username: ${user.name} (${user.id})`)
  })
  .catch (err => console.log("unexpected error: " + err) )
}


// Get live events
async function live() {
  const req = await fetch(`${url}&channelId=${idChannel}&eventType=live&maxResults=25&type=video&key=${api_key}`);
  const res = await req.json();
  let lives = {}
  await res.items.forEach((event,index) => {
    const info = {
      channelTitle: event.snippet.channelTitle,
      title: event.snippet.title,
      liveBroadcastContent: event.snippet.liveBroadcastContent,
      video_id: event.id.videoId,
      stream_url: {
        long: `https://youtube.com/watch?v=${event.id.videoId}`,
        short: `https://youtu.be/${event.id.videoId}`
      } 
    }
    console.log(info);
    lives[index] = info
  });

  return lives
}

// Get upcoming events
async function upcoming() {
  const req = await fetch(`${url}&channelId=${idChannel}&eventType=upcoming&maxResults=25&type=video&key=${api_key}`);
  const res = await req.json();
  var upcomings = {}
  await res.items.forEach((event,index) => {
    const info = {
      channelTitle: event.snippet.channelTitle,
      title: event.snippet.title,
      liveBroadcastContent: event.snippet.liveBroadcastContent,
      video_id: event.id.videoId,
      stream_url: {
        long: `https://youtube.com/watch?v=${event.id.videoId}`,
        short: `https://youtu.be/${event.id.videoId}`
      } 
    }
    console.log(info);
    upcomings[index] = info
  });
  console.log(upcomings);
  return upcomings
}

module.exports = {
  logIn,
  sendTextMessage,
  live,
  upcoming,
}