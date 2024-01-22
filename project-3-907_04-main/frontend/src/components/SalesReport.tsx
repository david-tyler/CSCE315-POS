import { useState, useEffect } from 'react';
import axios from '../config/axiosConfig';
import {
    Paper,
    Typography,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    TextField,
    Button,
} from "@mui/material";

export const SalesReport = () => {
    const [salesData, setSalesData] = useState([]);
    const [startDate, setStartDate] = useState("2022-10-01");
    const [endDate, setEndDate] = useState("2023-12-05");

    useEffect(() => {
        axios.get("/salesReport", {
            params: {
                startDate: new Date(startDate).toISOString(),
                endDate: new Date(endDate).toISOString(),
            }
        }).then((res) => {
            setSalesData(res.data);
        });
    }, [startDate, endDate]);

    const tableStyle = { width: "100%" };
    const cellStyle = { padding: "8px" };

    const handleStartDateChange = (event) => {
        setStartDate(event.target.value);
    };

    const handleEndDateChange = (event) => {
        setEndDate(event.target.value);
    };

    return (
        <Paper
            style={{
                padding: "20px",
                margin: "10px",
                backgroundColor: "#f3f3f3",
                fontSize: "2.9em",
            }}
        >
            <Typography variant="h5" style={{ textAlign: "center" }}>
                Sales Report
            </Typography>
            <Typography variant="h5" style={{ textAlign: "center", fontSize: "medium" }}>
                Number of Items sold between the selected dates
            </Typography>
            <div style={{ marginBottom: '10px' }}>
                <TextField
                    label="Start Date"
                    type="date"
                    defaultValue={startDate}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    onChange={handleStartDateChange}
                />
                <TextField
                    label="End Date"
                    type="date"
                    defaultValue={endDate}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    onChange={handleEndDateChange}
                />
            </div>
            <TableContainer>
                <Table style={tableStyle}>
                    <TableHead>
                        <TableRow>
                            <TableCell style={cellStyle}>
                                <Typography variant="h6">Order Count</Typography>
                            </TableCell>
                            <TableCell style={cellStyle}>
                                <Typography variant="h6">Item Name</Typography>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {salesData.map((item: { orderCount: number, itemName: string }, itemIndex: number) => (
                            <TableRow key={itemIndex}>
                                <TableCell style={cellStyle}>
                                    {item.orderCount}
                                </TableCell>
                                <TableCell style={cellStyle}>
                                    {item.itemName}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
};
