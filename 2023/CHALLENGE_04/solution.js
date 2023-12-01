function calculateCheksum(filenamePart1) {
    let array = filenamePart1.split('')
    let characters = new Map()

    let result = ""

    array.forEach(element => {
        console.log(characters)
        if(characters.get(element) == undefined) {
            characters.set(element, 1)
        } else {
            let current = characters.get(element)
            characters.set(element, ++current)
        }        
    });

    for (let [clave, valor] of characters) {
        if(valor == 1){
            result = result + clave
        }
    }

    return result
}


function verifyFile(filename) {
    let array = filename.split('-')
    let filenamePart1 = array[0]
    let checksum = calculateCheksum(filenamePart1)
    
    if(checksum === array[1]){
        console.log(filenamePart1 + " --= " + checksum)
        return checksum
    } else {
        return undefined
    }
}

async function analyze(file) {
    let response = []
    const readLine = require('readline');
    const f = require('fs');
    var rl = readLine.createInterface({
        input: f.createReadStream(file),
        output: process.stdout,
        terminal: false
    });

    rl.on('line', function (text) {
        let result = verifyFile(text)
        if(result != undefined){
            response.push(result)
        }
        
    });

    return new Promise((resolve, reject) => {
        rl.on('close', function () {
            rl.close();
            resolve(response)
        })

        rl.on('error', function (err) {
            reject(err)
        })
    })

}

async function main() {
    let array = await analyze('./files_quarantine.txt');
    //console.log(array)
    console.log(array[32])
}


main()
//console.log(calculateCheksum("U6Z1WWc0LP"))