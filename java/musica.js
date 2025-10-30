
document.addEventListener("DOMContentLoaded", () => {
  const audio = document.getElementById("musica-fondo");

  // Recupera el tiempo anterior si existe
  const tiempoGuardado = localStorage.getItem("tiempoMusica");

  if (tiempoGuardado) {
    audio.currentTime = parseFloat(tiempoGuardado);
  }

  audio.volume = 0.6; // volumen moderado
  audio.play();

  // Guarda el tiempo de reproducción cada medio segundo
  setInterval(() => {
    localStorage.setItem("tiempoMusica", audio.currentTime);
  }, 500);

  // Si termina, reinicia y guarda el tiempo en 0
  audio.addEventListener("ended", () => {
    localStorage.setItem("tiempoMusica", 0);
    audio.play();
  });
});
