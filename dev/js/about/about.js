'use strict';

$( document ).ready(function() {
  var langMessages = [],
    lastChosenLanguage = localStorage.getItem('language'),
    userLang = (navigator.language || navigator.userLanguage).split('-')[0];

  //langMessages.en = 'Sorry, this page is only available in English.';
  langMessages.de = 'Diese Seite ist nur auf Englisch verfügbar.',
  langMessages.fr = 'Désolé, cette page n\'est disponible qu\'en anglais.',
  langMessages.pt = 'Desculpe, esta página está disponível apenas em Inglês.';
  langMessages.ru = 'К сожалению, эта страница доступна только на английском языке.';
  langMessages.ja = '申し訳ありませんが、このページは英語でのみ利用可能です。';
  langMessages.kr = '죄송합니다.이 페이지는 영어로만 제공됩니다.';
  langMessages.zh_cn = '很抱歉，此网页仅提供英文版。';
  langMessages.mn = 'Уучлаарай, энэ хуудсанд англи хэл дээр зөвхөн боломжтой.';
  langMessages.es = 'Lo sentimos, esta página sólo está disponible en Inglés.';
  langMessages.pl = 'Przepraszamy, ta strona jest dostępna tylko w języku angielskim.';
  langMessages.he = 'מצטערים, דף זה זמין באנגלית בלבד.';

  if (langMessages[lastChosenLanguage]) {
    showLangMessage(langMessages[lastChosenLanguage]);
  } else if (langMessages[userLang]) {
    showLangMessage(langMessages[userLang]);
  }
});

var showLangMessage = function showLangMessage(msg) {
  var $msgDisplay = $('#lang-message');

  $msgDisplay.text(msg);
  $msgDisplay.show();
};
