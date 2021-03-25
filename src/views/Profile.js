import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import ProfilePicture from "../media/images/profile_picture.jpg";
import http from "../helpers/http";
const useStyles = makeStyles(() => ({
  profileSection: {
    height: "90vh",
  },
  imageContainer: {
    width: "20%",
  },
}));
/**
 * Profile se encargá de mantener lo que es la imagen del perfil
 * y el nombre del candidato
 */
export default function Profile({ setMarket }) {
  const classes = useStyles();
  const [candidate, setCandidate] = useState("");
  const [appVersion, setAppVersion] = useState("");
  function goToMarket() {
    setMarket(true);
  }
  useEffect(() => {
    const getData = async () => {
      const { data } = await http("/visitor", { method: "post" });
      setCandidate(data.welcome);
      setAppVersion(data.version);
    };
    getData();
    return;
  }, []);
  return (
    <section
      className={`${classes.profileSection} d-flex justify-content-center align-items-center`}
    >
      <div className={classes.imageContainer}>
        <img
          src={ProfilePicture}
          alt="Imagen de perfil de Yahir Axel Garcia Keymurth"
          style={{ width: "100%", borderRadius: 100 }}
        />
        <div style={{ marginTop: 20, textAlign: "center" }}>
          <span style={{ fontSize: 25, color: "#5e5e5e" }}>{candidate}</span>
        </div>
        <div>
          <button className="btn btn-info btn-block" onClick={goToMarket}>
            Continuar
          </button>
        </div>
        <div style={{ marginTop: 20, textAlign: "center" }}>
          <span style={{ fontSize: 10, color: "#5e5e5e" }}>{appVersion}</span>
        </div>
      </div>
      <div></div>
    </section>
  );
}
