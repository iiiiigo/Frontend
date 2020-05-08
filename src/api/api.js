const axios = require('axios');

export const getAllEmployee = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BASEURL}/api/v1/employees`);
    return res.data;
    } catch (error) {
      alert('get 에러' + JSON.stringify(error.message));
      console.log(error);
    }
};

export const getOneEmployee = async (id) => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BASEURL}/api/v1/employee/${id}`);
    return res.data;
    } catch (error) {
      alert('get 에러' + JSON.stringify(error.message));
      console.log(error);
    }
};

export const createEmployee = async (data) => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BASEURL}/api/v1/create`);
    return res.data;
    } catch (error) {
      alert('get 에러' + JSON.stringify(error.message));
      console.log(error);
    }
};

export const updateEmployee = async (data, id) => {
  try {
    const res = await axios.put(
      `${process.env.REACT_APP_BASEURL}/api/v1/update/${id}`, data);
  return res.data;
  } catch (error) {
    alert('get 에러' + JSON.stringify(error.message));
    console.log(error);
  }
};