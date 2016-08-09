const fs          = require('fs')
const PackageFile = 'package.json'
const PackageJson = require('../../' + PackageFile)
const Readline    = require('readline')

const question = 'Current version : ' + PackageJson.version + '\nNew version ? '
const rl = Readline.createInterface({
    input: process.stdin,
    output: process.stdout
})
rl.question(question, version => {
    const futureVersion = isInt(version.charAt(0)) ? version : PackageJson.version
    updatePackage(futureVersion)
    addSignature(futureVersion)
    rl.close()
})

function isInt(value) {
    if (isNaN(value)) {
        return false
    }
    const x = parseFloat(value)
    return (x | 0) === x
}

function updatePackage (version) {
    PackageJson.version = version

    fs.writeFile(PackageFile, JSON.stringify(PackageJson, null, 4), err => {
        if (err) {
            console.log(err)
        }
    })
}

function addSignature (version) {
    const date      = new Date()
    const monthName = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

    const signatureArr = [
        '/**',
        ' * Skylake',
        ' *',
        ' * Version   →  ' + version,
        ' * Github    →  https://github.com/ariiiman/skylake',
        ' * License   →  http://opensource.org/licenses/MIT',
        ' * Author    →  Aristide Benoist © ' + date.getFullYear(),
        ' * Website   →  www.aristidebenoist.com',
        ' * Date      →  ' + monthName[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear(),
        ' */'
    ]

    const signature = signatureArr.join('\n') + '\n'

    const file = 'index.js'
    const data = fs.readFileSync(file)
    const fd = fs.openSync(file, 'w+')
    const buffer = new Buffer(signature)
    fs.writeSync(fd, buffer, 0, buffer.length)
    fs.writeSync(fd, data, 0, data.length)
    fs.close(fd)
}
