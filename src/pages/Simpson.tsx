import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import { styled } from '@mui/system';
import * as math from 'mathjs';

const Simpson: React.FC = () => {
  const [expression, setExpression] = useState('');
  const [result, setResult] = useState('');
  const [a, setA] = useState('');
  const [b, setB] = useState('');
  const [n, setN] = useState('');

  const deltaX = (x1: number, x2: number, n1: number) => {
    return (x1 - x2) / n1;
  };

  const isFunctionUndefined = (x: number, expression: string) => {
    try {
      const value = math.evaluate(expression, { x });
      return !Number.isFinite(value) || Number.isNaN(value) || Math.abs(x % (Math.PI / 2)) < 1e-6;
    } catch (error) {
      return true;
    }
  };

  const simpsonCalc = (a: number, b: number, n: number, expression: string) => {
    const delta = deltaX(b, a, n);
    const interval = [a, b];
    const divergentIntervals = [];

    if (isFunctionUndefined(a, expression)) {
      divergentIntervals.push(`[${a}, ${a + delta}]`);
    }

    let sum1 = 0;
    let sum2 = 0;

    for (let i = 1; i < n; i++) {
      const xi = a + i * delta;

      if (isFunctionUndefined(xi, expression)) {
        divergentIntervals.push(`[${xi - delta}, ${xi}]`);
      }

      if (i % 2 === 0) {
        sum2 += math.evaluate(expression, { x: xi });
      } else {
        sum1 += math.evaluate(expression, { x: xi });
      }
    }

    if (isFunctionUndefined(b, expression)) {
      divergentIntervals.push(`[${b - delta}, ${b}]`);
    }

    if (divergentIntervals.length > 0) {
      setResult(`Error: Function is undefined in the following interval(s): ${divergentIntervals.join(', ')}`);
      return;
    }

    const result = (delta / 3) * (math.evaluate(expression, { x: a }) + math.evaluate(expression, { x: b }) + 2 * sum2 + 4 * sum1);
    setResult(result.toString());
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    simpsonCalc(parseFloat(a), parseFloat(b), parseInt(n), expression);
  };

  const FormContainer = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    maxWidth: '300px',
    margin: '0 auto',
  });

  const SubmitButton = styled(Button)({
    backgroundColor: '#2196f3',
    color: '#fff',
    '&:hover': {
      backgroundColor: '#1976d2',
    },
  });

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          a:
          <input type="text" value={a} onChange={(e) => setA(e.target.value)} />
        </label>
        <label>
          b:
          <input type="text" value={b} onChange={(e) => setB(e.target.value)} />
        </label>
        <label>
          n:
          <input type="text" value={n} onChange={(e) => setN(e.target.value)} />
        </label>
        <label>
          f(x)
          <input type="text" value={expression} onChange={(e) => setExpression(e.target.value)} />
        </label>
        <input type="submit" value="Submit" />
      </form>
      <p>Result: {result}</p>
    </div>
  );
};

export default Simpson;
