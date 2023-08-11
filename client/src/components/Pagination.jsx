import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import useStyle from "./styles";
import { PaginationItem } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../actions/posts";

export default function Paginate({ page }) {
  const { numberOfPages } = useSelector((state) => state.posts);
  const classes = useStyle();
  const dispatch = useDispatch();
  
  useEffect(() => {
    if (page) dispatch(getPosts(page));
  }, [page]);
  //   [ currentId , dispatch]

  return (
    <Stack spacing={2}>
      <Pagination
        classes={{ ul: classes.ul }}
        count={numberOfPages}
        page={Number(page) || 1}
        shape="rounded"
        variant="outlined"
        renderItem={(item) => (
          <PaginationItem {...item} component={Link} to={`/posts?page=${item.page}`} />
        )}
      />
    </Stack>
  );
}
