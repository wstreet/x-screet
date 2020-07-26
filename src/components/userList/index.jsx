import React from 'react';
import { Avatar, Tooltip } from 'antd';
import './index.less'


const Users = ({ users = [], size = 'normal' }) => {
  return (
    <div>
      {
        users.map(user => (
          <Tooltip placement="topLeft" title={user.login} key={user.login}>
            <a href={user.html_url} target="_blank" rel="noopener noreferrer">
              <div className="avatar-wrap">
                <Avatar 
                  size={size} 
                  style={{ color: '#f56a00', backgroundColor: '#fde3cf' }} 
                  alt={user.login}
                  src={user.avatar_url}
                >
                  {user.login}
                </Avatar>
              </div>
            </a>
        </Tooltip>
      ))
      }
    </div>
  )
}


export default Users