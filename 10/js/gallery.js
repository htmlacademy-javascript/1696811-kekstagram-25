import {isEscapeKey, showAlert} from './utils.js';
import {getFragment} from './fragment.js';
import {getData} from './api.js';

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
const picturesContainer = document.querySelector('.pictures');

const COMMENTS_LIMIT = 5;
let comments = [];
let commentsCounter = 0;

const createCommentTemplate = (comment) => (
  `<li class="social__comment">
     <img class="social__picture"
       src="${comment.avatar}"
       alt="${comment.name}"
       width="35" height="35">
       <p class="social__text">${comment.message}</p>
   </li>`
);

//Отрисовка новых комментариев, увеличение счетчика на величину COMMENTS_LIMIT
const pushComments = (commentsArray) => {
  commentsArray.forEach((comment) => {
    galleryComments.insertAdjacentHTML('beforeend', createCommentTemplate(comment));
  });
  commentsCounter += commentsArray.length;
  commentsLoader.textContent = commentsCounter;
};

//Скрытие кнопки подгрузки новых комментариев
const hideCommentsButton = () => {
  commentsButton.classList.add('hidden');
};

//Загрузка дополнительных комментариев по клику сommentsButton
const onCommentsButtonClick = () => {
  if (comments.length <= COMMENTS_LIMIT) {
    hideCommentsButton();
    commentsButton.removeEventListener('click', onCommentsButtonClick);
  }
  pushComments(comments.splice(0, COMMENTS_LIMIT));
};

//Показ кнопки подгрузки новых комментариев
const showCommentsButton = () => {
  commentsButton.classList.remove('hidden');
  commentsButton.addEventListener('click', onCommentsButtonClick);
};

//Отображение счетчика комментариев после их отрисовки в пределах COMMENTS_LIMIT
const showCommentsCountBlock = () => {
  commentsCount.classList.remove('hidden');
  pushComments(comments.splice(0, COMMENTS_LIMIT));
};

// перенос данных фотографии, после ее открытия в полн.,реж.,
const fillGallery = (photoData) => {
  galleryImaqe.src = photoData.url;
  galleryCaption.textContent = photoData.description;
  galleryLikes.textContent = photoData.likes;
  galleryComments.innerHTML = '';
  comments = photoData.comments.slice();
  commentsCount.querySelector('.comments-count').textContent = comments.length;
  showCommentsCountBlock();
  if (photoData.comments.length <= COMMENTS_LIMIT) {
    hideCommentsButton();
  } else {
    showCommentsButton();
  }
};

//Закрытие модального окна по клику иконки закрытия
const onGalleryClose = () => {
  bodyElement.classList.remove('modal-open');
  gallery.classList.add('hidden');
  hideCommentsButton();
  commentsCounter = 0;
  comments = [];
  galleryClose.removeEventListener('click', onGalleryClose);
};

//Закрытие модального окна клавишей ESC
const onGalleryEscPress = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    onGalleryClose();
    document.removeEventListener('keydown', onGalleryEscPress);
  }
};

function openGallery (template) {
  bodyElement.classList.add('modal-open');
  gallery.classList.remove('hidden');
  commentsCount.classList.add('hidden');
  galleryClose.addEventListener('click', onGalleryClose);
  document.addEventListener('keydown', onGalleryEscPress);
  fillGallery(template);
}

//Проверка клика по изображению из контейнера миниатюр
const onContainerClick = (evt, pictures) => {
  if (evt.target.classList.contains('picture__img')) {
    const pictureId = evt.target.dataset.pictureId;
    openGallery (pictures[pictureId]);
  }
};

//Передача описаний превью в полноразмерный режим просмотра
getData(getFragment, showAlert)
  .then((pictures) => picturesContainer.addEventListener('click', (evt) => onContainerClick (evt, pictures)));


export {fillGallery, openGallery};
