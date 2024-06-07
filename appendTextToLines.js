var fs = require('fs');

class FileModifier {
    constructor(filePath, textToAdd) {
        this.filePath = filePath;
        this.textToAdd = textToAdd;
    }

    appendTextToLines(callback) {
        // Read the file
        fs.readFile(this.filePath, 'utf8', (err, data) => {
            if (err) {
                return callback(err);
            }

            // Split data into lines
            const lines = data.split('\n')
            lines.splice(0, 3);
            modifiedData =lines
            if(modifiedData.split(' ')[0]!=3)
                {
                    modifiedData.map(line => 'v' + line)
                    .join('\n');
                }
            else{
                modifiedData.split(' ')[1] = 'f'
                    .join('\n');
            }
            // Write the modified content back to the file
            fs.writeFile(this.filePath, modifiedData, 'utf8', (err) => {
                if (err) {
                    return callback(err);
                }
                callback(null, 'File successfully modified.');
            });
        });
    }
}

export {FileModifier};