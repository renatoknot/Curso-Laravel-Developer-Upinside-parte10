$(function() {
    $.ajaxSetup({
        headers: {
            "X-CSRF-TOKEN": $('meta[name = "csrf-token"]').attr("content")
        }
    });

    $('form[name= "login"]').submit(function(event) {
        event.preventDefault();

        const form = $(this);
        const action = form.attr("action");
        const email = form.find('input[name = "email"]').val();
        const password = form.find('input[name = "password_check"]').val();

        $.post(
            action,
            { email: email, password: password },
            function(response) {
                console.log(response);

                if (response.message) {
                    ajaxMessage(response.message, 3);
                }

                if (response.redirect) {
                    window.location.href = response.redirect;
                }
            },
            "json"
        );
    });

    // $('form[name= "login"]').submit(function(event) {
    //     event.preventDefault();

    //     const form = $(this);
    //     const action = form.attr("action");

    //     $.ajax({
    //         url: action,
    //         method: "POST",
    //         dataType: "JSON",
    //         data: form.serialize(),
    //         success: function(response) {
    //             console.log(response);

    //             console.log(response.message);
    //             if (typeof response.message != "undefined") {
    //                 ajaxMessage(response.message, 3);
    //             }
    //             console.log(response.redirect);
    //             if (typeof response.redirect != "undefined") {
    //                 console.log("entrou no if");
    //                 window.location.href = response.redirect;
    //             }
    //         },
    //         error: function(err) {
    //             console.log(err);
    //         }
    //     });
    // });

    // AJAX RESPONSE
    var ajaxResponseBaseTime = 3;

    function ajaxMessage(message, time) {
        var ajaxMessage = $(message);

        ajaxMessage.append("<div class='message_time'></div>");
        ajaxMessage
            .find(".message_time")
            .animate({ width: "100%" }, time * 1000, function() {
                $(this)
                    .parents(".message")
                    .fadeOut(200);
            });

        $(".ajax_response").append(ajaxMessage);
    }

    // AJAX RESPONSE MONITOR
    $(".ajax_response .message").each(function(e, m) {
        ajaxMessage(m, (ajaxResponseBaseTime += 1));
    });

    // AJAX MESSAGE CLOSE ON CLICK
    $(".ajax_response").on("click", ".message", function(e) {
        $(this)
            .effect("bounce")
            .fadeOut(1);
    });
});
