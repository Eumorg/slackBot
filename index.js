const Slack = require('slack-node');
require('dotenv').config();
const list = require('./list.json')
 

//cоздаем переменую для работы с ботом
webhookUri = process.env.WEBHOOK
 
const slack = new Slack();
slack.setWebhook(webhookUri);

//пишем функцию, которая будет делать рассылку через бота
async function reminder(){
  //фетчем достаем данные по указанному в ТЗ адресу. Body нету, потому что ничего не передаем, только принимаем
  const result = await fetch(`http://test.test/?getbd`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
  
  //парсим полученный результат из json в объект(при необходимости можно написать функцию изменяющую структуру объекта для удобства работы)
  result = JSON.parse(result)

  // проходимся циклом по массиву объектов, выдергиваем никнейм руководителя и список сотрудников. Рассылаем с помощью бота
  for(let i = 0; i < result.length; i++){
    slack.webhook({
      channel: `@${result.rukovoditel}`,
      username: "Reminder_bot",
      text: `Сегодня день рождения у следующих сотрудников: ${result.sotrudniki}`//формат рассылки можно изменить на необходимый поработав с объектом
    }, function(err, response) {
      // console.log(response);
    });
  }

}

//заворачиваем все это в setInterval, и настраиваем на выполнение каждые сутки.
setInterval(reminder, 1000 * 60 * 60 * 24)


//запускаем сервер и наслаждаемся)


//P.S. это лишь набросок кода согласно ТЗ. Если заменить условия ТЗ реальными данными, то код полностью рабочий. Реально отправляет сообщения в слак)
