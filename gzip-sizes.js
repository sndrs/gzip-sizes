const { promisify } = require('util');
const { basename } = require('path');

const glob = promisify(require('glob'));
const { file: fileSize } = require('gzip-size');
const prettyBytes = require('pretty-bytes');
const lpad = require('utils-left-pad-string');

module.exports = async (userFiles = []) => {
    try {
        const files = userFiles.length ? userFiles : await glob('*.*');

        if (files.length) {
            const fileSizes = await Promise.all(
                files.map(async candidate => [
                    candidate,
                    await fileSize(candidate).then(size => prettyBytes(size)),
                ])
            );

            const maxFileNameLength = Math.max(
                ...fileSizes.map(([file]) => file.length)
            );
            const maxFileSizeLength = Math.max(
                ...fileSizes.map(([, size]) => size.length)
            );

            fileSizes.forEach(([file, size]) => {
                console.log(
                    `${basename(file)}${lpad(
                        size,
                        4 +
                            size.length +
                            (maxFileNameLength - file.length) +
                            (maxFileSizeLength - size.length),
                        ' '
                    )}`
                );
            });
        }
    } catch (error) {
        console.log(error);
    }
};
