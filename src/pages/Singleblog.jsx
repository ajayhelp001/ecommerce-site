import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import BreadCrumb from '../GlobelComponent/BreadCrumb';
import SectionHeading from '../GlobelComponent/SectionHeading';

const Singleblog = () => {

    const { slug } = useParams();

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  // Slug Generator
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

  useEffect(() => {
    fetch("https://dummyjson.com/posts?limit=100")
      .then((res) => res.json())
      .then((data) => {
        const singlePost = data.posts.find(
          (item) => createSlug(item.title) === slug
        );

        setPost(singlePost || false);
        setLoading(false);
      })
      .catch(() => {
        setPost(false);
        setLoading(false);
      });
  }, [slug]);

  const [loadingMessage, setLoadingMessage] = useState()

  if (loading) {
    return setLoadingMessage('Loading...');
  }

  if (post === false) {
    return <h2>Post Not Found</h2>;
  }

  console.log(post);
  

  return (
    <>
      <BreadCrumb pageTitle={'hello'}/>

      {
        loadingMessage ? 'loadingMessage' : ''
      }
      
      <section className="blogdetailspage">
        <div className="container">
            <div className="row">
              <div className="col-12">
                <SectionHeading headingclassName={'centerd text-center'} subHeading={post.tags[0]} mianHeading={post.title} />
              </div>
            </div>
            <div className="row row-gap-md-5 row-gap-4">
              <div className="col-12">
                  <div className="card blogcard details">
                      <div className="blogimg"><img src={post.image? post.image : `/assets/images/blog-${post.id  <= 6 ? (post.id - 1) + 1 : 6}.jpg`} className="w-100" alt={post.title}/></div>
                      <div className="date">{post.id} SEP, 2025</div>
                  </div>
              </div>
              <div className="col-lg-10 col-12 mx-auto">
                <div className="row  row-gap-4">
                  <div className="col-12">
                      <p>{post.body}</p>
                  </div>
                  <div className="col-sm-4">
                      <h5 className="">Tags</h5>
                      <ul className="lists m-0 flex-row list-unstyled gap-2 flex-wrap">
                        {
                          post.tags.map((item, index) =>
                            <li className='text-capitalize py-2 px-3 bg-light' key={index}>{item}</li>
                          )
                        }
                      </ul>
                  </div>
                  <div className="col-sm-4">
                      <h5 className="">Reactions</h5>
                      <ul className="lists m-0 flex-row list-unstyled gap-2 flex-wrap">
                        <li className='text-capitalize py-2 px-3 bg-success bg-opacity-10'>Likes : <b>{post.reactions.likes}</b></li>
                        <li className='text-capitalize py-2 px-3 bg-danger bg-opacity-10'>Dislikes : <b>{post.reactions.dislikes}</b></li>
                      </ul>
                  </div>
                  <div className="col-sm-4">
                      <h5 className="">Views And UserId</h5>
                      <ul className="lists m-0 flex-row list-unstyled gap-2 flex-wrap">
                        <li className='text-capitalize py-2 px-3 bg-dark bg-opacity-10'>Views : <b>{post.views}</b></li>
                        <li className='text-capitalize py-2 px-3 bg-dark bg-opacity-10'>User Id : <b>{post.userId}</b></li>
                      </ul>
                  </div>
                </div>
              </div>
            </div>
          
        </div>
      </section>
    </>
  )
}

export default Singleblog