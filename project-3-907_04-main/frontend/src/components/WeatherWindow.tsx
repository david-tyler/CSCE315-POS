import { TableContainer, createTheme } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import * as React from "react";

const API_URL = 'https://api.openweathermap.org/data/2.5/weather?lat=30.626310&lon=-96.337876&appid=5672abd6804fb54e885e9c6c6246e716';
const theme = createTheme({
  palette: {
    text: {
      primary: "#000",
      secondary: "#000",
    }
  }
});
function createData(
  name: string,
  value: number | string,
) {
  return { name, value };
}

const initialRows = [
  createData('Temperature (Farenheit)', 0),
  createData('Feels like (Farenheit)', 0),
  createData('Today\'s max (Farenheit)', 0),
  createData('Today\'s min (Farenheit)', 0),
  createData('Wind speed (Mph)', 0),
  createData('Humidity (%)', 0),
  // Add more rows as needed
];

export interface SimpleDialogProps {
  open: boolean;
  selectedValue: string;
  onClose: (value: string) => void;
}

function SimpleDialog(props: SimpleDialogProps) {
  const { onClose, selectedValue, open } = props;
  const [rows, setRows] = React.useState(initialRows);
  const [weatherIcon, setWeatherIcon] = React.useState<string | null>(null); // State to store the weather icon URL

  const handleClose = () => {
    onClose(selectedValue);
  };

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const apiData = await (await fetch(API_URL)).json();

        setWeatherIcon(`http://openweathermap.org/img/w/${apiData.weather[0]?.icon}.png`);

        const updatedRows = [
          createData('Temperature (Farenheit)', Math.round((apiData.main.temp - 273.15) * 9 / 5 + 32)),
          createData('Feels like (Farenheit)', Math.round((apiData.main.feels_like - 273.15) * 9 / 5 + 32)),
          createData('Today\'s max (Farenheit)', Math.round((apiData.main.temp_max - 273.15) * 9 / 5 + 32)),
          createData('Today\'s min (Farenheit)', Math.round((apiData.main.temp_min - 273.15) * 9 / 5 + 32)),
          createData('Wind speed (Mph)', Math.round(apiData.wind.speed * 2.237)),
          createData('Humidity (%)', apiData.main.humidity),
          // Add more rows as needed
        ];

        setRows(updatedRows);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    if (open) {
      fetchData();
    }
  }, [open]);

  return (
    <Dialog onClose={handleClose} open={open} >
      <DialogTitle style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'black' }}>
        {weatherIcon && (
          <div style={{ marginRight: '10px', position: 'relative' }}>
            <img
              src={weatherIcon}
              alt="Weather Icon"
              width="70"
              height="70"
              style={{ boxShadow: '0 0 5px 2px #000', marginRight: '10px', border: '2px solid #000', borderRadius: '50%', verticalAlign: 'middle', }}
            />
          </div>
        )}
        <span style={{ verticalAlign: 'middle' }}>Weather in College Station, TX</span>
      </DialogTitle>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row" style={{ color: 'black' }}>
                  {row.name}
                </TableCell>
                <TableCell align="left" style={{ color: 'black' }}>{row.value}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Dialog>
  );
}

export default function SimpleDialogDemo() {
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState('');

  const handleClose = (value: string) => {
    setOpen(false);
    setSelectedValue(value);
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
        Weather
      </Button>
      <SimpleDialog
        selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
      />
    </div>
  );
}


