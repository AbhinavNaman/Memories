import React from 'react'
import { useSelector } from 'react-redux';
import {Grid, CircularProgress} from '@material-ui/core';
import Post from "./Post/Post.js"
import makeStyles from './styles';

export default function Posts({setCurrentId}) {
  const classes = makeStyles();
  const {posts, isLoading} = useSelector((state)=> state.posts);

  if(!posts.length && !isLoading) return  "no posts available";

  return (

      isLoading? <CircularProgress /> : 
      <Grid className={classes.container} container alignItems="stretch" spacing={0} >
        {posts?.map((post)=>(
          <Grid item key={post._id} xs={12} sm={12} md={6} lg={3}>
            <Post post={post} setCurrentId={setCurrentId}/>
          </Grid>
        ))}
      </Grid>

  )
}
