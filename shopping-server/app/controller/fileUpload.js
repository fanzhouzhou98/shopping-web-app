const Controller = require('egg').Controller;
const fs = require('fs');
const path = require('path');
const sendToWormhole = require('stream-wormhole');
const awaitWriteStream = require('await-stream-ready').write;

class FileUploadController extends Controller {
  async upload() {
    const { ctx } = this;

    const stream = await ctx.getFileStream();
    const name = Date.now() + '' + path.extname(stream.filename).toLocaleLowerCase(); // 获取文件的尾缀名（扩展名）
    console.log('name:>>>>>>>', name);
    console.log('filename:>>>>>>>', stream.filename);

    const target = path.resolve(__dirname, '../public/uploads'); // 保存的文件夹路径

    // 判断存储的文件夹是否存在，不存在则创建
    if (!fs.existsSync(target)) {
      fs.mkdirSync(target);
    }

    const targetFilename = path.join(target, name); // 写入的文件名称, 目标文件名
    console.log('filename:>>>>>>>', targetFilename);

    const writeStream = fs.createWriteStream(targetFilename);

    try {
      await awaitWriteStream(stream.pipe(writeStream));
    } catch (e) {
      await sendToWormhole(stream);
      console.log(e);
      throw e;
    }
    ctx.body = {
      code: 200,
      message: '上传成功',
      data: name,
    };
  }

}

module.exports = FileUploadController;