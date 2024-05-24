import { useEffect, useState } from 'react'
import './style.scss'
import { useRequest } from '../../untils/request'
import { useNavigate, useParams } from 'react-router-dom'
import { dataType, addressType } from './type'
import Popover from '../../components/Popover'
import { Picker } from 'antd-mobile'
import { toast } from '../../untils/toast'

function Order () {
    const {orderId} = useParams()
    const [data, setData] = useState<dataType>()
    const [showAddress, setShowAddress] = useState(false)
    const [addressList, setAddressList] = useState<Array<addressType>>([])
    const [timeColumns, setTimeColumns] = useState([])
    const [showTimeColumns, setShowTimeColumns] = useState(false)
    const [deliveryTime, setDeliveryTime] = useState('')
    const [showPayment, setShowPayment] = useState(false)
    const [payway, setPayway] = useState('weixin')

    const navigate = useNavigate()
    
    useEffect(()=> {
        useRequest('/getOrder', {
            method: 'POST',
            data: {
                orderId
            }
        }).then((data:any)=> {
            if(data.data.code == 200) {
                const {information, time, total, list, money} = data.data
                setData({
                    information,
                    time,
                    total,
                    list,
                    money
                })
            }
        })
    }, [])

    useEffect(()=>{
        useRequest('/orderTime', {}).then((data:any)=> {
            if(data.data.code == 200) {
                setTimeColumns(data.data.columns)
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

    const handleOrderSubmit =()=> {
        
        if(deliveryTime == '') return toast('请选择配送时间')
        const addressId = data?.information.id
        
        useRequest('/submitOrder', {
            method: 'POST',
            data: {
                orderId,
                addressId,
                deliveryTime,
                payway
            }
        }).then((data:any)=> {
            if(data.data.code == 200) {
                toast('支付成功')
                setShowPayment(false)
                setTimeout(()=>{
                    navigate('/home')
                }, 2000)
            }
        })
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
                <div
                    className="delivery-select"
                    onClick={()=>setShowTimeColumns(true)}
                >{deliveryTime ? deliveryTime : '请选择'}</div>
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
                <div className="footer-submit" onClick={()=>setShowPayment(true)}>提交订单</div>
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
            <Popover show={showPayment} blankClickCallback={()=>setShowPayment(false)}>
                    <div className='payment-popover'>
                        <div className="payment-popover-title">选择支付方式</div>
                        <div className="payment-popover-price">&yen; {data.total}</div>
                        <div className="payment-popover-products">
                            <div className="payment-popover-product" onClick={()=>setPayway('weixin')}>
                                <img
                                    className='payment-popover-img'
                                    src="http://statics.dell-lee.com/shopping/weixin.png"
                                    alt="weixin" />
                                微信
                                <div 
                                    className={ payway == 'weixin' ? 'radio radio-active' : 'radio' }
                                >{ payway == 'weixin' ? '✔' : '' }</div>
                            </div>
                            <div className="payment-popover-product" onClick={()=>setPayway('cash')}>
                                <img
                                    className='payment-popover-img'
                                    src="http://statics.dell-lee.com/shopping/cash.png"
                                    alt="yue" />
                                余额（&yen;{data.money}）
                                <div 
                                    className={ payway == 'cash' ? 'radio radio-active' : 'radio' }
                                >{ payway == 'cash' ? '✔' : '' }</div>
                            </div>
                        </div>
                        <div className='payment-popover-button' onClick={()=>handleOrderSubmit()}>立即支付</div>
                    </div>
            </Popover>
            {
                timeColumns ? 
                    <Picker
                        columns={timeColumns}
                        visible={showTimeColumns}
                        onClose={()=> {
                            setShowTimeColumns(false)
                        }}
                        onConfirm={(v)=> {
                            const time = `${v[0]} ${v[1]}:${v[2]}`
                            setDeliveryTime(time)
                            setShowTimeColumns(false)
                        }}
                    ></Picker> :null
            }
            
        </div> : null
    )
}

export default Order