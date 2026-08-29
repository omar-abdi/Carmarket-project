import { create } from 'zustand';
import axios from 'axios';

const useDeleteCar = create((set) => ({
  isLoading: false,
  error: null,
  success: false,

  deleteCar: async (carId) => {
    set({ isLoading: true, error: null, success: false });
    
    try {
      const response = await axios.delete(`http://localhost:8000/api/auth/listing/${carId}`, {
        withCredentials: true
      });
      
      set({ isLoading: false, success: true, error: null });
      return response.data;
    } catch (error) {
      set({ 
        isLoading: false, 
        error: error.response?.data?.message || 'Failed to delete car',
        success: false 
      });
      throw error;
    }
  },

  reset: () => set({ isLoading: false, error: null, success: false })
}));

export default useDeleteCar;
