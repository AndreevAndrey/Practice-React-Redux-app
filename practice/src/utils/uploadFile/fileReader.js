const uploadFile = file => {
  const reader = new FileReader();
  return new Promise((resolve, reject) => {
    reader.onloadend = () => {
      resolve(reader.result);
    };
    reader.readAsDataURL(file);
    reader.onerror = () => {
      reader.abort();
      reject(new Error('Loading error'));
    };
  });
};

export default uploadFile;
