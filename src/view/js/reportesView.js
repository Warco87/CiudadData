const reportesContainer = document.getElementById("reportes-container");
const btnAgregar = document.getElementById("btn-agregar");
const formAgregar = document.getElementById("form-agregar");
const reportForm = document.getElementById("reportForm");

// 1. Mostrar todos los reportes al cargar la página
async function cargarReportes() {
    try {
    const res = await fetch("http://localhost:3000/api/informes"); // Ajusta la ruta según tu backend
    const data = await res.json();

    reportesContainer.innerHTML = ""; // limpiar antes de renderizar

    data.forEach(report => {
        const div = document.createElement("div");
        div.classList.add("reporte-item");
        div.innerHTML = `
        <h3>${report.title}</h3>
        <p>${report.description}</p>
        <small>Usuario: ${report.userEmail}</small>
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

reportForm.addEventListener("submit", async (event) => {
      event.preventDefault();

      const title = document.getElementById("title").value;
      const description = document.getElementById("description").value;
      const userEmail = document.getElementById("userEmail").value;

      try {
        const res = await fetch("http://localhost:3000/api/:userId/informes", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ title, description, userEmail })
        });

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