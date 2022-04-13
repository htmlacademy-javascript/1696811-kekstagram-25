import {openGallery} from './gallery.js';

//Определение переменных
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
  template.addEventListener('click', () => openGallery(picture.id));
  return template;
}

//Заполнение фрагмента массивом ссылок
function getFragment (pictures) {
  const fragment = document.createDocumentFragment();
  pictures.forEach((picture) => {
    fragment.append(getPicture(picture));
  });
  picturesContainer.append(fragment);
  return pictures;
}

export {getPicture, getFragment};
