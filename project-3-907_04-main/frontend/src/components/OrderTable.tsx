import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import CloseIcon from '@mui/icons-material/Close';
import InfoIcon from '@mui/icons-material/Info';
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
  useGridApiRef,
  GridToolbarQuickFilter,
  GridToolbar,
  GridValueFormatterParams,
} from '@mui/x-data-grid';
import { Order, MenuItem, CartEntry } from '../store';
import axios, {handleErrors, handleErrorsNoRedirect} from '../config/axiosConfig';
import { useEffect } from 'react';
import { Alert, AppBar, Dialog, DialogActions, DialogContent, DialogTitle, Grid, IconButton, Snackbar, Toolbar, Typography } from '@mui/material';
import { CheckoutCart } from './OrderEditCart';
import { MenuItemsDisplay } from './OrderMenuDisplay';

const initialRows: GridRowsProp = [];

async function saveOrder (order: Order) {
  return axios.post('/orders', order).then((res) => res.data, handleErrorsNoRedirect);
}

async function deleteOrder (id: string | number) {
  return axios.delete('/orders', {params: {id: id}}).then((res) => res.data, handleErrorsNoRedirect);
}

function mapGridRowToOrder(gridRow: GridValidRowModel): Order {
  if (gridRow.id === Infinity) {
    return {
      userId: gridRow.userId,
      time: gridRow.time,
      price: gridRow.price,
      status: gridRow.status,
      items: null as any,
    };
  }
  return {
    id: gridRow.id,
    userId: gridRow.userId,
    time: gridRow.time,
    price: gridRow.price,
    status: gridRow.status,
    items: null as any,
  };
}

interface EditToolbarProps {
  setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void;
  setRowModesModel: (
    newModel: (oldModel: GridRowModesModel) => GridRowModesModel,
  ) => void;
}

// Toolbar with Add Row button
function EditToolbar(props: EditToolbarProps) {
  const { setRows, setRowModesModel } = props;

  const handleClick = () => {
    const id = Infinity;
    setRows((oldRows) => 
      [...oldRows, { id: id, userId: 1, status: 'pending', time: new Date(), price: 0, items: {}, isNew: true }]
      );

    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: 'userId' },
    }));
  };

  return (
    <GridToolbarContainer style={{display: 'flex', justifyContent: 'space-between'}}>
      <GridToolbar />
      <Button color="primary" style={{display: 'flex', justifyContent: 'right'}} startIcon={<AddIcon />} onClick={handleClick}>
        Add order
      </Button>
    </GridToolbarContainer>
  );
}

// Dialog for viewing items in an order
const ItemTable: React.FC<{items: MenuItem[]}> = ({items}) => {  
  if (items.length === 0) {
    return (
      <React.Fragment>
        <DialogTitle>{"Items"}</DialogTitle>
        <DialogContent>
          No items in this order.
        </DialogContent>
      </React.Fragment>
    );
  }
  const columns: GridColDef[] = [
    {
      field: 'id',
      headerName: 'Item ID',
      type: 'number',
      flex: 0.1,
      minWidth: 50,
      editable: false,
    },
    {
      field: 'name',
      headerName: 'Item Name',
      type: 'string',
      flex: 0.2,
      minWidth: 100,
    },
    {
      field: 'glutenFree',
      headerName: 'Gluten Free',
      type: 'boolean',
      flex: 0.1,
      minWidth: 50,
    },
    {
      field: 'vegan',
      headerName: 'Vegan',
      type: 'boolean',
      flex: 0.1,
      minWidth: 50,
    },
    {
      field: 'extraSauce',
      headerName: 'Extra Sauce',
      type: 'boolean',
      flex: 0.1,
      minWidth: 50,
    },
    {
      field: 'size',
      headerName: 'Size',
      type: 'string',
      flex: 0.1,
      minWidth: 50,
    },
    {
      field: 'quantity',
      headerName: 'Quantity',
      type: 'number',
      flex: 0.2,
      minWidth: 50,
      editable: true,
    },
    {
      field: 'price',
      headerName: 'Price',
      type: 'number',
      flex: 0.2,
      minWidth: 50,
      valueFormatter: (params: GridValueFormatterParams<number>) => {
        if (params.value == null) {
          return '';
        }
        return `$${params.value.toLocaleString()}`;
      }
    },
  ];

  return (
    <React.Fragment>
      <DialogTitle>{"Items"}</DialogTitle>
      <DialogContent>
        <DataGrid
          rows={items}
          columns={columns}
          sx={{ height: '100%' }} />
      </DialogContent>
    </React.Fragment>
  );
}

export default function FullFeaturedCrudGrid() {
  
  const [rows, setRows] = React.useState(initialRows);

  const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>({});

  const [openOrderItemTable, setOpenOrderItemTable] = React.useState<boolean>(false);

  const [openOrderItemEdit, setOpenOrderItemEdit] = React.useState<boolean>(false);

  const [openOrderPlaced, setOpenOrderPlaced] = React.useState(false);

  const [items, setItems] = React.useState<MenuItem[]>([]);

  const [order, setOrder] = React.useState<Order>({} as Order);
  
  const [orderCart, setOrderCart] = React.useState<CartEntry[]>([]);

  useEffect(() => {
    axios.get("/orders").then((res) => res.data)
    .then((data) => {
      setRows(data.map((order: Order) => ({...order, isNew: false})));
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

  const handleSaveClick = (id: GridRowId) => async () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id: GridRowId) => () => {
    deleteOrder(id.valueOf());
    setRows(rows.filter((row) => row.id !== id));
  };

  const handleCancelClick = (id: GridRowId) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    // Removes row if it was a cancelled new row
    if (editedRow!.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const processRowUpdate = async (newRow: GridRowModel) => {
    const newOrder: Order = await saveOrder(mapGridRowToOrder(newRow));
    const updatedRow = { ...newOrder, isNew: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const handleOrderItemEdit = () => {
    setOrderCart(items.map((item) => ({itemId: item.id!, quantity: item.quantity!})));
    setOpenOrderItemTable(false);
    setOpenOrderItemEdit(true);
  }

  const handleOrderPlacedSuccess = (totalPrice: number) => {
    const updatedRow = { ...order, price: totalPrice, isNew: false };
    setRows(rows.map((row) => (row.id === updatedRow.id ? updatedRow : row)));
    setOpenOrderPlaced(true);
  }

  const handleCloseOrderItemTable = () => {
    setOpenOrderItemTable(false);
  }

  const handleCloseOrderItemEdit = () => {
    setOpenOrderItemEdit(false);
  }

  const handleCloseOrderPlacedSuccess = () => {
    setOpenOrderPlaced(false);
  }

  const columns: GridColDef[] = [
    {
      field: 'id',
      headerName: 'Order ID',
      type: 'number',
      flex: 0.1,
      minWidth: 50,
      editable: false,
    },
    {
      field: 'userId',
      headerName: 'User ID',
      type: 'number',
      flex: 0.2,
      minWidth: 100,
      editable: true,
    },
    {
      field: 'status',
      headerName: 'Order Status',
      flex: 0.1,
      minWidth: 150,
      editable: true,
    },
    {
      field: 'time',
      headerName: 'Order Time',
      valueGetter: ({ value }) => value && new Date(value),
      type: 'dateTime',
      flex: 0.2,
      minWidth: 150,
      editable: true,
    },
    {
      field: 'price',
      headerName: 'Price',
      type: 'number',
      flex: 0.1,
      minWidth: 100,
      align: 'left',
      editable: true,
      valueFormatter: (params: GridValueFormatterParams<number>) => {
        if (params.value == null) {
          return '';
        }
        return `$${params.value.toLocaleString()}`;
      }
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
      field: 'items',
      type: 'actions',
      headerName: 'Items',
      flex: 0.1,
      minWidth: 50,
      cellClassName: 'actions',
      getActions: ({ id }) => {
        return [
          <GridActionsCellItem
            icon={<InfoIcon />}
            label="View Items"
            sx={{
              color: 'primary.main',
            }}
            onClick={() => {
              axios.get("/itemToOrder", {params: {orderId: id}})
                .then((res) => res.data)
                .then((data) => {
                  setOrder({...rows.find((row) => row.id === id)!} as Order);
                  setItems(data);
                  setOpenOrderItemTable(true);
                }, handleErrors)
            }}
          />
        ];
      },
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
      
      <Dialog title='Items' open={openOrderItemTable} onClose={handleCloseOrderItemTable} fullWidth={true} maxWidth='lg'>
        <ItemTable items={items} />
        <DialogActions>
          <Button onClick={handleOrderItemEdit}>Edit</Button>
          <Button onClick={handleCloseOrderItemTable}>Close</Button>
        </DialogActions>
      </Dialog>
      <Dialog title='Edit Items' open={openOrderItemEdit} onClose={handleCloseOrderItemEdit} fullScreen={true}>
      <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                onClick={handleCloseOrderItemEdit}
                aria-label="close"
                >
                <CloseIcon />
              </IconButton>

              <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                Editing the items of {(order.id === Infinity) ? "a new order" : "order " + order.id } at {new Date(order.time).toString()}
              </Typography>
            </Toolbar>
          </AppBar>
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <MenuItemsDisplay showImage={false} fontSize={"small"} addPaddingToImage={false} cart={orderCart} setCart={setOrderCart}/>
          </Grid>
          <Grid item xs={4}>
            <CheckoutCart cart={orderCart} setCart={setOrderCart} order={order} orderPlacedSuccess={handleOrderPlacedSuccess} />
          </Grid>
        </Grid>
      </Dialog>
      <Snackbar open={openOrderPlaced} autoHideDuration={6000} onClose={handleCloseOrderPlacedSuccess}>
          <Alert onClose={handleCloseOrderPlacedSuccess} severity="success" sx={{ width: '100%' }}>
              Order modified successfully
          </Alert>
      </Snackbar>
    </Box>
    
  );
}
