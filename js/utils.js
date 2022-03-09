function getRandomInteger(min, max) {
  if (min >= 0 && max > 0) {
    const rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
  }
}

export {getRandomInteger};

function getComment (id, messages, names) {
  return ({
    id: id + 1,
    avatar: `img/avatar-${getRandomInteger(1, 6)}.svg.`,
    message: messages[getRandomInteger(0, messages.length - 1)],
    name: names[getRandomInteger(0, names.length - 1)]
  });
}

function getComments (count) {
  const comments = Array.from({length: count}, (_, idx) => getComment(idx));
  return comments;
}

export {getComments};
