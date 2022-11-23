
export const findById = (id, array) => {
    return array.find(item => {
        return item.id === id;
    });
}

export const updateItem = (item, update) => {
    const newItem = { ...item, ...update };
    return newItem;
}

export const updateArrayWhereId = (id, array, update) => {
    const newArr = array.map((item) => {
        if (item.id === id) {
            return { ...item, ...update };
        }
        return item;
    })
    return newArr;
}