import { Link, useNavigate } from 'react-router-dom'
import { Input } from 'antd-mobile'
import './style.scss'
import { useEffect, useState } from 'react'
import { useRequest } from '../../untils/request'
import Docker from '../../components/Docker'
import Popover from '../../components/Popover'

const Category = ()=> {
    const [keyword, setKeyword] = useState<string>('')
    const navigate = useNavigate()
    const [categories, setCategories] = useState<Array<{id: string,name: string}>>([])
    const [tags, setTags] = useState<Array<string>>([])
    const [categoryList, setCategoryList] = useState<Array<{
        id: string,
        imgUrl: string,
        title: string,
        price: number,
        sales: number
    }>>([])
    const [currentTag, setCurrentTag] = useState<number | null>(null)
    const [currentCategory, setCurrentCategory] = useState('')

    const [showCart, setShowCart] = useState(false)

    useEffect(()=>{
        useRequest('/categoriesAndTags', {}).then((data:any)=> {
            if(data.data.code == 200) {
                let {category, tags} = data.data.data
                setCategories(category)
                setTags(tags)
            }
        })
    }, [])

    useEffect(()=>{
        useRequest('/categoryList',{
            method: 'POST',
            data: {
                tag: currentTag,
                keyword,
                category: currentCategory
            }
        }).then((data:any)=> {
            if(data.data.code == 200) {
                setCategoryList(data.data.data)
            }
        })
    }, [keyword,currentTag,currentCategory])

    const handleKeyDown = (e:any) => {
        if(e.key == 'Enter') {
            setKeyword(e.target.value)
        }
    }

    const closeMask = () => {
        setShowCart(false)
    }

    const [showProduct, setShowProduct] = useState({
        id: '',
        title: '',
        imgUrl: '',
        price: 0,
        count: 0
    })
    const handleProductClick = (e: React.MouseEvent, item:{
        id: string,
        imgUrl: string,
        title: string,
        price: number,
        sales: number
    }) => {
        e.preventDefault()
        useRequest('/getDetailById', {
            method: 'POST',
            data: {
                id: item.id
            }
        }).then((data:any)=> {
            if(data.data.code == 200) {
                setShowProduct(data.data.data)
                setShowCart(true)
            }
        })
        
    }

    const handelCartNumberChange =(type:'minus' | 'add')=> {
        const newShowProduct = {...showProduct}
        const {count} = newShowProduct
        if(type == 'minus') {
            newShowProduct.count = (count - 1) < 0 ? 0 : count - 1
        }else {
            newShowProduct.count = count + 1
        }
        setShowProduct(newShowProduct)
    }

    const changeCartCount =()=> {
        useRequest('/cartCountChange', {
            method: 'POST',
            data: {
                count: showProduct.count
            }
        }).then((data:any)=> {
            if(data.data.code == 200) {
                setShowCart(false)
            }
        })
    }

    return (
        <div className="page category-page">
            <div className="title">
                分类
            </div>
            <div className='search'>
                <div className="search-area">
                    <div className="search-icon iconfont">&#xe603;</div>
                    <Input
                        type="text"
                        className="search-input"
                        placeholder="请输入商品名称"
                        onKeyDown={e=> handleKeyDown(e)}
                    />
                </div>
            </div>
            <div className="cate">
                <div
                    className={currentCategory == '' ? "cate-item cate-item-active" : "cate-item"}
                    onClick={()=>{setCurrentCategory('')}}
                >
                    全部商品
                </div>
                {
                    categories && categories.map((item)=>{
                        return (
                            <div
                                key={item.id}
                                className={currentCategory == item.id ? "cate-item cate-item-active" : "cate-item"}
                                onClick={()=>{setCurrentCategory(item.id)}}
                            >
                                {item.name}
                            </div>
                        )
                    })
                }
            </div>
            <div className="tag">
                <div
                    className={currentTag == null? "tag-item tag-item-active" : "tag-item"}
                    onClick={()=>{setCurrentTag(null)}}
                >
                    全部
                </div>
                {
                    tags && tags.map((item, index)=>{
                        return (
                            <div
                                key={index}
                                className={currentTag === index ?  "tag-item tag-item-active" : "tag-item"}
                                onClick={()=>{setCurrentTag(index)}}
                            >
                                {item}
                            </div>
                        )
                    })
                }
            </div>
            <div className="product">
                <div className="product-title">精选商品({categoryList.length})</div>
                {
                    categoryList && categoryList.map(item=> {
                        return (
                            <Link to={`/detail/${item.id}`}>
                                <div key={item.id} className="product-item">
                                    <img className="product-item-img" src={item.imgUrl} alt="" />
                                    <div className="product-item-content">
                                        <div className="product-item-title">
                                            {item.title}
                                        </div>
                                        <div className="product-item-sales">
                                            月售{item.sales}
                                        </div>
                                        <div className="product-item-price">
                                            <span className="product-item-price-yen">&yen;</span>
                                            {item.price}
                                        </div>
                                        <div className="product-item-button" onClick={(e)=>handleProductClick(e, item)}>
                                            购买
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        )
                    })
                }
            </div>
            <Docker type="category"></Docker>
            <Popover show={showCart} blankClickCallback={closeMask}>
                <div className="popover-cart">
                    <div className="popover-cart-content">
                        <img className='popover-cart-content-img' src={showProduct.imgUrl} alt="" />
                        <div className="popover-cart-content-info">
                            <div className="popover-cart-content-title">{showProduct.title}</div>
                            <div className="popover-cart-content-price">
                                <span className="popover-cart-content-yen">&yen;</span>
                                {showProduct.price}
                            </div>
                        </div>
                    </div>
                    <div className="popover-cart-count">
                        <div className="popover-cart-count-content">
                            购买数量
                        </div>
                        <div className="popover-cart-count-counter">
                            <div
                                className="popover-cart-count-button"
                                onClick={()=>{handelCartNumberChange('minus')}}
                            >-</div>
                            <div className="popover-cart-count-text">{showProduct.count}</div>
                            <div
                                className="popover-cart-count-button"
                                onClick={()=>{handelCartNumberChange('add')}}
                            >+</div>
                        </div>
                    </div>
                    <div className="popover-cart-buttons">
                        <div className="popover-cart-button" onClick={changeCartCount}>加入购物车</div>
                        <div className="popover-cart-button">立即购买</div>
                    </div>
                </div>
            </Popover>
        </div>
    )
}

export default Category