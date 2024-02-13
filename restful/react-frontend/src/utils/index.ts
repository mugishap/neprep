export const getStatus = (text: string) => {
    // capitalize first letter and others lowercase
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
}

export const generateColor = () => {
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
}

export function enumToString(enumValue: string) {
    return enumValue.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');
}


export const checkFileType = (inputID: string) => {
    const fileInput = document.querySelector(`#${inputID}`) as HTMLInputElement
    const filePath = fileInput.value
    const allowedExtensions = /(\.jpg|\.jpeg|\.png)$/i;

    if (!allowedExtensions.exec(filePath)) {
        fileInput.value = '';
        return false;
    }
    else {
        return true
    }
}