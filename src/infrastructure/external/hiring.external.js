import axios from 'axios';

const EXTERNAL_API_URL = 'https://hiring.pruebasgt.com/api/vouchers';

export const createVoucherExternal = async (voucherData) => {
  try {
    const response = await axios.post(EXTERNAL_API_URL, voucherData, {
      headers: { 'Content-Type': 'application/json' }
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
};


