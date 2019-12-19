To build everything (assuming you have antlr-4.7.2 built in /usr/local/lib):
    npm install && npm run build

Here are the specific commands used to build the grammars:

ECMAScript:
    java -Xmx500M -cp '/usr/local/lib/antlr-4.7.2-complete.jar:$CLASSPATH' org.antlr.v4.Tool  -Dlanguage=JavaScript -lib antlr -o antlr -visitor -Xexact-output-dir antlr/ECMAScript.g4

JavaScript
    java -Xmx500M -cp '/usr/local/lib/antlr-4.7.2-complete.jar:$CLASSPATH' org.antlr.v4.Tool  -Dlanguage=JavaScript -lib antlr -o antlr -no-listener -visitor -Xexact-output-dir antlr/JavaScriptLexer.g4
    java -Xmx500M -cp '/usr/local/lib/antlr-4.7.2-complete.jar:$CLASSPATH' org.antlr.v4.Tool  -Dlanguage=JavaScript -lib antlr -o antlr -no-listener -visitor -Xexact-output-dir antlr/JavaScriptParser.g4

And the run it:
    node --stack-size=50 index.js
or
    npm start