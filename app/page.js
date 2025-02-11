"use client";
import styles from "./page.module.css";
import Navbar from "@/components/navbar/navbar";
import Title from "@/components/titles/titles";
import HomeCard from "@/components/card/card";
import { useEffect, useState } from "react";
import axios from "axios"; 

export default function Home() {
  const [permissionData, setPermissionData] = useState([]); 

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

  return (
    <div className={styles.page}>
      <Navbar />
      <div className={styles.division}></div>
      <main className={styles.main}>
        <div className={styles.division}></div>
        <Title title="Get Permission" />
        <div className={styles.permissions}>
        {permissionData.length > 0 ? (
            permissionData.map((permiso, index) => (
              <HomeCard
                key={index}
                id={permiso.id}
                name={permiso.nombreEmpleado}
                lastName={permiso.apellidoEmpleado}
                type= {permiso.tipoPermiso}
                date= { permiso.fechaPermiso}

                
              />
            ))
          ) : (
            <p>Cargando información...</p>
          )}
        </div>
      </main>
    </div>
  );
}