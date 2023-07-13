import Conversion from './Conversion/Conversion'

import { useAppSelector } from '../../../../hooks/redux'
import useIntervalFetch from '../../../../hooks/useIntervalFetch'

import { setExchangeData } from '../../../../../redux/slices/currencies'
import { EXCHANGE_API_URL } from '../../../../helpers/links'

import './Conversions.css'

interface ConversionsProps{
  tokenSymbol: string
}

const Conversions = ({ tokenSymbol } : ConversionsProps) => {
  const isDarkTheme = useAppSelector(state => state.colorThemeReducer.isDarkTheme)
  
  useIntervalFetch({
    URL: EXCHANGE_API_URL,
    interval: 60000,
    checkpoint: 8.64e+7,
    action: setExchangeData,
    fetchID: 'exchange'
  })

  return (
    <section className={`conversions${isDarkTheme ? ' darkConversions' : ''}`}>
      <div className="title">
        Currency Conversions
      </div>
      <div className="inputConversions">
        <Conversion
          tokenSymbol={tokenSymbol}
          targetCurrency='USD'
          targetCurrencySymbol='$'
          flagImageSrc='/images/us_flag.png'
        />
        <Conversion
          tokenSymbol={tokenSymbol}
          targetCurrency='CAD'
          targetCurrencySymbol='$'
          flagImageSrc='/images/canada_flag.png'
        />
        <Conversion
          tokenSymbol={tokenSymbol}
          targetCurrency='GBP'
          targetCurrencySymbol='£'
          flagImageSrc='/images/uk_flag.png'
        />
        <Conversion
          tokenSymbol={tokenSymbol}
          targetCurrency='EUR'
          targetCurrencySymbol='€'
          flagImageSrc='/images/eu_flag.png'
        />
        <Conversion
          tokenSymbol={tokenSymbol}
          targetCurrency='BRL'
          targetCurrencySymbol='R$'
          flagImageSrc='/images/brazil_flag.png'
        />
      </div>
    </section>
  )
}

export default Conversions
