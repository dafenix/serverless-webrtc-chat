var common = (function () {
    function fallback(text) {
        const isIos = navigator.userAgent.match(/ipad|iphone/i);
        const textarea = document.createElement('textarea');

        // create textarea
        textarea.value = text;

        // ios will zoom in on the input if the font-size is < 16px
        textarea.style.fontSize = '20px';
        document.body.appendChild(textarea);

        // select text
        if (isIos) {
            const range = document.createRange();
            range.selectNodeContents(textarea);

            const selection = window.getSelection();
            selection.removeAllRanges();
            selection.addRange(range);
            textarea.setSelectionRange(0, 999999);
        } else {
            textarea.select();
        }

        // copy selection
        document.execCommand('copy');

        // cleanup
        document.body.removeChild(textarea);
    };

    function copyFeedback() {
        document.body.classList.add('filled');

        setTimeout(function () {
            document.body.classList.remove('filled');
        }, 750);
    }

    function copyIntoClipboard(id) {
        var elem = document.getElementById(id);
        var text = '';
        if (elem) {
            text = elem.value;
            if (!navigator.clipboard) {
                fallback(text);
                copyFeedback();
                return;
            }
            navigator.clipboard.writeText(text);
            copyFeedback();
        }
    };

    return {
        copyIntoClipboard: copyIntoClipboard
    };
})();
