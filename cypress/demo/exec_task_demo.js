describe('Exec demo', () => {
    it('Exec', () => {
        cy.exec('docker rm nginx --force');
        cy.exec('docker run --name nginx -d -p 8080:80 nginx', {
            timeout: 20000,
            failOnNonZeroExit: false,
        });
        cy.visit('http://localhost:8080');
    });

    it('Task sample', () => {
        cy.visit('http://testing.coe.com:30022');
        cy.url().then((url) => {
            cy.task('checkWhiteList', url).then((result) => {
                expect(result).to.be.true;
            })
        })
    });
});
