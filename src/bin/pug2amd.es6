import 'babel-polyfill';
import 'colors';
import path from 'path';
import fs from 'fs';
import fse from 'fs-extra';
import pug from 'pug';
import program from 'commander';
import glob from 'glob';
import watch from 'glob-watcher';
import { version } from '../package.json';

const amdWrapper = 'define(function (require, exports, module) {[func] return tpl})';
const log = console.log;

let pugPath;

program
  .version(version)
  .usage('<path> [options]')
  .arguments('<path>')
  .option('-f, --out-file <path>', '输出文件到指定路径')
  .option('-d, --out-dir <path>', '输出目录到指定目录')
  .option('    --nocompress', '不压缩代码')
  .option('-w, --watch', '监视文件变动')
  .action(p => {
    pugPath = p;
    _isFile(p) ? _doFile(p) : _doDir(p);
  })
  .parse(process.argv);

function _doFile(p) {
  const ext = path.extname(p);
  const basename = path.basename(p);

  let output = program.outFile || p.replace(ext, '.js');

  if (!path.extname(output)) {
    output = path.join(output, basename.replace(ext, '.js'));
  }

  if (program.watch) {
    watch(p).on('change', p => {
      _compile(p, output);
    });

    log([
      '正在监视 ' + p + '! `Ctrl + C` 停止!',
      'Watching ' + p + '! Use `Ctrl + C` to stop!'
    ].join('\n').yellow);
  }

  _compile(p, output);

}

function _doDir(p) {
  const pattern = path.join(p, '**/*.pug');
  const outDir = program.outDir;

  const formatOutputUrl = file => {
    let output;

    if (outDir && pugPath !== outDir) {
      output = file.replace(pugPath, outDir).replace('pug', 'js');
    } else {
      output = file.replace('pug', 'js');
    }

    return output;
  }

  if (program.watch) {
    const handle = file => {
      _compile(file, formatOutputUrl(file));
    };

    watch(pattern).on('add', handle).on('change', handle);

    log([
      '正在监视 ' + p + '! `Ctrl + C` 停止!',
      'Watching ' + p + '! Use `Ctrl + C` to stop!'
    ].join('\n').yellow);
  }

  glob(pattern, null, (e, files) => {
    if (e) {
      log(e.message.red);
    } else {
      files.forEach(file => {

        _compile(file, formatOutputUrl(file));
      });
    }
  });
}

function _isFile(file) {
  try {
    return fs.statSync(file).isFile();
  } catch (e) {
    log(e.message.red);
  }
}

function _isPugFile(file) {
  return path.extname(file) === '.pug'
}

function _compile(file, output) {
  if (_isPugFile(file)) {
    const compiledStr = pug.compileFileClient(file, {
      pretty: !program.nocompress,
      debug: false,
      compileDebug: false,
      name: 'tpl'
    });

    fse.outputFileSync(output, amdWrapper.replace('[func]', compiledStr), 'utf8');

    log([
      'compiled:'.cyan,
      file,
      '=>',
      path.relative(process.cwd(), output).magenta,
      new Date().toLocaleString()
    ].join(' '));
  }
}

if (!pugPath) {
  log([
    'Nothing to do! You can use `p2a -h` to check usage',
    '什么都没有发生! 请使用命令`p2a -h`查看用法'
  ].join('\n').yellow);
}