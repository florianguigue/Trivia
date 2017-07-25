/**
 *
 * Created by Florian Guigue on 25/07/2017.
 */

const Discord = require('discord.js');
const client = new Discord.Client();


client.on('ready', function () {
        console.log('Trivia bot is running since : ' + moment().format('DD-MM-YYYY HH:mm:ss'))
        client.user.setGame('Trivia game').catch(console.error);
    })
    .on('guildMemberAdd', function (member) {
        member.guild.defaultChannel.send(${member} + " vient d'arriver sur le serveur");
    })
    .on('message', function (member) {
    
    })
    .login("MzM5MzUzMDYwMTg0ODE3NjY1.DFiyPQ.-26n8W3h_2Q-1nnTFCrLp0tT_SQ");