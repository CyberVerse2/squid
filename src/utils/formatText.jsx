const FormattedText = ({ text }) => {
  return (
    <pre
      className={' text-sm font-inter'}
      style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}
    >
      {text}
    </pre>
  );
};

export default FormattedText;
