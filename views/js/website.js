alertify.showSite || alertify.dialog('showSite', function () {
    alertify.alert().closeOthers();
    var iframe;
    // alertify.defaults.transition = "zoom";
    // alertify.defaults.theme.ok = "ui positive button";
    alertify.defaults.theme.cancel = "ui black button";
    // alertify.defaults.glossary.title = 'ProfitGuru Employee Login';
    // key=27/*ESC*/;
    alertify.defaults.maintainFocus = false;
    return {
        // dialog constructor function, this will be called when the user calls alertify.YoutubeDialog(videoId)
        main: function (videoId) {
            //set the videoId setting and return current instance for chaining.
            return this.set({
                'videoId': videoId
            });
        },
        // we only want to override two options (padding and overflow).
        setup: function () {
            return {
                options: {
                    //disable both padding and overflow control.
                    padding: !1,
                    overflow: !1,
                    startMaximized: true,
                    // pinnable:true,
                    pinned: true,
                    autoReset: false
                }
            };
        },
        // This will be called once the DOM is ready and will never be invoked again.
        // Here we create the iframe to embed the video.
        build: function () {
            // create the iframe element
            iframe = document.createElement('iframe');
            iframe.frameBorder = "no";
            iframe.width = "100%";
            iframe.height = "100%";
            iframe.src = "/demo-ask.html";

            // add it to the dialog
            this.elements.content.appendChild(iframe);
            // alertify.defaults.glossary.title='credentials';
            //give the dialog initial height (half the screen height).
            this.elements.body.style.minHeight = screen.height * .75 + 'px';
        },
        // dialog custom settings
        settings: {
            videoId: undefined
        },
        // listen and respond to changes in dialog settings.
        settingUpdated: function (key, oldValue, newValue) {
            iframe.src = "demo-ask.html?pack=" + newValue;
            switch (newValue) {
                case 'car': iframe.src = "carSalesService.html";
                    break;
                case 'doctor': iframe.src = "doctor.html";
                    break;
                case 'food': iframe.src = "food.html";
                    break;
                case 'manufacture': iframe.src = "manufacture.html";
                    break;
                case 'service': iframe.src = "service.html";
                    break;
                case 'jewellery': iframe.src = "jewellery.html";
                    break;
                default: iframe.src = "index.html";
                    break;
            }

        }
    };
});
function demoSite(pack) {
    alertify.showSite(pack).set('title', 'Website Showcase', {
        frameless: false
    }, 'resizable', true).resizeTo('60%', '80%');
}