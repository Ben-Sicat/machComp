import React from 'react';
import { Container, Box, Paper, Button, Typography} from '@mui/material';

import { useNavigate } from 'react-router-dom';
const Home: React.FC = () => {
    const navigate = useNavigate();
    return (
        <Container>
            <Box sx={{ my: 4 , display: 'flex', justifyContent: 'center', alignContent:'center', height: "100%"}}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                    <Typography variant="h4" component="h1" gutterBottom>
                        Welcome to the Numerical Analysis App!
                    </Typography>
                    <Button variant="outlined"  onClick={() =>{ navigate('/Simpson')}}> 
                        Simpson's Rule
                    </Button>
                    <Button variant="outlined"  onClick={() =>{ navigate('/Trapezoid')}}> 
                        Trapezoid Rule
                    </Button>
                </Paper>
            </Box>
        </Container>

        
    );
}
export default Home;