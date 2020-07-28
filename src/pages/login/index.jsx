import React from 'react';
import { withRouter } from "react-router-dom";
import { Form, Input, Button, message, Row, Col } from 'antd';
import { InfoCircleOutlined, UserOutlined } from '@ant-design/icons';
import * as Api from '../../api'
import './index.less';



const  Login = ({ history }) => {
  const onFinish = ({ username }) => {
    if (!username) {
      message.error('请输入用户名');
      return;
    }
    Api.getUserInfo(username).then(res => {
      if (!res) {
        message.error(`用户${username}不存在，请重新输入`);
        return;
      }
      history.push(`/dashboard/${username}`)
    })
  };
  return (
      <div className="login-wrapper">
      <Row>
        <Col span={7} offset={12}>
          <div className="login-form">
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
                  prefix={<UserOutlined className="site-form-item-icon" />}
                />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </div>
          
        </Col>
      </Row>
    </div>    
  );
}

export default withRouter(Login);
