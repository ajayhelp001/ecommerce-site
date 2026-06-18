import React, { useEffect, useState } from 'react'
import { Link } from 'react-router'
import ThemeButton from '../GlobelComponent/ThemeButton';

const Searchpopup = ({closePopup}) => {  

    const [search, setSearch] = useState("");
    const [result, setResult] = useState([])
    const [loading, setLoading] = useState(false)
    

    useEffect(() => {
        if (!search.trim()) {
            setResult([]);
            return;
        }
        const timer = setTimeout(() => {
            setLoading(true);
            fetch(`https://dummyjson.com/products/search?q=${search}`).then((res) => {
                res.json().then((result) => {
                    setResult(result.products)
                    
                })
            })
            setLoading(false);
        }, 500)
        return () => clearTimeout(timer)
    }, [search])



  return (
    <>
    <div class="modal fade show d-block" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered">
            <div class="modal-content border-0">
            <div class="modal-header">
                <h1 class="modal-title fs-5" id="exampleModalLabel">Search Product</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={closePopup}></button>
            </div>
            <div class="modal-body">
                <form action="" className="w-100">
                    <div className="row">
                        <div className="col-12">
                            <div className="input-group inputsearch">
                                <input onChange={(e) => setSearch(e.target.value)} type="search" className="form-control rounded-0 border-0 shadow-none" value={search} placeholder="Search" />
                                <span className="input-group-text p-0 border-0" id="basic-addon1">
                                    <button onSubmit={(e)=>e.preventDefault()} className="btn rounded-0 border-0 shadow-none" type="submit">
                                        <img src="/assets/images/icon/search.svg" alt="" />
                                    </button>
                                </span>
                                
                            
                            </div>
                                {result.length > 0 ? (
                                    <ul className="list-group mt-3">
                                        {result.map((item) => (
                                            <li key={item.id} className="list-group-item d-flex gap-2">
                                                <img src={item.thumbnail} alt={item.title} width="50" height="50"  style={{ objectFit: "cover" }} />
                                                <div>
                                                    <Link to={`/product/${item.title.toLowerCase().replace(/\s+/g, "-")}`} onClick={closePopup} className="m-0 text-decoration-none text-theme1">{item.title}</Link>
                                                    <p className="text-muted"><small>${item.price}</small></p>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    search && !loading && <p className="text-muted">No result found</p>
                                )}
                        </div>
                    </div>
                </form>
            </div>
            </div>
        </div>
    </div>
    <div onClick={closePopup} className={`modal-backdrop fade show`}></div>
    </>
  )
}

export default Searchpopup