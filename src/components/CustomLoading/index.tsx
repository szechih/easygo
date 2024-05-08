import { DotLoading } from 'antd-mobile'
import './style.scss'

export default function Loading(props:any) {
  let { loadingText = '数据加载中...' } = props

  return (
    <div className="loading">
      <div style={{ color: '#CCCCCC' }}>
          <DotLoading color='currentColor' />
          <h3 className="loading-text">{loadingText}</h3>
        </div>
    </div>
  )
}
