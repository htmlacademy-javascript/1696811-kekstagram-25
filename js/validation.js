//Объявление переменных
const HASHTAG_INPUT  = 5;
const DESCRIPTION_LENGTH = 140;
const uploadForm = document.querySelector('.img-upload__form');
const hashTagsField = uploadForm.querySelector('.text__hashtags');
let errorMessage = '';

//Шаблон для проверки вводимых хэш-тегов
const regularExpression = /^#[A-Za-zА-Яа-я0-9]{1,19}$/;

const pristine = window.Pristine(uploadForm, {
  classTo: 'img-upload__text',
  errorTextParent: 'img-upload__text',
  errorTextTag: 'p',
  errorTextClass: 'text__error'
});

//Приведение тегов к строчному регистру
const getSplitArray = (str) => {
  const splitArray = str.split(' ').map((element) => element.toLowerCase());
  return splitArray;
};

//Проверка хэш-тегов на соответствие указанным требованиям
const validateHashTags = (value) => {
  errorMessage = '';
  const inputText = value.trim();

  if (!inputText) {
    return true;
  }

  const splitArray = getSplitArray(inputText);
  const hashTagsRules = [
    {
      check: splitArray.some((element) => element.indexOf('#', 1) >= 0),
      error: 'Хэш-теги должны разделяться пробелами'
    },
    {
      check: splitArray.some((element) => !regularExpression.test(element)),
      error: 'Хэш-тег содержит недопустимые символы, либо состоит из одной решётки'
    },
    {
      check: splitArray.length > HASHTAG_INPUT,
      error: `Нельзя указать больше ${HASHTAG_INPUT} хэш-тегов`
    },
    {
      check: splitArray.some((element) => element.length > DESCRIPTION_LENGTH),
      error: `Максимальная длина одного хэш-тега ${DESCRIPTION_LENGTH} символов, включая #`
    },
    {
      check: !splitArray.every((element, idx, arr) => arr.indexOf(element) === arr.lastIndexOf(element)),
      error: 'Хэш-теги не должны повторяться'
    },
    {
      check: splitArray.some((element) => element[0] !== '#'),
      error: 'Хэш-тег должен начинаться с символа #'
    },
  ];

  return hashTagsRules.every((rule) => {
    const isInvalid = rule.check;
    if (isInvalid) {
      errorMessage = rule.error;
    }
    return !isInvalid;
  });
};

//Показ сообщения об ошибке на основании работы функции validateHashTags
const showErrorMessage = () => errorMessage;

//Создание валидаторов для библиотеки Pristine на указанных полях
pristine.addValidator(hashTagsField, validateHashTags, showErrorMessage);

//Запуск валидации перед отправкой формы
const uploadFormValidate = () => pristine.validate();

export {uploadFormValidate};
