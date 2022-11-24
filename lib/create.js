const path = require("path");
const fs = require("fs-extra");
const Inquirer = require("inquirer");
const Creator = require("./Creator");

module.exports = async function (projectName, options) {
  const targetDir = path.join(process.cwd(), projectName);
  if (fs.existsSync(targetDir)) {
    // 存在-f或者--force，强制删除
    if (options.f || options.force) {
      await fs.remove(targetDir);
    } else {
      // 让用户自己选择
      let { action } = await Inquirer.prompt([
        {
          name: "action",
          type: "list",
          message: "targetDir already exits,please pick an action:",
          choices: [
            { name: "Overwrite", value: "overwrite" },
            { name: "Cancel", vlue: "false" },
          ],
        },
      ]); // 配置询问方式
      if (!action) {
        return;
      } else if (action === "overwrite") {
        console.log("\r\nRemoving...");
        await fs.remove(targetDir);
      }
    }
  }
  // 创建项目
  const creator = new Creator(projectName, targetDir);
  creator.create();
};
