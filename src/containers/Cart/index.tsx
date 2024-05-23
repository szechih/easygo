import { useEffect, useState } from 'react';
import Docker from '../../components/Docker';
import './style.scss'
import { Input } from 'antd-mobile'
import { useRequest } from '../../untils/request';
import { toast } from '../../untils/toast';
import { cartListType, productListType } from './type'
import { useNavigate } from 'react-router-dom';

function Cart () {
    const [cartList, setCartList] = useState<Array<cartListType>>([])
    const navigate = useNavigate()
    useEffect(()=> {
        useRequest('/cartlist', {}).then((data:any)=> {
            if(data.data.code == 200) {
                const newList = data.data.list.map((shop: cartListType)=> {
                    const newCartList = shop.cartList.map((item)=>{
                        return {
                            ...item,
                            selected: false,
                        }
                    }) 
                    return {
                        id: shop.id,
                        shopTitle: shop.shopTitle,
                        cartList: newCartList,
                        selected: false
                    }
                })
                console.log(newList);
                
                setCartList(newList)
            }
        })
    }, [])

    const handleCountChange =(shopId: string, productId:string, count:string)=> {
        const newList = [...cartList]
        const shop = newList.find(shop=>shop.id == shopId)
        shop?.cartList.forEach((product)=> {
            if(product.id == productId) {
                const countNumber = isNaN(+count) ? 0 : +count
                product.count = countNumber.toString()
            }
        })
        setCartList(newList)
    }

    const handleProductClick =(shopId: string, productId:string)=> {
        const newList = [...cartList]
        const shop = newList.find(shop=>shop.id == shopId)
        let shopAllSelected = true
        shop?.cartList.forEach((product)=> {
            if(product.id == productId) {
                product.selected = !product.selected
            }
            if(!product.selected) {
                shopAllSelected = false
            }
        })
        shop!.selected = shopAllSelected
        
        setCartList(newList)
    }

    const handleShopSelected =(shopId: string)=> {
        const newList = [...cartList]
        const shop = newList.find(shop=>shop.id == shopId)
        shop!.selected = !shop!.selected
        
        shop?.cartList.forEach((product)=> {
            product.selected = shop.selected
        })
        
        setCartList(newList)
    }

    // 全选
    const handleSelectAll =()=> {
        const newList = [...cartList]
        newList.forEach(shop=> {
            shop.selected = true
            shop.cartList.forEach(product=> {
                product.selected = true
            })
        })
        setCartList(newList)
    }

    const notSelectedShop = cartList.find(shop=>shop.selected === false)

    // 总商品数量
    let count = 0
    // 总计
    let totalPrice = 0
    cartList.forEach(shop=> {
        shop.cartList.forEach(product=> {
            if(product.selected) {
                count++
                totalPrice += product.price * Number(product.count)
            }
        })
    })

    // 结算
    const hanldeCartSubmit =()=> {
        const params:Array<{
            id: string,
            count: number
        }> = []
        cartList.forEach(shop=> {
            shop.cartList.forEach(product=> {
                if(product.selected) {
                    params.push({
                        id:  product.id,
                        count: Number(product.count)
                    })
                }
            })
        })
        console.log(params);
        if(params.length === 0) {
            toast('您没有勾选任意商品')
            return
        }
        useRequest('/cartSubmit', {
            method: 'POST',
            data: {
                data: params
            }
        }).then((data:any)=> {
            if(data.data.code == 200) {
                const {orderId} = data.data
                navigate(`/order/${orderId}`)
            }
        })
    }

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
                                <div 
                                    className={item.selected ? 'radio radio-active' : 'radio'}
                                    onClick={()=>handleShopSelected(item.id)}
                                >
                                    {item.selected ? '✔' : ''}
                                </div>
                                <span className="iconfont">&#xe676;</span>
                                {item.shopTitle}
                            </div>
                            <div className="shop-products">
                                {
                                    item.cartList && item.cartList.map(el=> {
                                        return (
                                                <div
                                                    key={el.id}
                                                    className="shop-product"
                                                    onClick={()=>{
                                                        handleProductClick(item.id, el.id)
                                                    }}
                                                >
                                                    <div
                                                        className={el.selected ? 'radio radio-active' : 'radio'}
                                                    >
                                                        {el.selected ? '✔' : ''}
                                                    </div>
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
                                                            {el.price}
                                                        </div>
                                                        <Input
                                                            className='shop-product-count'
                                                            value={el.count}
                                                            onChange={(e)=>{handleCountChange(item.id, el.id, e)}}
                                                            onClick={(e)=>e.stopPropagation()}
                                                        />
                                                    </div>
                                                </div>
                                            
                                        )
                                    })
                                }
                            </div>
                        </div>
                    )
                })
            }
            <div className="total-price">
                <div className='select-all'>
                    <div
                        className={notSelectedShop ? 'radio' : 'radio radio-active'}
                        onClick={handleSelectAll}
                    >
                        {notSelectedShop ? '' : '✔'}
                    </div>
                    <div className='select-all-text'>全选</div>
                </div>
                <div className='total'>
                    <span className='total-text'>合计：</span>
                    <div className='total-price-inner'>
                        <span className='total-price-inner-yen'>&yen;</span>{totalPrice.toFixed(2)}
                    </div>
                </div>
                <div
                    className="check"
                    onClick={hanldeCartSubmit}
                >结算({count})</div>
            </div>
            <Docker type="cart"></Docker>
        </div>
    )
}

export default Cart;