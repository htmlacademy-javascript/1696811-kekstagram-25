import { isEscapeKey } from './utils.js';

const bodyElement = document.querySelector('body');
const galery = document.querySelector('.big-picture');
const galeryImaqe = galery.querySelector('.big-picture__img');
const galeryClose = galery.querySelector('.cancel');
const galeryCaption = galery.querySelector('.social__caption');
const galeryLikes = galery.querySelector('.likes-count');
const commentsCount = galery.querySelector('.social__comment-count');
const galeryComments = galery.querySelector('.social__comments');

// открытие фото в полноэкранном режиме
function openGalery (photoDate) {
  bodyElement.classList.add('modal-open');
  galery.classList.remove('hidden');
  commentsCount.classList.add('hidden');
  galeryClose.addEventListener('click', onGaleryClose);
  document.addEventListener('keydown', onGaleryEscPress);
  fillGalery(photoDate);
}

export {openGalery};

// сoздание шаблона комментария для фото
function createCommitTemplate (comment) {
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
function fillGalery (photoDate) {
  galeryImaqe.src = photoDate.url;
  galeryCaption.textContent = photoDate.description;
  galeryLikes.textContent = photoDate.likes;
  galeryComments.innerHTML = '';
  comments = photoDate.comments.slice();
  comments.forEach((comment) => {
    galeryComments.insertAdjacentHTML('beforeend', createCommitTemplate(comment));
  });
}

// закрытие модального окна по клику иконки закрытия
function onGaleryClose () {
  bodyElement.classList.remove('modal-open');
  galery.classList.add('hidden');
}

// закрытие модального окна клавишей ESC
function onGaleryEscPress (evt) {
  if (isEscapeKey(evt)) {
    onGaleryClose();
  }
}
