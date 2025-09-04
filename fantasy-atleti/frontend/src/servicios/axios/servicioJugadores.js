
import http from "./http-axios.js";

class ServicioJugadores {
  getAll() {
    return http.get("/jugadores");
  }
  get(id) {
    return http.get(`/jugadores/${id}`);
  }

  getPorPosicion(posicion) {
    let url = "/jugadores?"
    if (posicion) {
      url+=`posicion=${posicion}`
    }
    return http.get(url);
  }

  create(data) {
    return http.post("/jugadores", data);
  }

  update(id, data) {
    return http.put(`/jugadores/${id}`, data);
  }

  delete(id) {
    return http.delete(`/jugadores/${id}`);
  }

  login(usuario, pass) {
    // Esto era antes de cifrar la contraseña
    //return http.get(`/usuarios?nombre=${usuario}&pass=${pass}`);
    return http.get(`/usuarios?nombre=${usuario}`)
  }

  register(data) {
    return http.post("/usuarios", data);
  }

  getAlineaciones() {
    return http.get("/alineaciones");
  }

  crearAlineacion(data) {
    return http.post("/alineaciones", data);
  }
  deleteAlineacion(id) {
    return http.delete(`/alineaciones/${id}`);
  }

}

export default new ServicioJugadores();
