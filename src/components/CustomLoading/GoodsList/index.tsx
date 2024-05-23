import { propsType } from './type'
import './style.scss'
import { Link } from 'react-router-dom'

const GoodsList:React.FC<propsType> = ({ list }) => {
    
    return (
            <div className="list">
                {
                    list.map(item=> {
                        return (
                            <Link to={`/detail/${item.id}`}>
                                <div key={item.id} className="list-item">
                                    <img className='list-item-img' src={item.imgUrl} alt={item.title} />
                                    <div className="list-item-title">{item.title}</div>
                                    <p className="list-item-price">
                                        <span className="list-item-price-yen">&yen;</span>
                                        {item.price}
                                        <span className="iconfont">&#xe653;</span>
                                    </p>
                                </div>
                            </Link>
                        )
                    })
                }
            </div>
    )
}

export default GoodsList