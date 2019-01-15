$(document).ready(function() {

    $('.fa-square').click(function() {

        if($(this).hasClass('fa-square')) {
            $(this).removeClass('fa-square');
            $(this).addClass('fa-check-square');
            $('#privacy').prop('checked', true);
        }
        else {
            $(this).removeClass('fa-check-square');
            $(this).addClass('fa-square');
            $('#privacy').prop('checked', false);

        }
    });

    $('#newsletter_form').submit(function(e) {

        let email = $('#email');
        email.removeClass('form_error');
        let privacy = $('#privacy');
        privacy.removeClass('form_error');

        if(email.val() === "" || !email.val().includes("@") || !email.val().includes(".")) {
            email.val('');
            email.addClass('form_error');
            email.attr('placeholder', 'Inserisci un\'email valida');
            e.preventDefault();
        }

        if(!privacy.is(':checked')) {
            $('#privacy_text').addClass('form_error');
            e.preventDefault();
        }

    });

    $('#notify_btn').click(function () {
        $('#double_view').show();
        $('#newsletter_form_cnt').hide();
        $(this).addClass('selected-box');
        $('#newsletter_btn').removeClass('selected-box');
    });

    $('#newsletter_btn').click(function () {
        $('#double_view').hide();
        $('#newsletter_form_cnt').show();
        $(this).addClass('selected-box');
        $('#notify_btn').removeClass('selected-box');
    });

    $.ajax({
        url: "https://jsonplaceholder.typicode.com/photos",
        method: "GET",
        success: function (data) {
            for(let i = 0; i < 24; i++) {
                console.log(data[i]);
                if(i <= 11) {
                    $('#women_panel').append(
                        '<div class="col-md-4 panel-square">' +
                            '<img class="img-fluid mt-4 mb-4 panel-img" src="' + data[i].url + '">' +
                            '<p class="text-center">' +
                                data[i].title +
                            '</p>' +
                        '</div>'
                    );
                }
                else {
                    $('#men_panel').append(
                        '<div class="col-md-4 panel-square">' +
                        '<img class="img-fluid mt-4 mb-4 panel-img" src="' + data[i].url + '">' +
                        '<p class="text-center">' +
                        data[i].title +
                        '</p>' +
                        '</div>'
                    );
                }
            }
        }
    });

    $('#panel_search').keypress(function () {

    });

    // PUSH NOTIFICATION
    const pushButton = $('#push_btn');
    const applicationServerPublicKey = 'BACNAKMq6n6utHVrdIvPkTi_am1lK_Spqol69p0OeZGU9mP0cmqARiekWEVL8KNNSSCHFROf68kLnqpvpUWkiLs';

    if ('serviceWorker' in navigator && 'PushManager' in window) {
        console.log('Service Worker and Push is supported');

        navigator.serviceWorker.register('sw.js')
            .then(function(swReg) {
                console.log('Service Worker is registered', swReg);

                swRegistration = swReg;
                initializeUI();
            })
            .catch(function(error) {
                console.error('Service Worker Error', error);
            });
    } else {
        console.warn('Push messaging is not supported');
        $('#push_view').removeClass('elements_view');
        $('#download_view').addClass('elements_view');
    }

    function initializeUI() {

        pushButton.click(function() {
            pushButton.prop('disabled', true);
            if (isSubscribed) {
                unsubscribeUser();
            } else {
                subscribeUser();
            }
        });

        // Set the initial subscription value
        swRegistration.pushManager.getSubscription()
            .then(function(subscription) {
                isSubscribed = !(subscription === null);

                if (isSubscribed) {
                    console.log('User IS subscribed.');
                } else {
                    console.log('User is NOT subscribed.');
                }

                updateBtn();
            });
    }

    function updateBtn() {
        if (isSubscribed) {
            pushButton.text('DISABLE UPDATE');
        } else {
            pushButton.text('KEEP ME UPDATED');
        }

        pushButton.prop('disabled', false);
    }

    function subscribeUser() {
        const applicationServerKey = urlB64ToUint8Array(applicationServerPublicKey);
        swRegistration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: applicationServerKey
        })
            .then(function(subscription) {
                console.log('User is subscribed.');

                isSubscribed = true;

                updateBtn();
            })
            .catch(function(err) {
                console.log('Failed to subscribe the user: ', err);
                updateBtn();
            });
    }

    function unsubscribeUser() {
        swRegistration.pushManager.getSubscription()
            .then(function(subscription) {
                if (subscription) {
                    return subscription.unsubscribe();
                }
            })
            .catch(function(error) {
                console.log('Error unsubscribing', error);
            })
            .then(function() {
                console.log('User is unsubscribed.');
                isSubscribed = false;

                updateBtn();
            });
    }

    function urlB64ToUint8Array(base64String) {
        const padding = '='.repeat((4 - base64String.length % 4) % 4);
        const base64 = (base64String + padding)
            .replace(/\-/g, '+')
            .replace(/_/g, '/');

        const rawData = window.atob(base64);
        const outputArray = new Uint8Array(rawData.length);

        for (let i = 0; i < rawData.length; ++i) {
            outputArray[i] = rawData.charCodeAt(i);
        }
        return outputArray;
    }
});