import React from 'react';

const Base64 = ({ name, handleChange }) => {

  const fileReader = new FileReader();

  fileReader.onload = function() {
    handleChange({
      target: { name: name, value: this.result }
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
