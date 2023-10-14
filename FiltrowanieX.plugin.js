/**
 * @name FiltrowanieX
 * @source https://github.com/ccbezx/FiltrowanieX/blob/main/FiltrowanieX.plugin.js
 * @description Plugin do filtrowania wiadomości w Discord.
 * @updateUrl https://github.com/ccbezx/FiltrowanieX/raw/main/FiltrowanieX.plugin.js
 * @website https://github.com/ccbezx/FiltrowanieX
 * @version 0.0.1
 */

const FiltrowanieX = class {
    constructor() {
        this.blockedUserIds = ['1162699952280064040', '440220579849699329'];
        this.blockedKeywords = ['penis', 'sex'];
    }

    start() {
        const messages = document.querySelectorAll('.containerCozyBounded-ujftM0');

        for (const message of messages) {
            const messageText = message.textContent;

            // Sprawdź, czy wiadomość zawiera zablokowane ID użytkowników
            for (const userId of this.blockedUserIds) {
                if (messageText.includes(userId)) {
                    this.hideMessage(message);
                    return;
                }
            }

            // Sprawdź, czy wiadomość zawiera zablokowane słowa kluczowe
            for (const keyword of this.blockedKeywords) {
                if (messageText.includes(keyword)) {
                    this.hideMessage(message);
                    return;
                }
            }

            // Usuń linki z wiadomości
            message.innerHTML = this.removeLinks(messageText);
        }
    }

    stop() {
        // Zatrzymaj filtrowanie
    }

    hideMessage(message) {
        message.innerHTML = '<span style="color: red;">Zablokowana wiadomość</span>';
    }

    removeLinks(messageText) {
        return messageText.replace(/(https?|ftp):\/\/[^\s/$.?#].[^\s]*/gi, '');
    }
};

module.exports = FiltrowanieX;
