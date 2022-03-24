import { isEscapeKey } from './utils.js';
import {picturesDescriptions} from './fragment.js';

const bodyElement = document.querySelector('body');
const gallery = document.querySelector('.big-picture');
const galleryImaqe = gallery.querySelector('.big-picture__img').querySelector('img');
const galleryClose = gallery.querySelector('.cancel');
const galleryCaption = gallery.querySelector('.social__caption');
const galleryLikes = gallery.querySelector('.likes-count');
const commentsCount = gallery.querySelector('.social__comment-count');
const galleryComments = gallery.querySelector('.social__comments');

const picturesContainer = document.querySelector('.pictures');
picturesContainer.addEventListener('click', (evt) => onContainerClick (evt));

//Проверка клика по изображению из контейнера миниатюр
function onContainerClick (evt) {
  if (evt.target.nodeName === 'IMG') {
    openGallery (evt.target.dataset.pictureId);
  }
}

// открытие фото в полноэкранном режиме
export function openGallery (pictureId) {
  bodyElement.classList.add('modal-open');
  gallery.classList.remove('hidden');
  commentsCount.classList.add('hidden');
  galleryClose.addEventListener('click', onGalleryClose);
  document.addEventListener('keydown', onGalleryEscPress);
  fillGallery(picturesDescriptions[pictureId]);
}

// сoздание шаблона комментария для фото
function createCommentTemplate (comment) {
  return (
    `<li class="social__comment">
      <img class="social__picture"
      src="${comment.avatar}"
      alt="${comment.name}"
      width="35" height="35">
      <p class="social__text">${comment.message}</p>
    </li>`
  );
}

// перенос данных фотографии, после ее открытия в полн.,реж.,
let comments = [];
export function fillGallery (photoDate) {
  galleryImaqe.src = photoDate.url;
  galleryCaption.textContent = photoDate.descriptions;
  galleryLikes.textContent = photoDate.likes;
  galleryComments.innerHTML = '';
  comments = photoDate.comments.slice();
  commentsCount.querySelector('.comments-count').textContent = comments.length;
  comments.forEach((comment) => {
    galleryComments.insertAdjacentHTML('beforeend', createCommentTemplate(comment));
  });
}

// закрытие модального окна по клику иконки закрытия
function onGalleryClose () {
  bodyElement.classList.remove('modal-open');
  gallery.classList.add('hidden');
}

// закрытие модального окна клавишей ESC
function onGalleryEscPress (evt) {
  if (isEscapeKey(evt)) {
    onGalleryClose();
  }
}
