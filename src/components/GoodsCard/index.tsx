import { propsType } from './type'
import './style.scss'
import { Link } from 'react-router-dom'

const GoodsCard: React.FC<propsType> =({ cateItem })=> {

    return (
        <div className="card">
                <h3 className="card-title">
                    <img
                     src={cateItem.cover}
                     className='card-title-img'
                     alt={cateItem.category} />
                    {cateItem.category}
                    <div className='card-title-more'>
                        更多
                        <span className="iconfont">&#xe631;</span>
                    </div>
                </h3>
                <div className="card-content">
                    {
                        cateItem.list && cateItem.list.map(item=>{
                            return (
                                <Link to={`/detail/${item.id}`}>
                                    <div key={item.id} className="card-content-item">
                                        <img
                                            className='card-content-item-img'
                                            src={item.imgUrl}
                                            alt=""
                                        />
                                        <p className='card-content-item-desc'>{item.title}</p>
                                        <p className="card-content-item-price">
                                            <span className='card-content-item-price-yen'>&yen;</span>
                                            {item.price}
                                        </p>
                                        <span className='iconfont'>&#xe653;</span>
                                    </div>
                                </Link>
                            )
                        })
                    }
                </div>
            </div>
    )
}

export default GoodsCard