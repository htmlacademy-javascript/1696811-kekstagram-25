import {getPictures} from './data.js';

//Определение переменных
const IDENTIFIER_PICTURES = 25;
const picturesContainer = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

//Создание единичного элемента фрагмента
function getPicture (picture) {
  const template = pictureTemplate.cloneNode(true);
  template.querySelector('.picture__img').src = picture.url;
  template.querySelector('.picture__img').dataset.pictureId = picture.id;
  template.querySelector('.picture__likes').textContent = picture.likes;
  template.querySelector('.picture__comments').textContent = picture.comments.length;
  return template;
}

//Заполнение фрагмента массивом ссылок
function getFragment (pictures) {
  const fragment = document.createDocumentFragment();
  pictures.forEach((picture) => {
    fragment.append(getPicture(picture));
  });
  return fragment;
}

//Передача данных фотографии для заполнения шаблона полноразмерного фото
export const picturesDescriptions = getPictures(IDENTIFIER_PICTURES);
picturesContainer.append(getFragment(picturesDescriptions));
