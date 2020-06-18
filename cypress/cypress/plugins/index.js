// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)
const toml = require('toml');
const fs = require('fs');
const { initPlugin } = require('cypress-plugin-snapshots/plugin');
const {
    addMatchImageSnapshotPlugin,
} = require('cypress-image-snapshot/plugin');

// module.exports = (on, config) => {
//
// };

module.exports = (on, config) => {
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config
    on('task', {
        timeit(startTimer) {
            console.log('======  Timeit ======');
            if (startTimer) console.time();
            else {
                console.timeEnd();
                console.log('====================');
            }

            return null;
        },
        checkWhiteList(url) {
            if (fs.existsSync('demo/whitelist.txt')) {
                const content = fs.readFileSync('demo/whitelist.txt', 'utf8');
                const domain = url.slice(7, 15);
                return content.includes(domain);
            }

            return null
        },
    });
    addMatchImageSnapshotPlugin(on, config);
    // initPlugin(on, config);
    // on('before:browser:launch', (browser = {}, args) => {
    //     if (browser.name === 'firefox') {
    //         // Open in mode private
    //         args.push('-private');
    //
    //         // Open with devtools opened
    //         args.push('-devtools');
    //     }
    // });

    return config;
};
// require('@applitools/eyes-cypress')(module);
