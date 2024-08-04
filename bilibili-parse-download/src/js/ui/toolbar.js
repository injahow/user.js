import toolbar_html from '@/html/toolbar.html'
import more_style from '@/html/more_style.html'

const btn_list = {
    setting_btn: '脚本设置',
    bilibili_parse: '请求地址',
    video_download: '下载视频',
    video_download_2: '下载音频',
    video_download_all: '批量下载',
    more: {
        download_danmaku: '下载弹幕',
        download_subtitle: '下载字幕'
    }
}

const setting_svg = '' +
    `<svg class width="28" height="28" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 32 32" xml:space="preserve">
        <path fill="#757575" style="stroke-miterlimit:10;" d="M16,29.5L16,29.5c-0.828,0-1.5-0.672-1.5-1.5V4c0-0.828,0.672-1.5,1.5-1.5h0 c0.828,0,1.5,0.672,1.5,1.5v24C17.5,28.828,16.828,29.5,16,29.5z"/>
        <path fill="#757575" style="stroke-miterlimit:10;" d="M29.5,16L29.5,16c0,0.828-0.672,1.5-1.5,1.5H4c-0.828,0-1.5-0.672-1.5-1.5v0 c0-0.828,0.672-1.5,1.5-1.5h24C28.828,14.5,29.5,15.172,29.5,16z"/>
    </svg>`

const request_svg = '' +
    `<svg class width="28" height="28" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 32 32" xml:space="preserve">
        <path fill="#757575" d="M28.282,13.508c-0.623-6.932-6.627-12.036-13.41-11.399C8.947,2.665,4.254,7.465,3.716,13.521 c0.786,0.404,1.283,1.226,1.284,2.126v4.157c-0.023,0.565-0.49,1.004-1.043,0.98c-0.521-0.022-0.938-0.448-0.959-0.98v-4.157 c0-0.188-0.113-0.452-0.508-0.452s-0.492,0.275-0.492,0.452v8.176c0,2.446,1.94,4.428,4.333,4.428c0,0,0,0,0,0h7.191 c0.552-1.396,2.107-2.07,3.473-1.505s2.025,2.154,1.473,3.549c-0.552,1.396-2.107,2.07-3.473,1.505 c-0.67-0.277-1.202-0.82-1.473-1.505h-7.19c-3.497,0-6.332-2.897-6.333-6.471l0,0v-8.178c0-1.077,0.706-2.02,1.723-2.303C2.429,5.285,9.393-0.662,17.278,0.059c6.952,0.636,12.445,6.297,13.009,13.407c1.032,0.404,1.713,1.416,1.712,2.545v4.088 c-0.038,1.505-1.262,2.694-2.735,2.656c-1.42-0.037-2.562-1.205-2.599-2.656l0,0v-4.085C26.667,14.924,27.302,13.939,28.282,13.508zM11.334,14.653c-1.105,0-2-0.915-2-2.044s0.896-2.044,2-2.044l0,0c1.105,0,2,0.915,2,2.044S12.439,14.653,11.334,14.653z M20.666,14.653c-1.105,0-2-0.915-2-2.044s0.896-2.044,2-2.044l0,0c1.105,0,2,0.915,2,2.044S21.771,14.653,20.666,14.653z M13.629,21.805c-2.167,0-3.962-1.653-3.962-3.748c0-0.564,0.448-1.022,1-1.022c0.552,0,1,0.458,1,1.022 c0,0.916,0.856,1.704,1.962,1.704c0.612,0.012,1.198-0.253,1.602-0.723c0.352-0.433,0.982-0.493,1.406-0.132 c0,0,0.001,0.001,0.001,0.001c0.047,0.039,0.09,0.083,0.128,0.131c0.404,0.47,0.99,0.734,1.602,0.723 c1.106,0,1.964-0.788,1.964-1.704c0-0.564,0.448-1.022,1-1.022c0.552,0,1,0.458,1,1.022c0,2.095-1.797,3.748-3.964,3.748 c-0.844,0.003-1.67-0.256-2.368-0.742C15.302,21.55,14.475,21.809,13.629,21.805z M29.332,15.333c-0.368,0-0.666,0.305-0.666,0.68 v4.088c-0.001,0.376,0.297,0.681,0.665,0.681c0.368,0.001,0.666-0.304,0.666-0.679c0-0.001,0-0.001,0-0.002v-4.088 c0.002-0.374-0.293-0.678-0.659-0.68c-0.001,0-0.002,0-0.003,0H29.332z"/>
    </svg>`

const download_svg = '' +
    `<svg class width="28" height="28" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 32 32" xml:space="preserve">
        <path fill="#757575" d="M16.015,0C7.186,0,0.03,7.157,0.03,15.985 S7.186,31.97,16.015,31.97S32,24.814,32,15.985S24.843,0,16.015,0z"/>
        <path style="fill:#FFFFFF;" d="M16.942,23.642H9.109C8.496,23.642,8,24.17,8,24.821v0C8,25.472,8.496,26,9.109,26h14.783 C24.504,26,25,25.472,25,24.821v0c0-0.651-0.496-1.179-1.109-1.179H16.942z"/>
        <path style="fill:#FFFFFF;" d="M8.798,16.998l6.729,6.33c0.398,0.375,1.029,0.375,1.427,0l6.729-6.33 c0.666-0.627,0.212-1.726-0.714-1.726h-3.382c-0.568,0-1.028-0.449-1.028-1.003V8.003C18.56,7.449,18.099,7,17.532,7h-2.582 c-0.568,0-1.028,0.449-1.028,1.003v6.266c0,0.554-0.46,1.003-1.028,1.003H9.511C8.586,15.273,8.132,16.372,8.798,16.998z"/>
    </svg>`

const svg_map = {
    setting_btn: setting_svg,
    bilibili_parse: request_svg,
    video_download: download_svg,
    video_download_2: download_svg,
    video_download_all: download_svg
}

function make_toolbar_bangumi(main_class_name, sub_class_names) {  // class-3

    const list_element = (id, class_names, svg, name) => {
        return '' +
            `<div id="${id}" mr-show="" class="${class_names[0]}">
                <span class="${class_names[1]}">
                    ${svg}
                </span>
                <span class="${class_names[2]}">${name}</span>
            </div>`
    }

    const more_element = (id, name) => `<li><span id="${id}">${name}</span></li>`

    let toolbar_elements = Object.keys(btn_list).map(key => {
        if (key === 'more') {
            const more_map = btn_list[key]
            return '' +
                `<div class="more">更多<div class="more-ops-list">
                    <ul>${Object.keys(more_map).map(key => more_element(key, more_map[key])).join('')}</ul>
                </div>`
        }
        return list_element(key, sub_class_names, svg_map[key], btn_list[key])
    }).join('')

    return '' +
        `<div class="${main_class_name}">
            ${toolbar_elements}
            ${more_style}
        </div>`
}

function showVideoToolbar(toolbar_id) {
    const toolbar_obj = $(`#${toolbar_id}`)
    const toolbar_obj_2 = toolbar_obj.clone()
    toolbar_obj_2.attr('id', `${toolbar_id}_2`)
    const left = toolbar_obj_2.find('.video-toolbar-left')
    const right = toolbar_obj_2.find('.video-toolbar-right')
    left.children().remove()
    right.children().remove()
    Object.keys(btn_list).map(key => {
        if (key === 'more') {
            const more_map = btn_list[key]
            const el = '' +
                `<div class="more">更多<div class="more-ops-list">
                    <ul>${Object.keys(more_map).map(key => `<li><span id="${key}">${more_map[key]}</span></li>`).join('')}</ul>
                </div>`
            right.append(el + more_style)
            return
        }
        const item = toolbar_obj.find('.toolbar-left-item-wrap').eq(0).clone()
        item.attr('id', key)
        const svg = svg_map[key]
            .replaceAll('#757575', 'currentColor')
            .replace('class', `class="${item.find('svg').attr('class')}"`)
        const span = item.find('span').text(btn_list[key])
        const item_div = item.find('div').eq(0)
        item_div.attr('title', btn_list[key])
        item_div.removeClass('on')
        item_div.children().remove()
        item_div.append(svg).append(span)
        left.append(item)
        return
    })
    toolbar_obj.after(toolbar_obj_2)
}

function showFestivalToolbar(toolbar_id) {
    const toolbar_obj = $(`#${toolbar_id}`)
    const toolbar_obj_2 = toolbar_obj.clone()
    toolbar_obj_2.attr('id', `${toolbar_id}_2`)
    const left = toolbar_obj_2.find('.video-toolbar-content_left')
    const right = toolbar_obj_2.find('.video-toolbar-content_right')
    toolbar_obj_2.find('.video-toobar_title').remove()
    left.children().remove()
    const watchlater = right.find('.watchlater').clone()
    right.children().remove()
    right.append(watchlater)
    toolbar_obj_2.find('.video-desc-wrapper').remove()
    Object.keys(btn_list).map(key => {
        if (key === 'more') {
            const list = watchlater.find('.more-list')
            const list_li = list.children().eq(0)
            list.children().remove()
            const more_map = btn_list[key]
            Object.keys(more_map).map(key => {
                const li = list_li.clone()
                li.html(`<span id="${key}">${more_map[key]}</span>`)
                list.append(li)
            })
            return
        }
        const item = toolbar_obj.find('.video-toolbar-content_item').eq(0).clone()
        item.attr('id', key)
        item.attr('title', btn_list[key])
        const svg = svg_map[key].replaceAll('#757575', 'currentColor')
        const item_icon = item.find('.content-item_icon').eq(0)
        item_icon.removeClass('ic_like')
        item_icon.html(svg)
        item.html('')
        item.append(item_icon)
        item.append(btn_list[key])
        left.append(item)
        return
    })
    toolbar_obj.after(toolbar_obj_2)
}

function showBangumiToolbar(toolbar_class) {
    const toolbar_obj = $(`.${toolbar_class}`).eq(0)
    const toolbar_obj_2 = toolbar_obj.clone()
    const left = toolbar_obj_2.find('.toolbar-left')
    const right = toolbar_obj_2.find('.toolbar-right')
    left.children().remove()
    right.children().remove()
    Object.keys(btn_list).map(key => {
        if (key === 'more') {
            const more_map = btn_list[key]
            const el = '' +
                `<div class="more">更多<div class="more-ops-list">
                    <ul>${Object.keys(more_map).map(key => `<li><span id="${key}">${more_map[key]}</span></li>`).join('')}</ul>
                </div>`
            right.append(el + more_style)
            return
        }
        const item = toolbar_obj.find('.toolbar-left').children().eq(0).clone()
        item.attr('id', key)
        item.attr('title', btn_list[key])
        const svg = svg_map[key]
            .replaceAll('#757575', 'currentColor')
            .replace('class', `class="${item.find('svg').attr('class')}"`)
        const span = item.find('span').text(btn_list[key])
        item.children().remove()
        item.append(svg).append(span)
        left.append(item)
        return
    })
    toolbar_obj.after(toolbar_obj_2)
}

function initToolbar() {
    if (!!$('#arc_toolbar_report')[0]) { // video
        showVideoToolbar('arc_toolbar_report')
    } else if (!!$('#playlistToolbar')[0]) {  // list
        showVideoToolbar('playlistToolbar')
    } else if (!!$('#videoToolbar')[0]) { // festival
        showFestivalToolbar('videoToolbar')
    } else if (!!$('.toolbar')[0]) {  // bungumi
        showBangumiToolbar('toolbar')
    } else if (!!$('.edu-play-left')[0]) {  // cheese test
        // todo
        const toolbar_obj = $('.edu-play-left').children().eq(1)
        const toolbar_class = toolbar_obj.attr('class')
        const span_class = toolbar_obj.children().eq(0).attr('class')
        const span_class_svg = toolbar_obj.children().eq(0).children().eq(0).attr('class')
        const span_class_text = toolbar_obj.children().eq(0).children().eq(1).attr('class')
        toolbar_obj.after(make_toolbar_bangumi(toolbar_class, [span_class, span_class_svg, span_class_text]))
    } else if (!!$('#toolbar_module')[0]) { // ! fix
        $('#toolbar_module').after(toolbar_html)
    }

    // 处理遮挡
    !!$('#limit-mask-wall')[0] && $('#limit-mask-wall').remove()
}

export {
    initToolbar
}
