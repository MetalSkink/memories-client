import React, { useState } from 'react'
import { Card, CardActions, CardContent, CardMedia, Button, Typography } from "@material-ui/core";
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import useStyles from "./styles";
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { deletePost, likePost } from '../../../actions/posts.action';
import { useHistory } from 'react-router-dom';
  
const Post = ({post, setCurrentId}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem('profile'));
  const history = useHistory();
  const [likes, setLikes] = useState(post?.likeCount);
  const hasLikedPost = post.likeCount.find((like) => like === (user?.result?.googleId || user?.result?._id));
  const userId = user?.result?.googleId || user?.result?._id

  const handleLike = async() => {
    dispatch(likePost(post._id));
    if (hasLikedPost) {
      setLikes(post.likeCount.filter((id) => id !== userId));
    }else{
      setLikes([...post.likeCount, userId]);
    }
  }


  const Likes = () => {
    if (likes.length > 0) {
      return post.likeCount.find((like) => like === (userId))
        ? (
          <><ThumbUpAltIcon fontSize="small" />&nbsp;{likes.length > 2 ? `You and ${likes.length - 1} others` : `${likes.length} like${likes.length > 1 ? 's' : ''}` }</>
        ) : (
          <><ThumbUpAltOutlinedIcon fontSize="small" />&nbsp;{likes.length} {likes.length === 1 ? 'Like' : 'Likes'}</>
        );
    }

    return <><ThumbUpAltOutlinedIcon fontSize="small" />&nbsp;Like</>;
  };

  const openPost = () => {
    history.push(`/posts/${post._id}`);
  }

  return (
    <Card className={`animate__animated animate__fadeIn ${classes.card}`}>
      <CardMedia className={classes.media} image={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} title={post.title} onClick={openPost}/>
        <div className={classes.overlay}>
          <Typography variant='h6' className={classes.creator}>{post.creatorName}</Typography>
          <Typography variant='body2'>{moment(post.createdAt).fromNow()}</Typography>
        </div>
      {
        (user?.result?.googleId === post.creator || user?.result?._id === post.creator) && (
          <div className={classes.overlay2}>
            <Button style={{color: 'white'}} size='small' onClick={() => setCurrentId(post._id)}>
              <MoreHorizIcon fontSize='medium' />
            </Button>
          </div>
        )
      }
      <div className={classes.details}>
        <Typography variant='body2' color='textSecondary'>{post.tags.map((tag) => `#${tag} `)}</Typography>
      </div> 
      <Typography className={classes.title} variant='h5' gutterBottom>{post.title}</Typography>
      <CardContent>
        <Typography variant='body2' gutterBottom>{post.message}</Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <Button size='small' color='primary' disabled={!user?.result} onClick={handleLike} >
          <Likes/>
        </Button>
        {
          (user?.result?.googleId === post.creator || user?.result?._id === post.creator) && (
            <Button size='small' color='primary' startIcon={<DeleteIcon />} onClick={() => dispatch(deletePost(post._id))}>
              Delete 
            </Button>
            )
        }
      </CardActions>
    </Card>
  )
}

export default Post