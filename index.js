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
      Bot.sendMessage(msg.chat.id, `Welcome !!

Any message you send will be delivered to the bot owner
.
.
Don't worry , your identity won't be known so you can talk freely 
.
.
Follow us on @CottonMinds`)
    }
});
