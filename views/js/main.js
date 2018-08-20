// $.fn.inView = function () {
//     if (!this.length) return false;
//     var rect = this.get(0).getBoundingClientRect();

//     return (
//         rect.top >= 0 &&
//         rect.left >= 0 &&
//         rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
//         rect.right <= (window.innerWidth || document.documentElement.clientWidth)
//     );

// };
botAlreadyOpened = false;
$('.close-msg').on('click', function () {
    $('#success_message').fadeOut();
});
userScrolled = false;

$(document).ready(function () {
    $('#loader').fadeOut(700);
    $('#offer .glyphicon-remove').on('click', function () {
        $('#offer').fadeOut(500);
    });
    setTimeout(function () {
        // $('#offer').fadeIn(400);
        $('#lft-fxd').css('display', 'block');
    }, 3000);
    // $(window).scroll(function () {
    //         userScrolled=true;
    // });
    // setTimeout(function(){
    //     // alert('yy');
    //     if(userScrolled==false){
    //         if($(window).scrollTop() == 0 || $(window).scrollTop() == $(document).height()- $(window).height()) {
    //             // slide only when on top and not scrolled
    //             $('html, body').animate({
    //                 scrollTop: $("#slider").offset().top - 50
    //             }, 1000);
    //         }

    //     }
    // },6000);
});


$(document).ready(function () {
    // alertify.alert('Ready!');
    // close if open already
    alertify.tryDialog || alertify.dialog('tryDialog', function () {
        alertify.alert().closeOthers();
        var iframe;
        var h1;
        var credText;
        // alertify.defaults.transition = "zoom";
        // alertify.defaults.theme.ok = "ui positive button";
        alertify.defaults.theme.cancel = "ui black button";
        alertify.defaults.glossary.title = 'ProfitGuru POS &amp; ERP Demo';
        alertify.defaults.maintainFocus = false;
        // key=27/*ESC*/;
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
                        startMaximized: true
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
                // iframe.css('min-width','600px');
                // iframe.src = "http://192.168.1.10:8100";
                // iframe.src = "/trilPG";
                iframe.src = "/demo-ask.html";
                h1 = document.createElement("H4");
                h1.width = "80%";
                h1.height = "30px";
                h1.style.display = "block";
                h1.style.position = "absolute";
                h1.style.bottom = "0";
                h1.style.left = "50%";
                h1.style.transform = "translate(-50%,-50%)";
                h1.style.textAlign = "center";

                credText = document.createTextNode(" "); // Create a text node
                h1.appendChild(credText);
                // add it to the dialog
                // var cen=document.createElement("center");
                // var credLabel = document.createElement("center");
                // // cen.appendChild(credLabel);
                // var t = document.createTextNode("Username: username, Password: password");
                // credLabel.appendChild(t);
                // this.elements.content.append(credLabel);
                // this.elements.content.appendChild(h1);
                this.elements.content.appendChild(iframe);

                //give the dialog initial height (half the screen height).
                this.elements.body.style.minHeight = screen.height * .75 + 'px';
            },
            // dialog custom settings
            settings: {
                videoId: undefined
            },
            // listen and respond to changes in dialog settings.
            settingUpdated: function (key, oldValue, newValue) {
                switch (key) {
                    case 'videoId':
                        // iframe.src = "/buy-form.html?pack=" + newValue;
                        credText.nodeValue = newValue;
                        break;
                }
            }
        };
    });

    alertify.dialog('erplogin', function () {
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
                // iframe.css('min-width','600px');
                iframe.src = "http://alienhu.com:7777";
                // add it to the dialog
                this.elements.content.appendChild(iframe);
                // alertify.defaults.glossary.title='credentials';
                //give the dialog initial height (half the screen height).
                this.elements.body.style.minHeight = screen.height * .75 + 'px';
            }
        };
    });

    alertify.buypack || alertify.dialog('buypack', function () {
        alertify.alert().closeOthers();
        var iframe;
        // alertify.defaults.transition = "zoom";
        // alertify.defaults.theme.ok = "ui positive button";
        alertify.defaults.theme.cancel = "ui black button";
        alertify.defaults.glossary.title = 'Book ProfitGuru';
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
                        pinnable: true,
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
                // iframe.css('min-width','600px');
                iframe.src = "/buy-form.html?pack=";
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
                switch (key) {
                    case 'videoId':
                        iframe.src = "/buy-form.html?pack=" + newValue;
                        break;
                }
            }
        };
    });

    // pos demo
    alertify.showPOS || alertify.dialog('showPOS', function () {
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
                // iframe.css('min-width','600px');
                iframe.src = "http://www.profitguruerp.com:1080";
                // add it to the dialog
                this.elements.content.appendChild(iframe);
                // alertify.defaults.glossary.title='credentials';
                //give the dialog initial height (half the screen height).
                this.elements.body.style.minHeight = screen.height * .75 + 'px';
            }
        };
    });




    // pos demo
    alertify.showDownloadList || alertify.dialog('showDownloadList', function () {
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
                        // pinnable:true,
                        pinned: true,
                        autoReset: false,
                        startMaximized: true
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
                // iframe.css('min-width','600px');
                iframe.src = "/download-ask.html";
                // if (pack == "school")
                //     iframe.src = "http://profitguruerp.com:8181";
                // else if (pack == "retail")
                //     iframe.src = "http://profitguruerp.com";
                // else if (pack == "services")
                //     iframe.src = "http://profitguruerp.com:9191";
                // else {
                //     iframe.src = "http://profitguruerp.com";
                // }

                // add it to the dialog
                this.elements.content.appendChild(iframe);
                // alertify.defaults.glossary.title='credentials';
                //give the dialog initial height (half the screen height).
                this.elements.body.style.minHeight = screen.height * .75 + 'px';
            }
            // ,
            // // dialog custom settings
            // settings: {
            //     videoId: undefined
            // },
            // // listen and respond to changes in dialog settings.
            // settingUpdated: function (key, oldValue, newValue) {
            //     iframe.src = "/demo-ask.html?pack=" + newValue;
            // }
        };
    });
    alertify.showERP || alertify.dialog('showERP', function () {
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
                // iframe.css('min-width','600px');
                iframe.src = "/demo-ask.html";
                // if (pack == "school")
                //     iframe.src = "http://profitguruerp.com:8181";
                // else if (pack == "retail")
                //     iframe.src = "http://profitguruerp.com";
                // else if (pack == "services")
                //     iframe.src = "http://profitguruerp.com:9191";
                // else {
                //     iframe.src = "http://profitguruerp.com";
                // }

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
                iframe.src = "/demo-ask.html?pack=" + newValue;
            }
        };
    });


    //show the dialog
    // $('.ajs-maximize').click();
});

function bookPack(pack) {
    alertify.buypack(pack).set('title', 'Book ProfitGuru', {
        frameless: false
    }, 'resizable', true).resizeTo('60%', '80%');
}

function demoPopUpHandler() {
    alertify.tryDialog("Username: profitguru Password: demo").set('title', 'ProfitGuru Demo', {
        frameless: false
    }, 'resizable', true);
}

function demoPOS(pack) {
    alertify.showPOS(pack).set('title', 'ProfitGuru Demo', {
        frameless: false
    }, 'resizable', true).resizeTo('60%', '80%');
}

function showLogin() {
    alertify.erplogin('GOD').set('title', 'ProfitGuru Employee Login', {
        frameless: false
    }).set('modal', false).pin();
    // $('.ajs-maximize').click();
}

function demoERP(pack) {
    alertify.showERP(pack).set('title', 'ProfitGuru Demo', {
        frameless: false
    }, 'resizable', true).resizeTo('60%', '80%');
}

function showDownload() {
    alertify.showDownloadList('app').set('title', 'ProfitGuru Download', {
        frameless: false
    }, 'resizable', true);
}

// function demoPopUpHandler(){
//     alertify.minimalDialog || alertify.dialog('minimalDialog',function(){
//     alertify.defaults.theme.ok = "ui positive button";
//     alertify.defaults.theme.cancel = "ui black button";
//     alertify.defaults.glossary.title = 'ProfitGuru POS Demo';
//         return {
//             main:function(content){
//                 this.setContent(content); 
//             }
//         };
//     });
//     alertify.minimalDialog('<iframe src="http://localhost" style="height:100%;width:100%;border:none">');
// }

// $(window).load(function () {
//     setTimeout(function () {
//         $('.gst-enabled').animate();
//     }, 3000);
// });

$(document).ready(function () {
    var sdegree = 0;
    $(window).scroll(function () {
        sdegree++;
        sdegree = sdegree + 2;
        var srotate = "rotate( " + sdegree + "deg) ";
        $(".gear ").css({
            "transform": srotate,
            "-moz-transform ": srotate,
            "-webkit-transform ": srotate
        });
    });
    //chat bot auto start
    // setTimeout(function () {
    //     if (botAlreadyOpened == true) return;
    //     if ($('#messenger').is(":visible")) {
    //         $("#bot-open").hide(400);
    //         //return;
    //     } else {
    //         $("#messenger").css("-webkit-animation-name", "pulse");
    //         $("#messenger").css("animation-name", "pulse");
    //         $('#messenger').toggle(400);
    //         // $('#guest-input').focus();
    //         $("#bot-open").toggle(400);
    //         setTimeout(function () {
    //             $("#messenger").css("-webkit-animation-name", "");
    //             $("#messenger").css("animation-name", "");
    //         }, 10);
    //     }
    // }, 24000);

});

pageFlag = 0;
// after finish the scroll, check flag and then set view
function viewFlagHandler(page) {

}
// // route as per the current view
// $(window).load(function () {
//     // TODO : set timeout for smoothness

//     $(document).on('scroll', function () {
//         // setTimeout(function() {
//         //     if ($('#home-label-psuedo').inView()) {
//         //         window.location.replace('#home');
//         //     } else if ($('#services-label-psuedo').inView()) {
//         //         window.location.replace('#services');
//         //     } else if ($('#products-label-psuedo').inView()) {
//         //         window.location.replace('#ourproducts');
//         //     } else if ($('#ourStory-label-psuedo').inView()) {
//         //         window.location.replace('#about');
//         //     } else if ($('#contact-label-psuedo').inView()) {
//         //         window.location.replace('#contact');
//         //     }

//         // }, 500);
//         if ($('#home-label-psuedo').inView()) {
//             window.location.replace('#home');
//         }
//         /*else if ($('#services-label-psuedo').inView()) {
//             // window.location.replace('#services');
//         } else if ($('#products-label-psuedo').inView()) {
//             // window.location.replace('#ourproducts');
//         } else if ($('#ourStory-label-psuedo').inView()) {
//             // window.location.replace('#about');
//         } 
//         */
//         // else if ($('#contact-label-psuedo').inView()) {
//         //     window.location.replace('#contact');
//         // }
//     });
// });
function chatHandler() {
    var input = $("#guest-input").val().trim();
    if (input == "" || input == null || input == undefined) return;
    input = encodeURIComponent(input);
    // alert(input);
    // console.log(input);
    var output = 'typing...';
    $("#messenger .box").append('<div class="guest"><span class="msg">' + $('#guest-input').val() + '</span></div>');
    $("#guest-input").val('');
    $("#messenger .box").append('<div class="bot"><span class="msg">' + output + '</span></div>');
    // TODO: scroll to last msg
    var scrollTo = $("#messenger .bot:last-child");
    var myContainer = $("#messenger .box");
    myContainer.animate({
        scrollTop: scrollTo.offset().top - myContainer.offset().top + myContainer.scrollTop()
    });
    $('#messenger .bot:last-child .msg').load('/chatbot?msg=' + input, function () {
        myContainer.animate({
            scrollTop: scrollTo.offset().top - myContainer.offset().top + myContainer.scrollTop()
        });
    });
    // TODO: scroll to complete bottom
    // var bottom=scrollTo.position().top + scrollTo.outerHeight(true);
    // myContainer.animate({
    //     scrollTop: scrollTo.offset().top - bottom
    // });
    // $("#messenger .box").append('<div class="bot">Need help with our amazing ProfitGuru Software?</div>');
    //$('#last-msg').load('http://localhost:8081/');
}
$(document).ready(function () {
    $('#msg-send').on('click', function () {
        chatHandler();
    });
    $("#guest-input").on('keyup', function (e) {
        if (e.keyCode == 13) {
            // when enter
            chatHandler();
        }
    });

    // Add smooth scrolling to all links
    $("#body a").on('click', function (event) {

        // Make sure this.hash has a value before overriding default behavior
        if (this.hash !== "") {
            // Prevent default anchor click behavior
            event.preventDefault();

            // Store hash
            var hash = this.hash;

            // Using jQuery's animate() method to add smooth page scroll
            // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 900, function () {

                // Add hash (#) to URL when done scrolling (default click behavior)
                window.location.hash = hash;
            });
        } // End if

    });


    // click on slide
    // $('.set-slide-1').on('click', function () {
    //     window.location = '/index.html';
    // });
    // $('.set-slide-2').on('click', function () {
    //     window.location = '/index.html';
    // });
    // $('.set-slide-3').on('click', function () {
    //     window.location = '/index.html';
    // });

    // bot chat open - close
    $("#bot-open").on('click', function (event) {
        // var x = $('#bot-open').html();
        // var close = '<img src="images/close-red.svg">';
        // if (x == close) {
        //     $('#chatbot iframe').toggle(400);
        //     var open = '<img src="images/chat-red.svg">';
        //     $("#bot-open").html(open);
        //     return;
        // }
        // $('#chatbot iframe').toggle(400);
        // $("#bot-open").html(close);
        // $m = $('#messenger');
        // if (x.is(":visible")) {
        //     $('#messenger').toggle(400, 'linear');
        //     $('#messenger').toggle();

        // }
        $('#messenger').toggle(400);
        $('#guest-input').focus();
        $('#bot-open').toggle(400);
        botAlreadyOpened = true;

    });
    $('#messenger .closex').on('click', function (event) {
        $('#messenger').toggle(400);
        $('#bot-open').toggle(600);
    });

    // hide navbar menu onclick in small display
    $("#navbar-collapse-main a").click(function () {
        if ($('.navbar-toggle').is(':visible')) {
            $(".navbar-toggle").click();
        }
    });

    $('#contact_form').bootstrapValidator({
        // To use feedback icons, ensure that you use Bootstrap v3.1.0 or later
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            first_name: {
                validators: {
                    stringLength: {
                        min: 2,
                    },
                    notEmpty: {
                        message: 'Please supply your first name'
                    }
                }
            },
            // last_name: {
            //     validators: {
            //         stringLength: {
            //             min: 2,
            //         },
            //         notEmpty: {
            //             message: 'Please supply your last name'
            //         }
            //     }
            // },
            // email: {
            //     validators: {
            //         notEmpty: {
            //             message: 'Please supply your email address'
            //         },
            //         emailAddress: {
            //             message: 'Please supply a valid email address'
            //         }
            //     }
            // },
            phone: {
                validators: {
                    notEmpty: {
                        message: 'Please supply your phone number'
                    },
                    phone: {
                        country: 'US',
                        message: 'Please supply a vaild phone number'
                    }
                }
            },
            // address: {
            //     validators: {
            //         stringLength: {
            //             min: 8,
            //         },
            //         notEmpty: {
            //             message: 'Please supply your street address'
            //         }
            //     }
            // },
            // city: {
            //     validators: {
            //         stringLength: {
            //             min: 4,
            //         },
            //         notEmpty: {
            //             message: 'Please supply your city'
            //         }
            //     }
            // },
            state: {
                validators: {
                    notEmpty: {
                        message: 'Please select your state'
                    }
                }
            },
            comment: {
                validators: {
                    stringLength: {
                        min: 10,
                        max: 200,
                        message: 'Please enter at least 10 characters and no more than 200'
                    },
                    notEmpty: {
                        message: 'Please leave a message'
                    }
                }
            }
        }
    })
        .on('success.form.bv', function (e) {
            $('#success_message').slideDown({
                opacity: "show"
            }, "slow") // Do something ...
            $('#contact_form').data('bootstrapValidator').resetForm();

            // Prevent form submission
            e.preventDefault();

            // Get the form instance
            var $form = $(e.target);

            // Get the BootstrapValidator instance
            var bv = $form.data('bootstrapValidator');

            // Use Ajax to submit form data
            $.post($form.attr('action'), $form.serialize(), function (result) {
                console.log(result);
            }, 'json');

            $('#contact_form')[0].reset();
        });
});
// function initMap() {

//     // create a LatLng object containing the coordinate for the center of the map
//     var latlng = new google.maps.LatLng(-33.86455, 151.209);

//     // prepare the map properties
//     var options = {
//         zoom: 15,
//         center: latlng,
//         mapTypeId: google.maps.MapTypeId.ROADMAP,
//         navigationControl: true,
//         mapTypeControl: false,
//         scrollwheel: false,
//         disableDoubleClickZoom: true
//     };

//     var gmap=$("#google_map");
//     // initialize the map object
//     var map = new google.maps.Map(gmap, options);

//     // add Marker
//     var marker1 = new google.maps.Marker({
//         position: latlng,
//         map: map
//     });

//     // add listener for a click on the pin
//     google.maps.event.addListener(marker1, 'click', function () {
//         infowindow.open(map, marker1);
//     });

//     // add information window
//     var infowindow = new google.maps.InfoWindow({
//         content: '<div class="info"><strong>This is my company</strong><br><br>My company address is here<br> Dandeli</div>'
//     });
// }