import React, { useEffect, useState } from "react"
import Popup from "./Popup"
import "./Products.css"

const Product = () => {

    let [productList, setProductList] = useState([])
    const [search, setSearch] = useState("")
    const [filteredData, setFilteredData] = useState([])
    const [show, setShow] = useState(false)

    //=============== poped image details ===================
    const [poppedImage, setPoppedImage] = useState("")
    const [poppedDescription, setPopDescription] = useState("")
    const [poppedCategory, setPoppedCategory] = useState("")


    //================= api fetching ==================
    useEffect(() => {
        fetchApi()
    }, [])

    const fetchApi = async () => {
        const data = await fetch("https://dummyjson.com/products")
            .then((data) => data.json())
            .then((data) => {
                // console.log(data.products);
                setProductList(data.products)
            })
    }

    //================ Search functionality ==============
    useEffect(() => {
        filterFunction(search)
    }, [search])

    const filterFunction = (search) => {
        setFilteredData(productList.filter((obj) => obj.category == search))
        setCurrentPage(1)
        // console.log(productList);
    }

    //===================PAGINATION =============
    let pages = []
    let postPerPage = 6;
    let totalPage = Math.ceil(productList.length / postPerPage)
    let i = 1
    while (i <= totalPage) {
        pages.push(i)
        i++
    }
    const [currentPage, setCurrentPage] = useState(1)
    let lastIndex = currentPage * postPerPage
    let startIndex = lastIndex - postPerPage
    let currentPost
    if (!search) {
        currentPost = productList.slice(startIndex, lastIndex)
    } else {
        currentPost = filteredData.slice(startIndex, lastIndex)
    }

    //===============================================

    const handleImage = (data) => {
        console.log("clicked");
        setShow(true)
        setPoppedCategory(data.category)
        setPopDescription(data.description)
        setPoppedImage(data.images[0])
    }

    return <>
        <div className="pop-div">
            {show ? <Popup setShow={setShow} >
                <div className="pop-header">
                    <h2>{poppedCategory}</h2>
                    <button onClick={() => setShow(false)}>Close</button>
                </div>
                <hr></hr>
                <div className="pop-body">
                    <div className="pop-img-div">
                        <img className="pop-img" src={poppedImage} alt="poppedImage" />
                    </div>
                    <div className="pop-description">{poppedDescription}</div>
                </div>
            </Popup> : ""}
        </div>

        <div className="header">
            <div>
                <select onChange={(e) => setSearch(e.target.value)}>
                    <option></option>
                    <option>laptops</option>
                    <option>smartphones</option>
                    <option>fragrances</option>
                    <option>skincare</option>
                    <option>groceries</option>
                    <option>home-decoration</option>
                </select>
            </div>
            <h1 className="product">Product</h1>
        </div>

        <div >
            <div className="button-div">
                {pages.map((page, index) => {
                    return <>
                        <button key={index} className={page == currentPage ? "active" : ""} onClick={() => { setCurrentPage(page) }}>{page}</button>
                    </>
                })}
            </div>
            <div className="contains">
                {search == ""
                    ? currentPost.map((data, key) => {
                        return <>
                            <div className="card" key={key}>
                                <p>{data.brand}</p>
                                <p>{data.category}</p>
                                <div className="image-div">
                                    <img onClick={() => handleImage(data)} src={data.images[0]} />
                                </div>
                            </div>
                        </>
                    })
                    : filteredData.map((data, key) => {
                            return <>
                                <div className="card" key={key}>
                                    <p>{data.brand}</p>
                                    <p>{data.category}</p>
                                    <div className="image-div">
                                        <img onClick={() => handleImage(data)} src={data.images[0]} />
                                    </div>
                                </div>
                            </>
                        })
                }
            </div>
        </div>
    </>
}

export default Product