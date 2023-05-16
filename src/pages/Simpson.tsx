import React, { useState } from 'react';
import * as math from 'mathjs';

interface Simpson {}

const Simpson: React.FC<Simpson> = () => {
  const [expression, setExpression] = useState('');
  const [result, setResult] = useState('');

  const SimpsonIntegration: React.FC = () => {
    const [a, setA] = useState('');
    const [b, setB] = useState('');
    const [n, setN] = useState('');
    const [result, setResult] = useState('');

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const result = math.evaluate(`simpson(${a}, ${b}, ${n}, x)`, { x: 1 });
      setResult(result);
    };

    return (
      <div>
        <form onSubmit={handleSubmit}>
          <label>
            a:
            <input
              type="text"
              value={a}
              onChange={(e) => setA(e.target.value)}
            />
          </label>
          <label>
            b:
            <input
              type="text"
              value={b}
              onChange={(e) => setB(e.target.value)}
            />
          </label>
          <label>
            n:
            <input
              type="text"
              value={n}
              onChange={(e) => setN(e.target.value)}
            />
          
          </label>
          <label>
            f(x)
            <input
              type="text"
              value={expression}
              onChange={(e) => setExpression(e.target.value)}
            />
          </label>

          <input type="submit" value="Submit" />
        </form>
        <p>Result: {result}</p>
      </div>
    );
  };

  return (
    <div>
      <SimpsonIntegration />
    </div>
  );
};

export default Simpson;
