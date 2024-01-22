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

export const IngredientUsageReport = () => {
    const [ingrdientUsageData, setingrdientUsageData] = useState([]);
    const [startDate, setStartDate] = useState("2022-10-01");
    const [endDate, setEndDate] = useState("2023-12-05");


    useEffect(() => {
        axios.get("/ingredientUsageReport", {
            params: {
                startDate: new Date(startDate).toISOString(),
                endDate: new Date(endDate).toISOString(),
            }
        }).then((res) => {
            setingrdientUsageData(res.data);
        });
    }, [startDate, endDate])

    const tableStyle = { width: "100%", align: "center" };
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
                Ingredient Usage Report
            </Typography>
            <Typography variant="h5" style={{ textAlign: "center", fontSize: "medium" }}>
                Number of ingredients used between the selected dates
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
                                <Typography variant="h6">Usage Count</Typography>
                            </TableCell>
                            <TableCell style={cellStyle}>
                                <Typography variant="h6">Ingredient Name</Typography>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {ingrdientUsageData.map((item: { amountUsed: number, ingredientName: string }, itemIndex: number) => (
                            <TableRow key={itemIndex}>
                                <TableCell style={cellStyle}>
                                    {item.amountUsed}
                                </TableCell>
                                <TableCell style={cellStyle}>
                                    {item.ingredientName}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
};