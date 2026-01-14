document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("loginForm");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    // Capturar valores del formulario
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    try {
      // Petición al backend con los nombres correctos
      const response = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }) // 👈 ahora coincide con el controller
      });

      const data = await response.json();

      if (response.ok) {
        alert("✅ Login exitoso: " + data.message);

        // Guardar datos en localStorage si lo necesitas
        localStorage.setItem("email", email);
        localStorage.setItem("password", password);

        // Redirigir a otra página si quieres
        window.location.href = "./Reportes.html";
      } else {
        alert("❌ Error: " + data.error);
      }
    } catch (err) {
      console.error("Error en el login:", err);
      alert("Error de conexión con el servidor");
    }
  });
});