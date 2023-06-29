import { expect, describe, it, jest } from '@jest/globals'
import { pipeline } from 'node:stream/promises'
import { Readable, Writable } from 'node:stream'

import Reporter from '../../src/streamComponents/reporter.js'
import CSVToNDJSON from '../../src/streamComponents/csvtondjson.js'

describe("[Integration] CSV to NDJson test suit", () => {
    const reporter = new Reporter()

    it("given a csv stream it should parse each line to a valid NDJson string", async () => {
        const csvString = `id,name,desc\n01,test,description\n02,jhonny,developer\n03,janny,manager`
        const csvToJSON = new  CSVToNDJSON({ delimiter: ",", headers: ["id", "name", "desc"] })

        const spy = jest.fn()

        await pipeline(
            Readable.from(csvString),
            csvToJSON,
            reporter.progress(csvString),
            Writable({
                write(chunk, enc, callback) {
                    spy(chunk)

                    callback(null, chunk)
                }
            })
        )

        const times = csvString.split("\n").length -1
        expect(spy).toHaveBeenCalledTimes(times)

        const [firstCall, secondCall, thirdCall ] = spy.mock.calls

        expect(JSON.parse(firstCall)).toStrictEqual({ id: "01", name: "test", desc: "description" })
        expect(JSON.parse(secondCall)).toStrictEqual({ id: "02", name: "jhonny", desc: "developer" })
        expect(JSON.parse(thirdCall)).toStrictEqual({ id: "03", name: "janny", desc: "manager" })
    })
})