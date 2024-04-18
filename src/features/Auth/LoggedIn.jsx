import { createSlice } from '@reduxjs/toolkit'

export const LoggedIn = createSlice({
  name: 'LoggedIn',
  initialState: {
    value: localStorage.getItem("loggedIn"),  /* Imposto il valore di default al valore dello storage di autenticazione cosi quando aggiorno la pagina lo tiene salvato */
  },
  reducers: {
    login: (state) => { /* Login è una sorta di metodo */
      state.value = true
    },
    logout: (state) => {
      state.value = false
    },
  },
})

// Action creators are generated for each case reducer function
export const { login, logout } = LoggedIn.actions

export default LoggedIn.reducer