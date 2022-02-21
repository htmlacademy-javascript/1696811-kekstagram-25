function getRandom(min, max) {
  if (max > 0) {
    const rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
  }
}
getRandom(0, 10);

function textCommit() {
  const textInput = document.querySelector('.social__footer-text');
  const buttonOff = document.querySelector('.social__footer-btn');
  const limit = 140;

  textInput.addEventListener('input', () => {
    const textLength = textInput.value.length;

    if(textLength > limit) {
      buttonOff.disabled = true;
    } else {
      buttonOff.disabled = false;
    }
  });
}

textCommit();
