import { Input, Swiper } from 'antd-mobile';
import './style.scss'
import { useEffect, useState } from 'react';
import { useRequest } from '../../untils/request';


function Home() {
    const [banners, setBanners] = useState([])
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
            if(data) {
                setBanners(data.bannerList)
            }
        })
    }, [])

    return (
        <div className="home page">
            <div className="banner">
                <h3 className="location">
                    <span className="iconfont">&#xe636;</span>
                    优果购(昌平店)
                </h3>
                <div className="search">
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
        </div>
    )
}

export default Home