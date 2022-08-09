// Get all job posts 
export const getBlogPosts = () => {
    return fetch(`${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/blogs`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .catch((err) => console.log(err));
  };




  export const getSingleBlogPost = (post) => {

    return fetch(`${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/blogs/${post}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
  };


  export const getBlogsByTag = (post) => {

    return fetch(`${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/blogs/tags`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(post),
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
  };