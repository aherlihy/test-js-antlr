const antlr4 = require('antlr4');
const ECMAScriptLexer = require('./antlr/ECMAScriptLexer.js').ECMAScriptLexer;
const ECMAScriptParser = require('./antlr/ECMAScriptParser.js').ECMAScriptParser;
const ECMAScriptVisitor = require('./antlr/ECMAScriptVisitor.js').ECMAScriptVisitor;

const JavaScriptLexer = require('./antlr/JavaScriptLexer.js').JavaScriptLexer;
const JavaScriptParser = require('./antlr/JavaScriptParser.js').JavaScriptParser;
const JavaScriptVisitor = require('./antlr/JavaScriptParserVisitor.js').JavaScriptParserVisitor;


class JavaScriptWriter extends JavaScriptVisitor {
  visitChildren(ctx) {
    return ctx.children.reduce((str, node) => {
      return `${str}${this.visit(node)}`;
    }, '').trim();
  }
  visitTerminal(ctx) {
    return ctx.getText();
  }
}

class ECMAScriptWriter extends ECMAScriptVisitor {
  visitChildren(ctx) {
    return ctx.children.reduce((str, node) => {
      return `${str}${this.visit(node)}`;
    }, '').trim();
  }
  visitTerminal(ctx) {
    return ctx.getText();
  }
}


const compileEcma = function(input, locations) {
  const chars = new antlr4.InputStream(input);
  const lexer = new ECMAScriptLexer(chars);
  lexer.strictMode = false;
  const tokens = new antlr4.CommonTokenStream(lexer);
  const parser = new ECMAScriptParser(tokens);
  parser.buildParseTrees = true;
  const tree = parser.program();

  const writer = new ECMAScriptWriter();
  return writer.visitProgram(tree);
};

const compileJS = function(input, locations) {
  const chars = new antlr4.InputStream(input);
  const lexer = new JavaScriptLexer(chars);
  lexer.strictMode = false;
  const tokens = new antlr4.CommonTokenStream(lexer);
  const parser = new JavaScriptParser(tokens);
  parser.buildParseTrees = true;
  const tree = parser.program();

  const writer = new JavaScriptWriter();
  return writer.program(tree);
};

console.log('compiling "1" using ECMAScript grammar');
console.log(compileEcma('1'));
console.log('compiling "1" using JavaScript grammar');
console.log(compileJS('1'));
