import React, { useState, useEffect, useRef } from "react";
import axios from "../config/axiosConfig";
import { Paper, Typography } from "@mui/material";
import Chart from "chart.js/auto";

interface RestockData {
    ingredient: {
        name: string;
        stock: number;
        restock: number;
    };
}

export const RestockReport: React.FC = () => {
    const [restockData, setRestockData] = useState<RestockData[]>([]);
    const chartRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        axios.get<RestockData[]>("/restockReport").then((res) => {
            setRestockData(res.data);
        });
    }, []);

    useEffect(() => {
        if (restockData.length > 0 && chartRef.current) {
            const ctx = chartRef.current.getContext("2d");

            if (ctx) {
                const labels = restockData.map((rowData) => rowData.ingredient.name);
                const stockData = restockData.map((rowData) => rowData.ingredient.stock);
                const restockDataPoints = restockData.map((rowData) => rowData.ingredient.restock);

                new Chart(ctx, {
                    type: "bar",
                    data: {
                        labels,
                        datasets: [
                            {
                                label: "Stock Amount",
                                data: stockData,
                                backgroundColor: "rgba(75,192,192,0.2)",
                                borderColor: "rgba(75,192,192,1)",
                                borderWidth: 1,
                            },
                            {
                                label: "Restock Amount",
                                data: restockDataPoints,
                                backgroundColor: "rgba(255,99,132,0.2)",
                                borderColor: "rgba(255,99,132,1)",
                                borderWidth: 1,
                            },
                        ],
                    },
                    options: {
                        scales: {
                            x: { stacked: true },
                            y: { stacked: true },
                        },
                    },
                });
            }
        }
    }, [restockData]);

    return (
        <Paper style={{ padding: "20px", margin: "10px", backgroundColor: "#f3f3f3", fontSize: "2.9em" }}>
            <Typography variant="h5" style={{ textAlign: "center" }}>
                Restock Report
            </Typography>
            {restockData.length > 0 && <canvas ref={chartRef}></canvas>}
        </Paper>
    );
};



