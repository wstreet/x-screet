import React, { useState, useEffect } from 'react';
import UserList from '../../../components/userList'
import * as Api from '../../../api'


const Followers = () => {
  const [list, setList] = useState([])
  useEffect(() => {
    Api.getfollowers().then(list => {
        setList(list)
    })
  }, [])
  return (
    <UserList users={list} />
  )
}

export default Followers