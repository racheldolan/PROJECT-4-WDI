import React from 'react';

const Base64 = ({ name, handleChange }) => {

  const fileReader = new FileReader();

  fileReader.onload = function() {
    const image = this.result.replace(/^data:image\/.+;base64,/, '');
    handleChange({
      target: { name: name, value: image }
    });
  };

  function readFile(e) {
    fileReader.readAsDataURL(e.target.files[0]);
  }

  return (
    <input type="file" accept="image/*" onChange={readFile} />
  );
};

export default Base64;
