export type NavbarTheme = {
    type: string
    main: string
    boxShadow: string
    contrastText: string
    amplifyLogo: string
    amplifyText: string
    textColor: string
    textHoverColor: string
    searchBgColor: string
    searchMainColor: string
    searchHoverMainColor: string
    searchHoverBgColor: string
}

export type Index = {
    palette: {
        primary: {
            main: string
            contrastText: string
            background: string
            ternary: string
            darkblue: string
        }
        navbar: NavbarTheme
        textMd: string
    }
}

export const defaultNavbar = {
    type: 'scroll',
    main: 'var(--trackflix-background-color)',
    boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.4)',
    amplifyLogo: 'dark',
    amplifyText: '#ffffff',
    textColor: '#ffffff',
    textHoverColor: 'var(--trackflix-primary-color)',
    searchBgColor: 'rgba(0, 0, 0, 0)',
    searchMainColor: '#FFFFFF',
    searchHoverMainColor: '#FFFFFF',
    searchHoverBgColor: 'var(--trackflix-primary-color)',
    contrastText: 'var(--amplify-primary-contrast)',
}

const defaultTheme: Index = {
    palette: {
        primary: {
            main: 'var(--trackflix-primary-color)',
            contrastText: 'var(--amplify-primary-contrast)',
            background: 'var(--trackflix-background-color)',
            ternary: '#dedede',
            darkblue: '#050029',
        },
        navbar: defaultNavbar,
        textMd: 'var(--amplify-text-md)',
    },
}

export default defaultTheme
