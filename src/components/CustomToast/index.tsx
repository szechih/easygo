import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import {createPortal} from 'react-dom';
import './style.scss';
import { setTimeout } from 'timers/promises';


export const InternalToast = forwardRef((props, ref)=> {
    const [showModal, setShowModal] = useState(false)
    const [content, setContent] = useState('')
    useImperativeHandle(ref, ()=>{
        return {
            show({content = '', duration = 2000}) {
                setContent(content)
                setShowModal(true)
                window.setTimeout(()=>{
                    setShowModal(false)
                }, duration)
            }
        }
    })
    // useEffect(()=>{
    //     setShowModal(true)
    //     setTimeout(()=>{
    //         setShowModal(false)
    //     }, duration)
    // },[])
    return showModal ? createPortal(<div className="toast-portal">{content}</div>, document.body) : null
})