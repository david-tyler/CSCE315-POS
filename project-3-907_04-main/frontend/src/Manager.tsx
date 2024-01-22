import { Button, Tab, Tabs } from '@mui/material';
import Box from '@mui/material/Box';
import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';
import { ExcessItemsReport } from './components/ExcessItemsReport';
import { IngredientUsageReport } from './components/IngredientUsageReport';
import { ManagerIngredients } from './components/ManagerIngredients';
import { ManagerItems } from './components/ManagerItems';
import OrderTable from './components/OrderTable';
import { OrderedTogetherReport } from './components/OrderedTogetherReport';
import { RestockReport } from './components/RestockReport';
import { SalesReport } from './components/SalesReport';


/**
 * Represents the Manager component.
 * This component displays a manager interface with various tabs for different functionalities.
 */
export const Manager: React.FC = () => {
    const [value, setValue] = React.useState(0);
    const customButtonStyle = {
        zIndex: '999',
        color: 'white',
        top: '40px',
        left: '95%',
        padding: '10px',
        backgroundColor: 'blue'

    };
    return (
        <>

            <Link to="/" >
                <Button style={customButtonStyle} className="button-hover-effect">
                    Home
                </Button>
            </Link>
            <Box>

                <Tabs value={value} onChange={(_, newValue) => setValue(newValue)}>
                    <Tab label="Items" />
                    <Tab label="Inventory" />
                    <Tab label="Orders" />
                    <Tab label="Sales Report" />
                    <Tab label="Ingredient Usage Report" />
                    <Tab label="Excess Items Report" />
                    <Tab label="Restock Report" />
                    <Tab label="Ordered Together Report" />
                </Tabs>
            </Box>
            <div hidden={value != 0}><ManagerItems /></div>
            <div hidden={value != 1}><ManagerIngredients /></div>
            <div hidden={value != 2}><OrderTable /></div>
            <div hidden={value != 3}><SalesReport /></div>
            <div hidden={value != 4}><IngredientUsageReport /></div>
            <div hidden={value != 5}><ExcessItemsReport /></div>
            <div hidden={value != 6}><RestockReport /></div>
            <div hidden={value != 7}><OrderedTogetherReport /></div>
        </>
    )
}