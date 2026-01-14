document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("loginForm");

    form.addEventListener("submit", async (event) => {
    event.preventDefault();
    
    const correo= document.getElementById("email").value;
    const clave= document.getElementById("password").value;

    try{
        const response = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ correo, clave })
      })

        const data = await response.json();
        if(response.ok){
            alert("login exitoso: " + data.message);
            localStorage.setItem("email", correo);
            console.log(correo);
            localStorage.setItem("clave", clave);
            console.log(clave);
        }
        else{
            alert(" Error: " + data.error);

        }

    }catch (err){
      console.error("Error en el login:", err);
      alert("Error de conexión con el servidor");
    }
    });
});