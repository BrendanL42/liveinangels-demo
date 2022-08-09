import React from 'react'
import SingleBlog from '../../components/blogpost[id]/index'
import { Grid, Container } from "@material-ui/core";


const singleBlogPost = () => {
    return (
        <Container maxWidth={"xl"} >
        <SingleBlog/>
        </Container>
    )
}

export default singleBlogPost
