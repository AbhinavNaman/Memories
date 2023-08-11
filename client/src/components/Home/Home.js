//client > src >> component >>Home>> Home.js
import React,{useEffect, useState} from 'react'
import {Container,Grow, Grid, Paper, AppBar, TextField, Button} from '@material-ui/core';
import ChipInput from 'material-ui-chip-input'
import {useNavigate, useLocation} from 'react-router-dom'
import Posts from '../Posts/Posts';
import Form from '../Forms/Form';
import { useDispatch } from 'react-redux';
import {getPosts, getPostsBySearch} from '../../actions/posts';
import Paginate from '../Pagination';
import useStyles from './styles';


function useQuery(){
  return new URLSearchParams(useLocation().search);
}



export default function Home() {
    const [currentId , setCurrentId] = useState(null);
  const classes = useStyles();
  const dispatch = useDispatch();
  const query = useQuery();
  const Navigate = useNavigate();
  const page = query.get('page') || 1
  const searchQuery = query.get('searchQuery');
  const [search, setSearch] = useState('');
  const [tags, setTags] = useState([]);



  const searchPost = () => {
    if (search.trim() || tags.length > 0) {
      const searchQuery = {
        search: search || 'none',
        tags: tags.join(',')
      };

      dispatch(getPostsBySearch(searchQuery));
      Navigate(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',') || 'none'}`);
    } else {
      Navigate('/');
    }
  };

  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      searchPost();
    }
  };

  const handleAddChip = (tag) => setTags([...tags, tag]);

  const handleDeleteChip = (chipToDelete) => setTags(tags.filter((tag) => tag !== chipToDelete));


  return (
    <div>
        <Grow in>
        <Container 
        maxWidth="xl"
        // style={{margin:"0", padding:"0"}}
        >
          <Grid container className={classes.gridContainer} justifyContent='space-between' alignItems='stretch' spacing={3}>
            <Grid item xs={12} sm={6} md={9}>
              <Posts setCurrentId={setCurrentId}/>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
            <AppBar className={classes.appBarSearch} style={{padding:'15px', borderRadius:'10px'}} position="static" color="inherit">
              <TextField 
              onKeyDown={handleKeyPress}
               name="search" variant="outlined" label="Search Memories" fullWidth 
              value={search} 
              onChange={(e) => setSearch(e.target.value)} 

              />
              <ChipInput
                style={{ margin: '10px 0' }}
                value={tags}
                onAdd={(chip) => handleAddChip(chip)}
                onDelete={(chip) => handleDeleteChip(chip)}
                label="Search Tags"
                variant="outlined"
              />
              <Button onClick={searchPost} className={classes.searchButton} variant="contained" color="primary">Search</Button>
            </AppBar>
            <br />
              <Form currentId={currentId} setCurrentId={setCurrentId}/>
              <br />
              {(!search && !tags.length) && 
                <Paper elevation={6} className={classes.pagination}>
                <Paginate page={page}/>
              </Paper>
              }
              
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </div>
  )
}
