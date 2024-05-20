
import { useNavigate } from 'react-router-dom'
import './style.scss'

const Docker:React.FC<{type: string}> = ({type}) => {
    const navigate = useNavigate()
    return (
        <div className="docker">
            <div
                className={type == 'index' ? "docker-item docker-item-active" : "docker-item"}
                onClick={()=>navigate('/home')}
            >
                <p className="iconfont docker-item-icon">&#xe608;</p>
                <p className="docker-item-title">首页</p>
            </div>
            <div
                className={type == 'category' ? "docker-item docker-item-active" : "docker-item"}
                onClick={()=>navigate('/category')}
            >
                <p className="iconfont docker-item-icon">&#xe84d;</p>
                <p className="docker-item-title">分类</p>
            </div>
            <div
                className={type == 'cart' ? "docker-item docker-item-active" : "docker-item"}
                onClick={()=>navigate('/cart')}
            >
                <p className="iconfont docker-item-icon">&#xe6af;</p>
                <p className="docker-item-title">购物车</p>
            </div>
            <div
                className={type == 'center' ? "docker-item docker-item-active" : "docker-item"}
                onClick={()=>navigate('/center')}
            >
                <p className="iconfont docker-item-icon">&#xe656;</p>
                <p className="docker-item-title">我的</p>
            </div>
        </div>
    )
}

export default Docker