module.exports = (value) =>
  value && value.toString().length ? value.toString().trim() : null;
