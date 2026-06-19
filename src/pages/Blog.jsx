import React, { useEffect, useState } from 'react'
import BreadCrumb from '../GlobelComponent/BreadCrumb';
import PostCard from '../GlobelComponent/PostCard';
import SectionHeading from '../GlobelComponent/SectionHeading';
const Blog = () => {
   const [postData, setPostData] = useState([])
  useEffect(() => {
      fetch('https://dummyjson.com/posts').then((result) => {
          result.json().then((respons) => {
              setPostData(respons.posts)
          })
      })
  }, [])


  const createSlug = (title) => {
      return title
        .toLowerCase()
        .trim()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-");
    };

  console.log(postData);
  
  return (
    <>
    <BreadCrumb/>
    <section className='whichlist_section'>
      <div className="container">
        <div className="row">
          <div className="col-12">
              <SectionHeading mianHeading={'Your All Blogs'} subHeading={'BESTSELLERS'}/>
          </div>
        </div>
        <div className="row row-gap-4">
            {
              Array.isArray(postData) && postData.map((post, index) => (
                  <div key={index} className="col-lg-4 col-sm-6" >
                      <PostCard
                          postImg={post.image? post.image : `/assets/images/blog-${post.id  <= 6 ? index + 1 : 6}.jpg`}
                          postTitle={post.title}
                          postDiscription={post.body}
                          postViews={post.views }
                          postCommentCount={post.userId}
                          postTags={post.tags[0]}
                          postLink={createSlug(post.title)}
                      />
                  </div>
              ))}
        </div>
      </div>
    </section>
    </>
  )
}

export default Blog