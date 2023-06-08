let selectContainer = document.querySelector(".select-container");
  let select = document.querySelector(".select");
  let ipt = document.getElementById("input");
  let opns = document.querySelectorAll(".select-container .option");

  select.onclick = () => {
    selectContainer.classList.toggle("active");
  };

  opns.forEach((e) => {
    e.addEventListener("click", () => {
      ipt.value = e.innerText;
      selectContainer.classList.remove("active");
      opns.forEach((e) => {
        e.classList.remove("selected");
      });
      e.classList.add("selected");
    });
  });
