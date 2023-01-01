
import { Message } from '../ui/message'

function ajax(obj) {
    return new Promise((resolve, reject) => {
        // set obj.success & obj.success
        obj.success = res => {

            if (res && res.code) {
                Message.warning(`${res.message || `CODE:${res.code}`}`)
                // todo
            }

            resolve(res)
        }

        obj.error = err => {
            Message.error('网络异常')
            reject(err)
        }

        $.ajax(obj)
    })
}

function _ajax(obj) {
    return new Promise((resolve, reject) => {
        // set obj.success & obj.success
        obj.success || (obj.success = res => {
            resolve(res)
        })
        obj.error || (obj.error = err => {
            reject(err)
        })
        $.ajax(obj)
    })
}

export {
    ajax, _ajax
}
