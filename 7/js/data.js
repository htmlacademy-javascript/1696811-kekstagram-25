import {getRandomInteger, getComments} from './utils.js';

const descriptions = [
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

const messages = [
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

function getPictureDescription (id) {
  return ({
    id: id,
    url: `photos/${id + 1}.jpg`,
    descriptions: descriptions[id],
    likes: getRandomInteger(15, 200),
    comments: getComments(getRandomInteger(1, 6), messages, names)
  });
}

export function getPictures (count) {
  const pictures = Array.from({length: count}, (_, idx) => getPictureDescription(idx));
  return pictures;
}
