import axios from "axios";
const baseUrl = "/api/notes";

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const create = (newNotes) => {
  const request = axios.post(baseUrl, newNotes);
  return request.then((response) => response.data);
};

const update = (id, newNotes) => {
  const request = axios.put(`${baseUrl}/${id}`, newNotes);
  return request.then((response) => response.data);
};

export default {
  getAll: getAll,
  create: create,
  update: update,
};
