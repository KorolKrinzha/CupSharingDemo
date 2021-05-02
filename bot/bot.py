from aiogram import Bot, Dispatcher, executor, types
from aiogram.utils.markdown import text, bold, italic, pre
from aiogram.utils.emoji import emojize
from aiogram.types import ParseMode, InputMediaPhoto
from aiogram.types.message import ContentType
from aiogram.utils.emoji import emojize

import directions

from config import TOKEN
import cupsharing


bot = Bot(token=TOKEN)
dp = Dispatcher(bot)


@dp.message_handler(commands=['start'])
async def start(message: types.Message):
    message_text = text(cupsharing.messagehi, '/help')
    await message.reply(message_text, parse_mode=ParseMode.MARKDOWN)


@dp.message_handler(commands=['help'])
async def help(message: types.Message):
    message_text = text(cupsharing.messagehi, '/rent')
    await message.reply(message_text, parse_mode=ParseMode.MARKDOWN)


@dp.message_handler(commands='rent')
async def start_cmd_handler(message: types.Message):
    keyboard_markup = types.InlineKeyboardMarkup(row_width=1)

    answers = (
        ('ДА!', 'yes'),
        ("Нет", "no")

    )

    row_btns = (types.InlineKeyboardButton(text, callback_data=data)
                for text, data in answers)

    keyboard_markup.row(*row_btns)

    await message.reply("Хочешь забронировать стаканчик?", reply_markup=keyboard_markup)


@dp.callback_query_handler(text='no')
@dp.callback_query_handler(text='yes')
async def cupanswer(query: types.CallbackQuery):
    answer_data = query.data

    if answer_data == 'yes':
        response = 'Круто! Я посмотрю, что можно сделать...'
        

    elif answer_data == 'no':
        response = text(emojize('Ну лан... :cry: '))
    else:
        response = f'Unexpected callback data {answer_data!r}!'
    if directions.showresults()==[]:
        print("no")
    else:  
        print(directions.showresults())

    await bot.send_message(query.from_user.id, response, parse_mode=ParseMode.MARKDOWN)












    


@dp.message_handler(content_types=ContentType.ANY)
async def unknown_message(msg: types.Message):
    message_text = text('Прошу прощения, я не смог обработать Ваш запрос... ',
                        '\nНо у нас есть волшебная',
                        italic('специальная команда,'), 'которая называется',
                        '/help', '\nОна поможет')
    await msg.reply(message_text, parse_mode=ParseMode.MARKDOWN)


# @dp.message_handler(commands=['emoji'])
# async def hi(message: types.Message):

#     message_text = text(emojize('Я не знаю, что с этим делать :astonished:'),
#                         italic('\nЯ просто напомню,'), 'что есть',
#                         code('команда'), '/help')
# #     await msg.reply(message_text, parse_mode=ParseMode.MARKDOWN)

# @dp.message_handler()
# async def echo_message(msg: types.Message):
#     await bot.send_message(msg.from_user.id, msg.text)


if __name__ == '__main__':
    executor.start_polling(dp)
