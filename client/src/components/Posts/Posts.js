import React from 'react';
import Post from './Post/Post';
import useStyles from './styles';
import { useSelector } from 'react-redux';
import { Grid, CircularProgress } from '@material-ui/core';
import * as _ from 'lodash';

const Posts = ({ setCurrentID }) => {
    const posts = useSelector((state) => state.auth.posts);
    const classes = useStyles();
    return (
        (_.isEmpty(posts)) ? <CircularProgress /> : (
            <Grid className={classes.container} container alignItems='stretch' spacing={3}>
                {(_.isArray(posts)) &&  posts.map((post) => (
                    <Grid key={post?._id} item xs={12} sm={6}>
                        <Post post={post} setCurrentID={setCurrentID}/>
                    </Grid>
                ))}
            </Grid>
        )
    )
}

export default Posts;