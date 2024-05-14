import { Link } from 'react-router-dom';
import { Input } from 'antd-mobile'
import './style.scss'
import { useState, useEffect } from 'react';
import { useRequest } from '../../untils/request';

const Search = () => {
    const localSearchList = localStorage.getItem('search-list')
    const searchListHistory:string[] = localSearchList ? JSON.parse(localSearchList) : []

    const [historyList, setHistoryList] = useState<string[]>(searchListHistory)
    const [hotList, setHotList] = useState<string[]>([])
    const [keyword, setKeyWord] = useState('')

    useEffect(()=> {
        useRequest('/hot',{}).then((data:any)=> {
            if(data.data.code == 200) {
                setHotList(data.data.list)
                
            }
        })
    })

    const handleKeyDown = (e: any) => {
        if(e.key == 'Enter') {
            const newHistoryList = [...historyList]
            newHistoryList.unshift(keyword)
            if(newHistoryList.length >= 20) {
                newHistoryList.length = 20
            }
            setHistoryList(newHistoryList)
            setKeyWord('')
            localStorage.setItem('search-list', JSON.stringify(newHistoryList))
        }
    }

    const handleHistoryListClean = () => {
        setHistoryList([])
        localStorage.setItem('search-list', JSON.stringify([]))
    }

    return (
        <div className="page search-page">
            <div className='search'>
                <Link to="/home" className='search-back-link'>
                    <div className="search-back iconfont" >&#xe7eb;</div>
                </Link>
                <div className="search-area">
                    <div className="search-icon iconfont">&#xe603;</div>
                    <Input
                        type="text"
                        className="search-input"
                        placeholder="请输入商品名称"
                        value={keyword}
                        onChange={(e)=> {setKeyWord(e)}}
                        onKeyDown={(e)=> {handleKeyDown(e)}}
                    />
                </div>
            </div>
            {
                historyList.length ? (
                    <>
                        <div className="title">
                            历史搜索
                        <div onClick={handleHistoryListClean} className="iconfont title-close">&#xe622;</div>
                        </div>
                        <ul className="search-list">
                            {
                                historyList.map((item, index)=> {
                                    return (
                                        <li key={index} className="search-list-item">{item}</li>
                                    )
                                })
                            }
                        </ul>
                    </>
                ) : null
            }
            {
                hotList.length ? (
                <>
                    <div className="title">
                        热门搜索
                    </div>
                    <ul className="search-list">
                    {
                        hotList.map((item, index)=> {
                            return (
                                <li key={index} className="search-list-item">{item}</li>
                            )
                        })
                    }
                        
                    </ul>
                </>
                ) : null
            }
            
        </div>
    )
}

export default Search