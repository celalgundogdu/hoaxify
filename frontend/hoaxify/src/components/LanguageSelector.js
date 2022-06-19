import React from 'react'
import { withTranslation } from 'react-i18next';
import { changeLanguage } from '../api/apiCalls';

const LanguageSelector = (props) => {

    const handleLanguage = (language) => {
        const { i18n } = props;
        i18n.changeLanguage(language);
        changeLanguage(language);
    }

    return (
        <div className="container d-flex justify-content-end mt-5">
            <img src="https://www.countryflagicons.com/FLAT/32/TR.png" alt="TR"
                onClick={() => handleLanguage('tr')} />
            <img src="https://www.countryflagicons.com/FLAT/32/GB.png" alt="EN"
                onClick={() => handleLanguage('en')} />
        </div>
    )
}

export default withTranslation()(LanguageSelector);