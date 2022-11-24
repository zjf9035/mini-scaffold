const axios = require("axios");

axios.interceptors.response.use((res) => {
  return res.data;
});

async function fetchRepoList() {
  // 可以通过配置文件，拉取不同仓库对应的文件
  return await axios.get("https://api.github.com/users/zjf9035/repos");
}

async function fetchTagList(repo) {
  // 可以通过配置文件，拉取不同仓库对应的文件
  return await axios.get(`https://api.github.com/repos/zjf9035/${repo}/tags`);
}

module.exports = {
  fetchRepoList,
  fetchTagList,
};
