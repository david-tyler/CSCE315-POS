import React, { useState } from "react";
import {
  Button,
  // ButtonGroup,
  Checkbox,
  Dialog,
  DialogContent,
  DialogTitle,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useMenuStore } from "../store";

interface IngredientToAddProps {
  open: boolean;
  onClose: () => void;
}

export const IngredientToAdd: React.FC<IngredientToAddProps> = () => {
  // const [isAddItemDialogOpen, setAddItemDialogOpen] = useState(true);
  const addIngredient = useMenuStore((state) => state.addIngredient);
  // const tableStyle = {
  //   border: "1px solid #ddd",
  //   width: "100%",
  // }

  const [open, setOpen] = useState(false);
  const [ingredientName, setIngredientName] = useState("");
  const [stockAmmount, setStockAmmount] = useState("");
  const [restockAmmount, setRestockAmmount] = useState("");
  const [amountOrdered, setAmountOrdered] = useState("");
  const [price, setPrice] = useState("");

  const [glutenFree, setGlutenFree] = useState(false);
  const [vegan, setVegan] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>Add Ingredient +</Button>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Add Ingredient</DialogTitle>
        <DialogContent>
          <TextField
            label="Ingredient Name"
            variant="outlined"
            fullWidth
            value={ingredientName}
            required
            onChange={(e) => setIngredientName(e.target.value)}
            margin="normal"
          />
          <TextField
            label="Stock Ammount"
            variant="outlined"
            type="number"
            fullWidth
            required
            value={stockAmmount}
            onChange={(e) => setStockAmmount(e.target.value)}
            margin="normal"
          />
          <TextField
            label="Restock Ammount"
            variant="outlined"
            fullWidth
            type="number"
            required
            value={restockAmmount}
            onChange={(e) => setRestockAmmount(e.target.value)}
            margin="normal"
          />
          <TextField
            label="Ammount Ordered"
            variant="outlined"
            fullWidth
            required
            type="number"
            value={amountOrdered}
            onChange={(e) => setAmountOrdered(e.target.value)}
            margin="normal"
          />
          <TextField
            label="Price"
            variant="outlined"
            required
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            margin="normal"
          />
          <Typography>
            Gluten Free?
            <Checkbox onChange={() => setGlutenFree(!glutenFree)} />
          </Typography>
          <Typography>
            Vegan?
            <Checkbox onChange={() => setVegan(!vegan)} />
          </Typography>

          {/* Add more fields as needed */}

          <Button variant="contained" color="primary" onClick={() => {
            addIngredient({
              amountOrdered: parseInt(amountOrdered),
              glutenFree,
              name: ingredientName,
              price: parseInt(price),
              restock: parseInt(restockAmmount),
              stock: parseInt(stockAmmount),
              vegan,
            }); setOpen(false)
          }}>
            Save
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
};
