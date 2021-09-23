const fs = require("fs");
const path = require("path");
const Parser = require("./Parser");
class Compiler {
  constructor(options) {
    const { entry, output } = options;
    this.entry = entry;
    this.output = output;
    this.modules = [];
  }
  // 构建启动
  run() {
    const info = this.build(this.entry);
    console.log('info', info)
    this.modules.push(info);
    this.modules.forEach(({ dependecies }) => {
      if (dependecies) {
        for (const dependency in dependecies) {
          this.modules.push(this.build(dependecies[dependency]));
        }
      }
    });
    console.log('this.', this.modules)
    const dependencyGraph = this.modules.reduce(
      // (graph, item) => ({
      //   ...graph,
      //   [item.filename]: {
      //     dependecies: item.dependecies,
      //     code: item.code
      //   }
      // }),
      function(graph, item) {
        console.log('graph',graph)
        return {
          ...graph,
          [item.filename]: {
            dependecies: item.dependecies,
            code: item.code
          }
        }
      },
      {}
    );
    console.log('dependencyGraph', dependencyGraph)
    this.generate(dependencyGraph);
  }
  build(filename) {
    const { getAst, getDependecies, getCode } = Parser;
    const ast = getAst(filename);
    const dependecies = getDependecies(ast, filename);
    const code = getCode(ast);
    return {
      filename,
      dependecies,
      code
    };
  }
  generate(code) {
    const filePath = path.join(this.output.path, this.output.filename);
    const bundle = `(function(graph){
      function require(moduleId){ 
        function localRequire(relativePath){
          return require(graph[moduleId].dependecies[relativePath])
        }
        var exports = {};
        (function(require,exports,code){
          eval(code)
        })(localRequire,exports,graph[moduleId].code);
        return exports;
      }
      require('${this.entry}')
    })(${JSON.stringify(code)})`;
    fs.writeFileSync(filePath, bundle, "utf-8");
  }
}

module.exports = Compiler;
