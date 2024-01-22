import {
    Paper,
    Typography,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Button,
    TextField,
    MenuItem,
    Select,
    Checkbox,
    Pagination,
} from "@mui/material";
import { useMenuStore } from "../store";
import { ItemToAdd } from "./ItemToAdd";
import { EditItemIngredients } from "./EditItemIngredients";
import { useState } from "react";
import { DeleteConfirmItems } from "./DeleteConfirmItems";
import { EditImage } from "./EditImage";

// https://stackoverflow.com/questions/42761068/paginate-javascript-array
function paginate<T>(array: T[], pageSize: number, pageNumber: number): T[] {
    // human-readable page numbers usually start with 1, so we reduce 1 in the first argument
    return array.slice((pageNumber - 1) * pageSize, pageNumber * pageSize);
}

const pageSize = 10;

export const ManagerItems = () => {
    const [isAddItemDialogOpen, setAddItemDialogOpen] = useState(true);
    const cart = useMenuStore((state) => state.cart);
    const menuitems = useMenuStore((state) => state.menuItems);
    const [page, setPage] = useState(1);
    const changeItem = useMenuStore((state) => state.changeItem);
    const deleteMenuItem = useMenuStore((state) => state.deleteMenuItem);
    const [searchText, setSearchText] = useState("");
    const filteredMenuItems = menuitems.filter(v => v.name.toLowerCase().includes(searchText.toLowerCase())).sort((a, b) => b.id - a.id);


    const tableStyle = { width: "100%", };
    const cellStyle = { padding: "8px", };


    return (
        <Paper
            style={{
                padding: "20px",
                margin: "10px",
                backgroundColor: "#f3f3f3",
                fontSize: "2.9em",
            }}
        >
            <ItemToAdd
                open={isAddItemDialogOpen}
                onClose={() => setAddItemDialogOpen(false)}
            />
            <TextField variant="outlined" label="Search" onChange={(e) => setSearchText(e.target.value)} value={searchText} margin="dense" />
            <Typography variant="h5" style={{ textAlign: "center" }}>
                Items
            </Typography>
            <Pagination count={Math.ceil(filteredMenuItems.length / pageSize)} onChange={(e, v) => setPage(v)} />
            <TableContainer>
                <Table style={tableStyle}>
                    <TableHead>
                        <TableRow>
                            <TableCell style={cellStyle}>
                                <Typography variant="h6">ID</Typography>
                            </TableCell>
                            <TableCell style={cellStyle}>
                                <Typography variant="h6">Names</Typography>
                            </TableCell>
                            <TableCell style={cellStyle}>
                                <Typography variant="h6">Price</Typography>
                            </TableCell>
                            <TableCell style={cellStyle}>
                                <Typography variant="h6">Ingredients</Typography>
                            </TableCell>
                            <TableCell style={cellStyle}>
                                <Typography variant="h6">Gluten Free</Typography>
                            </TableCell>
                            <TableCell style={cellStyle}>
                                <Typography variant="h6">Vegan</Typography>
                            </TableCell>
                            <TableCell style={cellStyle}>
                                <Typography variant="h6">Size</Typography>
                            </TableCell>
                            <TableCell style={cellStyle}>
                                <Typography variant="h6">Extra Sauce</Typography>
                            </TableCell>
                            <TableCell style={cellStyle}>
                                <Typography variant="h6">Image</Typography>
                            </TableCell>
                            <TableCell style={cellStyle}>
                                <Typography variant="h6">Delete</Typography>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {paginate(filteredMenuItems, pageSize, page).map((menuItem, itemIndex) => (
                            <TableRow key={itemIndex}>
                                <TableCell style={cellStyle}>{menuItem.id}</TableCell>
                                <TableCell style={cellStyle}>
                                    <TextField
                                        variant="outlined"
                                        type="string"
                                        value={menuItem.name}
                                        onChange={(e) =>
                                            changeItem(menuItem.id, { ...menuItem, name: e.target.value as any })
                                        }
                                    />
                                </TableCell>
                                <TableCell style={cellStyle}>
                                    <TextField
                                        variant="outlined"
                                        type="number"
                                        value={menuItem.price}
                                        onChange={(e) =>
                                            changeItem(menuItem.id, { ...menuItem, price: e.target.value as any })
                                        }
                                    />
                                </TableCell>
                                <TableCell style={cellStyle}>
                                    <EditItemIngredients menuItem={menuItem} />
                                </TableCell>
                                <TableCell style={cellStyle}>
                                    <Checkbox
                                        defaultChecked={menuItem.glutenFree}
                                        onClick={() =>
                                            changeItem(menuItem.id, { ...menuItem, glutenFree: !menuItem.glutenFree })
                                        }
                                    />
                                </TableCell>
                                <TableCell style={cellStyle}>
                                    <Checkbox
                                        defaultChecked={menuItem.vegan}
                                        onClick={(e) =>
                                            changeItem(menuItem.id, { ...menuItem, vegan: !menuItem.vegan })
                                        }
                                    />
                                </TableCell>
                                <TableCell style={cellStyle}>
                                    <Select
                                        labelId="size-select-label"
                                        id="size-select-label"
                                        value={menuItem.size}
                                        label="menuitem.size"
                                        onChange={(e) =>
                                            changeItem(menuItem.id, { ...menuItem, size: e.target.value as any })
                                        }
                                    >
                                        <MenuItem value={"single"}>single</MenuItem>
                                        <MenuItem value={"double"}>double</MenuItem>
                                        <MenuItem value={"large"}>large</MenuItem>
                                        <MenuItem value={"regular"}>regular</MenuItem>
                                        <MenuItem value={"snack"}>snack</MenuItem>
                                        <MenuItem value={"plus"}>plus</MenuItem>
                                        <MenuItem value={""}>one piece</MenuItem>
                                        <MenuItem value={"none"}>none</MenuItem>
                                        <MenuItem value={"Medium"}>Medium</MenuItem>
                                        <MenuItem value={"two piece"}>two piece</MenuItem>
                                        <MenuItem value={"three piece"}>three piece</MenuItem>
                                    </Select>
                                </TableCell>
                                <TableCell style={cellStyle}>
                                    <Checkbox
                                        defaultChecked={menuItem.extraSauce}
                                        onClick={(e) => {
                                            console.log(menuItem.extraSauce);
                                            changeItem(menuItem.id, { ...menuItem, extraSauce: !menuItem.extraSauce })
                                        }
                                        }
                                    />
                                </TableCell>
                                <TableCell style={cellStyle}>
                                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                                        <EditImage menuItem={menuItem} />
                                    </div>
                                </TableCell>
                                <TableCell style={cellStyle}>
                                    <DeleteConfirmItems
                                        id={menuItem.id}
                                        name={menuItem.name}
                                        open={isAddItemDialogOpen}
                                        onClose={() => setAddItemDialogOpen(false)}
                                    />
                                </TableCell>

                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
}
