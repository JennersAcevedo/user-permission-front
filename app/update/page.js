"use client";
import styles from "@/styles/update.module.css";
import Navbar from "@/components/navbar/navbar";
import Title from "@/components/titles/titles";
import HomeCard from "@/components/card/card";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Update() {
  const [permissionData, setPermissionData] = useState([]);
  const [selectedPermission, setSelectedPermission] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  let tiposPermiso = ["permiso 1", "permiso 2"];
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("http://localhost:5234/api/Permiso");
        if (Array.isArray(response.data)) {
          setPermissionData(response.data);
        } else {
          console.error("La API no devolvió un array.");
        }
      } catch (error) {
        console.error("Error fetching permission data:", error);
      }
    }
    fetchData();
  }, []);

  const handleCardClick = (permiso) => {
    setModalOpen(true);
    setSelectedPermission(permiso);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedPermission((prev) => ({
      ...prev,
      [name]: name === "tipoPermiso" ? parseInt(value) + 1 : value,
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:5234/api/Permiso/${selectedPermission.id}`,
        selectedPermission
      );
      setModalOpen(false);
      setPermissionData((prev) =>
        prev.map((permiso) =>
          permiso.id === selectedPermission.id ? selectedPermission : permiso
        )
      );
    } catch (error) {
      console.error("Error updating permission:", error);
    }
  };

  return (
    <div className={styles.page}>
      <Navbar />
      <div className={styles.division}></div>
      <main className={styles.main}>
        <div className={styles.division}></div>
        <Title title="Update Permission" />
        <div className={styles.services}>
          {permissionData.length > 0 ? (
            permissionData.map((permiso) => (
              <HomeCard
                key={permiso.id}
                id={permiso.id}
                name={permiso.nombreEmpleado}
                lastName={permiso.apellidoEmpleado}
                type={permiso.tipoPermiso}
                date={permiso.fechaPermiso}
                onClick={() => handleCardClick(permiso)}
              />
            ))
          ) : (
            <p>Cargando información...</p>
          )}
        </div>

        {modalOpen && selectedPermission && (
          <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
              <h2>Actualizar Permiso</h2>
              <form onSubmit={handleUpdate}>
                <input
                  type="text"
                  name="nombreEmpleado"
                  value={selectedPermission.nombreEmpleado}
                  onChange={handleInputChange}
                  placeholder="Nombre"
                />
                <input
                  type="text"
                  name="apellidoEmpleado"
                  value={selectedPermission.apellidoEmpleado}
                  onChange={handleInputChange}
                  placeholder="Apellido"
                />
                <select
                  name="tipoPermiso"
                  value={selectedPermission.tipoPermiso-1}
                  onChange={handleInputChange}
                >
                  {tiposPermiso.map((tipo, index) => (
                    <option key={index} value={index}>
                      {tipo}
                    </option>
                  ))}
                </select>
                <input
                  type="date"
                  name="fechaPermiso"
                  value={selectedPermission.fechaPermiso}
                  onChange={handleInputChange}
                />
                <button type="submit">Actualizar</button>
                <button type="button" onClick={() => setModalOpen(false)}>
                  Cerrar
                </button>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
