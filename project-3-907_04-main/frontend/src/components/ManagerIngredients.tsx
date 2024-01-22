import { Paper, Typography, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Button, TextField, MenuItem, Select, Checkbox, Pagination } from '@mui/material';
import { Ingredient, useMenuStore } from '../store';
import { IngredientToAdd } from './IngredientToAdd';
import { useEffect, useState } from 'react';
import { DeleteConfirmIngredient } from './DeleteConfirmIngrdient';
import axios from '../config/axiosConfig';

// https://stackoverflow.com/questions/42761068/paginate-javascript-array
function paginate<T>(array: T[], pageSize: number, pageNumber: number): T[] {
    // human-readable page numbers usually start with 1, so we reduce 1 in the first argument
    return array.slice((pageNumber - 1) * pageSize, pageNumber * pageSize);
}

const pageSize = 10;



export const ManagerIngredients = () => {
    const [isAddItemDialogOpen, setAddItemDialogOpen] = useState(true);
    const [page, setPage] = useState(1);
    const ingredients = useMenuStore(state => state.ingredients);
    const setIngredients = useMenuStore(state => state.setIngredients);
    const changeIngredient = useMenuStore(state => state.changeIngredient);
    const [searchText, setSearchText] = useState("");
    const filteredIngredients = ingredients.filter(v => v.name.toLowerCase().includes(searchText.toLowerCase())).sort((a, b) => b.id - a.id);
    const tableStyle = { width: '100%', };
    const cellStyle = { padding: '8px', };

    useEffect(() => {
        axios.get("/ingredients").then((res) => {
            return res.data;
        }).then((data) => {
            setIngredients(data)
        }, (error) => {
            console.log(error);
        });
    }, [])

    return (
        <Paper style={{
            padding: '20px',
            margin: '10px',
            backgroundColor: '#f3f3f3',
            fontSize: "2.9em",
        }}>
            <IngredientToAdd open={isAddItemDialogOpen} onClose={() => setAddItemDialogOpen(false)} />
            <TextField variant="outlined" label="Search" onChange={(e) => setSearchText(e.target.value)} value={searchText} margin="dense" />
            <Typography variant="h5" style={{ textAlign: 'center' }}>Ingredients</Typography>
            <Pagination count={Math.ceil(filteredIngredients.length / pageSize)} onChange={(e, v) => setPage(v)} />
            {/* <Pagination count={Math.ceil(ingredients.length / pageSize)} onChange={(e, v) => setPage(v)} /> */}
            <TableContainer>
                <Table style={tableStyle}>
                    <TableHead>
                        <TableRow>
                            <TableCell style={cellStyle} >
                                <Typography variant="h6">{"ID"}</Typography>
                            </TableCell>
                            <TableCell style={cellStyle} >
                                <Typography variant="h6">{"Names"}</Typography>
                            </TableCell>
                            <TableCell style={cellStyle} >
                                <Typography variant="h6">{"Stock"}</Typography>
                            </TableCell>
                            <TableCell style={cellStyle} >
                                <Typography variant="h6">{"Restock"}</Typography>
                            </TableCell>
                            <TableCell style={cellStyle} >
                                <Typography variant="h6">{"Amount Ordered"}</Typography>
                            </TableCell>
                            <TableCell style={cellStyle} >
                                <Typography variant="h6">{"Price"}</Typography>
                            </TableCell>
                            <TableCell style={cellStyle} >
                                <Typography variant="h6">{"Gluten Free"}</Typography>
                            </TableCell>
                            <TableCell style={cellStyle} >
                                <Typography variant="h6">{"Vegan"}</Typography>
                            </TableCell>

                        </TableRow>
                    </TableHead>
                    <TableBody>

                        {paginate(filteredIngredients, pageSize, page).map((ingredient, itemIndex) => (
                            <TableRow key={itemIndex}>
                                <TableCell style={cellStyle} >
                                    {ingredient.id}
                                </TableCell>
                                <TableCell style={cellStyle} >
                                    <TextField
                                        variant="outlined"
                                        type="string"
                                        value={ingredient.name}
                                        onChange={(e) => changeIngredient(ingredient.id, { ...ingredient, name: e.target.value as any })}
                                    />
                                </TableCell>
                                <TableCell style={cellStyle} >
                                    <TextField
                                        variant="outlined"
                                        type="number"
                                        value={ingredient.stock}
                                        onChange={(e) => changeIngredient(ingredient.id, { ...ingredient, stock: e.target.value as any })}
                                    />
                                </TableCell>
                                <TableCell style={cellStyle} >
                                    <TextField
                                        variant="outlined"
                                        type="number"
                                        value={ingredient.restock}
                                        onChange={(e) => changeIngredient(ingredient.id, { ...ingredient, restock: e.target.value as any })}
                                    />
                                </TableCell>
                                <TableCell style={cellStyle} >
                                    <TextField
                                        variant="outlined"
                                        type="number"
                                        value={ingredient.amountOrdered}
                                        onChange={(e) => changeIngredient(ingredient.id, { ...ingredient, amountOrdered: e.target.value as any })}
                                    />
                                </TableCell>
                                <TableCell style={cellStyle} >
                                    <TextField
                                        variant="outlined"
                                        type="number"
                                        value={ingredient.price}
                                        onChange={(e) => changeIngredient(ingredient.id, { ...ingredient, price: e.target.value as any })}
                                    />
                                </TableCell>
                                <TableCell style={cellStyle} >
                                    <Checkbox checked={ingredient.glutenFree}
                                        onChange={(e) => changeIngredient(ingredient.id, { ...ingredient, glutenFree: e.target.value === "on" ? true : false })}
                                    />
                                </TableCell>
                                <TableCell style={cellStyle} >
                                    <Checkbox checked={ingredient.vegan}
                                        onChange={(e) => changeIngredient(ingredient.id, { ...ingredient, glutenFree: e.target.value === "on" ? true : false })}
                                    />
                                </TableCell>
                                <TableCell style={cellStyle}>
                                    <DeleteConfirmIngredient
                                        id={ingredient.id}
                                        name={ingredient.name}
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