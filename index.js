var hljs = require('highlight.js');

exports.parse = function (str, line, parser, types, options) {
  parser.on(types.STRING, function (token) {
    // strip quote or double quote, they _also_ get matched
    var hlLanguage = token.match.replace(/^("|')|("|')$/g, '');
    // check if language is supported
    if (hljs.getLanguage(hlLanguage) !== undefined) {
      this.out.push(hlLanguage);
    } else {
      throw new Error('Unsupported code-highlight "' + hlLanguage + '" on line ' + line + '.');
    }
  });

  return true;
};

exports.compile = function (compiler, args, content, parents, options, blockName) {
  var highlighted = '',
      code = '',
      language,
      hljsOutput;

  if (args.length > 0) {
    language = args[0];
    code = hljs.highlight(language, content[0].trim()).value;
  } else {
    hljsOutput = hljs.highlightAuto(content[0].trim());
    code = hljsOutput.value;
    language = hljsOutput.language || '';
  }

  highlighted += '<code class="hljs ' + language + '">' + code + '</code>';
  highlighted = highlighted
    .replace(/\\/g, '\\\\')
    .replace(/\n/g, '\\n')
    .replace(/\r/g, '\\r')
    .replace(/"/g, '\\"');

  var out = [
    '(function(){',
    '  _output += "' + highlighted + '";',
    '  return _output;',
    '})();'
  ].join('\n');

  return out;
};

exports.ends = true;
exports.block = true;

exports.apply = function (swig) {
  swig.setTag('highlight', exports.parse, exports.compile, exports.ends, exports.block);
};
