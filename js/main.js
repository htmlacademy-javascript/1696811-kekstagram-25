// import './effect';
// import './form';
// import './photo_filter';
import {getPictures} from './data.js';
import {getFragment} from './fragment.js';

const IDENTIFIER_PICTURES = 25;

const picturesDescriptions = getPictures(IDENTIFIER_PICTURES);
const picturesContainer = document.querySelector('.pictures');
picturesContainer.append(getFragment(picturesDescriptions));
