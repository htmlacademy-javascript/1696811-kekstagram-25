const uploadForm = document.querySelector('.img-upload__form');
const HASHTAG_INPUT  = 5;
const DESCRIPTION_LENGTH = 140;

//Шаблон для проверки вводимых хэш-тегов
// eslint-disable-next-line no-misleading-character-class
const regularExpression = /^#[A-Za-zА-Яа-яËё0-9]{1,19}$/;

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__text',
  errorTextParent: 'img-upload__text',
  errorTextTag: 'p',
  errorTextClass: 'field__error'
});

//Приведение тегов к строчному регистру
function getHashTagsArray (str) {
  const splitArray = str.split(' ').map((element) => element.toLowerCase());
  return splitArray;
}

//Проверка на количество хэш-тегов
function checkHashTagsAmount (arr) {
  return arr.length <= HASHTAG_INPUT;
}

//Проверка на отсутствие повторяющихся хэш-тегов
function checkHashTagsRepeat (arr) {
  return (arr.every((element) => arr.indexOf(element) === arr.lastIndexOf(element)));
}

//Проверка валидности поля ввода хэш-тегов
function validateHashTags (value) {
  return getHashTagsArray(value).every((element, idx, array) =>
    regularExpression.test(element) && checkHashTagsAmount(array) && checkHashTagsRepeat(array)
  );
}

//Проверка длины введенного комментария не более descriptionLength
function validateDescription (value) {
  return value.length >= 0 && value.length <= DESCRIPTION_LENGTH;
}

//Создание валидаторов для библиотеки Pristine на указанных полях
pristine.addValidator(uploadForm.querySelector('.text__hashtags'), validateHashTags, 'Введенные хэш-теги не соответствуют <a class="text__link" href="#" aria-label="Требования к хэш-тегам">требованиям</a>');
pristine.addValidator(uploadForm.querySelector('.text__description'), validateDescription, `Длина комментария должна быть от 0 до ${DESCRIPTION_LENGTH} символов`);

//Запуск валидации перед отправкой формы
function uploadFormValidate () {
  pristine.validate();
}

export {uploadFormValidate};
