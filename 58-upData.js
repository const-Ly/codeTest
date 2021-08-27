#!/usr/bin/env node

const {
    SUCCESS,
    WARN,
    ERROR,
    INFO,
    TIP
} = require('./log');
const {
    program
} = require('commander');
const fse = require('fs-extra');
const fs = require('fs');
const path = require('path');
const MAINPATH = process.cwd();
let newAPPJSON = {};
const newSubPackages = [];

// 优化
const go = () => {
    const configPath = path.join(MAINPATH, 'boost-on.config.js');
    const configIsExist = fse.pathExistsSync(configPath);
    // 配置文件不存在的话
    if (!configIsExist) {
        ERROR('缺少boost-on.config.js文件')
        INFO('文件格式请运行boost-on --help查看')
        INFO('优化程序已结束');
        return;
    }
    const configObj = fse.readJsonSync(configPath);
    const rootPath = path.join(configObj.root, '');
    const APPJSON = fse.readJsonSync(path.join(rootPath, 'app.json'));
    newAPPJSON = APPJSON;
    // 删除预加载规则
    delete newAPPJSON.preloadRule;
    // 创建backup文件夹
    fse.emptyDirSync(path.join(MAINPATH, 'backup'));
    APPJSON.subPackages.forEach(subPackageItem => handleSubpackage(subPackageItem, configObj.include.some(item => item === subPackageItem.root), rootPath))
    // app.json
    if (fse.pathExistsSync(path.join(MAINPATH, 'app.json'))) {
        ERROR(MAINPATH + '目录已存在app.json, 无法优化');
        ERROR('请确认目录文件')
        INFO('优化程序已结束');
        return;
    }
    fse.moveSync(path.join(rootPath, 'app.json'), path.join(MAINPATH, 'app.json'));
    newAPPJSON.subPackages = newSubPackages;
    fse.writeJsonSync(path.join(rootPath, 'app.json'), newAPPJSON);
    INFO('app.json 已处理')
    SUCCESS('优化成功');
}
// 还原
const revert = () => {
    const configPath = path.join(MAINPATH, 'boost-on.config.js');
    const configIsExist = fse.pathExistsSync(configPath);
    // 配置文件不存在的话
    if (!configIsExist) {
        ERROR('缺少boost-on.config.js文件')
        INFO('文件格式请运行boost-on --help查看')
        INFO('还原程序已结束');
        return;
    }
    const configObj = fse.readJsonSync(configPath);
    const rootPath = path.join(configObj.root, '');
    const appJSONIsExist = fse.pathExistsSync(path.join(MAINPATH, 'app.json'));
    if (!appJSONIsExist) {
        ERROR(MAINPATH + '目录缺少app.json, 无法还原');
        INFO('还原程序已结束');
        return;
    }
    fse.moveSync(path.join(MAINPATH, 'app.json'), path.join(rootPath, 'app.json'), {
        overwrite: true
    });
    INFO('app.json 已还原')
    let res = fs.readdirSync(path.join(MAINPATH, 'backup'));
    for (let i = 0; i < res.length; i++) {
        let dirname = decodeURIComponent(res[i]);
        fse.moveSync(path.join(MAINPATH, 'backup', res[i]), path.join(rootPath, dirname));
        INFO(`${dirname} 已还原`)
    }
    SUCCESS("还原成功");
}

// 处理分包
handleSubpackage = (subPackageItem, isInclude = false, rootPath) => {
    if (isInclude) {
        newSubPackages.push(subPackageItem);
    } else {
        let sourcePath = path.join(rootPath, subPackageItem.root);
        let dstPath = path.join(MAINPATH, 'backup', encodeURIComponent(subPackageItem.root));
        INFO(`${subPackageItem.root} 分包已优化`);
        fse.moveSync(sourcePath, dstPath)
    }
}

program
    .version('0.0.4', '-v, --version', '查看版本')
    .helpOption('-h, --help', '帮助')
    .description('小程序分包shake工具')
    .name('boost-on')
    .usage('command')

program.on('--help', () => {
    console.log('');
    console.log('=== 举个例子 ===');
    console.log('优化命令:');
    console.log('  $ boost-on go');
    console.log('还原命令:');
    console.log('  $ boost-on revert');
    console.log('');
    console.log('=== boost-on.config.js 格式 ===');
    console.log(`{
    "root": "C:\\wechatMiniappPath",// wechat miniapp project path
    "include": ["pages/moduleA"] // wechat miniapp app.json subPackage root
}`);
    INFO('运行go命令前请确保执行路径包含boost-on.config.js文件');
})

program
    .command('go')
    .description('优化')
    .action(() => {
        INFO('优化程序已启动')
        try {
            go();
        } catch (e) {
            ERROR("啊哦~出错了", e);
            console.error(e);
        }
    });

program
    .command('revert')
    .description('还原')
    .action(() => {
        INFO('还原程序已启动')
        try {
            revert();
        } catch (e) {
            ERROR("啊哦~出错了");
            console.error(e);
        }
    });


program.parse(process.argv);