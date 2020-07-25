import React, { useState, useEffect } from 'react';
import Commit from '../../../components/commit'
import * as Api from '../../../api'


const Contribution = () => {
  const [commits, setCommits] = useState([])
  useEffect(() => {
    Api.getCommits().then(list => {
        setCommits([...list])
    })
  }, [])
  return (
    <Commit data={commits} id="contribution" />
  )
}

export default Contribution