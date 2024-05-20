import { useNavigate, useParams } from 'react-router-dom'
import './style.scss'
import { useEffect, useState } from 'react'
import { useRequest } from '../../untils/request'
import resType from './type'

const Detail = () => {
    const [resData, setResData] = useState<resType>({
        id: '',
        imgUrl: '',
        title: '',
        subtitle: '',
        price: 0,
        sales: 0,
        desc: '',
        origin: '',
        specification: '',
    })
    const navigate = useNavigate()
    const params = useParams()

    useEffect(()=> {
        
        useRequest('/detail', {
            method: 'POST',
            data: {
                id: params.id
            }
        }).then((data:any)=> {
            if(data.data.code == 200) {
                setResData(data.data.data)
            }
        })
    }, [])

    return (
        <div className="page detail-page">
            <div className="title">
                <div className="iconfont" onClick={()=>{navigate(-1)}}>
                    &#xe7eb;
                </div>
                商品详情
            </div>
            <img
                className='image'
                src={resData.imgUrl}
                alt=""
            />
            <div className="main">
                <div className="main-price"><span className='main-price-yen'>&yen;</span>{resData.price}</div>
                <div className="main-sales">已售{resData.sales}</div>
                <div className="main-content">
                    <div className="main-content-title">{resData.title}</div>
                    <p className="main-content-subtitle">{resData.subtitle}</p>
                </div>
            </div>
            <div className="spec">
                <div className="spec-title">规格信息</div>
                <div className="spec-content">
                    <div className="spec-content-left">
                        <div className="spec-content-item">产地</div>
                        <div className="spec-content-item">规格</div>
                    </div>
                    <div className="spec-content-right">
                        <div className="spec-content-item">{resData.origin}</div>
                        <div className="spec-content-item">{resData.specification}</div>
                    </div>
                </div>
            </div>
            <div className="detail">
                <div className="detail-title">商品详情</div>
                <div className="detail-content">
                {resData.desc}
                </div>
            </div>
            <div className="docker">
                <div className="cart-icon">
                     <div className="iconfont">&#xe600;</div>
                     <div className="icon-text">购物车</div>
                </div>
               
                <div className="cart-button">加入购物车</div>
            </div>
        </div>
    )
}

export default Detail