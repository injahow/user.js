
import { scroll } from './scroll'
import message_html from '../../html/message.html'

function initMessage(el) {
    if (el && !!$(el)[0]) {
        $(el).append(message_html)
        return
    }
    $('body').append(message_html)
}

function messageBox(ctx, type) {
    if (type === 'confirm') {
        $('.message-box-btn button[name="cancel"]').show()
    } else if (type === 'alert') {
        $('.message-box-btn button[name="cancel"]').hide()
    }
    if (ctx.html) {
        $('#message_box_context').html(`<div style="font-size:18px">${ctx.html}</div>`)
    } else {
        $('#message_box_context').html('<div style="font-size:18px">╰(￣▽￣)╮</div>')
    }
    scroll.hide()
    $('#message_box').show()
    $('#message_box').animate({
        'opacity': '1'
    }, 300)

    const option = {
        affirm: () => {
            $('#message_box').hide()
            $('#message_box').css('opacity', 0)
            scroll.show()
            if (ctx.callback && ctx.callback.affirm) {
                ctx.callback.affirm()
            }
        },
        cancel: () => {
            $('#message_box').hide()
            $('#message_box').css('opacity', 0)
            scroll.show()
            if (ctx.callback && ctx.callback.cancel) {
                ctx.callback.cancel()
            }
        }
    }

    $('.message-box-btn button[name="affirm"]')[0].onclick = option.affirm
    $('.message-box-btn button[name="cancel"]')[0].onclick = option.cancel

    return option
}

let id = 0

function message(html, type) {
    console.info(`[Message] ${type} : ${html}`)
    id += 1
    messageEnQueue(`<div id="message_${id}" class="message message-${type}"><div class="message-context"><p><strong>${type}：</strong></p><p>${html}</p></div></div>`, id)
    messageDeQueue(id, 3)
}

function messageEnQueue(message, id) {
    $('.message-bg').append(message)
    $(`#message_${id}`).animate({
        'margin-top': '+=70px',
        'opacity': '1'
    }, 300)
}

function messageDeQueue(id, time = 3) {
    setTimeout(() => {
        const e = `div#message_${id}`
        $(e).animate({
            'margin-top': '-=70px',
            'opacity': '0'
        }, 300, () => {
            $(e).remove()
        })
    }, time * 1000)
}

const Message = {
    success: html => message(html, 'success'),
    warning: html => message(html, 'warning'),
    error: html => message(html, 'error'),
    info: html => message(html, 'info'),
    miaow: () => message('(^・ω・^)~喵喵喵~', 'info')
}

const MessageBox = {
    alert: (html, affirm) => messageBox({
        html, callback: { affirm }
    }, 'alert'),
    confirm: (html, affirm, cancel) => messageBox({
        html, callback: { affirm, cancel }
    }, 'confirm')
}

export {
    initMessage,
    Message,
    MessageBox
}
