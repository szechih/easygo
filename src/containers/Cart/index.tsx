import { useEffect, useState } from 'react';
import Docker from '../../components/Docker';
import './style.scss'
import {Input} from 'antd-mobile'
import { useRequest } from '../../untils/request';
import {cartListType} from './type'

function Cart () {
    const [cartList, setCartList] = useState<Array<cartListType>>([])
    useEffect(()=> {
        useRequest('/cartlist', {}).then((data:any)=> {
            if(data.data.code == 200) {
                setCartList(data.data.list)
            }
        })
    }, [])

    return (
        <div className="page cart-page">
            <div className="title">
                购物车
            </div>
            {
                cartList && cartList.map(item=> {
                    return (
                        <div key={item.id}  className="shop">
                            <div className="shop-title">
                                <div className="radio"></div>
                                <span className="iconfont">&#xe676;</span>
                                {item.shopTitle}
                            </div>
                            {
                                item.cartList && item.cartList.map(el=> {
                                    return (
                                        <div key={el.id} className="shop-products">
                                            <div className="shop-product">
                                                <div className="radio"></div>
                                                <img
                                                    className="shop-product-img"
                                                    src={el.imgUrl}
                                                    alt=""
                                                />
                                                <div className="shop-product-content">
                                                    <div className="shop-product-title">{el.title}</div>
                                                    <div className="shop-product-kilo">{el.kilo}</div>
                                                    <div className="shop-product-price">
                                                        <span className="shop-product-yen">&yen;</span>
                                                        99
                                                    </div>
                                                    <Input className='shop-product-count' value={el.count} />
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    )
                })
            }
            <div className="total-price">
                <div className='select-all'>
                    <div className="radio"></div>
                    <div className='select-all-text'>全选</div>
                </div>
                <div className='total'>
                    <span className='total-text'>合计：</span>
                    <div className='total-price-inner'>
                        <span className='total-price-inner-yen'>&yen;</span>99
                    </div>
                </div>
                <div className="check">结算</div>
            </div>
            <Docker type="cart"></Docker>
        </div>
    )
}

export default Cart;