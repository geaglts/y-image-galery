export const base64Services = {
  fileToBase64(file) {
    return new Promise((res, rej) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => res(reader.result);
      reader.onerror = () => rej(new Error("No fue posible leer su archivo"));
    });
  },
};
