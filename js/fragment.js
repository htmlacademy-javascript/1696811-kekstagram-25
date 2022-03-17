import { openGallery } from './gallery.js';

const pictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

function getPicture (picture) {
  const template = pictureTemplate.cloneNode(true);
  template.querySelector('.picture__img').src = picture.url;
  template.querySelector('.picture__likes').textContent = picture.likes;
  template.querySelector('.picture__comments').textContent = picture.comments.length;
  template.addEventListener('click', () => openGallery(picture));
  return template;
}

export function getFragment (pictures) {
  const fragment = document.createDocumentFragment();
  pictures.forEach((picture) => {
    fragment.append(getPicture(picture));
  });
  return fragment;
}
