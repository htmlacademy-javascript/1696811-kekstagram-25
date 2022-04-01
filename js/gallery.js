import {isEscapeKey} from './utils.js';
import {picturesDescriptions} from './fragment.js';

const bodyElement = document.querySelector('body');
const gallery = document.querySelector('.big-picture');
const galleryImaqe = gallery.querySelector('.big-picture__img').querySelector('img');
const galleryClose = gallery.querySelector('.cancel');
const galleryCaption = gallery.querySelector('.social__caption');
const galleryLikes = gallery.querySelector('.likes-count');
const commentsCount = gallery.querySelector('.social__comment-count');
const galleryComments = gallery.querySelector('.social__comments');
const commentsButton = gallery.querySelector('.social__comments-loader') ;
const commentsLoader = gallery.querySelector('.comments-loader');

const COMMENTS_LIMIT = 5;
let commentsCounter = 0;

// открытие фото в полноэкранном режиме
export function openGallery (pictureId) {
  bodyElement.classList.add('modal-open');
  gallery.classList.remove('hidden');
  commentsCount.classList.add('hidden');
  galleryClose.addEventListener('click', onGalleryClose);
  document.addEventListener('keydown', onGalleryEscPress);
  fillGallery(picturesDescriptions[pictureId]);
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

  showCommentsCountBlock();
  if (photoDate.comments.length <= COMMENTS_LIMIT) {
    hideCommentsButton();
  } else {
    showCommentsButton();
  }
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

//Загрузка дополнительных комментариев по клику сommentsButton
function onCommentsButtonClick () {
  if (comments.length <= COMMENTS_LIMIT) {
    hideCommentsButton();
  }
  pushComments(comments.splice(0, COMMENTS_LIMIT));
}

//Показ кнопки подгрузки новых комментариев
function showCommentsButton ()  {
  commentsButton.classList.remove('hidden');
  commentsButton.addEventListener('click', onCommentsButtonClick);
}

//Скрытие кнопки подгрузки новых комментариев
function hideCommentsButton () {
  commentsButton.classList.add('hidden');
  commentsButton.removeEventListener('click', onCommentsButtonClick);
}

//Отрисовка новых комментариев, увеличение счетчика на величину COMMENTS_LIMIT
function pushComments (commentsArray) {
  commentsArray.forEach((comment) => {
    commentsCount.insertAdjacentHTML('beforeend', createCommentTemplate(comment));
  });
  commentsCounter += commentsArray.length;
  commentsLoader.textContent = commentsCounter;
}

//Отображение счетчика комментариев после их отрисовки в пределах COMMENTS_LIMIT
function showCommentsCountBlock () {
  commentsCount.classList.remove('hidden');
  pushComments(comments.splice(0, COMMENTS_LIMIT));
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
