const http = require('http');
const port=process.env.PORT || 3000
const server = http.createServer((req, res) => {
res.statusCode = 200;
res.setHeader('Content-Type', 'text/html');
res.end('<h1>Hello World</h1>');
});
server.listen(port,() => {
console.log("hello")
});
//Require:
const api = require('node-telegram-bot-api');

//Bot Settings:
const settings = require('./settings');

//Make the bot:
const Bot = new api(settings.token, settings.opt);
//Get msgs:

//When the user start:
Bot.on('message', (msg) => {
  if (msg.chat.id != settings.myId && msg.text != '/start'){
    Bot.sendMessage(msg.chat.id, "Your Message Was Delivered");
    Bot.sendMessage(settings.myId, msg.text, {
      reply_markup: {
        force_reply: true
      }
    })
      .then(reply=>{
        Bot.onReplyToMessage(reply.chat.id, reply.message_id,  msg2 => {
          Bot.sendMessage(msg.chat.id, msg2.text);
        });
      });
  }else if(msg.chat.id != settings.myId && msg.text == '/start'
    ){
      Bot.sendMessage(msg.chat.id, settings.wellcomMsg)
    }
});
Bot.on("message",(msg)=>{
  if(msg.text == "/getId"){
    Bot.sendMessage(msg.chat.id, msg.chat.id)
    }
  });
       
       
