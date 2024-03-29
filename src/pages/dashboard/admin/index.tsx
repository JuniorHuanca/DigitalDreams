import CustomColumnMenu from "@/components/CustomColumnMenu";
import DataGridCustom from "@/components/DataGridCustom";
import Header from "@/components/Dashboard/Header";
import { ITheme } from "@/shared/util/types";
import { useGetAdminsQuery } from "@/state/api";
import {
  Box,
  useTheme,
  Typography,
  SelectChangeEvent,
  Select,
} from "@mui/material";
import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  GridToolbar,
  useGridApiContext,
} from "@mui/x-data-grid";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import LayoutDashboard from "@/components/Layouts/LayoutDashboard";
import { toast } from "react-hot-toast";

type Props = {};
function SelectEditInputCell(props: GridRenderCellParams) {
  const { id, value, field } = props;
  const apiRef = useGridApiContext();

  const handleChange = async (event: SelectChangeEvent) => {
    await apiRef.current.setEditCellValue({
      id,
      field,
      value: event.target.value,
    });
    // apiRef.current.stopCellEditMode({ id, field });
  };

  return (
    <Select
      value={value}
      onChange={handleChange}
      size="small"
      sx={{ height: 1 }}
      native
      autoFocus
    >
      <option>Admin</option>
      <option>Manager</option>
      <option>User</option>
    </Select>
  );
}
const renderSelectEditInputCell: GridColDef["renderCell"] = (params) => {
  return <SelectEditInputCell {...params} />;
};
const Admin = (props: Props) => {
  const theme: ITheme = useTheme();
  const { data, isLoading } = useGetAdminsQuery(null);

  const columns = [
    {
      field: "id",
      headerName: "ID",
      flex: 1,
    },
    {
      field: "name",
      headerName: "Name",
      flex: 0.5,
      editable: true,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    // {
    //   field: "phoneNumber",
    //   headerName: "Phone Number",
    //   flex: 0.5,
    //   renderCell: (params: any) => {
    //     return params.value.replace(/^(\d{3})(\d{3})(\d{4})/, "($1)$2-$3");
    //   },
    // },
    {
      field: "country",
      headerName: "Country",
      flex: 0.4,
      editable: true,
    },
    {
      field: "occupation",
      headerName: "Occupation",
      flex: 1,
      editable: true,
    },
    {
      field: "role",
      headerName: "Role",
      flex: 0.5,
      renderEditCell: renderSelectEditInputCell,
      editable: true,
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
            {role === "Admin" && <AdminPanelSettingsOutlinedIcon />}
            {role === "Manager" && <SecurityOutlinedIcon />}
            {role === "User" && <LockOpenOutlinedIcon />}
            <Typography color={theme.palette.grey[100]} sx={{ ml: "5px" }}>
              {role}
            </Typography>
          </Box>
        );
      },
    },
  ];
  function handleCellEditCommit(params: any) {
    const dataToUpdate = {
      id: params.id,
      field: params.field,
      value: params.value,
    };
    fetch("/api/dashboard/management/admins", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataToUpdate),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status) {
          return toast.error(data.message);
        }
        return toast.success(data.message);
      })
      .catch((error) => {
        toast.error(
          "Sorry, an error occurred in the system. We are working to fix it as soon as possible."
        );
      });
  }

  return (
    <LayoutDashboard title={"Admins - Dashboard"}>
      <Box m="1.5rem 2.5rem">
        <Header title="ADMINS" subtitle="Managing admins and list of admins" />
        <Box
          mt="40px"
          height="75vh"
          sx={{
            "& .MuiDataGrid-root": {
              border: "none",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: "none",
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: theme.palette.background.alt,
              color: theme.palette.secondary[100],
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
            getRowId={(row: any) => row.id}
            rows={data || []}
            columns={columns}
            components={{
              Toolbar: GridToolbar,
              ColumnMenu: CustomColumnMenu,
            }}
            onCellEditCommit={handleCellEditCommit}
            // experimentalFeatures={{ newEditingApi: true }}
          />
        </Box>
      </Box>
    </LayoutDashboard>
  );
};

export default Admin;
