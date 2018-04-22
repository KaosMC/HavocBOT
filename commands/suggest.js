const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  // Command: !suggest (suggestion).
  message.delete();

  if(message.channel.id !== "437640867512320010") {
    let embedMsg = new Discord.RichEmbed()
    .setColor("#b21717")
    .addField("» Error", "Please send suggestions at #suggestions.");

    message.channel.send(embedMsg);
  } else {
    if(args[0]) {
      let embedMsg = new Discord.RichEmbed()
      .setColor("#FFFF55")
      .addField("Suggestion:", args)
      .addField("Author:", `${message.author.tag}`)
      .addField("Date:", `${message.createdAt.toDateString()}`);

      message.channel.send(embedMsg);
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