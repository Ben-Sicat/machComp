import React, { useState } from 'react';
import { Container, Box, Paper, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Simpson: React.FC = () => {
  const [expression, setExpression] = useState('');
  const [result, setResult] = useState('');
  const [a, setA] = useState('');
  const [b, setB] = useState('');
  const [n, setN] = useState('');

  const deltaX = (x1: number, x2: number, n1: number) => {
    return (x1 - x2) / n1;
  };

  const simpsonCalc = (a: number, b: number, n: number, expression: string) => {
    let sum1 = 0;
    let sum2 = 0;
    let delta = deltaX(b, a, n);
    let xi, fi;

    for (let i = 1; i < n; i++) {
      xi = a + i * delta;
      fi = eval(expression.replace('x', xi.toString())); 

      if (i % 2 === 0) {
        sum2 += fi;
      } else {
        sum1 += fi;
      }
    }

    let result = (delta / 3) * (eval(expression.replace('x', a.toString())) + eval(expression.replace('x', b.toString())) + 2 * sum2 + 4 * sum1);
    setResult(result.toString());
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    simpsonCalc(parseFloat(a), parseFloat(b), parseInt(n), expression);
  };

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
