/* eslint-disable no-console */
import './effect';
import './form';
import './photo_filter';
import {getPictures} from './data.js';

const IDENTIFIER_PICTURES = 25;

console.log(getPictures(IDENTIFIER_PICTURES));
