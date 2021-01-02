BOT_TOKEN = '1383563341:AAEACI6lxvQQzHHoodHGN3Nh9_5YKiJ6isI'
const telebot = require('node-telegram-bot-api')
const request = require('request')


const bot = new telebot(BOT_TOKEN, {polling: true})

const notes = []

bot.onText(/\/curse (.+)/, (msg, match) => {
    const chatId = msg.chat.id

    bot.sendMessage(chatId, 'какая валюта вас интересует?', {
        reply_markup: {
            inline_keyboard: [
                [
                    {
                        text: 'EUR',
                        callback_data: 'EUR'
                    }
                ],
                [
                    {
                        text: 'USD',
                        callback_data: 'USD'
                    }
                ],
                [
                    {
                        text: 'RUR',
                        callback_data: 'RUR'
                    },
                ],
                [
                    {
                        text: 'BTC',
                        callback_data: 'BTC'
                    }
                ],

            ]
        }
    })

})

bot.on('callback_query', query => {
    const id = query.message.chat.id

    request('https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5', (err, resp, body) => {
        const data = JSON.parse(body)
        const result = data.filter(item => item.ccy === query.data)[0]
        let md = `
            *${result.ccy} ---> ${result.base_ccy}*
            Buy: ${result.buy}
            Sale: ${result.sale}
        `
        console.log(result)
        bot.sendMessage(id, md, {parse_mode: 'Markdown'})
    })
})

