import { greetingEdit } from '../sw'

document.querySelector('h1').textContent = greetingEdit('Sup from SW.js');
