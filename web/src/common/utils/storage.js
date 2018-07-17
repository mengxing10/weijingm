/**
 * @file 通用本地存储
 * @author luwenlong <zuiwosuifeng@gmail.com>
 */

let storage = window.localStorage

/**
 * [替换方式]存入本地数据
 *
 */
export function replace(key, json) {

    if (!storage.getItem(key)) {
        try {
            storage.setItem(key, JSON.stringify(json))
        }
        catch (e) {
            if (e.name === 'QuotaExceededError') {
                storage.clear()
                storage.setItem(key, JSON.stringify(json))
            }
        }
    }
    else {
        storage.removeItem(key)
        try {
            storage.setItem(key, JSON.stringify(json))
        }
        catch (e) {
            if (e.name === 'QuotaExceededError') {
                storage.clear()
                storage.setItem(key, JSON.stringify(json))
            }
        }
    }
}

/**
 * [更新方式]存入本地数据
 *
 */
export function update(key, json, iterator) {

}
