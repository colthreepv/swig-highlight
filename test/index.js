/* global describe:false, it:false, before: false */
var assert = require('assert'),
    path = require('path'),
    swig = require('swig');

require('../index').apply(swig);

describe('base functionality', function () {
  var template, compiledTemplate;
  before(function () {
    template = swig.compileFile(path.resolve(process.cwd(), 'test/fixtures/html.swig'));
    compiledTemplate = template();
  });

  it('should add a lot of tags with .hljs class', function () {
    var regex = /class="hljs/;
    assert.ok(regex.test(compiledTemplate));
  });

  it('should have "bash" class inside code tag', function () {
    var regex = /class="hljs bash/;
    assert.ok(regex.test(compiledTemplate));
  });

});

describe('details', function () {
  var template, compiledTemplate;
  before(function () {
    template = swig.compileFile(path.resolve(process.cwd(), 'test/fixtures/auto.swig'));
    compiledTemplate = template();
  });

  it('should have "python" as guessed language', function () {
    var regex = /class="hljs python/;
    assert.ok(regex.test(compiledTemplate));
  });

  it('should have no newlines that breaks HTML', function () {
    var regex = /hljs python.\>\n/;
    assert.ok(!regex.test(compiledTemplate));
  });

});
