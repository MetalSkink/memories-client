import React, { useEffect, useState } from 'react'
import { TextField, Paper, Button, Typography } from "@material-ui/core";
import Filebase from 'react-file-base64';
import useStyles from "./styles";
import { createPost, updatePost } from '../../actions/post';
import { useDispatch, useSelector } from 'react-redux';

const Form = ({currentId, setCurrentId}) => {
  const post = useSelector(state => currentId ? state.posts.find(post => post._id === currentId) : null);
  const classes = useStyles();
  const dispatch = useDispatch();
  
  useEffect(() => {
    if (post) {
      setPostData(post);
    }
  
  }, [post])
  

  const [postData, setPostData] = useState({
    creator: '',
    title: '',
    message: '',
    tags: '',
    selectedFile: ''
  })
  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentId) {
      dispatch(updatePost(currentId, postData));
    }else{
      dispatch(createPost(postData));
    }
    clear();
  }

  const clear = () => {
    setCurrentId(null);
    setPostData({
      creator: '',
      title: '',
      message: '',
      tags: '',
      selectedFile: ''
    })
  }

  return (
    <Paper className={classes.paper} elevation={3}>
      <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
        <Typography variant="h6"> {currentId ? 'Editing' : 'Creating'} a memory </Typography>
        <TextField
          name="creator"
          variant="outlined"
          label="Creator"
          fullWidth
          value={postData.creator}
          onChange={(e) => setPostData({ ...postData, creator: e.target.value })}
        />
        <TextField
          name="title"
          variant="outlined"
          label="Title"
          fullWidth
          value={postData.title}
          onChange={(e) => setPostData({ ...postData, title: e.target.value })}
        />
        <TextField
          name="message"
          variant="outlined"
          label="Message"
          multiline
          fullWidth
          value={postData.message}
          onChange={(e) => setPostData({ ...postData, message: e.target.value })}
        />
        <TextField
          name="tags"
          variant="outlined"
          label="Tags"
          fullWidth
          value={postData.tags}
          onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })}
        />
        <div className={classes.fileInput}>
          <Filebase
            type="file"
            multiple={false}
            onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })}
          />
        </div>
        <Button className={classes.buttonSubmit} type="submit" variant="contained" color="primary" size='large' fullWidth>
          Submit
        </Button>
        <Button className={classes.buttonSubmit} variant="contained" color="secondary" size='small' onClick={clear} fullWidth>
          Clear
        </Button>
      </form>
    </Paper>
  );
}

export default Form