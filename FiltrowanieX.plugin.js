/**
    * @name FiltrowanieX
    * @source https://github.com/ccbezx/FiltrowanieX/blob/main/FiltrowanieX.plugin.js
    * @description Plugin do filtrowania wiadomości w Discord.
    * @updateUrl https://github.com/ccbezx/FiltrowanieX/raw/main/FiltrowanieX.plugin.js
    * @website https://github.com/ccbezx/FiltrowanieX
    * @version 0.0.1
    */

(function() {
    'use strict';

    // Zablokowane ID użytkowników
    const blockedUserIds = ['379633830572851210', '440220579849699329'];

    // Zablokowane słowa kluczowe
    const blockedKeywords = ['penis', 'sex'];

    // Funkcja do filtrowania wiadomości
    const messageFilter = () => {
        const messages = document.getElementsByClassName('message-content');

        for (const message of messages) {
            const messageText = message.textContent;

            // Sprawdź, czy wiadomość zawiera zablokowane ID użytkowników
            for (const userId of blockedUserIds) {
                if (messageText.includes(userId)) {
                    message.textContent = 'Zablokowana wiadomość';
                    return;
                }
            }

            // Sprawdź, czy wiadomość zawiera zablokowane słowa kluczowe
            for (const keyword of blockedKeywords) {
                if (messageText.includes(keyword)) {
                    message.textContent = 'Zablokowana wiadomość';
                    return;
                }
            }

            // Usuń linki z wiadomości
            message.innerHTML = messageText.replace(/(https?|ftp):\/\/[^\s/$.?#].[^\s]*/gi, '');
        }
    };

    // Wywołaj funkcję messageFilter przy każdym zdarzeniu DOMContentLoaded
    document.addEventListener('DOMContentLoaded', messageFilter);
})();
