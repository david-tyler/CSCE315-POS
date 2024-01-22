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
} from "@mui/material";
import { CartEntry, MenuItem, Order, useMenuStore } from "../store";
import axios, { handleErrors } from "../config/axiosConfig";
import { useState } from "react";

export const CheckoutCart = (props: { backgroundColor?: string, cart: CartEntry[], setCart: React.Dispatch<React.SetStateAction<CartEntry[]>>, order: Order, orderPlacedSuccess: Function}) => {
    const { backgroundColor, cart, setCart, order, orderPlacedSuccess} = props;
    const menuitems = useMenuStore((state) => state.menuItems);
    
    let totalPrice = cart.reduce((acc, entry) => {
        const item = menuitems.find(
            (item) => item.id === entry.itemId
        );
        return acc + (item?.price ?? 0) * entry.quantity;
    }, 0)
    const checkout = () => {
            let items: Record<number, number> = {};
            cart.forEach((entry) => {
                items[entry.itemId] = entry.quantity;
            });
            axios.post("/orders", {
                    id: order.id,
                    price: totalPrice,
                    time: order.time,
                    userId: order.userId, // TODO: SETUP USER SYSTEM, IF IT IS JUST THE CUSTOMER THEN IT IS 0
                    status: order.status,
                    items: items}
                ).then(() => {
                    orderPlacedSuccess(totalPrice);
                }, handleErrors);
                
        };

    const incrementCartEntryQuantity = (id: number) => {
        setCart(
                cart.map((entry: CartEntry) => {
                if (entry.itemId == id) {
                    return { itemId: entry.itemId, quantity: entry.quantity + 1 };
                }
                return entry;
                })
                .filter((entry: CartEntry) => entry.quantity > 0)
            );
    };
        
    const decrementCartEntryQuantity = (id: number) => {
        setCart(
            cart.map((entry: CartEntry) => {
                if (entry.itemId == id) {
                    return { itemId: entry.itemId , quantity: entry.quantity - 1 };
                }
                return entry;
                })
                .filter((entry: CartEntry) => entry.quantity > 0)
        );
    }

    const tableStyle = {
        width: "100%",
    };
    const cellStyle = {
        padding: "8px",
    };
    return (
        <Paper
            style={{
                padding: "20px",
                textAlign: "center",
                backgroundColor: backgroundColor ?? "#f3f3f3",
            }}
        >
            <Typography variant="h5">Order {order.id}</Typography>
            <TableContainer>
                <Table style={tableStyle}>
                    <TableHead>
                        <TableRow>
                            <TableCell style={cellStyle}>
                                <Typography variant="h6">{"Items"}</Typography>
                            </TableCell>
                            <TableCell style={cellStyle}>
                                <Typography variant="h6">{"Price"}</Typography>
                            </TableCell>
                            <TableCell style={cellStyle}>
                                <Typography variant="h6">{"Quantity"}</Typography>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {cart.map((item, itemIndex) => (
                            <TableRow key={itemIndex}>
                                <TableCell style={cellStyle}>
                                    {
                                        (
                                            menuitems.find(
                                                (menuitem) => menuitem.id === item.itemId
                                            ) as MenuItem
                                        ).name
                                    }
                                </TableCell>
                                <TableCell style={cellStyle}>
                                    {(
                                        (menuitems.find((menuitem) => menuitem.id === item.itemId)
                                            ?.price as number) * item.quantity
                                    )?.toFixed(2)}
                                </TableCell>
                                <TableCell style={cellStyle}>
                                    <Button
                                        color="error"
                                        size="small"
                                        variant="contained"
                                        style={{ marginRight: "0.4em" }}
                                        onClick={() => decrementCartEntryQuantity(item.itemId)}
                                    >
                                        -
                                    </Button>
                                    <span style={{ fontSize: "1.2em" }}>
                                        {item.quantity}
                                    </span>
                                    <Button
                                        color="success"
                                        size="small"
                                        variant="contained"
                                        style={{ marginLeft: "0.4em" }}
                                        onClick={() => incrementCartEntryQuantity(item.itemId)}
                                    >
                                        +
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Typography variant="h6">
                Total Price: ${totalPrice.toFixed(2)}
            </Typography>
            <Button
                variant="contained"
                color="primary"
                style={{ marginTop: "20px" }}
                onClick={checkout}
            >
                Checkout
            </Button>
            
        </Paper>
        
    );
};
