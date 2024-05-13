import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  businessName: '',
  email: '',
  password: '',
  retypePassword: '',
  contact: '',
  bankName: '',
  bankAccountNumber: '',
  ifscCode: '',
  gst: '',
  address: '',
  bankAccountHolderName: '',
  user: {},
  admin: {}
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.businessName = action.payload.businessName
      state.email = action.payload.email
      state.password = action.payload.password
      state.retypePassword = action.payload.retypePassword
      state.contact = action.payload.contact
      state.bankName = action.payload.bankName
      state.bankAccountNumber = action.payload.bankAccountNumber
      state.ifscCode = action.payload.ifscCode
      state.gst = action.payload.gst
      state.address = action.payload.address
      state.bankAccountHolderName = action.payload.bankAccountHolderName
      state.user = action.payload.user
      state.admin = action.payload.admin
    },
    logout: state => {
      state.user = {}
      state.admin = {}
    }
  }
})

export const { setUser, logout } = userSlice.actions

export default userSlice.reducer
