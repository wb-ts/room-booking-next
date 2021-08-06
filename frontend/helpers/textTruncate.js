const textTruncate = (text, textLength = 25, textReplace = "...") => {
  if (text.length <= textLength) return text;
  return text?.substr(0, textLength) + textReplace;
};

export default textTruncate;
