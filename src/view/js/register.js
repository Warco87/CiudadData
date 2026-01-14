document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("registerForm");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
      const response = await fetch("http://localhost:3000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password })
      });

      const data = await response.json();

      if (response.ok) {
        alert("Registro exitoso: " + data.message);
        window.location.href = "./Login.html";
      } else {
        alert(" Error: " + data.error);
      }
    } catch (err) {
      console.error("Error en el registro:", err);
      alert("Error de conexión con el servidor");
    }
  });
});