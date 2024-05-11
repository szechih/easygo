import React from 'react';
import ReactDOM from 'react-dom/client';
import { setTimeout } from 'timers/promises';

const toastPortalStyle = {
    position: "fixed" as const,
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    zIndex: "9999",
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "flex-end",
    padding: "0.1rem 0.2rem",
    background: "rgba(0, 0, 0, 0.5)",
    fontSize: ".16rem",
    color: "#fff",
    borderRadius: ".08rem",
}

const element = document.createElement('div')

const root = ReactDOM.createRoot(element)

export const toast = (message: string, duration?: number) => {
    root.render(
        <div style={toastPortalStyle}>{message}</div>
    )

    if(!element.parentNode) {
        document.body.appendChild(element)
        window.setTimeout(()=>{
            document.body.removeChild(element)
        }, duration || 2000)
    } 
}

// export const InternalToast = forwardRef((props, ref)=> {
//     const [showModal, setShowModal] = useState(false)
//     const [content, setContent] = useState('')
//     useImperativeHandle(ref, ()=>{
//         return {
//             show({content = '', duration = 2000}) {
//                 setContent(content)
//                 setShowModal(true)
//                 window.setTimeout(()=>{
//                     setShowModal(false)
//                 }, duration)
//             }
//         }
//     })
//     // useEffect(()=>{
//     //     setShowModal(true)
//     //     setTimeout(()=>{
//     //         setShowModal(false)
//     //     }, duration)
//     // },[])
//     return showModal ? createPortal(<div className={toastPortalStyle}>{content}</div>, document.body) : null
// })