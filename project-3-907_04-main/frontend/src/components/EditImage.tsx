import {
  Autocomplete,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Paper,
  TextField,
} from "@mui/material";
import React, { useState } from "react";

import { useMenuStore, type MenuItem } from "../store";

interface EditImageProps {
  menuItem: MenuItem
}

export const EditImage: React.FC<EditImageProps> = ({ menuItem }) => {

  const [imageUrl, setImageUrl] = useState(menuItem.imageUrl);
  const changeItem = useMenuStore((state) => state.changeItem);
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        onClick={() => { setOpen(true) }}>
        <Paper
          elevation={3}
          style={{
            padding: "30px",
            height: "100%",
            textAlign: "center",
            backgroundImage: menuItem.imageUrl ? `url(${menuItem.imageUrl})` : "none",
            backgroundSize: "cover",
          }}
        ></Paper>
      </Button>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Edit {menuItem.name}'s Image</DialogTitle>
        <DialogContent>
          <TextField
            label="Image URL"
            variant="outlined"
            fullWidth
            required
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            margin="normal"
          />
          <Button
            variant="contained"
            color="primary"
            onClick={() => { changeItem(menuItem.id, { ...menuItem, imageUrl }); setOpen(false) }}
          >
            Save
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
};

