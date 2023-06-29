import readline from 'node:readline'

function logger(message) {
    readline.cursorTo(process.stdout, 0)
    process.stdout.write(message)
}

export {
    logger
}