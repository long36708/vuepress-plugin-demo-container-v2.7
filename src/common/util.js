
// https://github.com/element-plus/element-plus/blob/dev/website/md-loader/util.js
const { compileTemplate } = require('@vue/component-compiler-utils');
const compiler = require('vue-template-compiler');
const os = require('os')

function stripScript(content) {

  // 首先尝试匹配<script setup>
  let result = content.match(/<script\s+setup\b[^>]*>([\s\S]*?)<\/script>/i);
  if (result && result[1]) {
    return result[1].trim();
  }
  // 如果没有<script setup>，则匹配普通的<script>
  result = content.match(/<script\b[^>]*>([\s\S]*?)<\/script>/i);
  return result && result[1] ? result[1].trim() : '';
}

function stripStyle(content) {
  const result = content.match(/<style\b[^>]*>([\s\S]*?)<\/style>/i);
  return result && result[1] ? result[1].trim() : '';
}

// 编写例子时不一定有 template。所以采取的方案是剔除其他的内容
function stripTemplate(content) {
  content = content.trim();
  if (!content) {
    return content;
  }
  // 移除<script>和<style>标签及其内容，包括<script setup>
  return content.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '')
                .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, '')
                .trim();
}

function pad(source) {
  return source
    .split(/\r?\n/)
    .map(line => `  ${line}`)
    .join('\n');
}

function getPascalByPackageName (name = '') {
  return name
    // 将非字母转为 --
    .replace(/[^a-zA-Z]/g, '--')
    // 将所有重复的 - 转为单个
    .replace(/-+/g, '-')
    // 将 -字母 转为 大写字母
    .replace(/-([a-zA-Z]{1})/g, (s, s1) => s1.toUpperCase())
    // 将首字母转为大写
    .replace(/^([a-zA-Z]{1})/, (s, s1) => s1.toUpperCase())
}

function genInlineComponentText(template, script, isScriptSetup = false) {
  // https://github.com/vuejs/vue-loader/blob/423b8341ab368c2117931e909e2da9af74503635/lib/loaders/templateLoader.js#L46
  const importPair = {}
  const finalOptions = {
    source: `<div>${template}</div>`,
    filename: 'inline-component', // TODO：这里有待调整
    compiler
  };
  const compiled = compileTemplate(finalOptions);
  // tips
  if (compiled.tips && compiled.tips.length) {
    compiled.tips.forEach(tip => {
      console.warn(tip);
    });
  }
  // errors
  if (compiled.errors && compiled.errors.length) {
    console.error(
      `\n  Error compiling template:\n${pad(compiled.source)}\n` +
        compiled.errors.map(e => `  - ${e}`).join('\n') +
        '\n'
    );
  }
  let demoComponentContent = `
    ${compiled.code}
  `;
  // todo: 这里采用了硬编码有待改进
  script = script.trim();
  if (script) {
    if (isScriptSetup) {
      // 处理<script setup>语法
      // 提取import语句
      const importStatements = [];
      script = script
        .replace(/import\s+([^;]+?)\s+from\s+['"]{1}([^'"]+)['"]{1}/g, (s, s1, s2) => {
          const name = getPascalByPackageName(s2)
          importPair[name] = s2
          if (/^\s*{.*}\s*$/.test(s1.trim())) {
            importStatements.push(`const ${s1.trim()} = ${name}`);
            return '';
          }
          const namelist = s1.split(',').map(n => n.trim());
          const imports = namelist.map(n => {
            if (/^\s*\*\s+as\s+\S+\s*$/.test(n)) {
              return `const ${n.split(' as ')[1]} = ${name}`
            } else {
              return `const ${n} = ${name}.default ? ${name}.default : ${name}`
            }
          });
          importStatements.push(...imports);
          return '';
        });
      
      // 移除import语句后的script内容
      const scriptWithoutImports = script.trim();
      
      // 对于<script setup>，我们不需要手动提取顶层绑定
      // 而是直接将整个脚本内容作为setup函数的主体
      // 并假设所有声明的标识符都需要暴露
      const topLevelBindings = new Set();
      
      // 简单提取所有可能的标识符
      const identifierRegex = /(?:const|let|var)\s+([a-zA-Z_$][0-9a-zA-Z_$]*)\s*=/g;
      let match;
      while ((match = identifierRegex.exec(scriptWithoutImports)) !== null) {
        topLevelBindings.add(match[1]);
      }
      
      // 也提取函数声明
      const functionRegex = /function\s+([a-zA-Z_$][0-9a-zA-Z_$]*)\s*\(/g;
      while ((match = functionRegex.exec(scriptWithoutImports)) !== null) {
        topLevelBindings.add(match[1]);
      }
      
      // 提取箭头函数
      const arrowRegex = /([a-zA-Z_$][0-9a-zA-Z_$]*)\s*=\s*\([^)]*\)\s*=>/g;
      while ((match = arrowRegex.exec(scriptWithoutImports)) !== null) {
        topLevelBindings.add(match[1]);
      }
      
      // 处理 defineProps 和 defineEmits 宏
      let propsDef = null;
      let emitsDef = null;
      
      // 查找 defineProps 调用
      const propsMatch = scriptWithoutImports.match(/(?:const\s+\w+\s*=\s*)?defineProps\s*\(\s*([^)]*)\s*\)/);
      if (propsMatch) {
        try {
          // 提取 props 定义
          const propsStr = propsMatch[1].trim();
          // 尝试解析 props 定义（支持对象字面量和数组形式）
          if (propsStr.startsWith('{') && propsStr.endsWith('}')) {
            propsDef = propsStr;
          } else if (propsStr.startsWith('[') && propsStr.endsWith(']')) {
            propsDef = propsStr;
          }
        } catch (e) {
          console.warn('Failed to parse defineProps:', e);
        }
      }
      
      // 查找 defineEmits 调用
      const emitsMatch = scriptWithoutImports.match(/(?:const\s+\w+\s*=\s*)?defineEmits\s*\(\s*([^)]*)\s*\)/);
      if (emitsMatch) {
        try {
          const emitsStr = emitsMatch[1].trim();
          if ((emitsStr.startsWith('{') && emitsStr.endsWith('}')) ||
              (emitsStr.startsWith('[') && emitsStr.endsWith(']'))) {
            emitsDef = emitsStr;
          }
        } catch (e) {
          console.warn('Failed to parse defineEmits:', e);
        }
      }
      
      // 对于<script setup>，我们需要将整个脚本内容包装在setup函数中
      // 这样可以确保所有声明的变量和函数都能在模板中使用
      script = importStatements.join(os.EOL) + os.EOL;
      script += 'const democomponentExport = {\n';
      
      // 添加 props 和 emits 定义
      if (propsDef) {
        script += `  props: ${propsDef},\n`;
      }
      if (emitsDef) {
        script += `  emits: ${emitsDef},\n`;
      }
      
      script += '  setup() {\n';
      script += scriptWithoutImports + '\n';
      script += '    return {\n';
      if (topLevelBindings.size > 0) {
        script += '      ' + Array.from(topLevelBindings).join(',\n      ') + '\n';
      }
      script += '    };\n';
      script += '  }\n';
      script += '};\n';
    } else {
      // 处理传统的<script>语法
      script = script
        .replace(/export\s+default/, 'const democomponentExport =')
        .replace(/import\s+(.*)\s+from\s+['"]{1}(.*)['"]{1}/g, (s, s1, s2) => {
          const name = getPascalByPackageName(s2)
          importPair[name] = s2
          if (/^\s*{.*}\s*$/.test(s1)) {
            return `const ${s1} = ${name}`
          }
          const namelist = s1.split(',')
          return namelist.map(n => {
            if (/^\s*\*\s+as\s+\S+\s*$/.test(n)) {
              return `const ${n.split(' as ')[1]} = ${name}`
            } else {
              return `const ${n} = ${name}.default ? ${name}.default : ${name}`
            }
          }).join(os.EOL)
        })
    }
  } else {
    script = 'const democomponentExport = {}';
  }
  // 对于<script setup>，我们需要确保setup函数正确返回
  if (isScriptSetup) {
    demoComponentContent = `(function() {
      ${demoComponentContent}
      ${script}
      return {
        render,
        staticRenderFns,
        setup: democomponentExport.setup
      }
    })()`;
  } else {
    demoComponentContent = `(function() {
      ${demoComponentContent}
      ${script}
      return {
        render,
        staticRenderFns,
        ...democomponentExport
      }
    })()`;
  }
  return [demoComponentContent, importPair];
}

module.exports = {
  stripScript,
  stripStyle,
  stripTemplate,
  genInlineComponentText
};
