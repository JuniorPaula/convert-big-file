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

    it("it should work with files that has breaklines in the begging in of the string", () => {
        const csvString = "\n\nid,name,address\n\n01,Jhon,address01\n02,Janne,street\n\n"
        const csvToJSON = new CSVToNDJSON({
            delimiter: ",",
            headers: ["id", "name", "address"]
        })

        const expected = [
            JSON.stringify({id: "01", name: "Jhon", address: "address01"}),
            JSON.stringify({id: "02", name: "Janne", address: "street"}),
        ]

        const fn = jest.fn()
        
        csvToJSON.on("data", fn)
        csvToJSON.write(csvString)
        csvToJSON.end()

        const [firstCall] = fn.mock.calls[0]
        const [secondsCall] = fn.mock.calls[1]

        expect(JSON.parse(firstCall)).toStrictEqual(JSON.parse(expected[0]))
        expect(JSON.parse(secondsCall)).toStrictEqual(JSON.parse(expected[1]))
    })
})