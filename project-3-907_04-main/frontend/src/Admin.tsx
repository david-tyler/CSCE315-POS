import { Button, Tab, Tabs } from '@mui/material';
import Box from '@mui/material/Box';
import React from 'react';
import UserTable from './components/UserTable';
import { Link } from 'react-router-dom';

const customButtonStyle = {
    zIndex: '999',
    color: 'white',
    top: '40px',
    left: '95%',
    padding: '10px',
    backgroundColor: 'blue'
  };


/**
 * Admin component.
 * Renders the admin page with a navigation bar and a user table.
 */
export const Admin: React.FC = () => {
    const [value, setValue] = React.useState(0);
    return (
        <React.Fragment>
            <Link to="/" >
                <Button style={customButtonStyle} className="button-hover-effect">
                    Home
                </Button>
            </Link>
            <Box>
                <Tabs value={value} onChange={(_, newValue) => setValue(newValue)}>
                    <Tab label="Users" />
                </Tabs>
            </Box>
            <div hidden={value != 0}><UserTable /></div>
        </React.Fragment>
    )
}