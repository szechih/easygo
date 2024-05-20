import { useNavigate } from 'react-router-dom'
import { Input } from 'antd-mobile'
import './style.scss'
import { useEffect, useState } from 'react'
import { useRequest } from '../../untils/request'

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
                tag: '',
                keyword,
                category: ''
            }
        }).then((data:any)=> {
            if(data.data.code == 200) {
                setCategoryList(data.data.data)
            }
        })
    }, [])

    const handleKeyDown = (e:any)=> {
        if(e.key == 'Enter' && keyword) {
            console.log("hello world");
            
        }
    }

    return (
        <div className="page category-page">
            <div className="title">
                <div className="iconfont" onClick={()=>{navigate(-1)}}>
                    &#xe7eb;
                </div>
                分类
            </div>
            <div className='search'>
                <div className="search-area">
                    <div className="search-icon iconfont">&#xe603;</div>
                    <Input
                        type="text"
                        className="search-input"
                        placeholder="请输入商品名称"
                        value={keyword}
                        onChange={e=>setKeyword(e)}
                        onKeyDown={e=> handleKeyDown(e)}
                    />
                </div>
            </div>
            <div className="cate">
                <div className="cate-item cate-item-active">全部商品</div>
                {
                    categories && categories.map((item)=>{
                        return (
                            <div
                                key={item.id}
                                className="cate-item"
                            >
                                {item.name}
                            </div>
                        )
                    })
                }
            </div>
            <div className="tag">
                <div className="tag-item tag-item-active">全部</div>
                {
                    tags && tags.map((item, index)=>{
                        return (
                            <div
                                key={index}
                                className="tag-item"
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
                                    <div className="product-item-button">
                                        购买
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            <div className="docker">
                <div className="docker-item">
                    <p className="iconfont docker-item-icon">&#xe608;</p>
                    <p className="docker-item-title">首页</p>
                </div>
                <div className="docker-item docker-item-active">
                    <p className="iconfont docker-item-icon">&#xe84d;</p>
                    <p className="docker-item-title">分类</p>
                </div>
                <div className="docker-item">
                    <p className="iconfont docker-item-icon">&#xe6af;</p>
                    <p className="docker-item-title">购物车</p>
                </div>
                <div className="docker-item">
                    <p className="iconfont docker-item-icon">&#xe656;</p>
                    <p className="docker-item-title">我的</p>
                </div>
            </div>
        </div>
    )
}

export default Category