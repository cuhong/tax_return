const cellphoneFormatter = (value) => {
    const len = value.length
    if (len <= 3) {
        return value
    } else if (len <= 7) {
        return value.substring(0, 3) + "-" + value.substring(3, len)
    } else {
        return value.substring(0, 3) + "-" + value.substring(3, 7) + "-" + value.substring(7, 11)
    }
}

const ssnFormatter = (value) => {
    const len = value.length
    if (len <= 6) {
        return value
    } else {
        return value.substring(0, 6) + "-" + value.substring(6, 13)
    }
}

export {
    cellphoneFormatter,
    ssnFormatter
}
