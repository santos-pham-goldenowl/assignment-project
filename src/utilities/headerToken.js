const options = async () => {
  const token = await localStorage.getItem("token");
  const authToken = "Bearer " + token;
  const headerToken = {
    headers: {
      Authorization: authToken,
    },
  };
  return headerToken;
};

export default options;
