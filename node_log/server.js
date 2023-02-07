const fs = require('fs');
const appconfigPath = '/appconfig/appconfig.json';
var refresh = 5000;

function logging(time){
    try {
        if (fs.existsSync(appconfigPath)) {
            appconfig = JSON.parse(fs.readFileSync(appconfigPath));
            if (appconfig.logText != undefined) {
                console.log(appconfig.logText);
            } else {
                console.log("logText key not found inside app config JSON");
            }
            if (appconfig.refresh != undefined && appconfig.refresh != refresh) {
                refresh = appconfig.refresh
                console.log("log refresh time updated to "+refresh+" milliseconds");
            }
        } else {
            console.log("No app config found yet");
        }
    } catch (err) {
        console.error(err);
    }
    setTimeout(function () {
        logging(refresh)
    }, time);
}

logging(refresh)
