import React, { useState, useEffect } from "react";
import Form from "./components/Form/Form";
import Posts from "./components/Posts/Posts";
import  { Container, AppBar, Typography, Grow, Grid } from '@material-ui/core';
// import imageGallery from '../public/as.jpeg';
import imageGallery from './images/gallary.png';
import useStyles from './styles';
import actions from './Redux/reducers/auth/actions'
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Main = () => {
    const [currentID, setCurrentID] = useState()
    const classes = useStyles();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(actions.getPosts());
    },[dispatch]);
    
    const handleLogout = () => {
        console.log("🚀 ~ file: Main.js ~ line 25 ~ handleLogout ~ dispatch")
        
        dispatch(actions.loginUser(''))
    }

    return (
        <>
        <div className="logout-div">
            <button onClick={handleLogout} className="logout-btn">Logout</button>
        </div>
        <Container maxWidth="lg">
            <AppBar  className={classes.appBar} position="static" color="inherit" style={{ backgroundColor: 'black', alignItems:'center'  }}>
                <Typography variant="h2" align="center" style={{ color: 'white', fontStyle: 'italic', fontFamily: 'serif'}}>
                    Image Gallery
                </Typography>
                <img  className={classes.image} src={imageGallery} alt="gallery" height="200" width={200}/>
            </AppBar>

            <Grow in>
                <Container>
                    <Grid container justifyContent="space-between" alignItems="stretch" spacing={4}>
                        <Grid item xs={12} sm={7} style={{ display:'flex', justifyContent:'center', alignItems:'center'}}>
                            <Posts setCurrentID={setCurrentID} />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Form currentID={currentID} setCurrentID={setCurrentID} />
                        </Grid>
                    </Grid>
                </Container>
            </Grow>
        </Container>
        </>
    )
}

export default Main;