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
        this.observer = new MutationObserver(this.handleMutations.bind(this));

        const targetNode = document.querySelector('.messages-3amgkR'); // Zaktualizowany selektor

        if (targetNode) {
            this.observer.observe(targetNode, { childList: true, subtree: true });
            this.filterMessages(targetNode);
        }
    }

    stop() {
        if (this.observer) {
            this.observer.disconnect();
        }
    }

    handleMutations(mutationsList) {
        for (const mutation of mutationsList) {
            if (mutation.addedNodes.length > 0) {
                this.filterMessages(mutation.target);
            }
        }
    }

    filterMessages(container) {
        const messages = container.querySelectorAll('.message-2qnXI6');

        for (const message of messages) {
            const messageText = message.textContent;

            for (const userId of this.blockedUserIds) {
                if (messageText.includes(userId)) {
                    this.hideMessage(message);
                    return;
                }
            }

            for (const keyword of this.blockedKeywords) {
                if (messageText.includes(keyword)) {
                    this.hideMessage(message);
                    return;
                }
            }

            message.innerHTML = this.removeLinks(messageText);
        }
    }

    hideMessage(message) {
        message.innerHTML = '<span style="color: red;">Zablokowana wiadomość</span>';
    }

    removeLinks(messageText) {
        return messageText.replace(/(https?|ftp):\/\/[^\s/$.?#].[^\s]*/gi, '');
    }
};

module.exports = FiltrowanieX;
