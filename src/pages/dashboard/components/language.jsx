import React, { useState, useEffect } from 'react';
import { withRouter } from "react-router-dom";
import { Spin } from 'antd';
import Pie from '../../../components/pie'
import * as Api from '../../../api'

  

const Language = ({ history }) => {
  debugger
    const [languageList, setLanguageList] = useState([])
    const [loading, setLoading] = useState(false)
    useEffect(() => {
      setLoading(true)
      Api.getLanguage().then(list => {
        setLanguageList(list)
        setLoading(false)
      })
    }, [])
    return (
      <Spin spinning={loading} >
        <Pie data={languageList} id="language" />
      </Spin>
    )
}

export default  withRouter(Language)