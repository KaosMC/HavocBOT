const botconfig = require("./botconfig.json");
const Discord = require("discord.js");
const bot = new Discord.Client({disableEveryone: true});

const fs = require("fs");
bot.commands = new Discord.Collection();

fs.readdir("./commands/", (err, files) => {

  if(err) console.log(err);

  let jsfile = files.filter(f => f.split(".").pop() === "js")
  if(jsfile.length <= 0){
    console.log("Could not find commands.");
    return;
  }

  jsfile.forEach((f, i) =>{
    let props = require(`./commands/${f}`);
    console.log(`Loaded command from ${f}.`);
    bot.commands.set(props.help.name, props);
  });

});

bot.on("ready", async () => {
  console.log("HavocBOT is now online!")
  bot.user.setActivity(`${botconfig.activity}`);
});

bot.on("message", async message => {
  if(message.channel.type === "dm") return;
  if(message.author.bot) return;

  let fullMsg = message.content.split(" ");
  let first = fullMsg[0];
  let args = fullMsg.slice(1);

  if(first === `!suggest`) {
    let commandfile = bot.commands.get(`suggest`);
    if(commandfile) commandfile.run(bot, message, args);
  }
});

bot.on("guildMemberAdd", (member) => {
  let memberRole = member.guild.roles.find("name", "Member");
  member.addRole(memberRole).catch(console.error);
});

bot.login(process.env.BOT_TOKEN);