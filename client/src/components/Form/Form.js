import React, { useState, useEffect } from "react";
import { TextField, Button, Typography, Paper } from "@material-ui/core";
import FileBase from "react-file-base64";
import { useDispatch, useSelector } from "react-redux";
import useStyles from "./styles";
import actions from "../../Redux/reducers/auth/actions";

const Form = ({ currentID, setCurrentID }) => {
  console.log("🚀 ~ file: Form.js:10 ~ Form ~ currentID:", currentID);
  const [postData, setPostData] = useState({ creator: "", title: "", message: "", tags: "", selectedFile: null });
  const classes = useStyles();
  const dispatch = useDispatch();
  const posts = useSelector((state) => (currentID ? state?.auth?.posts?.find((p) => p?._id === currentID) : null));

  useEffect(() => {
    if (posts) setPostData(posts);
  }, [posts]);

  const handleSubmit = (e) => {
    // e.preventDefault();
    // eslint-disable-next-line no-unused-expressions
    currentID
      ? dispatch(actions.updatePost(currentID, postData))
      : postData
      ? dispatch(actions.createPost(postData))
      : null;
    clear();
  };

  const clear = () => {
    setCurrentID(null);
    setPostData({ creator: "", title: "", message: "", tags: "", selectedFile: null });
  };
  return (
    <Paper className={classes.paper}>
      <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
        <Typography variant="h6">{currentID ? "update" : "Add"} Image</Typography>
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
          onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(",") })}
        />
        <div className={classes.fileInput}>
          <FileBase
            name="selectedFile"
            type="file"
            multiple={false}
            onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })}
          />
        </div>
        <Button
          className={classes.buttonSubmit}
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          fullWidth
        >
          Submit{" "}
        </Button>
        <Button variant="contained" color="default" size="small" onClick={clear} fullWidth>
          Clear
        </Button>
      </form>
    </Paper>
  );
};

export default Form;
