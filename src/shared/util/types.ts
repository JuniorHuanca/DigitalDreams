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
export interface IPalette {
    grey: IGrey;
    primary: IPrimary;
    secondary: ISecondary;
}