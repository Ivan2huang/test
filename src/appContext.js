import CONFIG from './constants/config';

class AppContext {
  constructor() {
    this.map = {};
  }

  get(key) {
    return this.map[key];
  }

  set(key, value) {
    this.map[key] = value;
  }

  setDefaultLanguage(language) {
    this.map.locale = language;
  }

  setDefaultRole(role) {
    this.map.role = role;
  }

  static getInstance() {
    if (!AppContext.instance) {
      AppContext.instance = new AppContext();
      AppContext.instance.setDefaultLanguage(CONFIG.defaultLanguage);
      AppContext.instance.setDefaultRole('');
    }
    return AppContext.instance;
  }
}

AppContext.instance = undefined;

export default AppContext.getInstance;
