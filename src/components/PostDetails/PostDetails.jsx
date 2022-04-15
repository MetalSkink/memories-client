import React, { useEffect } from 'react'
import { Paper, Typography, CircularProgress, Divider, Grid } from "@material-ui/core";
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import useStyles from "./styles";
import moment from "moment";
import { getPost, getPostBySearch } from '../../actions/posts.action';

const PostDetails = () => {
  const {post,posts,isLoading} = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const history = useHistory();
  const {id} = useParams();
  const classes = useStyles();
  
  useEffect(() => {
    dispatch(getPost(id));
  }, [id,dispatch])

  useEffect(() => {
    if (post) {
      dispatch(getPostBySearch({search: 'none', tags: post?.tags.join(',')}));
    }
  }, [post,dispatch])
  
  
  if (!post) return null;

  if (isLoading) {
    return (
    <Grid container justifyContent="center" alignItems="center">
      <CircularProgress className={classes.progress} />
    </Grid>
    ) 
  }

  const recommendedPosts = posts.filter(({_id}) => _id !== post._id);

  const openPost = (_id) => history.push(`/posts/${_id}`);


  return (
    <Paper style={{padding: '20px', borderRadius:'15px'}} elevation={6}>
    <div className={classes.card}>
        <div className={classes.section}>
          <Typography variant="h3" component="h2">{post.title}</Typography>
          <Typography gutterBottom variant="h6" color="textSecondary" component="h2">{post.tags.map((tag) => `#${tag} `)}</Typography>
          <Typography gutterBottom variant="body1" component="p">{post.message}</Typography>
          <Typography variant="h6">Created by: {post.creatorName}</Typography>
          <Typography variant="body1">{moment(post.createdAt).fromNow()}</Typography>
          <Divider style={{ margin: '20px 0' }} />
          <Typography variant="body1"><strong>Realtime Chat - coming soon!</strong></Typography>
          <Divider style={{ margin: '20px 0' }} />
          <Typography variant="body1"><strong>Comments - coming soon!</strong></Typography>
          <Divider style={{ margin: '20px 0' }} />
        </div>
        <div className={classes.imageSection}>
          <img className={classes.media} src={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} alt={post.title} />
        </div>
      </div>
      {recommendedPosts.length  && (
        <div className={classes.section}>
          <Typography gutterBottom variant="h5">You might also like:</Typography>
          <Divider/>
          <div className={classes.recommendedPosts}>
            {recommendedPosts.map((post) => (
              <div key={post._id} style={{margin: '20px', cursor: 'pointer'}} onClick={()=> openPost(post._id)}>
                <Typography gutterBottom variant='h6'>{post.title}</Typography>
                <Typography gutterBottom variant='subtitle2'>{post.creatorName}</Typography>
                <Typography gutterBottom variant='subtitle2'>{post.message}</Typography>
                <Typography gutterBottom variant='subtitle1'>Likes: {post.likeCount.length}</Typography>
                <img src={post.selectedFile} width='200px' alt={post.title}/>
              </div>
            ))}
         </div>
        </div> 
      )}
    </Paper>
  );
};

export default PostDetails