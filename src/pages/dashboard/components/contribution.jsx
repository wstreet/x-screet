import React, { useState, useEffect } from 'react';
import { withRouter } from "react-router-dom";
import { Spin } from 'antd';
import Commit from '../../../components/commit'
import * as Api from '../../../api'


const Contribution = ({ history }) => {
  debugger
  const [commits, setCommits] = useState([])
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    setLoading(true)

    Api.getContribution().then(list => {
        setCommits(list)
        setLoading(false)
    })
  }, [])
  return (
    <Spin spinning={loading} >
      <Commit data={commits} id="contribution" />
    </Spin>
  )
}

export default withRouter(Contribution)