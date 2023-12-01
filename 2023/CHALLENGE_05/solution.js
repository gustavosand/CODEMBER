//let input = "1a421fa,alex,alex9@gmail.com,18,Barcelona"

let idRegx = /^[a-zA-Z0-9]+$/
let usernameRegx = /^[a-zA-Z0-9]+$/
let emailRegx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
let ageRegx = /^[0-9]+$/
let locationRegx = /^[a-zA-Z ]+$/

function validate(array){
    if (array[0] == "" || !idRegx.test(array[0])) {
        return false
    }
    
    if (array[1] == "" || !usernameRegx.test(array[1])) {
        return false
    }
    
    if (array[2] == "" || !emailRegx.test(array[2])) {
        return false
    }
    
    if (array[3] != "" && !ageRegx.test(array[3])) {
        return false
    }
    
    if (array[4] != "" && !locationRegx.test(array[4])) {
        return false
    }
    
    return true
}

function verifyFile(bbddReg) {
    let array = bbddReg.split(',')
    
    let result = validate(array)
    console.log(array + "  R:  " + result)
    if(result){
        return ""
    } else {
        return array[1][0]
    }
}

async function analyze(file) {
    let response = ""
    const readLine = require('readline');
    const f = require('fs');
    var rl = readLine.createInterface({
        input: f.createReadStream(file),
        output: process.stdout,
        terminal: false
    });

    rl.on('line', function (text) {
        let result = verifyFile(text)
        response = response + result
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
    let message = await analyze('./database_attacked.txt');
    console.log(message)
}


main()

//let r = emailRegx.test("mdv@twitch.tv")

//console.log(r)