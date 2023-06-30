# Convert CSV to a NDJson
This is a simple project with the purpose of showing how **nodejs** can be able to work with a large amount of data on demand, without blocking the `main loop`, using one of the main features for this purpose. The **nodes streams**.
The purpose of this program is to convert a large `csv` file into `ndjson`, and as a bonus to show a progress bar in the terminal indicating the percentage of its execution.

## Dependencies
- Nodejs > 18x
- Npm

## Quick start
```bash
$ npm ci
```
If you want to try this, run the following command to create the big `csv` file.
```bash
$ echo "id,name,desc,age" > big.csv
for i in `seq 1 5`; do node -e "process.stdout.write('$i,anyname-$i,$i-text,$i\n'.repeat(1e5))" >> big.csv; done
```
and then: 
```bash
$ node src/
```

## Tests
```bash
$ npm t
```
### Coverage
```bash
----------------|---------|----------|---------|---------|-------------------
File            | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
----------------|---------|----------|---------|---------|-------------------
All files       |     100 |      100 |     100 |     100 |                   
 csvtondjson.js |     100 |      100 |     100 |     100 |                   
 logger.js      |     100 |      100 |     100 |     100 |                   
 reporter.js    |     100 |      100 |     100 |     100 |                   
----------------|---------|----------|---------|---------|-------------------

```
