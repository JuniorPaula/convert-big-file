/*
echo "id,name,desc,age" > big.csv
for i in `seq 1 5`; do node -e "process.stdout.write('$i,junior-$i,$i-text,$i\n'.repeat(1e5))" >> big.csv; done
*/
import { statSync, createReadStream, createWriteStream } from 'node:fs'
import { Transform } from 'node:stream';
import { pipeline } from 'node:stream/promises'

import Reporter from './streamComponents/reporter.js';
import CSVToNDJSON from './streamComponents/csvtondjson.js';

const reporter = new Reporter()

const filename = "big.csv"
const { size: fileSize } = statSync(filename)

let counter = 0
const processData = Transform({
    transform(chunk, enc, callback) {
        const data = JSON.parse(chunk)
        const result = JSON.stringify({
            ...data,
            id: counter++
        }).concat("\n")


        return callback(null, result)
    }
})

const csvToJSON = new CSVToNDJSON({ delimiter: ",", headers: ["id", "name", "desc", "age"] })

await pipeline(
    createReadStream(filename),
    csvToJSON,
    processData,
    reporter.progress(fileSize),
    createWriteStream("big.ndjson")
)