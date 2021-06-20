require('dotenv').config();

const { Client, WebhookClient } = require('discord.js');
const client=new Client(
    {
        partials:['MESSAGE','REACTION']
    }
); 

const webhookClient=new WebhookClient(
    process.env.WEBHOOK_ID,
    process.env.WEBHOOK_TOKEN,
);

const PREFIX='$';

client.on('ready',()=>{
    console.log(`${client.user.tag} has logged in`);
});

client.on('message',async(message)=>{
    if(message.author.bot) return;
    console.log(`[${message.author.tag}]:${message.content}`);
/*  if(message.content==='hello')
    {
        //message.reply("Hello! "+`${message.author.username}`);
        message.channel.send(message.content);
    }*/
    if(message.content.startsWith(PREFIX))
    {
        const [CMD_NAME, ...args]=message.content.trim().substring(PREFIX.length).split(/\s+/);
        /*if(CMD_NAME=="kick")
            message.channel.send("Kicked the user");
        else if(CMD_NAME=="ban")
            message.channel.send("User Banned");*/
        if(CMD_NAME==="kick")
        {
            if(!message.member.hasPermission('KICK_MEMBERS'))
                return message.reply("You do not permission to use that command :(")
            if(args.length===0) return message.reply("Please provide an ID");
            const member=message.guild.members.cache.get(args[0]);
            console.log(member);
            if(member){
                member
                .kick()
                .then((member)=>message.channel.send(`${member} kicked out`))
                .catch((err)=>message.channel.send(`I dont have the permission :( `));
                }
            else
                message.channel.send("Member not found");
        }
        else if(CMD_NAME==="ban")
        {
                if(!message.member.hasPermission('BAN_MEMBERS'))
                    return message.reply("You do not permission to use that command :(")
                if(args.length===0) return message.reply("Please provide an ID");
                
                try{
                    const user= await message.guild.members.ban(args[0]);
                    message.channel.send("User was banned successfully");
                }
                catch(err)
                {
                    console.log(err);
                    message.channel.send("An error occured! Either I do not have permission or the user was not found");
                }
        }
        else if(CMD_NAME==='announce')
        {
            console.log(args);
            const msg=args.join(' ');
            console.log(msg);
            webhookClient.send(msg);
        }
    }    
});

client.on('messageReactionAdd',(reaction,user)=>{
    const {name}=reaction.emoji;
    const member=reaction.message.guild.members.cache.get(user.id);
    if(reaction.message.id==='855877129227993098')
    {
        switch(name)
        {
            case '🍉'://python
                member.roles.add('855877260682723328');
                break;
            case '🍌'://C++
                member.roles.add('855877741780795402');
                break;
            case '🍎'://java
                member.roles.add('855877343079825438');
                break;
            case '🍇'://C
                member.roles.add('855877546675535894');
                break;
        }
    }
});

client.on('messageReactionRemove',(reaction,user)=>{
    const {name}=reaction.emoji;
    const member=reaction.message.guild.members.cache.get(user.id);
    if(reaction.message.id==='855877129227993098')
    {
        switch(name)
        {
            case '🍉'://python
                member.roles.remove('855877260682723328');
                break;
            case '🍌'://C++
                member.roles.remove('855877741780795402');
                break;
            case '🍎'://java
                member.roles.remove('855877343079825438');
                break;
            case '🍇'://C
                member.roles.remove('855877546675535894');
                break;
        }
    }
})

client.login(process.env.DISCORDJS_BOT_TOKEN);

