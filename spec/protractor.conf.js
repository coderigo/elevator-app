exports.config = {
    
    multiCapabilities:[
        {
            'browserName' : 'safari'
        },
        {
            'browserName' : 'firefox'
        },
        {
            'browserName' : 'chrome'
        }
    ],

    specs: [
        './**/*.spec.js'
    ],

    baseUrl: 'http://localhost:9000/'
};
