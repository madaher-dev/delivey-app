import axios from 'axios';

export const factorypost = (body, url, type, typeFail) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try {
    const res = await axios.post(`${url}`, body, config);
    // console.log(res.data);
    dispatch({
      type,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: typeFail,
      payload: err.response.data.message,
    });
  }
};

export const factoryget = (url, type, typeFail) => async (dispatch) => {
  try {
    const res = await axios.get(`${url}`);
    // console.log(res.data);
    dispatch({
      type,
      payload: res.data,
    });
  } catch (err) {
    // console.log(err);
    dispatch({
      type: typeFail,
      payload: err.response.data.message,
    });
  }
};

export const factorypatch = (body, url, type, typeFail) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try {
    const res = await axios.patch(`${url}`, body, config);

    dispatch({
      type,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: typeFail,
      payload: err.response.data.message,
    });
  }
};
