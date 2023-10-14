/**
    * @name FiltrowanieX
    * @source <tu wstaw źródło, np. URL do repozytorium lub Twojego skryptu>
    * @description Plugin do filtrowania wiadomości w Discord.
    * @updateUrl <tu wstaw URL do aktualizacji, jeśli to dotyczy>
    * @website <tu wstaw stronę internetową lub repozytorium projektu>
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
