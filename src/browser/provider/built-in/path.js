import browserTools from 'testcafe-browser-tools';


export default {
    isMultiBrowser: true,

    async _handleJSON (str) {
        var params = null;

        try {
            params = JSON.parse(str);
        }
        catch (e) {
            return null;
        }

        if (!params.path)
            return null;

        var openParameters = await browserTools.getBrowserInfo(params.path);

        if (!openParameters)
            return null;

        if (params.cmd)
            openParameters.cmd = params.cmd;

        return openParameters;
    },

    async openBrowser (browserId, pageUrl, browserName) {
        var openParameters = await browserTools.getBrowserInfo(browserName) || await this._handleJSON(browserName);

        if (!openParameters)
            throw new Error('The specified browser name is not valid!');

        await browserTools.open(openParameters, pageUrl);
    },

    async closeBrowser (browserId) {
        await browserTools.close(browserId);
    },

    async isLocalBrowser () {
        return true;
    }
};
