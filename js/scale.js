const uploadFormElement = document.querySelector('.img-upload__form');
const reduceButtonElement = uploadFormElement.querySelector('.scale__control--smaller');
const increaseButtonElement = uploadFormElement.querySelector('.scale__control--bigger');
const scaleValueElement = uploadFormElement.querySelector('.scale__control--value');
const picturePreviewElement = uploadFormElement.querySelector('.img-upload__preview img');

const PictureSize = {
  MIN: 25,
  MAX: 100,
  DEFAULT: 100,
  STEP: 25
};

let currentPictureSize = 100;

//Изменение размеров фото и содержимого поля отображения масштаба
const setPictureSize = (size) => {
  scaleValueElement.value = `${size}%`;
  picturePreviewElement.style = `transform: scale(${size / 100})`;
  currentPictureSize = size;
};

//Уменьшение масштаба фото на величину STEP
const onReduceButtonClick = () => {
  if (currentPictureSize > PictureSize.MIN) {
    const newSize = currentPictureSize - PictureSize.STEP;
    setPictureSize(newSize);
  }
};

//Увеличение масштаба фото на величину STEP
const onIncreaseButtonClick = () => {
  if (currentPictureSize < PictureSize.MAX) {
    const newSize = currentPictureSize + PictureSize.STEP;
    setPictureSize(newSize);
  }
};

//Добавление обработчиков на кнопки после загрузки фотографии, установка масштаба по умолчанию
const setScaleBlock = () => {
  setPictureSize(PictureSize.DEFAULT);
  reduceButtonElement.addEventListener('click', onReduceButtonClick);
  increaseButtonElement.addEventListener('click', onIncreaseButtonClick);
};

//Удаление обработчиков с кнопок масштабирования после отправки формы
const closeScaleBlock = () => {
  reduceButtonElement.removeEventListener('click', onReduceButtonClick);
  increaseButtonElement.removeEventListener('click', onIncreaseButtonClick);
};

export {setScaleBlock, closeScaleBlock};
