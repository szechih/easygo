import { useEffect, useState } from 'react'
import './style.scss'
import { useRequest } from '../../untils/request'
import { useParams } from 'react-router-dom'
import { dataType, addressType } from './type'
import Popover from '../../components/Popover'

function Order () {
    const {orderId} = useParams()
    const [data, setData] = useState<dataType>()
    const [showAddress, setShowAddress] = useState(false)
    const [addressList, setAddressList] = useState<Array<addressType>>([])
    
    useEffect(()=> {
        useRequest('/getOrder', {
            method: 'POST',
            data: {
                orderId
            }
        }).then((data:any)=> {
            if(data.data.code == 200) {
                const {information, time, total, list} = data.data
                setData({
                    information,
                    time,
                    total,
                    list
                })
            }
        })
    }, [])
    
    useEffect(()=> {
        useRequest('/addressList', {}).then((data:any)=> {
            if(data.data.code == 200) {
                setAddressList(data.data.list)
            }
        })
    }, [])

    const handleAddressClick =(address:addressType)=> {
        if(data) {
            const newData = {...data}
            newData.information = address
            setData(newData)
            setShowAddress(false)
        }
    }

    return (
        data ? <div className="page order-page">
            <div className="title">确认订单</div>
            <div className="receiver" onClick={()=> {setShowAddress(true)}}>
                <div className="iconfont">&#xe636;</div>
                <div className="receiver-content">
                    <div className="receiver-name">
                        收货人：{data!.information.name}
                        <span className="receiver-phone">
                        {data!.information.phone}
                        </span>
                    </div>
                    
                    <div className="receiver-address">
                        收货人地址： {data!.information.address}
                    </div>
                </div>
            </div>
            <div className="delivery">
                <div className="delivery-text">送达时间</div>
                <div className="delivery-select">{data!.time}</div>
            </div>
            {
                data!.list && data!.list.map(shop=> {
                    return (
                        <div key={shop.id} className="shop">
                            <div className="shop-title">
                                <span className="iconfont">&#xe676;</span>
                                {shop.shopTitle}
                            </div>
                            <div className="shop-products">
                                {
                                    shop.cartList && shop.cartList.map(product=> {
                                        return (
                                            <div key={product.id} className="shop-product">
                                                <img
                                                    className="shop-product-img"
                                                    src={product.imgUrl}
                                                    alt={product.title}
                                                />
                                                <div className="shop-product-content">
                                                    <div className="shop-product-title">{product.title}</div>
                                                    <div className="shop-product-kilo">{product.kilo}</div>
                                                </div>
                                                <div className="shop-product-order">
                                                    <div>&yen;{product.price}</div> 
                                                    <div>x{product.count}</div>
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
            <div className='footer'>
                <div className="footer-total">
                    合计：
                    <span className="footer-total-price">
                        <span className="footer-total-yen">
                            &yen;
                        </span>
                        {data!.total}
                    </span>
                </div>
                <div className="footer-submit">提交订单</div>
            </div>
            <Popover
                show={showAddress}
                blankClickCallback={()=>setShowAddress(false)}
            >
                <div className="address-popover">
                    <div className="address-popover-title">选择地址</div>
                    {
                        addressList && addressList.map(address=> {
                            return (
                                <div key={address.id} className='address-item' onClick={()=> handleAddressClick(address)}>
                                    <div className="address-item-name">
                                        收货人：{address.name}
                                        <span className="address-item-phone">{address.phone}</span>
                                    </div>
                                    <div className="address-item-address">{address.address}</div>
                                </div>
                            )
                        })
                    }
                    <div className="add-address-button">+新增地址</div>
                </div>
            </Popover>
        </div> : null
    )
}

export default Order