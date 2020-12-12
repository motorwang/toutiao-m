// 存储
export const setStorage = (name, value)=>{
    if(typeof value === 'object'){
        value = JSON.stringify(value);
    }

    window.localStorage.setItem(name, value);
}

// 获取
export const getStorage = (name)=>{
    let data = window.localStorage.getItem(name);

    try {
        return JSON.parse(data);
    } catch (error) {
        // 如果转换json格式失败  直接返回 data
        return data;
    }
}

// 删除
export const removeStorage = (name)=>{
    window.localStorage.removeItem(name);
}