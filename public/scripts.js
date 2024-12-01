document.addEventListener("DOMContentLoaded", function () {
  const numOrbs = 80; // Number of orbs, adjust this to add more orbs
  const body = document.body;

  for (let i = 0; i < numOrbs; i++) {
    const orb = document.createElement("div");
    orb.classList.add("orb");
    orb.style.width = `${Math.random() * 15 + 30}px`; // Width of orbs
    orb.style.height = `${Math.random() * 15 + 30}px`; // Height of orbs
    orb.style.top = `${Math.random() * 100}vh`;
    orb.style.left = `${Math.random() * 100}vw`;

    // Generate random directions
    const translateX = `${(Math.random() - 0.5) * 200}vw`;
    const translateY = `${(Math.random() - 0.5) * 200}vh`;
    orb.style.setProperty("--translateX", translateX);
    orb.style.setProperty("--translateY", translateY);

    orb.style.animationDuration = `${Math.random() * 10 + 10}s`; // Speed of orbs
    orb.style.animationDelay = `${Math.random() * 10}s`;
    orb.style.animationName = "move";
    orb.style.animationIterationCount = "infinite";
    orb.style.animationTimingFunction = "linear";

    body.appendChild(orb);
  }
});

// function wrapNumbersWithSpan(selector) {
//   const elements = document.querySelectorAll(selector);
//   elements.forEach(element => {
//     element.innerHTML = element.innerHTML.replace(/(\d+)/g, '<span class="number">$1</span>');
//   });
// }

// document.addEventListener("DOMContentLoaded", function() {
//   wrapNumbersWithSpan('.weather-nums h4');
// });
