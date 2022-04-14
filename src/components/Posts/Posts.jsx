import React from 'react'
import Post from './Post/Post'
import { useSelector } from 'react-redux';
import { CircularProgress, Grid } from "@material-ui/core";

import useStyles from "./styles";

const Posts = ({setCurrentId}) => {
  const {posts, isLoading} = useSelector(state => state.posts);
  const classes = useStyles();

  if (posts.length === 0 && !isLoading) {
    return (
      <Grid container justifyContent="center" alignItems="center">
        No posts
      </Grid>
    )
  }

  return (
    <>
      {
        isLoading ? (
      <Grid container justifyContent="center" alignItems="center">
        <CircularProgress className={classes.progress} />
      </Grid>
        ) : (
          <Grid className={classes.container} container alignItems='stretch' spacing={3}>
            {posts?.map((post) => (
              <Grid item xs={12} sm={12} md={6} lg={3} key={post._id}>
                <Post post={post} setCurrentId={setCurrentId}/>
              </Grid>
              ))}
          </Grid>
        )
      }
    </>
  )
}

export default Posts