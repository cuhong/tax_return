import dayjs from "dayjs";

const onlyDigit = (value) => {
    return value.replace(/\D/g, "");
}

const cellphoneValidator = (value) => {
    console.log(value)
    var cellphone = onlyDigit(value)
    try {
        if (cellphone.length !== 11) {
            throw "휴대전화번호는 11자리 숫자입니다."
        }
        if (cellphone.substring(0, 3) !== "010") {
            throw "휴대전화번호는 010으로 시작해야 합니다."
        }
        return cellphone
    } catch (e) {
        throw e
    }
}

const nameValidator = (value) => {
    return (value.length >= 2)
}

const ssnValidator = (value) => {
    var ssn = onlyDigit(value)
    try {
        if (value.length !== 13) {
            throw "주민등록번호는 13자리 숫자 입니다."
        }
        const yearPrefix = ssn.substring(6, 7).indexOf([1, 2, 5, 6]) ? "19" : "20"
        const birthDateString = yearPrefix + ssn.substring(0, 6)
        console.log("birthDateString")
        console.log(birthDateString)
        if(!dayjs(birthDateString).isValid()) {
            throw '올바른 주민등록번호 값을 입력하세요.'
        }
        return value
    } catch (e) {
        throw e
    }
}
export {
    onlyDigit,
    nameValidator,
    cellphoneValidator,
    ssnValidator,
}
