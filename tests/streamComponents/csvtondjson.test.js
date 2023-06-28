import { expect, describe, it, jest } from '@jest/globals'
import CSVToNDJSON from '../../src/streamComponents/csvtondjson.js'

describe("CSVToNDJSON test suit", () => {
    it("given a csv string it should return a ndjon string", () => {
        const csvString = "id,name,address\n01,Jhon,address01\n"
        const csvToJSON = new CSVToNDJSON({
            delimiter: ",",
            headers: ["id", "name", "address"]
        })

        const expected = JSON.stringify({id: "01", name: "Jhon", address: "address01"})
        const fn = jest.fn()
        
        csvToJSON.on("data", fn)
        csvToJSON.write(csvString)
        csvToJSON.end()

        const [current] = fn.mock.lastCall

        expect(JSON.parse(current)).toStrictEqual(JSON.parse(expected))
    })

    it("it should work with string that doesnt contains breaklines at the end", () => {
        const csvString = "id,name,address\n01,Jhon,address01"
        const csvToJSON = new CSVToNDJSON({
            delimiter: ",",
            headers: ["id", "name", "address"]
        })

        const expected = JSON.stringify({id: "01", name: "Jhon", address: "address01"})
        const fn = jest.fn()
        
        csvToJSON.on("data", fn)
        csvToJSON.write(csvString)
        csvToJSON.end()

        const [current] = fn.mock.lastCall

        expect(JSON.parse(current)).toStrictEqual(JSON.parse(expected))
    })

    it.todo("it should work with files that has breaklines in the begging in of the string")
})