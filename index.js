const Prism = require('./dist/prism-core.min');
const languages = require('./dist/languages');
const dependencies = require('./dist/dependencies');

let loadedLanguages = {};

function ensureLanguageLoaded(language) {
  if (loadedLanguages[language]) {
    return;
  }

  loadedLanguages[language] = true;
  loadedLanguages[languages[language]] = true;

  dependencies[languages[language]].forEach(dependency => {
    loadedLanguages[dependency] = true;
    require(`./dist/languages/prism-${dependency}.min`);
  });
}

module.exports = {
  highlight(code, language) {
    ensureLanguageLoaded(language);

    return Prism.highlight(code, Prism.languages[language]);
  },

  tokenize(code, language) {
    ensureLanguageLoaded(language);

    return Prism.tokenize(code, Prism.languages[language]);
  }
};