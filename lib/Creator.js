const { fetchRepoList, fetchTagList } = require("./request");
const Inquirer = require("inquirer");
const { wrapLoading } = require("../utils/wrapLoading");
const downloadGitRepo = require("download-git-repo"); //不支持promise
const util = require("util");

class Creator {
  constructor(projecName, targetDir) {
    this.projecName = projecName;
    this.targetDir = targetDir;
    // 此时这个方法变为promise
    this.downloadGitRepo = util.promisify(downloadGitRepo);
  }
  async fetchRepo() {
    // loading和失败重新拉取
    let repos = await wrapLoading(fetchRepoList, "waiting fetch template");
    if (!repos) return;
    repos = repos.map((repo) => {
      return repo.name;
    });
    let { choicedRepo } = await Inquirer.prompt([
      {
        name: "choicedRepo",
        message: "please choose a template to create project",
        type: "list",
        choices: repos,
      },
    ]);
    return choicedRepo;
  }
  async fetchTag(repo) {
    // loading和失败重新拉取
    let tags = await wrapLoading(fetchTagList, "waiting fetch tag", repo);
    if (!tags) return;
    tags = tags.map((tag) => {
      return tag.name;
    });
    let { choicedTag } = await Inquirer.prompt([
      {
        name: "choicedTag",
        message: "please choose a tag to create project",
        type: "list",
        choices: tags,
      },
    ]);
    return choicedTag;
  }
  async download(repo, tag) {
    // 1. 先拼接出下载路径
    // zjf9035/scaffold#complex-react
    let requestUrl = `zjf9035/${repo}${tag ? "#" + tag : ""}`;
    // 2. 把资源下载到某个路径(后续可增加缓存功能，还可以使用ejs handlerbar 去渲染模板 最后生成结果再写入)
    //await this.downloadGitRepo(requestUrl, this.targetDir);
    await wrapLoading(
      this.downloadGitRepo,
      "waiting downing",
      requestUrl,
      this.targetDir
    );
  }
  // 开始创建
  async create() {
    // 1. 先去拉取组织下的模板
    let repo = await this.fetchRepo();
    // 2. 通过模板找到版本号
    let tag = await this.fetchTag(repo);
    // 3. 下载
    let downurl = await this.download(repo, tag);
  }
}
module.exports = Creator;
