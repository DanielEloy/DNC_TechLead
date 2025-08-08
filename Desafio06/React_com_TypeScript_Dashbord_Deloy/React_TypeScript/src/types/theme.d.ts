export interface Theme {
    appBackground: string
    appColor: string
    appDefaultStroke: string
    appLogo: string
    appSkeletonFrom: string
    appSkeletonTo: string
    buttons: {
        alert: string
        alertColor: string
        alertHover: string
        disabled: string
        disabledColor: string
        primary: string
        primaryColor: string
        primaryHover: string
    }
    card: {
        alert: string
        background: string
        border: string
        sucess: string
        warning: string
    }
    textInput: {
        active: string
        activeColor: string
        borderColor: string
        disabled: string
        disabledBorderColor: string
        disabledColor: string
        placeholderColor: string
    }
    typography: {
        error: string
        subTitle: string
        sucess: string
    }
}