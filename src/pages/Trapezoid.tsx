import React, { useState } from 'react';
import { styled } from '@mui/system';
import { TextField, Button, Typography, Container } from '@mui/material';

import * as math from 'mathjs';
const FormContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10rem;
  margin-bottom: 24px;
`;

const ResultContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  align-items: center;
  widht: 100%;
  gap: 8px;
`;

const Trapezoid: React.FC = () => {
  const [expression, setExpression] = useState('');
  const [resultTrapezoid, setResultTrapezoid] = useState('');
  const [resultSimpson, setResultSimpson] = useState('');
  const [a, setA] = useState('');
  const [b, setB] = useState('');
  const [n, setN] = useState('');

  const deltaX = (x1: number, x2: number, n1: number) => {
    return (x2 - x1) / n1;
  };

  const trapezoidCalc = (a: number, b: number, n: number, expression: string) => {
    try {
      math.evaluate(expression.replace('x', '0')); // Check if the expression is valid
    } catch (error) {
      setResultTrapezoid('Error: f(x) is not valid. Numerical method cannot be used.');
      return;
    }

    const fn = math.parse(expression).compile();
    let sum = 0;
    let delta = deltaX(a, b, n);
    let xi;
    let undefinedPoint: number | null = null;

    for (let i = 0; i <= n; i++) {
      xi = a + i * delta;
      try {
        const fi = fn.evaluate({ x: xi });
        if (!Number.isFinite(fi) || Number.isNaN(fi)) {
          undefinedPoint = xi;
          break;
        }
        if (i > 0 && i < n) {
          sum += fi;
        }
      } catch (error) {
        setResultTrapezoid('Error: Invalid mathematical expression');
        return;
      }
    }

    if (undefinedPoint !== null) {
      setResultTrapezoid(`Error: f(x) is not defined at x = ${undefinedPoint}. Numerical method cannot be used.`);
    } else {
      let result = (delta * (fn.evaluate({ x: a }) + fn.evaluate({ x: b })) / 2) + (delta * sum);
      setResultTrapezoid(result.toString());
    }
  };

  const simpsonCalc = (a: number, b: number, n: number, expression: string) => {
    try {
      math.evaluate(expression.replace('x', '0')); // Check if the expression is valid
    } catch (error) {
      setResultSimpson('Error: f(x) is not valid. Numerical method cannot be used.');
      return;
    }

    const fn = math.parse(expression).compile();
    let sum1 = 0;
    let sum2 = 0;
    let delta = deltaX(a, b, n);
    let xi;
    let undefinedPoint: number | null = null;

    for (let i = 0; i <= n; i++) {
      xi = a + i * delta;
      try {
        const fi = fn.evaluate({ x: xi });
        if (!Number.isFinite(fi) || Number.isNaN(fi)) {
          undefinedPoint = xi;
          break;
        }
        if (i > 0 && i < n) {
          if (i % 2 === 0) {
            sum2 += fi;
          } else {
            sum1 += fi;
          }
        }
      } catch (error) {
        setResultSimpson('Error: Invalid mathematical expression');
        return;
      }
    }

    if (undefinedPoint !== null) {
      setResultSimpson(`Error: f(x) is not defined at x = ${undefinedPoint}. Numerical method cannot be used.`);
    } else {
      let result = (delta / 3) * (fn.evaluate({ x: a }) + fn.evaluate({ x: b }) + 4 * sum1 + 2 * sum2);
      setResultSimpson(result.toString());
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setResultTrapezoid('');
    setResultSimpson('');
    trapezoidCalc(parseFloat(a), parseFloat(b), parseInt(n), expression);
    simpsonCalc(parseFloat(a), parseFloat(b), parseInt(n), expression);
  };

  return (
    <Container maxWidth="sm">
      <FormContainer>
        <Typography variant="h6">Numerical Integration</Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="a"
            type="text"
            value={a}
            onChange={(e) => setA(e.target.value)}
          />
          <TextField
            label="b"
            type="text"
            value={b}
            onChange={(e) => setB(e.target.value)}
          />
          <TextField
            label="n"
            type="text"
            value={n}
            onChange={(e) => setN(e.target.value)}
          />
          <TextField
            label="f(x)"
            type="text"
            value={expression}
            onChange={(e) => setExpression(e.target.value)}
          />
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </form>
      </FormContainer>
      <ResultContainer>
        {resultTrapezoid && <Typography>Trapezoidal Method Result: {resultTrapezoid}</Typography>}
        {resultSimpson && <Typography>Simpson's Method Result: {resultSimpson}</Typography>}
      </ResultContainer>
    </Container>
  );
};

export default Trapezoid;
