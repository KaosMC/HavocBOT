const botconfig = require("./botconfig.json");
const Discord = require("discord.js");
const bot = new Discord.Client({
 disableEveryone: true
});

const fs = require("fs");
bot.commands = new Discord.Collection();

fs.readdir("./commands/", (err, files) => {

 if (err) console.log(err);

 let jsfile = files.filter(f => f.split(".").pop() === "js")
 if (jsfile.length <= 0) {
  console.log("Could not find commands.");
  return;
 }

 jsfile.forEach((f, i) => {
  let props = require(`./commands/${f}`);
  console.log(`Loaded command from ${f}.`);
  bot.commands.set(props.help.name, props);
 });

});

bot.on("ready", async() => {
 console.log("HavocBOT is now online!")
 bot.user.setActivity(`${botconfig.activity}`);
});

bot.on("message", async message => {
   if (message.channel.type === "dm") return;
   if (message.author.bot) return;

   let fullMsg = message.content.split(" ");
   let first = fullMsg[0];
   let args = fullMsg.slice(1);

   if (first === `!suggest`) {
    let commandfile = bot.commands.get(`suggest`);
    if (commandfile) commandfile.run(bot, message, args);
   }

   if (message.channel.id === `427017304329551872`) {
    if (first !== `!suggest`) {
     message.delete();
    }
   } else {
    if (first === `!hb_help`) {
     message.delete();
     message.author.send(`Hello, ${message.author.username}.\n\n:link: **Forums:** ${botconfig.forums}\n:moneybag: **Store:** ${botconfig.store}\n:video_game: **IP:** ${botconfig.ip}`);
     let embedMsg = new Discord.RichEmbed()
      .setColor("#4bba30")
      .setDescription("✅ A private message has been sent.");

     message.channel.send(embedMsg).then(embedMsg => {
      embedMsg.delete(15000);
     });
    } else if (first === `!ip`) {
     message.delete();
     let embedMsg = new Discord.RichEmbed()
      .setColor("#FFFF55")
      .setDescription(`🎮 **IP:** ${botconfig.ip}`);

     message.channel.send(embedMsg).then(embedMsg => {
      embedMsg.delete(15000);
     });
    } else if (first === `!store`) {
     message.delete();
     let embedMsg = new Discord.RichEmbed()
      .setColor("#FFFF55")
      .setDescription(`💰 **Store:** ${botconfig.store}`);

     message.channel.send(embedMsg).then(embedMsg => {
      embedMsg.delete(15000);
     });
    } else if (first === `!forums`) {
     message.delete();
     let embedMsg = new Discord.RichEmbed()
      .setColor("#FFFF55")
      .setDescription(`🔗 **Forums:** ${botconfig.forums}`);

     message.channel.send(embedMsg).then(embedMsg => {
      embedMsg.delete(15000);
     });
    } else if (first === `!website`) {
     message.delete();
     let embedMsg = new Discord.RichEmbed()
      .setColor("#FFFF55")
      .setDescription(`🔗 **Website:** ${botconfig.forums}`);

     message.channel.send(embedMsg).then(embedMsg => {
      embedMsg.delete(15000);
     });
    } else if (first === `!invites`) {
     message.delete();
     let embedMsg = new Discord.RichEmbed()
      .setColor("#FFFF55")
      .setDescription(`You have invited ${message.author.invite.uses} members.`);

     message.channel.send(embedMsg).then(embedMsg => {
      embedMsg.delete(15000);
     });
    }
   }
 });

  bot.on("guildMemberAdd", (member) => {
   let memberRole = member.guild.roles.find("name", "Member");
   member.addRole(memberRole).catch(console.error);
   let embedMsg = new Discord.RichEmbed()
   .setColor("#FFFF55")
   .addField(`${member.name} has joined.`, `Invited by ${member.inviter.name}.`)
   
   member.guild.channels.find("name", "welcome").send(embedMsg).then(embedMsg => {
      embedMsg.delete(15000);
     });
  });

  bot.login(process.env.BOT_TOKEN);
