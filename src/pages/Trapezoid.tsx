import React, { useState } from 'react';
import { Container, Box, Paper, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import * as math from 'mathjs';

const Trapezoid: React.FC = () => {
  const [expression, setExpression] = useState('');
  const [result, setResult] = useState('');
  const [a, setA] = useState('');
  const [b, setB] = useState('');
  const [n, setN] = useState('');

  const deltaX = (x1: number, x2: number, n1: number) => {
    return (x1 - x2) / n1;
  };
  const trapezoidCalc = (a: number, b: number, n: number, expression: string) => {
    const denominatorFn = math.parse(expression).compile();
    let sum = 0;
    let delta = deltaX(b, a, n);
    let fi, xi;
  
    for (let i = 1; i < n; i++) {
      xi = a + i * delta;
      fi = math.evaluate(expression.replace('x', String(xi)));
  
      if (!Number.isFinite(denominatorFn.evaluate({ x: xi }))) {
        setResult('Error: Denominator function is divergent');
        return;
      }
  
      sum += fi;
    }
  
    if (!Number.isFinite(denominatorFn.evaluate({ x: a })) || !Number.isFinite(denominatorFn.evaluate({ x: b }))) {
      setResult('Error: Denominator function is divergent');
      return;
    }
  
    let result = (delta * (math.evaluate(expression.replace('x', a.toString())) + math.evaluate(expression.replace('x', b.toString()))) / 2) + (delta * sum);
    setResult(result.toString());
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    trapezoidCalc(parseFloat(a), parseFloat(b), parseInt(n), expression);
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

export default Trapezoid;
