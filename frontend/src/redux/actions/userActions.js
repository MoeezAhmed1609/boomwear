import axios from "axios";
import {
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAIL,
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  GET_FAVORITES_REQUEST,
  GET_FAVORITES_SUCCESS,
  GET_FAVORITES_FAIL,
  CREATE_FAVORITES_REQUEST,
  CREATE_FAVORITES_SUCCESS,
  CREATE_FAVORITES_FAIL,
  GET_USER_DETAILS_REQUEST,
  GET_USER_DETAILS_SUCCESS,
  GET_USER_DETAILS_FAIL,
  LOGOUT_USER_REQUEST,
  LOGOUT_USER_SUCCESS,
  LOGOUT_USER_FAIL,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAIL,
  UPDATE_PASSWORD_REQUEST,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PASSWORD_FAIL,
  REMOVE_FAVORITES_REQUEST,
  REMOVE_FAVORITES_SUCCESS,
  REMOVE_FAVORITES_FAIL,
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAIL,
  GET_ALL_USER_DETAILS_REQUEST,
  GET_ALL_USER_DETAILS_SUCCESS,
  GET_ALL_USER_DETAILS_FAIL,
  UPDATE_USER_ROLE_REQUEST,
  UPDATE_USER_ROLE_SUCCESS,
  UPDATE_USER_ROLE_FAIL,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAIL,
  UPDATE_ORDER_STATUS_REQUEST,
  UPDATE_ORDER_STATUS_SUCCESS,
  UPDATE_ORDER_STATUS_FAIL,
  CREATE_REVIEW_REQUEST,
  CREATE_REVIEW_SUCCESS,
  CREATE_REVIEW_FAIL,
} from "../constants/userConstants";

// Login User
export const loginUser = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_USER_REQUEST });
    const data = await axios({
      url: "/api/v1/user/login",
      method: "POST",
      headers: { "Content-Type": "application/json" },
      data: {
        email,
        password,
      },
    });
    dispatch({ type: LOGIN_USER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: LOGIN_USER_FAIL, payload: error.message });
  }
};

// Register user
export const registerUser = (name, email, password) => async (dispatch) => {
  try {
    dispatch({ type: REGISTER_USER_REQUEST });
    const data = await axios({
      url: "/api/v1/user/register",
      method: "POST",
      headers: { "Content-Type": "application/json" },
      data: {
        name,
        email,
        password,
      },
    });
    dispatch({ type: REGISTER_USER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: REGISTER_USER_FAIL, payload: error.message });
  }
};

// Get Logged in user details
export const getUserDetails = () => async (dispatch) => {
  try {
    dispatch({ type: GET_USER_DETAILS_REQUEST });
    const data = await axios.get("/api/v1/user/profile");
    dispatch({ type: GET_USER_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_USER_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Logout user
export const logoutUser = () => async (dispatch) => {
  try {
    dispatch({ type: LOGOUT_USER_REQUEST });
    const data = await axios.get("/api/v1/user/logout");
    dispatch({ type: LOGOUT_USER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: LOGOUT_USER_FAIL, error: error.message });
  }
};

// Update user profile
export const updateUser = (name, email) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PROFILE_REQUEST });
    const data = await axios({
      url: "/api/v1/user/profile/update",
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      data: {
        name,
        email,
      },
    });
    dispatch({ type: UPDATE_PROFILE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: UPDATE_PROFILE_FAIL, payload: error.message });
  }
};

// Update password
export const updatePassword =
  (oldPassword, newPassword, confirmPassword) => async (dispatch) => {
    try {
      dispatch({ type: UPDATE_PASSWORD_REQUEST });
      const data = await axios({
        url: "/api/v1/user/password/update",
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        data: {
          oldPassword,
          newPassword,
          confirmPassword,
        },
      });
      dispatch({ type: UPDATE_PASSWORD_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: UPDATE_PASSWORD_FAIL, payload: error.message });
    }
  };

// Get All Favorites
export const getAllFavorites = () => async (dispatch) => {
  try {
    dispatch({ type: GET_FAVORITES_REQUEST });
    const data = await axios.get("/api/v1/user/favorites");
    dispatch({ type: GET_FAVORITES_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_FAVORITES_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Add to favorites
export const addToFavorites = (productId) => async (dispatch) => {
  dispatch({ type: CREATE_FAVORITES_REQUEST });
  const data = await axios({
    url: "/api/v1/user/favorite/new",
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    data: {
      id: productId,
    },
  })
    .then((res) => {
      dispatch({ type: CREATE_FAVORITES_SUCCESS, payload: res.data });
    })
    .catch((err) => {
      dispatch({ type: CREATE_FAVORITES_FAIL, payload: err.message });
    });
};

export const removeFromFavorites = (productId) => async (dispatch) => {
  dispatch({ type: REMOVE_FAVORITES_REQUEST });
  const data = await axios({
    url: "/api/v1/user/favorite/remove",
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    data: {
      id: productId,
    },
  })
    .then((res) => {
      dispatch({ type: REMOVE_FAVORITES_SUCCESS, payload: res.data });
    })
    .catch((err) => {
      dispatch({ type: REMOVE_FAVORITES_FAIL, payload: err.message });
    });
};

// Create Order
// Update user profile
export const createOrder = (info) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_ORDER_REQUEST });
    const data = await axios({
      url: "/api/v1/user/orders/new",
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      data: {
        data: info,
      },
    });
    window.localStorage.setItem("cart", JSON.stringify([]));
    dispatch({ type: CREATE_ORDER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: CREATE_ORDER_FAIL, payload: error.message });
  }
};

// Admin Routes Actions
// get all users
export const getAllUsers = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_USER_DETAILS_REQUEST });
    const data = await axios.get("/api/v1/admin/users");
    dispatch({
      type: GET_ALL_USER_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_ALL_USER_DETAILS_FAIL,
      payload: error.message,
    });
  }
};

// update user role
export const updateUserRole = (id, role) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_USER_ROLE_REQUEST });
    const data = await axios({
      url: `/api/v1/admin/users/${id}`,
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      data: {
        role,
      },
    });
    dispatch({ type: UPDATE_USER_ROLE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: UPDATE_USER_ROLE_FAIL, payload: error.message });
  }
};

// delete user
export const deleteUser = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_USER_REQUEST });
    const data = await axios({
      url: `/api/v1/admin/users/${id}`,
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    dispatch({ type: DELETE_USER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: DELETE_USER_FAIL,
      payload: error.message,
    });
  }
};

// Update user order status
export const updateOrderStatus = (id, status) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_ORDER_STATUS_REQUEST });
    const data = await axios({
      url: "/api/v1/user/orders/status",
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      data: {
        id,
        status,
      },
    });
    dispatch({ type: UPDATE_ORDER_STATUS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: UPDATE_ORDER_STATUS_FAIL, payload: error });
  }
};

// Create product Review
export const createReview =
  (orderId, productId, itemId, rating, comment) => async (dispatch) => {
    try {
      dispatch({ type: CREATE_REVIEW_REQUEST });
      const data = await axios({
        url: "/api/v1/user/orders/review",
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        data: {
          orderId,
          productId,
          itemId,
          rating,
          comment,
        },
      });
      dispatch({ type: CREATE_REVIEW_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: CREATE_REVIEW_FAIL, payload: error });
    }
  };
