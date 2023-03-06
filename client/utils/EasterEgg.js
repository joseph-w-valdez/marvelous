export default function konamiCodeListener() {
  const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];
  const konamiCode = [];

  function handleKeyDown(event) {
    const { code } = event;
    konamiCode.push(code);
    if (konamiCode.length > konamiSequence.length) {
      konamiCode.shift();
    }
    if (JSON.stringify(konamiCode) === JSON.stringify(konamiSequence)) {
      console.log('Hey guys did you know that in terms of [REDACTED][REDACTED][REDACTED][REDACTED][REDACTED][REDACTED][REDACTED]');

    }
  }

  document.addEventListener('keydown', handleKeyDown);

  return function cleanup() {
    document.removeEventListener('keydown', handleKeyDown);
  };
}
