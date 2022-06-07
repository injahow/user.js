
function show_scroll() {
    if ($('div#bp_config').is(':hidden') && $('div#message_box').is(':hidden')) {
        $('body').css('overflow', 'auto')
    }
}

function hide_scroll() {
    $('body').css('overflow', 'hidden')
}

export const scroll = {
    show: show_scroll,
    hide: hide_scroll
}
