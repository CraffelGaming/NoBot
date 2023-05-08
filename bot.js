const Discord = require('discord.js');
const client = new Discord.Client();
const auth = require('./auth.json');
const Shadowrun = require('./shadowrun.js');
const Dice = require('./dice.js');
const Help = require('./help.js');

const modes = {
    Default: 0,
    Shadowrun: 1
};

var activeMode = modes.Shadowrun;

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.login(auth.token);

client.on('message', msg => {  
    console.log(msg);
    if (msg.content.toLowerCase().startsWith('!roll') || msg.content.toLowerCase().startsWith('!sum')) {
        switch(activeMode){
            case 1:
                msg.reply(new Shadowrun(msg.content).execute());
                break;
            default:
                msg.reply(new Dice(msg.content).execute());
                break;
        }
    }
    else if (msg.content.toLowerCase().startsWith('!mode')) {
        console.log('!mode called');
        switch(msg.content.toLowerCase()){
            case '!mode?shadowrun':
                activeMode = modes.Shadowrun;
                msg.reply('Spielart zu "Shadowrun" gewechselt'); 
                break;
            case '!mode?default':
                    activeMode = modes.Default;
                    msg.reply('Spielart zu "Standard" gewechselt'); 
                    break;
           default:
                switch(activeMode){
                    case 0:
                        msg.reply('Du Spielst "Standard".'); 
                        break;
                    case 1:
                        msg.reply('Du Spielst "Shadowrun".'); 
                        break;
                }
                break;
        }
    } 
    else if (msg.content.toLowerCase().startsWith('!help')) {
        msg.reply(new Help(msg.content).execute());
    }
    else if (msg.content.toLowerCase() === '!version') {
        msg.reply('1.0.4');
    } 
    else if (msg.content.toLowerCase() === '!ping') {       
        const timeTaken = Date.now() - msg.createdTimestamp;
        msg.reply(`Pong! This message had a latency of ${timeTaken}ms.`);
    }
});