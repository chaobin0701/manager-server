/**
 * 用户管理模块
 * */
const router = require("koa-router")();
const User = require("./../models/userSchema");
const util = require("./../utils/util");
const jwt = require('jsonwebtoken')
router.prefix("/users");

router.post("/login", async (ctx) => {
  try {
    const { userName, userPwd } = ctx.request.body;
    /**
     * 返回数据库指定的字段，有三种方式
     * 1.'userId userName userEmail state role deptId roleList' 字符串方式 => 写入就代表返回
     * 2. {userID：1,userName:1}  对象方式 => 1代表返回,0代表不返回
     * 3. .select('userId)  接在findOne后面,连续调用
     * */ 
    const res = await User.findOne({
      userName,
      userPwd,
    },'userId userName userEmail state role deptId roleList');
    const data = res._doc

    const token = jwt.sign({
      data
    },'imooc',{expiresIn:'1h'})

    if (res) {
      data.token = token
      ctx.body = util.success(data);
    } else {
      ctx.body = util.fail("账号或密码不正确");
    }
  } catch (error) {
    ctx.body = util.fail(error);
  }
});
module.exports = router;
