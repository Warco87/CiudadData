const reportesContainer = document.getElementById("reportes-container");
const btnAgregar = document.getElementById("btn-agregar");
const formAgregar = document.getElementById("form-agregar");
const reportForm = document.getElementById("reportForm");

// 1. Mostrar todos los reportes al cargar la página
async function cargarReportes() {
  try {
    const res = await fetch("http://localhost:3000/api/informes");
    const data = await res.json();

    console.log("Datos recibidos:", data);

    reportesContainer.innerHTML = "";

    // Extraer el array correctamente según el formato del backend
    const informes = Array.isArray(data) ? data : data?.informes;

    if (!Array.isArray(informes)) {
      reportesContainer.innerHTML = "<p>Formato inesperado de datos</p>";
      return;
    }

    if (informes.length === 0) {
      reportesContainer.innerHTML = "<p>No hay reportes aún</p>";
      return;
    }

    informes.forEach(report => {
      const div = document.createElement("div");
      div.classList.add("reporte-item");
      div.innerHTML = `
        <h3>${report.title}</h3>
        <p>${report.description}</p>
        <small>Usuario: ${report.email || "N/A"}</small>
      `;
      reportesContainer.appendChild(div);
    });
  } catch (err) {
    console.error("Error cargando reportes:", err);
    reportesContainer.innerHTML = "<p>Error al cargar reportes</p>";
  }
}

// 2. Mostrar formulario al hacer clic en "Agregar Reporte"
btnAgregar.addEventListener("click", () => {
    formAgregar.style.display = formAgregar.style.display === "none" ? "block" : "none";
});

//agregar reporte
reportForm.addEventListener("submit", async (event) => {
      event.preventDefault();

      const title = document.getElementById("title").value;
      const description = document.getElementById("description").value;
      const email = localStorage.getItem("email");

      try {
        const res = await fetch("http://localhost:3000/api/addinformes", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ title, description, email })
        });
        console.log("ya salio del  back");

        const data = await res.json();

        if (res.ok) {
          alert("✅ Reporte agregado correctamente");
          reportForm.reset();
          formAgregar.style.display = "none";
          cargarReportes(); // refrescar lista
        } else {
          alert("❌ Error: " + data.error);
        }
      } catch (err) {
        console.error("Error al agregar reporte:", err);
        alert("Error de conexión con el servidor");
      }
    });
document.addEventListener("DOMContentLoaded", () => {
  cargarReportes();
});