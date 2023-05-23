import React, { useState } from 'react';
import { Container, Typography, TextField, Button } from '@mui/material';
import { parse, evaluate } from 'mathjs';

const Trapezoid: React.FC = () => {
  const [a, setA] = useState<string>('');
  const [b, setB] = useState<string>('');
  const [n, setN] = useState<string>('');
  const [expression, setExpression] = useState<string>('');
  const [resultTrapezoid, setResultTrapezoid] = useState<string>('');
  const [resultSimpson, setResultSimpson] = useState<string>('');

  const deltaX = (a: number, b: number, n: number) => (b - a) / n;

  const trapezoidCalc = (a: number, b: number, n: number, expression: string) => {
    let fExpression = expression;
    let gExpression = '';

    const divideIndex = expression.indexOf('/');
    if (divideIndex !== -1) {
      fExpression = expression.substring(0, divideIndex).trim();
      gExpression = expression.substring(divideIndex + 1).trim();
    }

    try {
      evaluate(fExpression.replace('x', '0')); // Check if the f(x) expression is valid
    } catch (error) {
      setResultTrapezoid('Error: f(x) is not a valid mathematical expression. Numerical method cannot be used.');
      return;
    }

    if (gExpression) {
      try {
        evaluate(gExpression.replace('x', '0')); // Check if the g(x) expression is valid
      } catch (error) {
        setResultTrapezoid('Error: g(x) is not a valid mathematical expression. Numerical method cannot be used.');
        return;
      }
    }

    const fFn = parse(fExpression).compile();
    const gFn = gExpression ? parse(gExpression).compile() : null;

    let sum = 0;
    let delta = deltaX(a, b, n);
    let xi;
    let undefinedPoint: number | null = null;

    for (let i = 1; i < n; i++) {
      xi = a + i * delta;
      try {
        const fi = fFn.evaluate({ x: xi });
        const gi = gFn ? gFn.evaluate({ x: xi }) : 1;

        if (!Number.isFinite(fi) || Number.isNaN(fi) || !Number.isFinite(gi) || Number.isNaN(gi) || gi === 0 || gi === Infinity) {
          undefinedPoint = xi;
          break;
        }

        sum += fi / gi;
      } catch (error) {
        setResultTrapezoid('Error: Invalid mathematical expression');
        return;
      }
    }

    if (undefinedPoint !== null) {
      setResultTrapezoid(`Error: g(x) is not defined or equals to 0  at x = ${undefinedPoint}. Numerical method cannot be used.`);
    } else {
      let result = (delta * (fFn.evaluate({ x: a }) / (gFn ? gFn.evaluate({ x: a }) : 1) + fFn.evaluate({ x: b }) / (gFn ? gFn.evaluate({ x: b }) : 1))) / 2 + (delta * sum);
      setResultTrapezoid(result.toString());
    }
  };

  const simpsonCalc = (a: number, b: number, n: number, expression: string) => {
    let fExpression = expression;
    let gExpression = '';

    const divideIndex = expression.indexOf('/');
    if (divideIndex !== -1) {
      fExpression = expression.substring(0, divideIndex).trim();
      gExpression = expression.substring(divideIndex + 1).trim();
    }

    try {
      evaluate(fExpression.replace('x', '0')); // Check if the f(x) expression is valid
    } catch (error) {
      setResultSimpson('Error: f(x) is not a valid mathematical expression. Numerical method cannot be used.');
      return;
    }

    if (gExpression) {
      try {
        evaluate(gExpression.replace('x', '0')); // Check if the g(x) expression is valid
      } catch (error) {
        setResultSimpson('Error: g(x) is not a valid mathematical expression. Numerical method cannot be used.');
        return;
      }
    }

    const fFn = parse(fExpression).compile();
    const gFn = gExpression ? parse(gExpression).compile() : null;

    let sum1 = 0;
    let sum2 = 0;
    let delta = deltaX(a, b, n);
    let xi;
    let undefinedPoint: number | null = null;

    for (let i = 1; i < n; i++) {
      xi = a + i * delta;
      try {
        const fi = fFn.evaluate({ x: xi });
        const gi = gFn ? gFn.evaluate({ x: xi }) : 1;

        if (!Number.isFinite(fi) || Number.isNaN(fi) || !Number.isFinite(gi) || Number.isNaN(gi) || gi === 0 || gi === Infinity) {
          undefinedPoint = xi;
          break;
        }

        if (i % 2 === 0) {
          sum2 += fi / gi;
        } else {
          sum1 += fi / gi;
        }
      } catch (error) {
        setResultSimpson('Error: Invalid mathematical expression');
        return;
      }
    }

    if (undefinedPoint !== null) {
      setResultSimpson(`Error: g(x) is not defined or equals to 0  at x = ${undefinedPoint}. Numerical method cannot be used.`);
    } else {
      let result = (delta / 3) * (fFn.evaluate({ x: a }) / (gFn ? gFn.evaluate({ x: a }) : 1) + fFn.evaluate({ x: b }) / (gFn ? gFn.evaluate({ x: b }) : 1)) + (4 * sum1 + 2 * sum2);
      setResultSimpson(result.toString());
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!a || !b || !n || !expression) {
      setResultTrapezoid('Please fill in all the required fields.');
      setResultSimpson('');
      return;
    }

    const parsedA = parseFloat(a);
    const parsedB = parseFloat(b);
    const parsedN = parseInt(n);

    if (isNaN(parsedA) || isNaN(parsedB) || isNaN(parsedN)) {
      setResultTrapezoid('Invalid input. Please enter numerical values.');
      setResultSimpson('');
      return;
    }

    trapezoidCalc(parsedA, parsedB, parsedN, expression);
    simpsonCalc(parsedA, parsedB, parsedN, expression);
  };

  const predefined = () => {
    setA('-2');
    setB('2');
    setN('100');
    setExpression('1/tanh(x)');
    setResultTrapezoid('');
    setResultSimpson('');
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" align="center" gutterBottom>
        Trapezoid and Simpson's Rule Calculator
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Lower Bound (a)"
          variant="outlined"
          fullWidth
          margin="normal"
          value={a}
          onChange={(e) => setA(e.target.value)}
        />
        <TextField
          label="Upper Bound (b)"
          variant="outlined"
          fullWidth
          margin="normal"
          value={b}
          onChange={(e) => setB(e.target.value)}
        />
        <TextField
          label="Subintervals (n)"
          variant="outlined"
          fullWidth
          margin="normal"
          value={n}
          onChange={(e) => setN(e.target.value)}
        />
        <TextField
          label="Expression (f(x) / g(x))"
          variant="outlined"
          fullWidth
          margin="normal"
          value={expression}
          onChange={(e) => setExpression(e.target.value)}
        />
        <Button type="submit" variant="contained" color="primary">
          Calculate
        </Button>
        <Button variant="outlined" onClick={predefined} style={{ marginLeft: '10px' }}>
          Use Predefined Values
        </Button>
      </form>
      <Typography variant="h6" align="center" gutterBottom>
        Trapezoid Rule Result: {resultTrapezoid}
      </Typography>
      <Typography variant="h6" align="center" gutterBottom>
        Simpson's Rule Result: {resultSimpson}
      </Typography>
    </Container>
  );
};

export default Trapezoid;
