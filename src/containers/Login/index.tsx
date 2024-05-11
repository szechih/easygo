import { useEffect, useRef, useState } from 'react';
import {
    Tabs,
    Form,
    Button,
    Input,
    Toast
 } from 'antd-mobile';
import { useRequest } from '../../untils/request';
import { toast } from '../../untils/toast';
import './style.scss';
import { useNavigate } from 'react-router-dom';

function Login () {
    const tabs = [
        { key: 'login', label: '登录'},
        { key: 'register', label: '注册'},
    ]
    const [form] = Form.useForm()
    const toastRef = useRef(null)
    const [currentKey, setCurrentKey] = useState('login')

    const navigate = useNavigate()

    const submit = ()=> {
        const params = form.getFieldsValue()
        if(currentKey == 'register' && params.password !== params.repassword) {
            toast('两次密码不一致')
            return
        }
        
        useRequest(currentKey == 'login' ? '/login' : '/register',{
            method: 'POST',
            data: {
                ...params
            }
        }).then((data: any)=>{;
            toast(data.data.msg)

            if(data.data.token) {
                localStorage.setItem('token', data.data.token)
                setTimeout(()=>{
                    navigate('/home')
                }, 2000)
            }else {
                setCurrentKey('login')
            }
        })
    }
    const handleCurrentClick = (e:string)=>{
        setCurrentKey(e)
    }

    useEffect(()=>{
        
    }, [])

    return (
        <div className="login">
            <Tabs className='login-wrapper' onChange={handleCurrentClick}>
                {
                    tabs.map(item=>{
                        return (
                            <Tabs.Tab title={item.label} key={item.key}>
                                <Form
                                    name="form"
                                    form={form}
                                    initialValues={{
                                        mobile: '',
                                        password: '',
                                      }}
                                    footer={
                                        <Button block type='submit' shape="rounded" color='primary'>
                                            {item.key === 'login' ? '登录' : '注册'}
                                        </Button>
                                    }
                                    onFinish={submit}>
                                    {
                                        item.key == 'register' && <Form.Item name='username' label='用户名' rules={[{ required: true }]}>
                                            <Input placeholder='请输入用户名'/>
                                        </Form.Item>
                                    }
                                    <Form.Item name='mobile' label='手机号' rules={[{ required: true }]}>
                                        <Input placeholder='请输入手机号'/>
                                    </Form.Item>
                                    <Form.Item name='password' label='密码' rules={[{ required: true }]}>
                                        <Input type="password" placeholder='请输入密码'/>
                                    </Form.Item>
                                    {
                                        item.key == 'register' && <Form.Item name='repassword' label='确认密码' rules={[{ required: true }]}>
                                            <Input type="password" placeholder='请再次输入密码'/>
                                        </Form.Item>
                                    }
                                </Form>
                            </Tabs.Tab>
                        )
                    })
                }
            </Tabs>
            {/* <InternalToast ref={toastRef}/> */}
        </div>
    )
}

export default Login