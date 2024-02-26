import { createAsyncThunk } from '@reduxjs/toolkit';
import { instance } from '../auth/auth.operations';
import Notiflix from 'notiflix';

export const getMainPageDrinks = createAsyncThunk(
  'drinks/getAll',
  async (quantity, thunkAPI) => {
    try {
      const res = await instance.get(
        `/drinks/mainpage?drinksPerCategory=${quantity}`
      );
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getPopularDrinks = createAsyncThunk(
  'drinks/getPopularDrinks',
  async (_, thunkAPI) => {
    try {
      const res = await instance.get('/drinks/popular');
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getSearchedDrink = createAsyncThunk(
  'drinks/search',
  async ({ name, category, ingredient, page, size }, thunkAPI) => {
    const searchParams = {
      params: {
        name,
        category,
        ingredient,
        page,
        size,
      },
    };
    try {
      const res = await instance.get('/drinks/search', searchParams);
      console.log(res.data);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getDrinkById = createAsyncThunk(
  'drinks/getDrinkById',
  async (drinkId, thunkAPI) => {
    try {
      const res = await instance.get(`/drinks/${drinkId}`);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addOwnDrink = createAsyncThunk(
  'drinks/own/add',
  async (data, thunkAPI) => {
    try {
      const res = await instance.post('/drinks/own/add', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const removeOwnDrink = createAsyncThunk(
  'drinks/own/remove/',
  async (drinkId, thunkAPI) => {
    try {
      const res = await instance.delete(`/drinks/own/remove/${drinkId}`);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getOwnDrinks = createAsyncThunk(
  'drinks/own',
  async (_, thunkAPI) => {
    try {
      const res = await instance.get(`/drinks/own`);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addDrinkToFavorite = createAsyncThunk(
  'drinks/favorite/add',
  async (data, thunkAPI) => {
    try {
      const res = await instance.post(`/drinks/favorite/add`, {
        drinkId: data,
      });
      Notiflix.Notify.success(`Drink added to favorite!`, {
        position: 'сenter-top',
        timeout: 3000,
      });
      return res.data;
    } catch (error) {
      Notiflix.Notify.failure(`Drink do not added to favorite! Server error!`, {
        position: 'сenter-top',
        timeout: 3000,
      });
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const removeDrinkFromFavorite = createAsyncThunk(
  'drinks/favorite/remove',
  async (drinkId, thunkAPI) => {
    try {
      const res = await instance.delete(`/drinks/favorite/remove/${drinkId}`);
      Notiflix.Notify.info(`Drink removed from favorite!`, {
        position: 'сenter-top',
        timeout: 3000,
      });
      return res.data;
    } catch (error) {
      Notiflix.Notify.failure(
        `Drink do not removed from favorite! Server error!`,
        {
          position: 'сenter-top',
          timeout: 3000,
        }
      );
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getFavoriteAll = createAsyncThunk(
  'drinks/favorite/',
  async (_, thunkAPI) => {
    try {
      const res = await instance.get(`/drinks/favorite`);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
