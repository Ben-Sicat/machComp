import React, { useState } from 'react';
// import { Container, Box, Paper, Button, Typography } from '@mui/material';
// import { useNavigate } from 'react-router-dom';
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
    let divergentIntervals = [];
  
    for (let i = 1; i < n; i++) {
      xi = a + i * delta;
      try {
        fi = math.evaluate(expression, { x: xi });
      } catch (error) {
        setResult('Error: Invalid mathematical expression');
        return;
      }
  
      const denominatorValue = denominatorFn.evaluate({ x: xi });
      if (!Number.isFinite(denominatorValue) || Number.isNaN(denominatorValue)) {
        divergentIntervals.push(`[${xi - delta}, ${xi}]`);
      }
  
      sum += fi;
    }
  
    const denominatorA = denominatorFn.evaluate({ x: a });
    if (!Number.isFinite(denominatorA) || Number.isNaN(denominatorA)) {
      divergentIntervals.push(`[${a}, ${a + delta}]`);
    }
  
    const denominatorB = denominatorFn.evaluate({ x: b });
    if (!Number.isFinite(denominatorB) || Number.isNaN(denominatorB)) {
      divergentIntervals.push(`[${b - delta}, ${b}]`);
    }
  
    if (divergentIntervals.length > 0) {
      setResult(`Error: Denominator function is divergent in the following interval(s): ${divergentIntervals.join(', ')}`);
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
