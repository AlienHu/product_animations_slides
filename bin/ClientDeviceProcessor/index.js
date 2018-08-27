//require could not load this module as its present under profitGuruCore and a soft link is made to access
//var nodeModuleDir = path.dirname(require.main.filename) + '/../node_modules';
var MobileDetect;

function clientDeviceProcessor() {
    return function clientDeviceProcessor(req, res, next) {
        try {
            if (req.headers === undefined) {
                req.clientType = 'DeskTopApp';
                return next();
            }

            if (!MobileDetect) {
                var apRoot = req.app.get('appRootPath');
                MobileDetect = require(apRoot + '/node_modules/mobile-detect');
            }
            var requestDevice = new MobileDetect(req.headers['user-agent']);
            var isMobileCrossWalkClient = (req.headers['user-agent'] && (req.headers['user-agent'].indexOf('Crosswalk') >= 0));
            req.clientType = requestDevice.mobile() || isMobileCrossWalkClient ? 'MobileApp' : 'DeskTopApp';

            return next();
        } catch (err) {
            console.log(err);
            req.clientType = 'DeskTopApp';
            return next();
        }
    };
}

module.exports = clientDeviceProcessor;