const random = (max, min = 0, f = true) =>
  f ? Math.floor(Math.random() * (max - min) + min) : Math.random() * max;

const coords = (number, arr = []) => {
  const frags = 360 / number;
  for (let i = 0; i <= number; i++) arr.push((frags / 180) * i * Math.PI);
  return arr;
};

const update = () => {
  let s = "";
  for (let i = 1; i <= rings.valueAsNumber; i++) {
    const r = spread.valueAsNumber * i;
    const theta = coords(dots.valueAsNumber * i);
    for (let j = 0; j < theta.length; j++) {
      s += `<li style="--_d:${theta[j]};--_r:${r}px;--_bgc:hsl(${random(
        50,
        25
      )},${random(90, 50)}%,${random(90, 60)}%)"></li>`;
    }
  }
  app.innerHTML = s;
};
controls.addEventListener("input", () => update());
controls.dispatchEvent(new Event("input"));
