const { Client, CacheCollection } = require(`guilded.js`);
const config = require(`./resources/config.json`)
const client = new Client({token: config.token})
const fs = require("fs");


client.on("ready", () => {
    console.log(`${client.user.name} is online!`)
});

client.on("messageCreated", (message) => {
    if (message.content === "test") {
        message.reply("test indeed owo")
    }
});

client.commands = new CacheCollection()
client.aliases = new CacheCollection()
const commandFiles = fs.readdirSync(__dirname + '/commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}




client.on("messageCreated",async (message) => {
    const prefix = config.defaultPrefix;
    const member = await client.members.fetch(message.serverId,message.authorId);
     if (member.user.type === "bot") return;
     const args = message.content.slice(prefix.length).trim().split(/ +/g);
     const cmd = args.shift().toLowerCase();

     if (cmd.length === 0) return;
    
    let command = client.commands.get(cmd);
    if (!command) command = client.commands.get(client.aliases.get(cmd));

    if (command) 
        command.run(client, message, args);

})



client.login();