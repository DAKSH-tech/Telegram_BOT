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
const welcome_message='Welcome ';
const command_list='You can type <Add Detail> to add your data\nYou can type <My Details> to see your details\nYou can say hello,hi,etc\nYou can send a sticker also';
const user_validation='Enter Your Details\n'+
                    'Your name with command /name Your_name\n'+
                    'then Enter email with command /email Your_email\n'+
                    'then enter phone no with command /phone Your_phone\n'+
                    'then enter location command /location Your_city\n';
bot.start((ctx) => ctx.reply(welcome_message+ctx.from.first_name+"\n"+command_list))
bot.help((ctx) => ctx.reply('Send me a sticker'))
bot.hears(['hello','hi','Hello','Hi','Hey'],(ctx)=>{
    ctx.reply('Namaste '+ctx.from.first_name)
})
bot.hears('Add Detail',function(ctx){
    ctx.reply(user_validation)
})
bot.hears('My Details',function(ctx){
    const query=ctx.from.first_name;
    User.find({name:query},function(err,detail){
        if(err){
            console.log('Error in extracting the data');
        }
        if(detail.length){
            ctx.reply("Your Details are\n"+"Your Name- "+detail[0].name+"\n"+"Your Email- "+detail[0].email+"\n"+"Your Phone- "+detail[0].phone_no+"\n"+"Your Location- "+detail[0].location)
        }
        })
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
        },function(err){
            if(err){
                console.log('User is creating existing data');
                ctx.reply('Number are already in database,please give input again')
            }
        })
    })
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
