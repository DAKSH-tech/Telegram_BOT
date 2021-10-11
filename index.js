const express=require('express');
const app=express();
const port=8000;
const mongoose=require('mongoose');
const db=require('./config/mongoose');
//https://telegraf.js.org/
const { Telegraf } = require('telegraf');
const User=require('./model/user');
require('dotenv').config()
const bot = new Telegraf(process.env.BOT_TOKEN)
const welcome_message='Welcome,Please Enter Your Details\n'+
                    'Enter your name with command /name Your_name\n'+
                    'then Enter email with command /email Your_email\n'+
                    'then enter phone no with command /phone Your_phone\n'+
                    'then enter location command /location Your_city\n';
bot.start((ctx) => ctx.reply(welcome_message))
bot.help((ctx) => ctx.reply('Send me a sticker'))
bot.hears(['hello','hi','Hello','Hi','Hey'],(ctx)=>{
    ctx.reply('Namaste '+ctx.from.first_name)
})
bot.command('name',(ctx)=>{
    msg=ctx.message.text
    msgAray=msg.split(' ')
    msgAray.shift()
    Name=msgAray.join(' ')
    bot.command('email',(ctx)=>{
        msg=ctx.message.text
        msgAray=msg.split(' ')
        msgAray.shift()
        Email=msgAray.join(' ')
    })
    bot.command('phone',(ctx)=>{
        msg=ctx.message.text
        msgAray=msg.split(' ')
        msgAray.shift()
        Phone=msgAray.join(' ')
    })
    bot.command('location',(ctx)=>{
        msg4=ctx.message.text
        msgAray4=msg4.split(' ')
        msgAray4.shift()
        Location=msgAray4.join(' ')
        ctx.reply("Your Details are\n"+"Your Name- "+Name+"\n"+"Your Email- "+Email+"\n"+"Your Phone- "+Phone+"\n"+"Your Location- "+Location)
        User.create({
            name:Name,
            email:Email,
            phone_no:parseInt(Phone),
            location:Location
        })
    })
})
bot.on('text', (ctx) => {
    ctx.reply('You can use /start command')
})
bot.on('sticker', (ctx) => ctx.reply('Bhai Sticker mat bhej'))
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))
bot.launch()
app.listen(port,function(err){
    if(err){
        // This is interpolation=Embed the variable in string
        console.log(`Error in running the server: ${err}`);
    }
    console.log(`Server is running on port: ${port}`)
});
