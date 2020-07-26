import React from 'react';
import { withRouter } from "react-router-dom";
import { Form, Input, Button, message } from 'antd';
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
    <div>
      <Form
        name="customized_form_controls"
        layout="inline"
        onFinish={onFinish}
      >
        <Form.Item
          name="username"
          rules={[
            { required: true, message: '请输入Github用户名' }
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
        </Form>
    </div>
  );
}

export default withRouter(Login);
