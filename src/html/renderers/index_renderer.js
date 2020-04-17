$(function () {
    render(window.location.hash);

    $(window).on('hashchange', function () {
        render(window.location.hash);
    });

    function render(hash) {

        var action = hash.split('=')[0];

        // Hide everything
        $('#main-body').hide();

        var pagemap = {
            '': function () {
                $('#main-body').show();
                $('#hide-button').show();
                $('#show-button').hide();
            },
        }

        if (pagemap[action]) {
            pagemap[action]();
        } else {
            // Redirect to home page
            window.location.hash = '#';
        }
    }
    
})

function hideText() {
    $('#left-message').hide();
    $('#middle-message').hide();
    $('#right-message').hide();
    $("#hide-button").hide();
    $("#show-button").show();
}

function showText() {
    $('#left-message').show();
    $('#middle-message').show();
    $('#right-message').show();
    $("#show-button").hide();
    $("#hide-button").show();
}




