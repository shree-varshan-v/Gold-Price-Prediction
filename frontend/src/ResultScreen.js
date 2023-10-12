import React from 'react'
import { Dialog,Box,Typography,Grid } from '@mui/material';
import {data} from "./data"
function ResultScreen({open,setOpen,predictedPrice,predictedShop,ornament,weight}){
    const wtPrice=(weight*predictedPrice).toFixed(2);
    
    return(
        <Dialog open={open} onClose={()=>setOpen(false)}>
            <div style={{padding:"5%"}}>
            <Grid container spacing={2} sx={{marginBottom:"4%"}} >
                <Grid item xs={8}><Typography component="h1" variant="h5" >Predicted Price</Typography></Grid>
                <Grid item xs={4}><Typography component="h1" variant="h5" >₹{predictedPrice}/gm</Typography></Grid>
                <Grid item xs={8}><Typography component="h1" variant="h5" >Total price for {weight} gms</Typography></Grid>
                <Grid item xs={4}><Typography component="h1" variant="h5" >₹{wtPrice}</Typography></Grid>
                <Grid item xs={8}><Typography component="h1" variant="h5" >Suggested Shop </Typography></Grid>
                <Grid item xs={4}><Typography component="h1" variant="h5" >{predictedShop}</Typography></Grid>
            </Grid>
            <Box sx={{fontWeight:'bold'}}>
              <Typography component="h1" variant="h6" >Preferable Jewelries</Typography>
            </Box>
            <Grid container spacing={2} >
                <Grid sx={{fontWeight:'bold'}} item xs={6}>Name</Grid>
                <Grid sx={{fontWeight:'bold'}} item xs={3}>Value Added</Grid>
                <Grid sx={{fontWeight:'bold'}} item xs={3}>Total Cost</Grid>
                {
                data.filter((val)=>val.name===predictedShop).map((shop)=><>
                    <Grid item xs={6}>{shop.name}</Grid>
                    <Grid item xs={3}>{ornament===1?shop.i1:(ornament===2?shop.i2:shop.i3)}%</Grid>
                    <Grid item xs={3}>₹{((weight*predictedPrice*(ornament===1?shop.i1:(ornament===2?shop.i2:shop.i3)))+(weight*predictedPrice)).toFixed(2)} </Grid>
                </>)
                    
                }
                
            </Grid>
            </div>
        </Dialog>
    )
}
export default ResultScreen
