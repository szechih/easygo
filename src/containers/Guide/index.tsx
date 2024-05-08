import React, { useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './style.scss';

function App() {
  const ref = useRef<HTMLDivElement>(null!)
  const navigate = useNavigate()

  // 如果已经登陆，自动跳转到商场首页
  const toLogin = useCallback(() => {
    if(localStorage.getItem('token'))
      navigate('/home')
    else navigate('/login')
  }, [])
  return (
    <div ref={ref} className="guide">
      <img
        className='main-pic'
        src={require('../../images/cart.png')}
        alt='易购'
      />
      <p className='title'>易购</p>
      <img
        className='sub-pic'
        src={require('../../images/slogan.png')}
        alt='买的开心 用得放心'
      />
      <div
        className='iconfont icon-cc-arrow-right arrow-icon'
        onClick={toLogin}
      >
      </div>
    </div>
  );
}

export default App;
