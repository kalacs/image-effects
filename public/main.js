async function init() {
  let rustApp = null;

  try {
    await import("../pkg").then((module) => {
      console.log(module);
      rustApp = module;
    });
  } catch (error) {
    console.error(error);
    return;
  }

  const input = document.getElementById("upload");
  const fileReader = new FileReader();

  fileReader.onloadend = () => {
    let base64 = fileReader.result.replace(
      /^data:image\/(png|jpeg|jpg);base64,/,
      ""
    );
    let newImg = rustApp.grayscale(base64);
    document.getElementById("new-img").setAttribute("src", newImg);
  };

  input.addEventListener("change", () => {
    const [file] = input.files;

    if (!file) {
      return;
    }

    fileReader.readAsDataURL(file);
  });
}

init();
