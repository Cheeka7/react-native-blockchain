export const validation = {
    address: {
        presence: {
            message: 'Required Field'
        },
        format: {
            pattern: /^[13][a-km-zA-HJ-NP-Z1-9]{25,34}$/,
            message: 'Incorrect bitcoin address format'
        }
    }
}


export function validate(nameField, value, compareValue) {
    let response = [null, null];
    if (validation.hasOwnProperty(nameField)) {
        let v = validation[nameField];
        if (value == '' || value == null) {
            response[0] = false
            response[1] = v['presence']['message']
        } else if (v.hasOwnProperty('format') && !v['format']['pattern'].test(value)) {
            response[0] = false
            response[1] = v['format']['message']
        } else {
            response[0] = true;
        }
    } else {
        response[0] = true
    }
    return response;

}
