function decript(code) {
    let array = code.split('')

    let current = 0;

    array.forEach(element => {
        if(element === '#') ++current
        else if(element === '@') --current
        else if(element === '*') current = current*current
        else process.stdout.write(current+"")
    });
    console.log('');
}

let code = '&###@&*&###@@##@##&######@@#####@#@#@#@##@@@@@@@@@@@@@@@*&&@@@@@@@@@####@@@@@@@@@#########&#&##@@##@@##@@##@@##@@##@@##@@##@@##@@##@@##@@##@@##@@##@@##@@&';
decript(code)