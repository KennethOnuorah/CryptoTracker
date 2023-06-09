import { createSlice } from '@reduxjs/toolkit'

interface initialColorThemeProps{
  isDarkTheme: boolean
}

const initialState: initialColorThemeProps = {
  isDarkTheme: false
}

export const colorTheme = createSlice({
  name: 'colorTheme',
  initialState,
  reducers: {
    toggleDarkTheme: (state): void => {
      state.isDarkTheme = !state.isDarkTheme
    }
  }
})

export const { toggleDarkTheme } = colorTheme.actions
export default colorTheme.reducer