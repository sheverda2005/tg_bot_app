const TelegramApi = require("node-telegram-bot-api");
const mongoose = require("mongoose");
const UserSchema = require("./models/UserSchema");
const express = require("express");


const token = '7351379437:AAG3HCAVluQmy2aCXIIyc60taDkdDvhYIuU'
const dbURI = 'mongodb+srv://nsewerda04:soket775@cluster0.kkg0ems.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
const PORT = process.env.PORT || 3000;



const bot = new TelegramApi(token);

bot.setWebHook('https://tg-bot-app-plum.vercel.app/webhook');

bot.getWebHookInfo().then((info) => {
    console.log(info);
});




let userState = {};

const userInfo = {
    id_user: "",
    name: "",
    user_name: "",
    hear_about_us: "",
    user_experience: ""
}

const app = express()

app.get("/", async (req, res) => {
    res.send("Work!");
})

app.listen(PORT, ()=> {
    console.log('Server has been working')
})


app.post('/webhook', express.json(), (req, res) => {
    bot.processUpdate(req.body);
    res.sendStatus(200);
});

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err))

bot.onText(/\/start/, async (msg) => {
    userState = {}
    userInfo.name = ""
    userInfo.user_experience = ""
    userInfo.user_name = ""
    userInfo.hear_about_us = ""
    userInfo.id_user = ""
    const chatId = msg.chat.id;

    const user = await UserSchema.findOne({id_user: msg.from.id})

    if (user) {
        let main_text = "<b>🌐 Информация INFINITY TEAM</b>\n\n" +
            "<b>👤 Проценты воркера</b>\n" +
            "<b>┣ Пополнение: 90%</b>\n" +
            "<b>┣ Пополнение ТП: 80%</b>\n" +
            "<b>┣ Обнал: 60%</b>\n\n" +
            "<b>📈 Основные направления работы</b>\n" +
            "<b>┣ ESCORT</b>\n" +
            "<b>┣ TRADE (в разработке) </b>\n" +
            "<b>┣ NFT (в разработке) </b>\n" +
            "<b>┣ CASINO (в разработке) </b>\n" +
            "<b>┣ EXCHANGER (в разработке) </b>\n"
        await bot.sendMessage(chatId, main_text, {parse_mode: "HTML", reply_markup: JSON.stringify({
                inline_keyboard: [
                    [{text: "💬 Общий чат", url: "https://t.me/+7lDgYSLAg3Q1ZWQ6", callback_data: "chat"}],
                    [{text: "Выплаты 💰", url: "https://t.me/+7lDgYSLAg3Q1ZWQ6", callback_data: "chat"}, {text: "Панель для работы 📘", url: "https://t.me/+7lDgYSLAg3Q1ZWQ6"}],
                    [{text: "Мануалы 📂", url: "https://t.me/+7lDgYSLAg3Q1ZWQ6", callback_data: "chat"}, {text: "Правила 📄", callback_data: "main_menu_rules"}],
                ]
            })})
    } else {
        let text = '🔹 Добро пожаловать в <b>INFINITY TEAM</b>\n\n' +
            `Жми на кнопку, чтобы подать заявку в команду`
        await bot.sendPhoto(chatId, "images/welcome.jpg", {
            caption: text,
            parse_mode: 'HTML',
            reply_markup: JSON.stringify({
                inline_keyboard: [
                    [{ text: "🗳 Подать заявку", callback_data: "apply"}],
                ]
            })
        });
    }

});

bot.on("callback_query", async (msg) => {
    const chatId = msg.message.chat.id;
    userInfo.id_user = msg.from.id;
    userInfo.user_name = msg.from.username;
    userInfo.name = msg.from.first_name;
    let message_rules_id = null;
    if (msg.data === "apply" || msg.data === "agree_rules") {
        let text = '<b>⛔️ Правилами команды строго запрещается:</b>\n' +
            `<em>•  Приём на свои кошельки/реквизиты.</em>\n` +
            `<em>•  Обман администрации проекта.</em>\n` +
            `<em>•  Обход ограничений.</em>\n` +
            `<em>•  Неподобающе поведение. </em>\n` +
            `<em>•  Реклама.</em>\n` +
            `<em>•  Попрошайничество.</em>\n` +
            `<em>•  Отправка NSFW и NSFL контента.</em>\n` +
            `<em>•  Организация конфликтов на фоне политики/религии.</em>\n` +
            `<em>•  Представление кем-либо из СТАФФА.</em>\n` +
            `<em>•  Дезинформирование кого либо о любых проектах касаемо</em>\n` +
            `<em>INFINITY TEAM, или совершение действий, нацеленных на подрыв репутации INFINITY TEAM.</em>\n`

        await bot.deleteMessage(chatId, msg.message.message_id)
        bot.sendMessage(chatId, text, {
            parse_mode: "HTML", reply_markup: JSON.stringify({
                inline_keyboard: [
                    [{text: "✅ Согласен", callback_data: "agree_rules"}],
                ]
            })
        }).then((sentMsg) => {
            message_rules_id = sentMsg.message_id;
            let text_change = '<b>⛔️ Правилами команды строго запрещается:</b>\n' +
                `<em>•  Приём на свои кошельки/реквизиты.</em>\n` +
                `<em>•  Обман администрации проекта.</em>\n` +
                `<em>•  Обход ограничений.</em>\n` +
                `<em>•  Неподобающе поведение. </em>\n` +
                `<em>•  Реклама.</em>\n` +
                `<em>•  Попрошайничество.</em>\n` +
                `<em>•  Отправка NSFW и NSFL контента.</em>\n` +
                `<em>•  Организация конфликтов на фоне политики/религии.</em>\n` +
                `<em>•  Представление кем-либо из СТАФФА.</em>\n` +
                `<em>•  Дезинформирование кого либо о любых проектах касаемо</em>\n` +
                `<em>INFINITY TEAM, или совершение действий, нацеленных на подрыв репутации INFINITY TEAM.</em>\n\n` +
                `✅ Вы ознакомились с правилами проекта`
            if (msg.data === "agree_rules") {
                bot.editMessageText(text_change, {
                    chat_id: chatId,
                    message_id: message_rules_id,
                    parse_mode: 'HTML'
                });
                bot.sendMessage(chatId, "- Откуда Вы узнали о нас?")
                userState[chatId] = {step: "hear_about_us"}
            }
        })
    } else if (msg.data === "cancel_application") {
        await bot.deleteMessage(chatId, msg.message.message_id)
        let text = '🔹 Добро пожаловать в <b>ONE TEAM</b>\n\n' +
            `Жми на кнопку, чтобы подать заявку в команду`
        await bot.sendMessage(chatId, text, {parse_mode: "HTML",  reply_markup: JSON.stringify({
                inline_keyboard: [
                    [{ text: "🗳 Подать заявку", callback_data: "apply"}],
                ]
            })});
    } else if (msg.data === "send_application") {
        await bot.deleteMessage(chatId, msg.message.message_id)
        const text = "<b>✈️ Для подачи заявки, вам необходимо вступить в чат команды!</b>"
        userState = {
            step: "chat_add",
            chat: chatId
        }
        await bot.sendMessage(chatId, text, {parse_mode: "HTML", reply_markup: JSON.stringify({
                inline_keyboard: [
                    [{text: "💬 Вступить в чат", url: "https://t.me/+7lDgYSLAg3Q1ZWQ6", callback_data: "chat"}],
                ]
            })})

    } else if (msg.data === "main_menu_rules") {
        await bot.deleteMessage(chatId, msg.message.message_id)
        let text_change = '<b>⛔️ Правилами команды строго запрещается:</b>\n' +
            `<em>•  Приём на свои кошельки/реквизиты.</em>\n` +
            `<em>•  Обман администрации проекта.</em>\n` +
            `<em>•  Обход ограничений.</em>\n` +
            `<em>•  Неподобающе поведение. </em>\n` +
            `<em>•  Реклама.</em>\n` +
            `<em>•  Попрошайничество.</em>\n` +
            `<em>•  Отправка NSFW и NSFL контента.</em>\n` +
            `<em>•  Организация конфликтов на фоне политики/религии.</em>\n` +
            `<em>•  Представление кем-либо из СТАФФА.</em>\n` +
            `<em>•  Дезинформирование кого либо о любых проектах касаемо</em>\n` +
            `<em>INFINITY TEAM, или совершение действий, нацеленных на подрыв репутации INFINITY TEAM.</em>\n\n`
        await bot.sendMessage(chatId, text_change, {parse_mode: "HTML", reply_markup: JSON.stringify({
                inline_keyboard: [
                    [{text: "↩ Вернуться", callback_data: "main_menu"}],
                ]
            })})
    } else if (msg.data === "main_menu") {
        await bot.deleteMessage(chatId, msg.message.message_id)
        let main_text = "<b>🌐 Информация INFINITY TEAM</b>\n\n" +
            "<b>👤 Проценты воркера</b>\n" +
            "<b>┣ Пополнение: 90%</b>\n" +
            "<b>┣ Пополнение ТП: 80%</b>\n" +
            "<b>┣ Обнал: 60%</b>\n\n" +
            "<b>📈 Основные направления работы</b>\n" +
            "<b>┣ ESCORT</b>\n" +
            "<b>┣ TRADE (в разработке) </b>\n" +
            "<b>┣ NFT (в разработке) </b>\n" +
            "<b>┣ CASINO (в разработке) </b>\n" +
            "<b>┣ EXCHANGER (в разработке) </b>\n"
        await bot.sendMessage(chatId, main_text, {parse_mode: "HTML", reply_markup: JSON.stringify({
                inline_keyboard: [
                    [{text: "💬 Общий чат", url: "https://t.me/+7lDgYSLAg3Q1ZWQ6", callback_data: "chat"}],
                    [{text: "Выплаты 💰", url: "https://t.me/+7lDgYSLAg3Q1ZWQ6", callback_data: "chat"}, {text: "Панель для роботы 📘", url: "https://t.me/+7lDgYSLAg3Q1ZWQ6"}],
                    [{text: "Мануалы 📂", url: "https://t.me/+7lDgYSLAg3Q1ZWQ6", callback_data: "chat"}, {text: "Правила 📄", callback_data: "main_menu_rules"}],
                ]
            })})
    }
})

bot.on("message", async (msg) => {
    const chatId = msg.chat.id;
    if (userState[chatId]?.step === "hear_about_us") {
        userInfo.hear_about_us = msg.text;
        await bot.sendMessage(chatId, "- Имеется опыт работы в данной сфере?")
        userState[chatId].step = "user_experience"
    } else if (userState[chatId]?.step === "user_experience") {
        userInfo.user_experience = msg.text;
        await bot.sendMessage(chatId, "✅ Заявка создана")
        const text = "<b>📃 Ваша заявка готова</b>\n\n" +
            `Откуда узнали: ${userInfo.hear_about_us}\n\n` +
            `Опыт: ${userInfo.user_experience}\n\n` +
            "<b>❗ Прошу не спамить заявками, мы видим каждую заявку, в случае спама вы будете заблокированы ❗</b>"
        await bot.sendMessage(chatId, text, {parse_mode: "HTML", reply_markup: JSON.stringify({
                inline_keyboard: [
                    [{text: "✅ Отправить", callback_data: "send_application"}],
                    [{text: "❌ Отмена", callback_data: "cancel_application"}]
                ]
            })})
    }
})



bot.on('message',  (msg) => {
    if ((msg.chat.type === 'group' || msg.chat.type === 'supergroup') && userState.step === "chat_add") {
        const group_chat_id = msg.chat.id;
        bot.getChatMember(group_chat_id, userInfo.id_user).then((chatMember) => {
            if (chatMember.status === 'member' || chatMember.status === 'administrator' || chatMember.status === 'creator') {
                console.log(userInfo)
                const user = new UserSchema(userInfo)
                user.save()
                bot.sendMessage(userState.chat, "<b>Ваша заявка принята!</b>", {parse_mode: "HTML"}).then(()=> {
                    let main_text = "<b>🌐 Информация INFINITY TEAM</b>\n\n" +
                        "<b>👤 Проценты воркера</b>\n" +
                        "<b>┣ Пополнение: 90%</b>\n" +
                        "<b>┣ Пополнение ТП: 80%</b>\n" +
                        "<b>┣ Обнал: 60%</b>\n\n" +
                        "<b>📈 Основные направления работы</b>\n" +
                        "<b>┣ ESCORT</b>\n" +
                        "<b>┣ TRADE (в разработке) </b>\n" +
                        "<b>┣ NFT (в разработке) </b>\n" +
                        "<b>┣ CASINO (в разработке) </b>\n" +
                        "<b>┣ EXCHANGER (в разработке) </b>\n"
                     bot.sendMessage(userState.chat, main_text, {parse_mode: "HTML", reply_markup: JSON.stringify({
                            inline_keyboard: [
                                [{text: "💬 Общий чат", url: "https://t.me/+7lDgYSLAg3Q1ZWQ6", callback_data: "chat"}],
                                [{text: "Выплаты 💰", url: "https://t.me/+7lDgYSLAg3Q1ZWQ6", callback_data: "chat"}, {text: "Панель для работы 📘", url: "https://t.me/+7lDgYSLAg3Q1ZWQ6"}],
                                [{text: "Мануалы 📂", url: "https://t.me/+7lDgYSLAg3Q1ZWQ6", callback_data: "chat"}, {text: "Правила 📄", callback_data: "main_menu_rules"}],
                            ]
                        })})
                })
                userState.step = "main_menu";
            } else {
                console.log('Пользователь не является участником чата.');
            }
        }).catch((error) => {
            console.error('Ошибка при получении информации о пользователе:', error);
        });
    }
});


