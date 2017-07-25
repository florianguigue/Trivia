/**
 *
 * Created by Florian Guigue on 25/07/2017.
 */

// Loading up the libs
const Discord = require('discord.js');
const moment = require('moment');
const random = require('random-js');

// Set up the client
const client = new Discord.Client();

// Loading up the configuration file
const config = require('./config.json');

var jeu = false;
var theme = "";
var qNumber = 1;
var nbTotalQuestions = 0;
var questionNum = 0;
var qFile;
var qPasser = [];

// This event will start the bot and setting up the game of the bot to 'Trivia game'
client.on('ready', function () {
    console.log('Trivia bot is running since : ' + moment().format('DD-MM-YYYY HH:mm:ss'))
    client.user.setGame('Trivia game').catch(console.error);
})

	function findQuestion(file) {
        var question = file.questions[questionNum].question;
		return question.toLowerCase();
    }

	function findReponse(file) {
        var reponse = file.questions[questionNum].reponse;
		return reponse.toLowerCase();
	}

    // This event will execute commands when specifics messages are called
    client.on('message', function (message) {
        if (message.author.bot) return;

        // Ignore if no prefix
        if (message.content.indexOf(config.prefix) !== 0 && jeu === false) return;

        const args = message.content.split(/\s+/g);
        const command = args.shift().slice(config.prefix.length).toLowerCase();

        if (command === "trivia") {
            if (args.join("") === "") return;
            if (args.join("") === "stop") {
            	if (jeu === false) return;
            	else {
                    message.channel.send("Fin du jeu");
                    jeu = false;
				}
            }
            else if (args.join("") === "pass") {
            	if (jeu === true) {
                    message.channel.send("La réponse était : " + findReponse(qFile))
                    qNumber++;
                    questionNum = Math.round(Math.random() * nbTotalQuestions - 1);
                    message.channel.send("Question n°" + qNumber + " :\n" + findQuestion(qFile));
				} else {
            		message.channel.send("Aucun quizz en cours");
				}
			}
			else if (args.join("") === "help") {
                message.channel.send("Comment jouer :\n\n" +
                    "'!trivia [theme]' pour lancer une partie avec le theme choisi,\n" +
                    "'!trivia list' pour voir la liste des thèmes disponibles\n" +
                    "'!trivia pass' pour passer à la question suivante,\n" +
                    "'!trivia stop' pour arrêter la partie en cours")
            }
            else if( args.join("") === "list") {
                message.channel.send("Liste des thèmes : \n\n" +
                    "videogames")
            }
			else {
                if (jeu === false) {
                    jeu = true;
                    theme = args.join("");
                    qFile = require('./questions/' + theme + '.json');
                    nbTotalQuestions = qFile.questions.length;
                    questionNum = Math.round(Math.random() * nbTotalQuestions - 1);
                    message.channel.send("Question n°" + qNumber + " :\n" + findQuestion(qFile));
                } else {
                    message.channel.send("Un seul quizz à la fois");
                }
			}
        }
        if (jeu === true) {
            if (message.content.toLowerCase() === findReponse(qFile)) {
                message.channel.send("Bien joué !\n");
                questionNum = Math.round(Math.random() * nbTotalQuestions - 1);
                qNumber++;
                message.channel.send("Question n°" + qNumber + " :\n" + findQuestion(qFile));
            }
        }

    });

client.login(config.token);