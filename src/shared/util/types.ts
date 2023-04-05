export interface IGrey {
    0: string;
    10: string;
    50: string;
    100: string;
    200: string;
    300: string;
    400: string;
    500: string;
    600: string;
    700: string;
    800: string;
    900: string;
    1000: string;
}
export interface IPrimary {
    100: string;
    200: string;
    300: string;
    400: string;
    500: string;
    600: string;
    700: string;
    800: string;
    900: string;
}
export interface ISecondary {
    50: string;
    100: string;
    200: string;
    300: string;
    400: string;
    500: string;
    600: string;
    700: string;
    800: string;
    900: string;
}
export interface ITokens {
    grey: IGrey;
    primary: IPrimary;
    secondary: ISecondary;

}
export interface ITheme {
    grey: IGrey;
    primary: IPrimary;
    secondary: ISecondary;
}

export interface IPPrimary {
    100: string;
    200: string;
    300: string;
    400: string;
    500: string;
    600: string;
    700: string;
    800: string;
    900: string;
    main: string;
    light: string;
    dark: string;
    contrastText: string;
}
export interface IPSecondary {
    50: string;
    100: string;
    200: string;
    300: string;
    400: string;
    500: string;
    600: string;
    700: string;
    800: string;
    900: string;
    main: string;
    light: string;
    dark: string;
    contrastText: string;
}
export interface IPNeutral {
    0: string;
    10: string;
    50: string;
    100: string;
    200: string;
    300: string;
    400: string;
    500: string;
    600: string;
    700: string;
    800: string;
    900: string;
    1000: string;
    main: string;
}
export interface IPGrey {
    50: string;
    100: string;
    200: string;
    300: string;
    400: string;
    500: string;
    600: string;
    700: string;
    800: string;
    900: string;
    A100: string;
    A200: string;
    A400: string;
    A700: string;
}
export interface IPAction {
    active: string;
    hover: string;
    hoverOpacity: number;
    selected: string;
    selectedOpacity: number;
    disabled: string;
    disabledBackground: string;
    disabledOpacity: number;
    focus: string;
    focusOpacity: number;
    activatedOpacity: number;
}
interface IPOptions {
    mode: string;
    primary: IPPrimary;
    secondary: IPSecondary;
    neutral: IPNeutral;
    background: { default: string, alt: string, paper: string };
    common: { black: string, white: string };
    error: { main: string, light: string, dark: string, contrastText: string };
    warning: { main: string, light: string, dark: string, contrastText: string };
    info: { main: string, light: string, dark: string, contrastText: string };
    success: { main: string, light: string, dark: string, contrastText: string },
    grey: IPGrey;
    contrastThreshold: number;
    tonalOffset: number;
    text: {
        primary: string,
        secondary: string,
        disabled: string,
        icon: string
    };
    divider: string;
    action: IPAction;
}
export interface ITheme {
    breakpoints: any;
    direction: any;
    components: any;
    palette: IPOptions;
    spacing: any;
    shape: any;
    typography: any;
    unstable_sxConfig: any;
    unstable_sx: any;
    mixins: any;
    shadows: any;
    transitions: any;
    zIndex: any;
}




// OverviewChart:
export interface MonthlyData {
    month: string;
    totalSales: number;
    totalUnits: number;
}
export interface Acc {
    sales: number;
    units: number;
}
export interface DataPoint {
    x: string;
    y: number;
}
export interface ILine {
    id: string;
    color: string;
    data: DataPoint[];
}
export interface SalesData {
    date: Date;
    totalSales: number;
    totalUnits: number;
}

export type FormRValues = {
    username: string;
    email: string;
    password: string;
}
export type FormLValues = {
    emailorusername: string;
    password: string;
}

export enum EStateGeneric {
    IDLE = "idle",
    SUCCEEDED = "succeeded",
    PENDING = "pending",
    FAILED = "failed",
}

export interface IProduct {
    id: number;
    name: string;
    image: string;
    brand_id: number;
    subcategory_id: number;
    price: number;
    description: string;
    rating: number;
    stock: number;
    soldCount: number;
    createdAt: Date;
    updatedAt: Date;
    brand: {
        id: number,
        name: string
    };
    subcategory: {
        id: number,
        name: string,
        category_id: number,
        category: {
            id: number,
            name: string
        }
    }
}