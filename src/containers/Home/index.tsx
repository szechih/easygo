import { Input, Swiper } from 'antd-mobile';
import './style.scss'
import { useEffect, useState } from 'react';
import { useRequest } from '../../untils/request';
import GoodsCard from '../../components/GoodsCard';
import GoodsList from '../../components/CustomLoading/GoodsList';
import { useNavigate } from 'react-router-dom';
interface goodItemProps {
    id: string,
    title:  string,
    imgUrl: string,
    price: number
} 
interface goodsProps {
    category: string,
    id: string,
    list: goodItemProps[],
    cover: string
}

function Home() {
    const [banners, setBanners] = useState([])
    const [goods, setGoods] = useState([]) 
    const [list, setList] = useState([])

    const navigate = useNavigate()

    useEffect(()=> {
        if(navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position)=>{
                // console.log(position);
            },(error)=>{
                console.log(error);
                
            },{
                timeout: 5000
            })
        }
    }, [])

    useEffect(()=>{
        useRequest('/banner',{}).then((data:any)=> {
            if(data.data.code == 200) {
                setBanners(data.data.bannerList)
            }
        })
    }, [])

    // 获取商品列表
    useEffect(()=>{
        useRequest('/good',{}).then((data:any)=> {
            if(data.data.code == 200) {
                setGoods(data.data.goods)
                setList(data.data.list)
            }
        })
    }, [])

    const handleSearchClick = () => {
        navigate('/search/42')
    }

    return (
        <div className="home page">
            <div className="banner">
                <h3 className="location">
                    <span className="iconfont">&#xe636;</span>
                    优果购(昌平店)
                </h3>
                <div className="search" onClick={handleSearchClick}>
                    <span className="iconfont">&#xe603;</span>
                    <Input placeholder='请输入你需要搜索的内容'></Input>
                </div>
                { banners.length > 0 && 
                    <Swiper autoplay loop>
                        {
                            banners.map((banner, index)=>{
                                return (
                                <Swiper.Item key={index}>
                                    <div className='swiper-item'>
                                        <img src={banner} alt="轮播图" />
                                    </div>
                                </Swiper.Item>
                                )
                            })
                        }
                    </Swiper>
                }
            </div>
            <div className="category">
                <div className="category-item">
                    <img
                        className='category-item-img'
                        src="http://statics.dell-lee.com/shopping/category-1.png"
                        alt="新鲜蔬菜" />
                    <p>新鲜蔬菜</p>
                </div>
                <div className="category-item">
                    <img
                        className='category-item-img'
                        src="http://statics.dell-lee.com/shopping/category-2.png"
                        alt="鲜蛋肉禽" />
                    <p>鲜蛋肉禽</p>
                </div>
                <div className="category-item">
                    <img
                        className='category-item-img'
                        src="http://statics.dell-lee.com/shopping/category-3.png"
                        alt="时令水果" />
                    <p>时令水果</p>
                </div>
                <div className="category-item">
                    <img
                        className='category-item-img'
                        src="http://statics.dell-lee.com/shopping/category-4.png"
                        alt="乳品烘焙" />
                    <p>乳品烘焙</p>
                </div>
                <div className="category-item">
                    <img
                        className='category-item-img'
                        src="http://statics.dell-lee.com/shopping/category-5.png"
                        alt="粮油速食" />
                    <p>粮油速食</p>
                </div>
                <div className="category-item">
                    <img
                        className='category-item-img'
                        src="http://statics.dell-lee.com/shopping/category-6.png"
                        alt="休闲零食" />
                    <p>休闲零食</p>
                </div>
                <div className="category-item">
                    <img
                        className='category-item-img'
                        src="http://statics.dell-lee.com/shopping/category-7.png"
                        alt="家具百货" />
                    <p>家具百货</p>
                </div>
                <div className="category-item">
                    <img
                        className='category-item-img'
                        src="http://statics.dell-lee.com/shopping/category-8.png"
                        alt="个护美妆" />
                    <p>个护美妆</p>
                </div>
            </div>
            {
                goods.map((item:goodsProps)=> {
                    return <GoodsCard key={item.id} cateItem={item}></GoodsCard>
                })
                
            }
            <div className='list-title'>猜你喜欢</div>
            <GoodsList list={list}></GoodsList>
            <div className="bottom">
                -我是有底线的-
            </div>
            <div className="docker">
                <div className="docker-item docker-item-active">
                    <p className="iconfont docker-item-icon">&#xe608;</p>
                    <p className="docker-item-title">首页</p>
                </div>
                <div className="docker-item">
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

export default Home