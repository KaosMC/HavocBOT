const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  // Command: !suggest (suggestion).
  message.delete();

  if(message.channel.id !== "427017304329551872") {
    let embedMsg = new Discord.RichEmbed()
    .setColor("#b21717")
    .addField("» Error", "Please send suggestions at #suggestions.");

    message.channel.send(embedMsg);
  } else {
    if(args[0]) {
      let embedMsg = new Discord.RichEmbed()
      .setColor("#FFFF55")
      .addField("Suggestion:", `${message.content.slice(9)}`)
      .addField("Author:", `${message.author.tag}`)
      .addField("Date:", `${message.createdAt.toDateString()}`);

      message.channel.send(embedMsg).then(function (message) {
       const agree = message.guild.emojis.find("name", "yes");
       const disagree = message.guild.emojis.find("name", "no");
       message.react(agree.id)
       message.react(disagree.id)
      }).catch(e => {
        console.log(e);
      });;
      
    } else {
      let embedMsg = new Discord.RichEmbed()
      .setColor("#b21717")
      .addField("» Error", "Insufficient arguments!");

      message.channel.send(embedMsg);
    }
  }
}

module.exports.help = {
  name: "suggest"
}
