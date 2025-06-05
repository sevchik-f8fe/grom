import { createSlice } from '@reduxjs/toolkit';

const qrSlice = createSlice({
  // Имя слайса
  name: 'qr',

  // Начальное состояние
  initialState: {
    qrCode: 'Отсканируйте, чтоюбы получить результат',
  },

  // Сами редусеры (здесь пока что только редусер попадаsния QR-кода в поле зрения)
  reducers: {
    setQrCode: (state, action) => {
      state.qrCode = action.payload;
    },
  },
});

// Объекты на экспорт
export const { setQrCode } = qrSlice.actions;
export const QRReducer = qrSlice.reducer;