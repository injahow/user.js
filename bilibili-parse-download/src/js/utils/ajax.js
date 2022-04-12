
import { Message } from '../ui/message'

export function ajax(obj) {
    return new Promise((resolve, reject) => {
        // set obj.success & obj.success
        obj.success = res => {

            if (res.code) {
                Message.warning(`请求失败，${res.message || `CODE:${res.code}`}`)
                // todo
            }

            resolve(res)
        }
        obj.error = err => {
            Message.danger('网络异常')
            reject(err)
        }
        $.ajax(obj)
    })
}
