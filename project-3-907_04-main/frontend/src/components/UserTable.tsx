import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import {
  GridRowsProp,
  GridRowModesModel,
  GridRowModes,
  DataGrid,
  GridColDef,
  GridToolbarContainer,
  GridActionsCellItem,
  GridEventListener,
  GridRowId,
  GridRowModel,
  GridRowEditStopReasons,
  GridValidRowModel,
  GridToolbar,
} from '@mui/x-data-grid';
import { User } from '../store';
import axios, {handleErrors, handleErrorsNoRedirect} from '../config/axiosConfig';
import { useEffect } from 'react';

const initialRows: GridRowsProp = [];

async function saveUser (user: User) {
    return axios.post('/users', user).then((res) => res.data, handleErrorsNoRedirect);
}

async function deleteUser (id: string | number) {
    return axios.delete('/users', {params: {id: id}}).then((res) => res.data, handleErrorsNoRedirect);
}

function mapGridRowToUser(gridRow: GridValidRowModel): User {
  if (gridRow.id === Infinity) {
    return {
        username: gridRow.username,
        password: gridRow.password,
        email: gridRow.email,
        role: gridRow.role,
    };
  }
  return {
    id: gridRow.id,
    username: gridRow.username,
    password: gridRow.password,
    email: gridRow.email,
    role: gridRow.role,
  };
}

interface EditToolbarProps {
  setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void;
  setRowModesModel: (
    newModel: (oldModel: GridRowModesModel) => GridRowModesModel,
  ) => void;
}

function EditToolbar(props: EditToolbarProps) {
  const { setRows, setRowModesModel } = props;

  const handleClick = () => {
    const id = Infinity;
    setRows((oldRows) => 
      [...oldRows, { id: id, username: '', password: '', email: '', role: '', isNew: true }]
      );

    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: 'id' },
    }));
  };

  return (
    <GridToolbarContainer style={{display: 'flex', justifyContent: 'space-between'}}>
      <GridToolbar />
      <Button color="primary" style={{display: 'flex', justifyContent: 'right'}} startIcon={<AddIcon />} onClick={handleClick}>
        Add user
      </Button>
    </GridToolbarContainer>
  );
}
export default function FullFeaturedCrudGrid() {
  
  const [rows, setRows] = React.useState(initialRows);

  const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>({});

  useEffect(() => {
    axios.get("/users").then((res) => res.data)
    .then((data) => {
      setRows(data.map((user: User) => ({...user, isNew: false})));
    }, handleErrors);
  }, []);

  const handleRowEditStop: GridEventListener<'rowEditStop'> = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id: GridRowId) => () => {
    deleteUser(id.valueOf());
    setRows(rows.filter((row) => row.id !== id));
  };

  const handleCancelClick = (id: GridRowId) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow!.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const processRowUpdate = async (newRow: GridRowModel) => {
    const newUser: User = await saveUser(mapGridRowToUser(newRow));
    const updatedRow = { ...newUser, isNew: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const columns: GridColDef[] = [
    {
        field: 'id',
        headerName: 'User ID',
        type: 'number',
        flex: 0.1,
        minWidth: 100,
        editable: false,
    },
    {
        field: 'username',
        headerName: 'Username',
        flex: 0.2,
        minWidth: 150,
        editable: true,
    },
    {
        field: 'password',
        headerName: 'Password',
        flex: 0.2,
        minWidth: 150,
        editable: true,
    },
    {
        field: 'email',
        headerName: 'Email Address',
        flex: 0.2,
        minWidth: 150,
        editable: true,
    },
    {
        field: 'role',
        headerName: 'Role',
        flex: 0.2,
        minWidth: 150,
        editable: true,
    },
    {
        field: 'isNew',
        type: 'boolean',
        headerName: 'New',
        flex: 0.1,
        minWidth: 50,
        editable: false,
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      flex: 0.1,
      minWidth: 100,
      cellClassName: 'actions',
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              sx={{
                color: 'primary.main',
              }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  return (
    <Box
      sx={{
        height: '100%',
        width: '100%',
        '& .actions': {
          color: 'text.secondary',
        },
        '& .textPrimary': {
          color: 'text.primary',
        },
      }}
    >
      <DataGrid 
        autoHeight
        rows={rows}
        columns={columns}
        editMode="row"
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        initialState={{
          sorting: {
            sortModel: [{ field: 'isNew', sort: 'desc' }],
          },
          columns: {
            columnVisibilityModel: {
              isNew: false,
            }
          }
        }}
        slots={{
          toolbar: EditToolbar,
        }}
        slotProps={{
          toolbar: { setRows, setRowModesModel },
        }}
      />
    </Box>
  );
}