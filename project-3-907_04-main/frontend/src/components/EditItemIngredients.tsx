import {
  Autocomplete,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Pagination,
  TextField,
} from "@mui/material";
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';



import React, { useEffect, useState } from "react";

import { useMenuStore, type MenuItem, Ingredient } from "../store";
import axios from "../config/axiosConfig";

interface EditItemIngredientsProps {
  menuItem: MenuItem
}


export const EditItemIngredients: React.FC<EditItemIngredientsProps> = ({ menuItem }) => {
  const [searchText, setSearchText] = useState("");
  const ingredients = useMenuStore((state) => state.ingredients);
  const filteredIngredients = ingredients.filter(v => v.name.toLowerCase().includes(searchText.toLowerCase()));
  const [ourIngredients, setOurIngredients] = useState<Ingredient[]>([]);
  const changeItem = useMenuStore((state) => state.changeItem);

  useEffect(() => {
    axios
      .get("/itemToIngredient", { params: { itemId: menuItem.id } })
      .then((res) => setOurIngredients(res.data));
  }, []);
  const [page, setPage] = useState(1);

  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const saveClose = () => {

  };






  return (
    <>


      <Button onClick={() => setOpen(true)} variant="outlined" color="secondary" size="small">Edit Ingredients</Button>

      <Dialog
        open={open}

        maxWidth="md"
        fullScreen
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>

            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Editing the ingredients of {menuItem.name}
            </Typography>
          </Toolbar>
        </AppBar>

        <DialogContent>
          <Autocomplete
            multiple
            disablePortal
            id="combo-box-demo"
            options={ingredients}
            getOptionLabel={(ingredients) => ingredients.name}
            defaultValue={ourIngredients}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Ingredient" />}
            onChange={(e, v) => setOurIngredients(v)}
          />

          <Button variant="contained" color="primary" onClick={() => {
            changeItem(menuItem.id, {
              ...menuItem,
              ingredients: ourIngredients.reduce((acc, curr) => (acc[curr.id] = 1, acc), {} as any)
            });
            setOpen(false)
          }}>
            Save
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
};

