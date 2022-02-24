/* eslint-disable no-console */
function getRandom(min, max) {
  if (max <= 0 || min < 0) {
    console.log('неверный диапазон');
    return;
  }

  if (min > max) {
    console.log('max меньше min');
    return;
  }

  if (min >= 0 && max > 0) {
    const rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
  }
  console.log('задан неверный диапазон');
}
getRandom(0, 10);


function textCommit(text, maxLimit) {
  const textLength = text.length;
  const textMin = 0;

  if(textLength === textMin) {
    console.log('введите комментарий');
    return;
  }

  if(textLength <= maxLimit) {
    console.log('количество символов не привышает лимит');
    return;
  }

  if(textLength > maxLimit) {
    console.log('привышен лимит символов');
    return (false);
  }
}
textCommit();
