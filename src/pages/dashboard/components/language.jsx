import React, { useState, useEffect } from 'react';
import Pie from '../../../components/pie'
import * as Api from '../../../api'

  

const Language = () => {
    const [languageList, setLanguageList] = useState([])
    useEffect(() => {
        Api.getLanguage().then(list => {
            setLanguageList(list)
        })
    }, [])
    return (
        <Pie data={languageList} id="language" />
    )
}

export default  Language