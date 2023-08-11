import React from 'react'
import makeStyles from './styles';
import {Card, CardActions, Typography, Button, CardContent, CardMedia} from "@material-ui/core";
import moment from 'moment';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbUpAltOutlined from '@mui/icons-material/ThumbUpAltOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { useDispatch } from 'react-redux';
import { deletePost, likePost } from '../../../actions/posts';
import { useNavigate } from 'react-router-dom';
import { ButtonBase } from '@mui/material';


export default function Post({post, setCurrentId}) {
  const classes = makeStyles();
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem('profile'));

  const Likes = () => {
    if (post?.likes?.length > 0) {
      return post.likes.find((like) => like === (user?.result?.googleId || user?.result?._id))
        ? (
          <><ThumbUpAltIcon fontSize="small" />&nbsp;{post.likes.length > 2 ? `You and ${post.likes.length - 1} others` : `${post.likes.length} like${post.likes.length > 1 ? 's' : ''}` }</>
        ) : (
          <><ThumbUpAltOutlined fontSize="small" />&nbsp;{post.likes.length} {post.likes.length === 1 ? 'Like' : 'Likes'}</>
        );
    }

    return <><ThumbUpAltOutlined fontSize="small" />&nbsp;Like</>;
  };

  const openPost = () => {navigate(`/posts/${post._id}`)}


  return (
    <div style={{margin:"10px"}}>
      <Card className={classes.card} style={{borderRadius:"20px"}} raised elevation={6}>
      
        <CardMedia className={classes.media} image={post.selectedFile} title={post.title} onClick={openPost}/>

        <div className={classes.overlay}>
        <Typography variant='h6'>{post.name}</Typography>
        <Typography variant='body2'>{moment(post.createdAt).fromNow()}</Typography>
        </div>
        {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
        <div className={classes.overlay2} name="edit">
          <Button
            onClick={(e) => {
              e.stopPropagation();
              setCurrentId(post._id);
            }}
            style={{ color: 'white' }}
            size="small"
          >
            <MoreHorizIcon fontSize="medium" style={{backgroundColor:'black', borderRadius:'20px'}}/>
          </Button>
        </div>
        )}
        <div className={classes.details}>
        <Typography variant='body2' color='textSecondary'>{post.tags.map((tag)=>`#${tag} `)}</Typography>
        </div>
        
        <CardContent>
        <Typography variant='h6' gutterBottom> {post.title}</Typography>

        {post.message.length>20 ? (<Typography variant='body2' color='textSecondary' component="p" gutterBottom>
         {post.message.substring(0,20)} <Typography variant='body2' style={{color: "blue"}} component="p" gutterBottom>
         {"...view more"}
        </Typography>
        </Typography>):
        (<Typography variant='body2' color='textSecondary' component="p" gutterBottom>
         {post.message}
        </Typography>)}


        </CardContent>
      
        <CardActions className={classes.cardActions}> 
        <Button style={{fontSize:"10px"}} color="primary" disabled={!user?.result} onClick={() => dispatch(likePost(post._id))}>
          <Likes />
        </Button>
        {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
          <Button size="small" color="secondary" onClick={() => dispatch(deletePost(post._id))}>
            <DeleteIcon fontSize="small" /> 
            {/* &nbsp; Delete */}
          </Button>
        )}
        </CardActions>
      </Card>
    </div>
  )
}


