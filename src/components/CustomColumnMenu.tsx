import {
    GridColumnMenuContainer,
    GridFilterMenuItem,
    HideGridColMenuItem,
} from "@mui/x-data-grid";
type Props = {
    hideMenu: any, 
    currentColumn: any, 
    open: any,
}
const CustomColumnMenu = (props: Props) => {
    const { hideMenu, currentColumn, open } = props;
    return (
        <GridColumnMenuContainer
            hideMenu={hideMenu}
            currentColumn={currentColumn}
            open={open}
        >
            <GridFilterMenuItem onClick={hideMenu} column={currentColumn} />
            <HideGridColMenuItem onClick={hideMenu} column={currentColumn} />
        </GridColumnMenuContainer>
    );
};

export default CustomColumnMenu;
