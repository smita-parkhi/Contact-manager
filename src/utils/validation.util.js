export const validateText = () => {
    return {
        required: {
            value: true,
            message: "This field is required"
        }
    }
}

export const validatePhoneNumber = () => {
    return {
        required: {
            value: true,
            message: "Phone number is required"
        },
        minLength: {
            value: 10,
            message: "Phone number length should be 10"
        },
        maxLength: {
            value: 10,
            message: "Phone number length should be 10"
        }
    }
}

export const validateEmail = () => {
    return {
        required: {
            value: true,
            message: "Email is required"
        },
        pattern: {
            value: /^\S+@\S+\.\S+$/,
            message: "Please provide valid email id"
        }
     }
}