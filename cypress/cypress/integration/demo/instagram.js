
const request = require('request');
const fs = require('fs');
const download = function(uri, callback) {
    request.head(uri, function(err, res, body) {
        const filename = uri.match(/\d{8}.*jpg/);
        console.log('content-type:', res.headers['content-type']);
        console.log('content-length:', res.headers['content-length']);
        // debugger
        request(uri).pipe(fs.createWriteStream(filename[0])).on('close', callback);
    });
};
function getImageFromFile() {
    fs.readFile('../img.txt', 'utf-8', (err, content) => {
        const lines = content.split('\n');
        // eslint-disable-next-line array-callback-return
        lines.some((line) => {
            if (line !== '') {
                download(line, () => {
                    console.log('done')
                })
            }
        })
    })
}
getImageFromFile();
// it('Download hot girl image', () => {
//     cy.visit('https://www.instagram.com/vsbg18.vn/');
//     cy.get('[class="Nnq7C weEfm"]').each((thumbnail) => {
//
//         cy.wrap(thumbnail).find('.KL4Bh > img')
//             .should('be.visible')
//             .each((girl) => {
//             const imgSource = girl.attr('src');
//             cy.log(imgSource);
//             cy.writeFile('img.txt', `${imgSource}\n`, { flag: 'a'});
//             // getImageFromUrl(imgSource);
//         })
//     })
// });
