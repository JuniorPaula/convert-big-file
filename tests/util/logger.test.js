import { expect, describe, it, jest, afterAll } from '@jest/globals'
import readline from 'node:readline'
import { logger } from '../../src/util/logger'

describe("Logger test suit", () => {
    readline.cursorTo = jest.fn().mockImplementation()
    process.stdout.write = jest.fn().mockImplementation()
    
    afterAll(() => jest.clearAllMocks())

    it("writeInput", () => {
        const msg = "test"
        logger(msg)

        expect(readline.cursorTo).toBeCalledWith(process.stdout, 0)
        expect(process.stdout.write).toBeCalledWith(msg)
    })
})