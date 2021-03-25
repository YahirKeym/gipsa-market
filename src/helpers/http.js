import axios from "axios";
/**
 * http se encargá de manejar las peticiones a nuestra api
 * @param {string} dir Es la dirección a la api donde apuntaremos
 * @param {object} options Son las opciones comunes de un fetch para nuestra petición
 * @returns Regresa los datos de nuestra petición
 */
export default function http(dir, options) {
  return new Promise((resolve, reject) => {
    if (options && options.body) {
      options.data = options.body;
      delete options.body;
      options.method = options.method.toLowerCase();
    }
    if (!options) {
      options = {};
      options.method = "get";
    }
    axios({
      url: `https://node-red-nxdup.mybluemix.net${dir}`,
      ...options,
    })
      .then((result) => {
        resolve(result.data);
      })
      .catch((err) => reject(err));
  });
}
