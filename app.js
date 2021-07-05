require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');
const moment = require('moment');
const fetch = require('node-fetch');

const token = process.env.TOKEN;

const bot = new TelegramBot(token, {
  polling: true
});

const dates = [];
const days = [];

for (let i = 0; i < 6; i++) {
  dates.push(moment().add(i, 'days').format('DD MMM'));
  days.push(moment().add(i, 'days').format('dddd'));
}

bot.onText(/\/play/, msg => {
  const chatId = msg.chat.id;
  const name = msg.from.first_name;
  bot.sendMessage(
    chatId,
    `Hello ${name}, it seems you abit gien to play mahjong. When you want to play?`,
    {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: `Today ${dates[0]}`,
              callback_data: `day1/${days[0]}/${dates[0]}`,
            },
            {
              text: `Tomorrow ${dates[1]}`,
              callback_data: `day2/${days[1]}/${dates[1]}`,
            },
          ],
          [
            {
              text: dates[2],
              callback_data: `day3/${days[2]}/${dates[2]}`,
            },
            {
              text: dates[3],
              callback_data: `day4/${days[3]}/${dates[3]}`,
            },
          ],
          [
            {
              text: dates[4],
              callback_data: `day5/${days[4]}/${dates[4]}`,
            },
            {
              text: dates[5],
              callback_data: `day6/${days[5]}/${dates[5]}`,
            },
          ],
        ],
      },
    }
  )
});

bot.onText(/\/status/, msg => {
  const chatId = msg.chat.id;
  let text = '';
  scheduled.forEach((el, i) => {
    const players = el.players.join(', ');
    text += `${i + 1} - ${el.date}, ${el.time}
      Players: ${players}
`
  });
  bot.sendMessage(
    chatId,
    text
  );
});

bot.onText(/\/join/, msg => {
  const chatId = msg.chat.id;
  let buttons = [];
  scheduled.forEach((el, i) => {
    const players = el.players.join(', ')
    buttons.push([{
      text: `${i + 1} - ${el.date}, ${el.time}
        Players: ${players}`,
      callback_data: `join/${el._id}`,
    }]);
  });
  bot.sendMessage(chatId, `Select a session to join.`, {
    reply_markup: {
      inline_keyboard: buttons,
    },
  });
});

let hours = '00';
let minutes = '00';
let date;
let day;
const scheduled = [];

bot.on('callback_query', (callbackQuery) => {
  const chatId = callbackQuery.message.chat.id;
  const messageId = callbackQuery.message.message_id;
  const name = callbackQuery.from.first_name;
  const data = callbackQuery.data.split('/');
  const option = data[0];
  if (data[1] && option.search('day') >= 0) {
    console.log('setting day');
    day = data[1];
  }
  if (data[2] && option.search('day') >= 0) {
    console.log('setting date');
    date = data[2];
    scheduled.push(
      {
        _id: messageId,
        start: name,
        date: `${date}, ${day}`,
        players: [name]
      }
    );
  }
  switch(option) {
    case 'day1':
      bot.sendMessage(
        chatId,
        `Wa, got so gien until want play today? Ok la, what time?`,
        {
          reply_markup: {
            inline_keyboard: [
              [
                {
                  text: '+',
                  callback_data: 'plusHours',
                },
                {
                  text: '+',
                  callback_data: 'plusMinutes',
                }
              ],
              [
                {
                  text: hours,
                  callback_data: 'aaa'
                },
                {
                  text: minutes,
                  callback_data: 'bbb'
                }
              ],
              [
                {
                  text: '-',
                  callback_data: 'minusHours'
                },
                {
                  text: '-',
                  callback_data: 'minusMinutes'
                }
              ],
              [
                {
                  text: 'Confirm',
                  callback_data: 'confirmTime'
                }
              ]
            ],
          },
        }
      );
      bot.editMessageReplyMarkup(
        {
          inline_keyboard: [],
        },
        {
          chat_id: chatId,
          message_id: messageId,
        }
      );
      break;
    case 'day2':
      bot.sendMessage(
        chatId,
        `Wait until tomorrow for what, might as well play today. Maybe you not free give chance. What time leh?`,
        {
          reply_markup: {
            inline_keyboard: [
              [
                {
                  text: '+',
                  callback_data: 'plusHours',
                },
                {
                  text: '+',
                  callback_data: 'plusMinutes',
                },
              ],
              [
                {
                  text: hours,
                  callback_data: 'aaa',
                },
                {
                  text: minutes,
                  callback_data: 'bbb',
                },
              ],
              [
                {
                  text: '-',
                  callback_data: 'minusHours',
                },
                {
                  text: '-',
                  callback_data: 'minusMinutes',
                },
              ],
              [
                {
                  text: 'Confirm',
                  callback_data: 'confirmTime',
                },
              ],
            ],
          },
        }
      );
      bot.editMessageReplyMarkup(
        {
          inline_keyboard: [],
        },
        {
          chat_id: chatId,
          message_id: messageId,
        }
      )
      break;
    case 'day3':
      bot.sendMessage(
        chatId,
        `${day} ah? I like the way you think. Still must give them timing to fall in correct?`,
        {
          reply_markup: {
            inline_keyboard: [
              [
                {
                  text: '+',
                  callback_data: 'plusHours',
                },
                {
                  text: '+',
                  callback_data: 'plusMinutes',
                },
              ],
              [
                {
                  text: hours,
                  callback_data: 'aaa',
                },
                {
                  text: minutes,
                  callback_data: 'bbb',
                },
              ],
              [
                {
                  text: '-',
                  callback_data: 'minusHours',
                },
                {
                  text: '-',
                  callback_data: 'minusMinutes',
                },
              ],
              [
                {
                  text: 'Confirm',
                  callback_data: 'confirmTime',
                },
              ],
            ],
          },
        }
      );
      bot.editMessageReplyMarkup(
        {
          inline_keyboard: [],
        },
        {
          chat_id: chatId,
          message_id: messageId,
        }
      )
      break;
    case 'day4':
      bot.sendMessage(
        chatId,
        `${day}? You planning wedding dinner is it? Must be busy la. What time you want?`,
        {
          reply_markup: {
            inline_keyboard: [
              [
                {
                  text: '+',
                  callback_data: 'plusHours',
                },
                {
                  text: '+',
                  callback_data: 'plusMinutes',
                },
              ],
              [
                {
                  text: hours,
                  callback_data: 'aaa',
                },
                {
                  text: minutes,
                  callback_data: 'bbb',
                },
              ],
              [
                {
                  text: '-',
                  callback_data: 'minusHours',
                },
                {
                  text: '-',
                  callback_data: 'minusMinutes',
                },
              ],
              [
                {
                  text: 'Confirm',
                  callback_data: 'confirmTime',
                },
              ],
            ],
          },
        }
      );
      bot.editMessageReplyMarkup(
        {
          inline_keyboard: [],
        },
        {
          chat_id: chatId,
          message_id: messageId,
        }
      )
      break;
    case 'day5':
      bot.sendMessage(
        chatId,
        `Wa knn, ${day} your special day to win everyone's money is it? What time you want to zi mo?`,
        {
          reply_markup: {
            inline_keyboard: [
              [
                {
                  text: '+',
                  callback_data: 'plusHours',
                },
                {
                  text: '+',
                  callback_data: 'plusMinutes',
                },
              ],
              [
                {
                  text: hours,
                  callback_data: 'aaa',
                },
                {
                  text: minutes,
                  callback_data: 'bbb',
                },
              ],
              [
                {
                  text: '-',
                  callback_data: 'minusHours',
                },
                {
                  text: '-',
                  callback_data: 'minusMinutes',
                },
              ],
              [
                {
                  text: 'Confirm',
                  callback_data: 'confirmTime',
                },
              ],
            ],
          },
        }
      );
      bot.editMessageReplyMarkup(
        {
          inline_keyboard: [],
        },
        {
          chat_id: chatId,
          message_id: messageId,
        }
      )
      break;
    case 'day6':
      bot.sendMessage(
        chatId,
        `You choose ${day} on purpose is it? Wait until so long must be go pray 财神爷 give you good luck. What time he ask you play?`,
        {
          reply_markup: {
            inline_keyboard: [
              [
                {
                  text: '+',
                  callback_data: 'plusHours',
                },
                {
                  text: '+',
                  callback_data: 'plusMinutes',
                },
              ],
              [
                {
                  text: hours,
                  callback_data: 'aaa',
                },
                {
                  text: minutes,
                  callback_data: 'bbb',
                },
              ],
              [
                {
                  text: '-',
                  callback_data: 'minusHours',
                },
                {
                  text: '-',
                  callback_data: 'minusMinutes',
                },
              ],
              [
                {
                  text: 'Confirm',
                  callback_data: 'confirmTime',
                },
              ],
            ],
          },
        }
      );
      bot.editMessageReplyMarkup(
        {
          inline_keyboard: [],
        },
        {
          chat_id: chatId,
          message_id: messageId,
        }
      )
      break;
    case 'plusHours':
      if (hours === 23 || hours === '23') {
        hours = 00;
      }
      else {
        hours = parseInt(hours) + 1;
      }
      if (hours >= 0 && hours < 10) {
        hours = `0${hours}`
      }
      bot.editMessageReplyMarkup(
        {
          inline_keyboard: [
            [
              {
                text: '+',
                callback_data: 'plusHours',
              },
              {
                text: '+',
                callback_data: 'plusMinutes',
              },
            ],
            [
              {
                text: hours,
                callback_data: 'aaa',
              },
              {
                text: minutes,
                callback_data: 'bbb',
              },
            ],
            [
              {
                text: '-',
                callback_data: 'minusHours',
              },
              {
                text: '-',
                callback_data: 'minusMinutes',
              },
            ],
            [
              {
                text: 'Confirm',
                callback_data: 'confirmTime'
              }
            ]
          ],
        },
        {
          chat_id: chatId,
          message_id: messageId
        }
      )
      break;
    case 'minusHours':
      if (hours === 00 || hours === '00') {
        hours = 23;
      }
      else {
        hours = parseInt(hours) - 1;
      }
      if (hours >= 0 && hours < 10) {
        hours = `0${hours}`;
      }
      bot.editMessageReplyMarkup(
        {
          inline_keyboard: [
            [
              {
                text: '+',
                callback_data: 'plusHours',
              },
              {
                text: '+',
                callback_data: 'plusMinutes',
              },
            ],
            [
              {
                text: hours,
                callback_data: 'aaa',
              },
              {
                text: minutes,
                callback_data: 'bbb',
              },
            ],
            [
              {
                text: '-',
                callback_data: 'minusHours',
              },
              {
                text: '-',
                callback_data: 'minusMinutes',
              },
            ],
            [
              {
                text: 'Confirm',
                callback_data: 'confirmTime'
              }
            ]
          ],
        },
        {
          chat_id: chatId,
          message_id: messageId,
        }
      )
      break;
    case 'plusMinutes':
      if (minutes === 50 || minutes === '50') {
        minutes = 0;
      }
      else {
        minutes = parseInt(minutes) + 10;
      }
      if (minutes >= 0 && minutes < 10) {
        minutes = `0${minutes}`;
      }
      bot.editMessageReplyMarkup(
        {
          inline_keyboard: [
            [
              {
                text: '+',
                callback_data: 'plusHours',
              },
              {
                text: '+',
                callback_data: 'plusMinutes',
              },
            ],
            [
              {
                text: hours,
                callback_data: 'aaa',
              },
              {
                text: minutes,
                callback_data: 'bbb',
              },
            ],
            [
              {
                text: '-',
                callback_data: 'minusHours',
              },
              {
                text: '-',
                callback_data: 'minusMinutes',
              },
            ],
            [
              {
                text: 'Confirm',
                callback_data: 'confirmTime'
              }
            ]
          ],
        },
        {
          chat_id: chatId,
          message_id: messageId,
        }
      )
      break;
    case 'minusMinutes':
      if (minutes === 00 || minutes === '00') {
        minutes = 50;
      }
      else {
        minutes = parseInt(minutes) - 10;
      }
      if (minutes >= 0 && minutes < 10) {
        minutes = `0${minutes}`;
      }
      bot.editMessageReplyMarkup(
        {
          inline_keyboard: [
            [
              {
                text: '+',
                callback_data: 'plusHours',
              },
              {
                text: '+',
                callback_data: 'plusMinutes',
              },
            ],
            [
              {
                text: hours,
                callback_data: 'aaa',
              },
              {
                text: minutes,
                callback_data: 'bbb',
              },
            ],
            [
              {
                text: '-',
                callback_data: 'minusHours',
              },
              {
                text: '-',
                callback_data: 'minusMinutes',
              },
            ],
            [
              {
                text: 'Confirm',
                callback_data: 'confirmTime'
              }
            ]
          ],
        },
        {
          chat_id: chatId,
          message_id: messageId,
        }
      )
      break;
    case 'confirmTime':
      bot.editMessageReplyMarkup(
        {
          inline_keyboard: []
        },
        {
          chat_id: chatId,
          message_id: messageId
        }
      );
      scheduled.forEach(el => {
        if (el.start === name) {
          el.time = `${hours}:${minutes}`
        }
      });
      bot.sendMessage(
        chatId,
        `Who else want to play with ${name} on the ${date}, ${day} at ${hours}:${minutes}?`
      );
      break;
    case 'join':
      const joinId = parseInt(callbackQuery.data.split('/')[1]);
      scheduled.forEach(el => {
        if (el._id === joinId) {
          el.players.push(name);
        }
      });
      let text = '';
      scheduled.forEach((el, i) => {
        const players = el.players.join(', ')
        text += `${i + 1} - ${el.date}, ${el.time}
      Players: ${players}
`
      });
      bot.editMessageReplyMarkup(
        {
          inline_keyboard: [],
        },
        {
          chat_id: chatId,
          message_id: messageId,
        }
      );
      bot.sendMessage(
        chatId,
        text
      );
      break;
  }
});

bot.on('polling_error', (err) => {
  console.log(err);
});