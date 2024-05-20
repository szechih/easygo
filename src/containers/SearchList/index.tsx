import { Link, useParams } from 'react-router-dom';
import { Input } from 'antd-mobile'
import './style.scss'
import { useState } from 'react';

const SearchList = () => {
    const params = useParams<{shopId: string;keyword: string}>()
    const [keyword, setkeyword] = useState(params.keyword)
    const [tabValue, setTableValue] = useState('default')

    const handleClearKeyword = ()=> {
        setkeyword('')
    }

    const handleTableClick = (type:string)=> {
        setTableValue(type)
    }

    return (
        <div className="page search-list-page">
            <div className='search'>
                <Link to={`/search/${params.shopId}`} className='search-back-link'>
                    <div className="search-back iconfont" >&#xe7eb;</div>
                </Link>
                <div className="search-area">
                    <div className="search-icon iconfont">&#xe603;</div>
                    <Input
                        type="text"
                        className="search-input"
                        placeholder="请输入商品名称"
                        value={keyword}
                        onChange={e=>setkeyword(e)}
                    />
                    <div
                        className="search-clear iconfont"
                        onClick={handleClearKeyword}
                    >
                        &#xe622;
                    </div>
                </div>
            </div>
            <div className="tab">
                <div
                    className={tabValue === 'default' ? 'tab-item tab-item-active' : 'tab-item'}
                    onClick={()=>handleTableClick('default')}
                >
                    默认
                </div>
                <div
                    className={tabValue === 'sales' ? 'tab-item tab-item-active' : 'tab-item'}
                    onClick={()=>handleTableClick('sales')}
                >
                    销量
                </div>
                <div
                    className={tabValue === 'price' ? 'tab-item tab-item-active' : 'tab-item'}
                    onClick={()=>handleTableClick('price')}
                >
                    价格
                </div>
            </div>
            <div className="search-list">
                <Link to={`/detail/${12}`}>
                    <div className="item">
                        <img className='item-img' src="http://statics.dell-lee.com/shopping/fresh-4.png" alt="" />
                        <div className="item-content">
                            <p className="item-title">广西北海鱿鱼干500g/份</p>
                            <div className="item-price">
                                <span className="item-price-yen">&yen;</span>
                                49.9
                                
                            </div>
                            <div className="item-sales">已售982</div>
                        </div>
                    </div>
                </Link>
            </div>
            <div className="bottom">
                -我是有底线的-
            </div>
        </div>
    )
}

export default SearchList