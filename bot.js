// ==UserScript==
// @name         BingBot
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  try to take over the world!
// @author       Fedorova Tatyana
// @match        https://www.bing.com/*
// @match        https://napli.ru/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

let keywords = ["10 самых популярных шрифтов от Google", "Отключение редакций и ревизий в WordPress", "Вывод произвольных типов записей и полей в WordPress", "Взаимодействие PHP и MySQL. Подключение к базе данных MySQL", "Плагины VS Сode",
	"DevTools"];
let keyword = keywords[getRandom(0, keywords.length)];
let bingInput = document.getElementsByName("q")[0];
let btnK1 = document.getElementById('search_icon');
let links = document.links;

if (btnK1 !== null) {
 let i = 0;
	let timerId = setInterval(() => {//Печатаем запрос
		bingInput.value += keyword[i];
		i++;
		if (i == keyword.length) {
			clearInterval(timerId);
			setTimeout(() => {
				btnK1.click();// Кликаем по кнопке
			}, getRandom(200, 500));
		}
	}, 500);
}

else if (location.hostname == "napli.ru") {//Проверяем на целевом ли мы сайте
	setInterval(() => {
		let index = getRandom(0, links.length);
		if (getRandom(0, 101) >= 80) {
			location.href = "https://www.bing.com/";
		}
		if (links.length == 0) {
			location.href = "https://napli.ru";
		}
		if (links[index].href.indexOf("napli.ru") !== -1) {
			links[index].click();
		}
	}, getRandom(3000, 5000));
	console.log("Мы на целевом сайте");
}


else {
	let nextGooglePage = true;
	for (let i = 0; i < links.length; i++) {
		if (links[i].href.indexOf("napli.ru") !== -1) {
			let link = links[i];
			nextGooglePage = false;
			console.log("Нашел строку " + link);
			setTimeout(() => {
				link.click();
			}, getRandom(1500, 4000));

			break;
		}
	} //Конец цикла, где ищем целевой сайт в выдаче

  	if (document.getElementsByClassName("sb_pagS")[0].innerText == "5") {//Если не нашли в выдаче на 5 старнице целевой сайт
		nextGooglePage = false;
		location.href = "https://www.bing.com/";
	}

	if (nextGooglePage) {//Кликаем по каждой странице выдачи
		setTimeout(() => {
			document.getElementsByClassName("sb_pagN")[0].click();
		}, getRandom(2000, 5000));
	}
}

function getRandom(min, max) {
  return Math.floor(Math.random()*(max - min) + min);
} 