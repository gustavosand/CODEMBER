function verifyPassward(password, min, max, control) {
    let cont = 0

    password.split('').forEach(element => {
        if (control == element) cont++
    });

    if (cont >= min && cont <= max) {
        return true
    }

    return false
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
        let array = text.match(/([0-9]+)|\b(a-z)\b|[a-z]+/g)
        let isValid = verifyPassward(array[3], array[0], array[1], array[2])
        if(!isValid){
            response.push({text: text, isValid: isValid})
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
    let array = await analyze('./encryp.txt');
    //console.log(array)
    console.log(array[12])
}

main()
//sudo nljzuyfzb