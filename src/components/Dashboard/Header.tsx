import { ITheme } from "@/shared/util/types";
import { Typography, Box, useTheme } from "@mui/material";
type Props = {
    title: string;
    subtitle: string;
}

const Header = ({ title, subtitle }: Props) => {
    const theme: ITheme = useTheme();
    return (
        <Box>
            <Typography
                variant="h2"
                color={theme.palette.secondary[100]}
                fontWeight="bold"
                sx={{ mb: "5px" }}
            >
                {title}
            </Typography>
            <Typography variant="h5" color={theme.palette.secondary[300]}>
                {subtitle}
            </Typography>
        </Box>
    );
};

export default Header;
