/* eslint-disable no-console */
function getRandom(min, max) {
  if (max <= 0 || min < 0) {
    console.log('неверный диапазон');
    return;
  }

  if (min > max) {
    console.log('max меньше min');
    return;
  }

  if (min >= 0 && max > 0) {
    const rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
  }
  console.log('задан неверный диапазон');
}
getRandom(0, 10);


function textCommit(text, maxLimit) {
  const textLength = text.length;
  const textMin = 0;

  if(textLength === textMin) {
    console.log('введите комментарий');
    return;
  }

  if(textLength <= maxLimit) {
    console.log('количество символов не привышает лимит');
    return;
  }

  if(textLength > maxLimit) {
    console.log('привышен лимит символов');
    return (false);
  }
}
textCommit();

// дз-4
// id, число — идентификатор описания. Это число от 1 до 25. Идентификаторы не должны повторяться.
// url, строка — адрес картинки вида photos/{{i}}.jpg, где {{i}} — это число от 1 до 25. Адреса картинок не должны повторяться.
// description, строка — описание фотографии. Описание придумайте самостоятельно.
// likes, число — количество лайков, поставленных фотографии. Случайное число от 15 до 200.
// comments, массив объектов — список комментариев, оставленных другими пользователями к этой фотографии. Количество комментариев к каждой фотографии вы определяете на своё усмотрение. Все комментарии генерируются случайным образом.

const IDENTIFIER_PICTURES = 25;

const description = [
  'Я на море',
  'Рабочие процесс',
  'Поездка в Шерегеш',
  'Каникулы в деревне',
  'Спорт рулит',
  'Солнце, море, пляж',
  'Сказочная природа',
  'Рабочие будни',
  'Я и мой кот',
  'Любимый питомец',
  'Дом, кот, разгром',
  'Счастливый день',
  'Поездка в Египет',
  'Вид в элюминатор',
  'Наступила ПЯТНИЦА',
  'Завтрак в лесу',
  'Разбор полетов',
  'Прощание с зимой',
  'Ну наконец-то отпуск',
  'Котейка акробат',
  'Учу JS',
  'Мечта сбылась',
  'Встречаем расвет на Поднебесных-Зубьях',
  'Тортики',
  'Крутой спуск на сноуборе'
];

const message = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const names = [
  'Андрей',
  'Валера',
  'Виктория',
  'Сергей',
  'Степан',
  'Юлия',
  'Кирилл',
  'Ольга'
];

function getRandomInteger(min, max) {
  if (min >= 0 && max > 0) {
    const rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
  }
}

function getComment (id) {
  return ({
    id: id + 1,
    avatar: `img/avatar-${getRandomInteger(1, 6)}.svg.`,
    message: message[getRandomInteger(1, message.length - 1)],
    name: names[getRandomInteger(1, names.length - 1)]
  });
}

function getComments (count) {
  const comments = Array.from({length: count}, (_, idx) => getComment(idx));
  return comments;
}

function getPictureDescription (id) {
  return ({
    id: id + 1,
    url: `photos/${id + 1}.jpg`,
    description: description[id],
    likes: getRandomInteger(15, 200),
    comments: getComments(getRandomInteger(1, 6))
  });
}

function getPictures (count) {
  const pictures = Array.from({length: count}, (_, idx) => getPictureDescription(idx));
  return pictures;
}

console.log(getPictures(IDENTIFIER_PICTURES));
