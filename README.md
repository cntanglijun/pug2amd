# pug2amd-cli
[![npm](https://img.shields.io/npm/v/pug2amd.svg?maxAge=2592000?style=flat-square)](https://www.npmjs.com/package/pug2amd)
[![npm](https://img.shields.io/npm/dm/pug2amd.svg?maxAge=2592000?style=flat-square)](https://www.npmjs.com/package/pug2amd)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)](https://raw.githubusercontent.com/cntanglijun/pug2amd/master/LICENSE)

pug模版编译成amd模块的工具

## 安装(Installation)

```bash
npm i pug2amd -g
```

## 用法(Usage)

```bash
pug2amd <path> [options]
```
| 参数 | 必填 | 说明 |
|:-:|:-:|:-:|
| &lt;path&gt; | 是 | 指定 pug 文件或目录 |
| -f &lt;path&gt; | 否 | 输出文件到指定路径 |
| -d &lt;directory&gt; | 否 | 输出目录到指定目录 |
| -w | 否 | 监视文件变动 |
| --nocompress | 否 | 不压缩文件 |


## License
MIT