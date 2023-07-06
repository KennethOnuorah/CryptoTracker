import { useRef, useState } from 'react'
import { useAppSelector } from '../../../../../hooks/redux'

import { TbArrowsExchange as ExchangeIcon } from 'react-icons/tb'
import './Conversion.css'

interface ConversionProps{
  tokenSymbol: string
  targetCurrency: string
  targetCurrencySymbol: string
  flagImageSrc: string
}

const Conversion = ({ tokenSymbol, targetCurrency, targetCurrencySymbol, flagImageSrc } : ConversionProps) => {
  const isDarkTheme = useAppSelector(state => state.colorThemeReducer.isDarkTheme)
  const targetCurrencyInitialValue = useAppSelector(state => state.currenciesReducer.exchangeData).conversion_rates[targetCurrency]
  const currentTokenPrice = useAppSelector(state => state.currenciesReducer.coinData).filter(token => token.symbol.toUpperCase() === tokenSymbol)[0].current_price
  
  const fromValue = useRef<HTMLInputElement>(null)
  const [fromValueEdited, setFromValueEdited] = useState(false)
  const toValue = useRef<HTMLInputElement>(null)

  const localeOptions: Intl.NumberFormatOptions = {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }

  return (
    <div className="conversion">
      <img src={flagImageSrc} alt={`${targetCurrency} Flag`} width={40}/>
      <div className='exchange'>
        <input 
          className={`exchangeInput${isDarkTheme ? ' darkExchangeInput' : ''}`}
          ref={fromValue}
          type="tel" 
          defaultValue={`1 ${tokenSymbol}`} 
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            e.target.value = e.target.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1').replace(/^0[^.]/, '0')
          }}
          onFocus={(e: React.FocusEvent<HTMLInputElement>) => {
            e.target.value = e.target.value.replace(` ${tokenSymbol}`, '').replace(',', '')
            fromValue.current?.setSelectionRange(0, fromValue.current.value.length)
          }}
          onBlur={(e: React.ChangeEvent<HTMLInputElement>) => {
            if(toValue.current) {
              toValue.current.value = `${targetCurrencySymbol}${targetCurrency === 'USD' ? 
                (parseFloat(e.target.value) * currentTokenPrice).toLocaleString(undefined, localeOptions) : 
                (parseFloat(e.target.value) * (targetCurrencyInitialValue * currentTokenPrice)).toLocaleString(undefined, localeOptions)}`
            }
            e.target.value = `${parseFloat(e.target.value).toLocaleString()} ${tokenSymbol}`
          }}
        />
        <ExchangeIcon size={20}/>
        <input
          className={`exchangeInput${isDarkTheme ? ' darkExchangeInput' : ''}`}
          ref={toValue}
          type="tel"
          defaultValue={`${targetCurrencySymbol}${(targetCurrencyInitialValue * currentTokenPrice).toLocaleString(undefined, localeOptions)}`} 
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            e.target.value = e.target.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1').replace(/^0[^.]/, '0')
            setFromValueEdited(true)
          }}
          onFocus={(e: React.FocusEvent<HTMLInputElement>) => {
            e.target.value = e.target.value.replaceAll(',', '').replace(targetCurrencySymbol, '')
            toValue.current?.setSelectionRange(0, toValue.current.value.length)
          }}
          onBlur={(e: React.ChangeEvent<HTMLInputElement>) => {
            const newValue = parseFloat(e.target.value)
            e.target.value = `${targetCurrencySymbol}${parseFloat(e.target.value).toLocaleString(undefined, localeOptions)}`
            if(fromValue.current) {
              if(!fromValueEdited) return
              fromValue.current.value = `${newValue / (targetCurrencyInitialValue * currentTokenPrice)} ${tokenSymbol}`
              setFromValueEdited(false)
            }
          }}
        />
      </div>
    </div>
  )
}

export default Conversion
