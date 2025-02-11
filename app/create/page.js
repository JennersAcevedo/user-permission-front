"use client";
import styles from "@/styles/create.module.css";
import Navbar from "@/components/navbar/navbar";
import Title from "@/components/titles/titles";
import HomeCard from "@/components/card/card";
import {useState } from "react";
import axios from "axios";

export default function Home() {
  
  const [permissionData, setPermissionData] = useState([]); 
  const [formData, setFormData] = useState({
    nombreEmpleado: "",
    apellidoEmpleado: "",
    tipoPermisoId: 1,
    fechaPermiso: "",
  });
  let tiposPermiso = ["permiso 1", "permiso 2"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "tipoPermisoId" ? parseInt(value) + 1 : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        console.log(formData)
      const response = await axios.post("http://localhost:5234/api/Permiso", formData);
      console.log("Registro exitoso:", response.data);
  
      setPermissionData([...permissionData, response.data]); 
      setFormData({ nombreEmpleado: "", apellidoEmpleado: "", tipoPermisoId: 1, fechaPermiso: "" }); 
    } catch (error) {
      console.error("Error al registrar permiso:", error);
    }
  };

  return (
    <div className={styles.page}>
      <Navbar />
      <div className={styles.division}></div>
      <main className={styles.main}>
        <div className={styles.division}></div>
        <Title title="Create Permission" />

        {/* Formulario */}
        <form className={styles.formContainer} onSubmit={handleSubmit}>
          <input
            type="text"
            name="nombreEmpleado"
            placeholder="Nombre del empleado"
            value={formData.nombreEmpleado}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="apellidoEmpleado"
            placeholder="Apellido del empleado"
            value={formData.apellidoEmpleado}
            onChange={handleChange}
            required
          />
           <select
                  name="tipoPermisoId"
                  value={formData.tipoPermiso-1}
                  onChange={handleChange}
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
            value={formData.fechaPermiso}
            onChange={handleChange}
            required
          />
          <button type="submit">Registrar Permiso</button>
        </form>

        <div className={styles.services}>
          {
            permissionData.map((permiso, index) => (
              <HomeCard
                key={index}
                id={permiso.id}
                name={permiso.nombreEmpleado}
                lastName={permiso.apellidoEmpleado}
                type={permiso.tipoPermiso}
                date={permiso.fechaPermiso}
              />
            ))
           } 
        </div>
      </main>
    </div>
  );
}
