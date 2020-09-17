const token = localStorage.getItem("token");
const authToken = "Bearer " + token;
const options = {
  headers: {
    Authorization: authToken,
  },
};
export default options;
