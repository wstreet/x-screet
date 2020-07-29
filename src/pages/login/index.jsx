import React, { useState } from 'react';
import { withRouter } from "react-router-dom";
import { Form, Input, Button, message, Row, Col } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import Particles from 'react-particles-js';
import * as Api from '../../api'
import './index.less';



const  Login = ({ history }) => {
  const [loading, setLoading] = useState(false)
  const onFinish = ({ username }) => {
    if (!username) {
      message.error('请输入用户名');
      return;
    }
    setLoading(true)
    Api.getUserInfo(username).then(res => {
      setLoading(false)
      if (res.message === 'Not Found') {
        message.error(`用户${username}不存在，请重新输入`);
        return;
      }
      history.push(`/dashboard/${username}`)
    })
  };
  return (
     <div>
        <h2 className="page-title">Github个人数据分析平台</h2>
        <div className="login-wrapper">
          <Row>
            <Col width={400} offset={15}>
              <div className="login-form">
                <h3 className="login-title">用户登录</h3>
                <Form
                  onFinish={onFinish}
                >
                  <Form.Item
                    name="username"
                    rules={[
                      { required: true, message: '请输入Github用户名' }
                    ]}
                  >
                    <Input
                      className="username"
                      style={{ width: '100%' }}
                      placeholder="请输入Github用户名"
                      suffix={<UserOutlined className="site-form-item-icon" />}
                      autocomplete="off"
                    />
                  </Form.Item>
                  <Form.Item>
                    <Button loading={loading} type="primary" htmlType="submit" style={{ width: '100%' }}>
                      Submit
                    </Button>
                  </Form.Item>
                </Form>
              </div>
              
            </Col>
          </Row>
        </div>   
        <Particles 
           params={{
            particles: {
              number: {
                value: 50
              },
              size: {
                value: 3
              }
            },
            interactivity: {
              events: {
                onhover: {
                  enable: true,
                  mode: "repulse"
                }
                }
            }
          }}
          style={{
            position:'fixed'
          }}
        > 
        </Particles>
     </div>
  );
}

export default withRouter(Login);
