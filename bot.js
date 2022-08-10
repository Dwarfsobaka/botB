// ==UserScript==
// @name         BingBot
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       Fedorova Tatyana
// @match        https://www.bing.com/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

let keywords = ["10 самых популярных шрифтов от Google", "Отключение редакций и ревизий в WordPress", "Вывод произвольных типов записей и полей в WordPress", "Взаимодействие PHP и MySQL. Подключение к базе данных MySQL"];
let keyword = keywords[getRandom(0, keywords.length)];
//' site:napli.ru';
let btnK1 = document.getElementById('search_icon');
let links = document.links;

if (btnK1 !== null) {
  document.getElementsByName("q")[0].value = keyword;
  btnK1.click();
}

else {

  for (let i = 0; i < links.length; i++) {
    if (links[i].href.indexOf("napli.ru") !== -1) {
      let link = links[i];
      console.log("Нашел строку " + link);
      link.click();
      break;
    }
  }
}



function getRandom(min, max) {
  return Math.floor(Math.random()*(max - min) + min);
} 