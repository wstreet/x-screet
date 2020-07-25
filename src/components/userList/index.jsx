import React from 'react';
import { Avatar, Tooltip } from 'antd';



const Users = ({ users = [], size = 'normal' }) => {
  return (
    <div>
      {
        users.map(user => (
          <Tooltip placement="topLeft" title={user.login} key={user.login}>
            <a href={user.html_url} target="_blank" rel="noopener noreferrer">
              <Avatar size={size} src={user.avatar_url} alt={user.login} gap={10} />
              {/* <div style={{ display: 'inline-block' }}>{user.login}</div> */}
            </a>
        </Tooltip>
      ))
      }
    </div>
  )
}


export default Users