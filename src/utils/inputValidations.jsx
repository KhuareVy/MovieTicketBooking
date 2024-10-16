export const required = { 
    value: true,
    message: 'required'
};

export const nameValidation = {
    name: 'name',
    label: 'Tên',
    type: 'text',
    id: 'name',
    placeholder: 'Tên',
    validation: {
        required: true,
    }
};

export const emailValidation = {
    name: 'email',
    type: 'email',
    id: 'email',
    placeholder: 'Email',
    label: 'email',
    validation: {
        required,
        pattern: {
            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
            message: 'Email không hợp lệ'
        }
    }
};

export const phoneValidation = {
    label: 'Số điện thoại',
    type: 'text',
    id: 'phoneNumber',
    placeholder: 'Số điện thoại',
    name: 'phoneNumber',
    validation: {
        required,
        pattern: {
            value: /^[0-9]{10}$/,
            message: 'Số điện thoại không hợp lệ'
        }
    }
};

export const dobValidation = {
    label: 'Ngày sinh',
    type: 'date',
    id: 'dob',
    placeholder: 'Ngày sinh',
    name: 'dateOfBirth',
    validation: {
        required,
    }
};

export const passwordValidation = {
    label: 'Mật khẩu',
    type: 'password',
    id: 'password',
    placeholder: 'Mật khẩu',
    name: 'password',
    validation: {
        required,
        minLength: {
            value: 8,
            message: 'Mật khẩu phải có ít nhất 8 ký tự'
        },
        pattern: {
            value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
            message: 'Mật khẩu phải chứa ít nhất 1 chữ cái và 1 số'
        }
    }
};

export const confirmPasswordValidation = {
    label: 'Nhập lại mật khẩu',
    type: 'password',
    id: 'confirmPassword',
    placeholder: 'Nhập lại mật khẩu',
    name: 'confirmPassword',
    validation: {
        required,
        // validate: value => watch('password') != value || 'Mật khẩu không khớp'
    }
};