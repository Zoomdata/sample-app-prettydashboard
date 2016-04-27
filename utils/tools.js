export function getPos(items,id){
    items.forEach(function (e){
        if (e.id == id) return items.indexOf(e);
    })
}

export function getItem(items, value, attr = 'i'){
    let obj = false;
    items.forEach(function (e){
        if (e[attr] == value) { obj = e }
    })
    return obj;
}
