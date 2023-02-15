import {
    GridToolbarDensitySelector,
    GridToolbarContainer,
    GridToolbarExport,
    GridToolbarColumnsButton,
} from "@mui/x-data-grid";
import FlexBetween from "./FlexBetween";
type Props = {}
const DataGridCustom = (props: Props) => {
    return (
        <GridToolbarContainer>
            <FlexBetween width="100%">
                <FlexBetween>
                    <GridToolbarColumnsButton />
                    <GridToolbarDensitySelector />
                    <GridToolbarExport />
                </FlexBetween>
            </FlexBetween>
        </GridToolbarContainer>
    );
};

export default DataGridCustom;
