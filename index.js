const Prism = require('./dist/prism-core.min');
const languages = require('./dist/languages');
const dependencies = require('./dist/dependencies');

let loadedLanguages = {};

function loadLanguage(language) {
  loadedLanguages[language] = true;
  loadedLanguages[languages[language]] = true;

  dependencies[languages[language]].forEach(dependency => {
    loadedLanguages[dependency] = true;
    require(`./dist/languages/prism-${dependency}.min`);
  });
}

Prism.languages = new Proxy(Prism.languages, {
  get(object, key) {
    if (languages[key] && !loadedLanguages[key]) {
      loadLanguage(key);
    }

    return object[key];
  }
});

module.exports = Prism;