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

export const ExcessItemsReport = () => {
    const [excessData, setExcessData] = useState([]);
    const [startDate, setStartDate] = useState("2022-10-01");

    useEffect(() => {
        axios.get("/excessItems", {
            params: {
                startDate: new Date(startDate).toISOString(),
                endDate: new Date().toISOString(),
            }
        }).then((res) => {
            setExcessData(res.data);
        });
    }, [startDate]);

    const tableStyle = { width: "100%" };
    const cellStyle = { padding: "8px" };

    const handleStartDateChange = (event) => {
        setStartDate(event.target.value);
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
                Excess Items Report
            </Typography>
            <Typography variant="h5" style={{ textAlign: "center", fontSize: "medium" }}>
                Items that sold less than 10% between the selected date and todays date
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
            </div>
            <TableContainer>
                <Table style={tableStyle}>
                    <TableHead>
                        <TableRow>
                            <TableCell style={cellStyle}>
                                <Typography variant="h6">Name</Typography>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {excessData.map((item: { name: string }, itemIndex: number) => (
                            <TableRow key={itemIndex}>
                                <TableCell style={cellStyle}>
                                    {item.name}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
}

