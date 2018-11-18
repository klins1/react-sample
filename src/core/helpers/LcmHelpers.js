

class LcmHelpers {

  /**
   * 가나다
   * @param config 가나다
   * @returns {...*[]} 가나다
   */
  static setRoutes(config) {
    let routes = [...config.routes];

    if (config.settings || config.auth) {
      routes = routes.map((route) => {
        let auth = config.auth ? [...config.auth] : [];
        auth = route.auth ? [...auth, ...route.auth] : auth;
        return {
          ...route,
          settings: {...config.settings, ...route.settings},
          auth
        };
      });
    }

    return [...routes];
  }

  /**
   * 가나다
   * @param configs 가나다
   * @returns {Array} 가나다
   */
  static generateRoutesFromConfigs(configs) {
    let allRoutes = [];
    configs.forEach((config) => {
      allRoutes = [
        ...allRoutes,
        ...this.setRoutes(config)
      ]
    });
    return allRoutes;
  }

}

export default LcmHelpers;

