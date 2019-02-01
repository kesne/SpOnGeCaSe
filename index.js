const Spy = require('osx-global-keypress');
const robot = require('robotjs');

const KEYS = [
    { code: 12, key: 'q' },
    { code: 13, key: 'w' },
    { code: 14, key: 'e' },
    { code: 15, key: 'r' },
    { code: 17, key: 't' },
    { code: 16, key: 'y' },
    { code: 32, key: 'u' },
    { code: 34, key: 'i' },
    { code: 31, key: 'o' },
    { code: 35, key: 'p' },
    { code: 0, key: 'a' },
    { code: 1, key: 's' },
    { code: 2, key: 'd' },
    { code: 3, key: 'f' },
    { code: 5, key: 'g' },
    { code: 4, key: 'h' },
    { code: 38, key: 'j' },
    { code: 40, key: 'k' },
    { code: 37, key: 'l' },
    { code: 6, key: 'z' },
    { code: 7, key: 'x' },
    { code: 8, key: 'c' },
    { code: 9, key: 'v' },
    { code: 11, key: 'b' },
    { code: 45, key: 'n' },
    { code: 46, key: 'm' }
];

var spy = new Spy();
spy.start();

let caps = false;
function handler(data) {
    const { key } = KEYS.find(({ code }) => code === data.code) || { key: false };
    if (key) {
        spy.off('press', handler);
        caps = !caps;
        robot.keyTap('backspace');
        robot.typeString(caps ? key.toUpperCase() : key.toLowerCase());
        setTimeout(() => {
            spy.on('press', handler);
        }, 50);
    }
}

spy.on('press', handler);

spy.on('error', error => {
    console.log(error);
});
