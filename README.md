# pug2amd 0.0.1-alpha
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
p2a --file <path>
```
|参数             |说明            |
|:---------------:|:--------------:|
|--file &lt;path&gt;|指定需要编译的文件或目录|
|--out &lt;directory&gt;|指定输出到的目录(默认在当前指定文件目录下生成xx.min.js)|
|--nocompress |不压缩文件|
|--watch      |监视文件变动|

## License
MIT