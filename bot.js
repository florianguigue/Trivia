/**
 *
 * Created by Florian Guigue on 25/07/2017.
 */

    // Loading up the libs
const Discord = require('discord.js');
const moment = require('moment');

// Set up the client
const client = new Discord.Client();

// Loading up the configuration file
const config = require('./config.json');

// This event will start the bot and setting up the game of the bot to 'Trivia game'
client.on('ready', function () {
    console.log('Trivia bot is running since : ' + moment().format('DD-MM-YYYY HH:mm:ss'))
    client.user.setGame('Trivia game').catch(console.error);
})
// This event will welcome every people who arrive on the server
    .on('guildMemberAdd', function (member) {
        member.guild.defaultChannel.send(member.displayName + " vient d'arriver sur le serveur");
    })
    // This event will execute commands when specifics messages are called
    .on('message', function (message) {
        if (message.author.bot) return;

        // Ignore if no prefix
        if (message.content.indexOf(config.prefix) !== 0) return;

        const args = message.content.split(/\s+/g);
        const command = args.shift().slice(config.prefix.length).toLowerCase();

        if (command === "say") {
            const msg = args.join(" ");
            message.delete().catch(console.error);
            message.channel.send(msg);
        }

        if (command === "test") {
            if (args.join("") === "") return;
            const qFile = require('./questions/' + args.join("") + '.json');
			var question = 1;
            while (command !== "trivia" && args.join("") !== "stop") {
                message.channel.send("Question n°" + question + \n + );
            }
        }
    })
    .login(config.token);