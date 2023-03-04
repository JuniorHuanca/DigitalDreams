import DataGridCustom from "@/components/DataGridCustom";
import Header from '@/components/Dashboard/Header';
import { ITheme } from "@/shared/util/types";
import { useGetCustomersQuery } from "@/state/api";
import { Box, useTheme, Typography } from "@mui/material";
import { DataGrid, GridToolbar, GridColDef, GridValueGetterParams, GridEventListener, useGridApiEventHandler, GridCellEditStopParams, GridCellEditStopReasons, MuiEvent } from "@mui/x-data-grid";
import { AdminPanelSettingsOutlined, LockOpenOutlined, SecurityOutlined } from "@mui/icons-material";
import LayoutDashboard from "@/components/Layouts/LayoutDashboard";
type Props = {}

const Customers = (props: Props) => {
    const theme: ITheme = useTheme();
    const { data, isLoading } = useGetCustomersQuery(null);

    const columns: GridColDef[] = [
        {
            field: "id",
            headerName: "ID",
            editable: true,
            flex: 1,
        },
        {
            field: "name",
            headerName: "Name",
            editable: true,
            flex: 0.5,
            // valueGetter: (params: GridValueGetterParams) => {
            //     `${params.row.name}`
            //     handleEdit(params.row.name, params.row.id)
            // }
        },
        {
            field: "email",
            headerName: "Email",
            editable: true,
            flex: 1,
        },
        // {
        //     field: "phoneNumber",
        //     headerName: "Phone Number",
        //     flex: 0.5,
        //     renderCell: (params: { value: string; }) => {
        //         return params.value.replace(/^(\d{3})(\d{3})(\d{4})/, "($1)$2-$3");
        //     },
        // },
        {
            field: "country",
            headerName: "Country",
            editable: true,
            flex: 0.4,
        },
        {
            field: "occupation",
            headerName: "Occupation",
            editable: true,
            flex: 1,
        },
        {
            field: "role",
            headerName: "Role",
            editable: true,
            flex: 0.5,
            renderCell: ({ row: { role } }: { row: { role: string } }) => {
                return (
                    <Box
                        // width="60%"
                        m="0 auto"
                        p="5px"
                        display="flex"
                        justifyContent="center"
                        bgcolor={
                            role === "Admin"
                                ? theme.palette.primary[600]
                                : role === "Manager"
                                    ? theme.palette.primary[700]
                                    : theme.palette.primary[800]
                        }
                        borderRadius="4px"
                    >
                        {role === "Admin" && <AdminPanelSettingsOutlined />}
                        {role === "Manager" && <SecurityOutlined />}
                        {role === "User" && <LockOpenOutlined />}
                        <Typography color={theme.palette.grey[100]} sx={{ ml: "5px" }}>
                            {role}
                        </Typography>
                    </Box>
                );
            },
        },
    ];
    // async function handleEdit(params: GridValueGetterParams) {
    //     const id = params.row.id
    //     const value = params.row.name
    //     const response = await fetch('/api/client/customers', {
    //         method: 'PATCH',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify({ value, id })
    //     });
    //     return await response.json();
    // }
    return (
        <LayoutDashboard>
            <Box m="1.5rem 2.5rem">
                <Header title="CUSTOMERS" subtitle="List of Customers" />
                <Box
                    mt="40px"
                    height="75vh"
                    sx={{
                        "& .MuiDataGrid-root": {
                            border: "none",
                        },
                        "& .MuiDataGrid-cell": {
                            backgroundColor: theme.palette.background.alt,
                            borderBottom: "none",
                        },
                        "& .MuiDataGrid-cell:hover": {
                            backgroundColor: theme.palette.primary[700],
                        },
                        "& .MuiDataGrid-columnHeaders": {
                            backgroundColor: theme.palette.primary[800],
                            color: theme.palette.secondary[50],
                            borderBottom: "none",
                        },
                        "& .MuiDataGrid-virtualScroller": {
                            backgroundColor: theme.palette.primary.light,
                        },
                        "& .MuiDataGrid-footerContainer": {
                            backgroundColor: theme.palette.background.alt,
                            color: theme.palette.secondary[100],
                            borderTop: "none",
                        },
                        "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                            color: `${theme.palette.secondary[200]} !important`,
                        },
                    }}
                >
                    <DataGrid
                        loading={isLoading || !data}
                        getRowId={(row) => row.id}
                        rows={data || []}
                        columns={(columns) as any}
                        components={{ Toolbar: GridToolbar }}
                    />
                </Box>
            </Box>
        </LayoutDashboard>
    );
};

export default Customers;
