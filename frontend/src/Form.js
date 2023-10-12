import * as React from 'react';
import {Button,
    CssBaseline,
    TextField,
    Paper,
    Box,
    Grid,
    Typography,
    InputLabel,
    MenuItem,
    FormControl,
    Select,
} from "@mui/material"
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import ResultScreen from './ResultScreen';
const theme = createTheme();
export default function Form() {
  const handleSubmit = async(event) => {
    event.preventDefault();
    console.log({
      purity: purity,
      date: date,
      ornament: ornament,
      location: location,
    });
    var year=date.getFullYear()
    var month =date.getMonth()+1
    var dt=date.getDate()
    await fetch("http://127.0.0.1:5000/evaluate",{
      method:"POST",
      headers:{
        "Content-Type":"application/json; charset=UTF-8"
      },
      body:JSON.stringify({
        dt:dt,
        month:month,
        year:year,
        purity:purity,
        ornament: ornament,
        location: location})
    }).then(response=>response.json())
    .then(message=>{
      setPredictedPrice(parseFloat(message.predictedPrice).toFixed(2))
      setPredictedShop(message.predictedShop)
      console.log(message)
    })
    setOpen(true);
  };
  const [date,setDate]=React.useState(null);
  const [purity,setPurity]=React.useState("");
  const [predictedPrice,setPredictedPrice]=React.useState(null);
  const [predictedShop,setPredictedShop]=React.useState(null);
  const[weight,setWeight]=React.useState("")
  const[location,setLocation]=React.useState("")
  const[ornament,setOrnament]=React.useState("")
  const [open, setOpen] = React.useState(false);
  return (<div>
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1586974710160-55f48f417990?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2074&q=80)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography component="h1" variant="h1">
              Gold Price Predictor
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <FormControl fullWidth margin="dense">
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                        label="Date"
                        id="date"
                        name="date"
                        value={date}
                        onChange={(newValue) => {
                        setDate(newValue);
                        }}
                        renderInput={(params) => <TextField {...params} />}
                        maxDate={new Date(new Date().getTime() + 24 * 60 * 60 * 1000*7)}
                    />
                </LocalizationProvider>
                </FormControl>
                <FormControl margin="dense" fullWidth>
                    <InputLabel id="demo-simple-select-label">Purity</InputLabel>
                    <Select
                    id="purity"
                    name="purity"
                    value={purity}
                    label="Purity"
                    onChange={(event)=>setPurity(event.target.value)}
                    >
                        <MenuItem value={24}>22 Karat</MenuItem>
                        <MenuItem value={22}>24 Karat</MenuItem>
                    </Select>
                </FormControl>
                <FormControl margin="dense" fullWidth>
                    <InputLabel id="demo-simple-select-label">Location</InputLabel>
                    <Select
                    id="location"
                    name="location"
                    value={location}
                    label="Location"
                    onChange={(event)=>setLocation(event.target.value)}
                    >
                        <MenuItem value={1}>Tambaram</MenuItem>
                        <MenuItem value={2}>Chrompet</MenuItem>
                        <MenuItem value={3}>Adyar</MenuItem>
                        <MenuItem value={4}>Kilpakkam</MenuItem>
                    </Select>
                </FormControl>
                <FormControl margin="dense" fullWidth>
                    <InputLabel id="demo-simple-select-label">Ornament</InputLabel>
                    <Select
                    id="ornament"
                    name="ornament"
                    value={ornament}
                    label="Ornament"
                    onChange={(event)=>setOrnament(event.target.value)}
                    >
                        <MenuItem value={1}>Ring</MenuItem>
                        <MenuItem value={2}>Bangle</MenuItem>
                        <MenuItem value={3}>Chain</MenuItem>
                    </Select>
                </FormControl>
                <FormControl fullWidth>
                  <TextField
                    margin="dense"
                    type="number"
                    required
                    id="weight"
                    name="weight"
                    label="Weight (in gms)"
                    value={weight}
                    onChange={(event)=>setWeight(event.target.value)}
                  />
                </FormControl>
              
              <Button
                required
                type="submit"
                color="warning"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Predict
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
      
    </ThemeProvider>
      <ResultScreen open={open} setOpen={setOpen} predictedPrice={predictedPrice} predictedShop={predictedShop} ornament={ornament} weight={parseFloat(weight)} />
      </div>
  );
}