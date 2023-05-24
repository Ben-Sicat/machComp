import React, { useState } from 'react';
import { Container, Typography, TextField, Button } from '@mui/material';
import { parse } from 'mathjs';

const Trapezoid: React.FC = () => {
  const [values, setValues] = useState({
    a: '-1',
    b: '1',
    n: '100',
    expression: '1/cos(x)',
  });
  const [resultTrapezoid, setResultTrapezoid] = useState<string | undefined>('');
  const [resultSimpson, setResultSimpson] = useState<string | undefined>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues((prevValues) => ({
      ...prevValues,
      [e.target.name]: e.target.value,
    }));
  };

  const calculate = () => {
    const { a, b, n, expression } = values;

    if (!a || !b || !n || !expression) {
      setResultTrapezoid('Please fill in all the required fields.');
      setResultSimpson('Please fill in all the required fields.');
      return;
    }

    const parsedA = parseFloat(a);
    const parsedB = parseFloat(b);
    const parsedN = parseInt(n);

    if (isNaN(parsedA) || isNaN(parsedB) || isNaN(parsedN)) {
      setResultTrapezoid('Invalid input. Please enter numerical values.');
      setResultSimpson('Invalid input. Please enter numerical values.');
      return;
    }

    const delta = (parsedB - parsedA) / parsedN;
    const slashIndex = expression.indexOf('/');
    const fExpression = expression.substring(0, slashIndex).trim();
    const gExpression = expression.substring(slashIndex + 1).trim();
    const fFn = parse(fExpression).compile();
    const gFn = gExpression ? parse(gExpression).compile() : null;

    if (gFn) {
      const divergentPoint = findDivergentPoint(parsedA, parsedB, gFn);

      if (divergentPoint !== null) {
        setResultTrapezoid(`Math error. Function is not integrable. Root of the denominator exists at ${divergentPoint}.`);
        setResultSimpson(`Math error. Function is not integrable. Root of the denominator exists at ${divergentPoint}.`);
        return;
      }
    }

    let sumTrapezoid = 0;
    let sumSimpson = 0;

    for (let i = 1; i < parsedN; i++) {
      const xi = parsedA + i * delta;

      try {
        const fi = fFn.evaluate({ x: xi });
        const gi = gFn ? gFn.evaluate({ x: xi }) : 1;

        if (!Number.isFinite(fi) || Number.isNaN(fi) || !Number.isFinite(gi) || Number.isNaN(gi) || gi === 0 || gi === Infinity) {
          setResultTrapezoid('Math error. Integral is divergent.');
          setResultSimpson('Math error. Integral is divergent.');
          return;
        }

        sumTrapezoid += fi / gi;

        if (i % 2 === 0) {
          sumSimpson += 2 * (fi / gi);
        } else {
          sumSimpson += 4 * (fi / gi);
        }
      } catch (error) {
        setResultTrapezoid('Error: Invalid mathematical expression');
        setResultSimpson('Error: Invalid mathematical expression');
        return;
      }
    }

    const trapezoidResult = (delta / 2) * (fFn.evaluate({ x: parsedA }) / (gFn ? gFn.evaluate({ x: parsedA }) : 1) + fFn.evaluate({ x: parsedB }) / (gFn ? gFn.evaluate({ x: parsedB }) : 1)) + (delta * sumTrapezoid);
    setResultTrapezoid(trapezoidResult.toFixed(15));

    const simpsonResult = (delta / 3) * (fFn.evaluate({ x: parsedA }) / (gFn ? gFn.evaluate({ x: parsedA }) : 1) + fFn.evaluate({ x: parsedB }) / (gFn ? gFn.evaluate({ x: parsedB }) : 1) + sumSimpson);
    setResultSimpson(simpsonResult.toFixed(15));
  };

  const findDivergentPoint = (a: number, b: number, gFn: any): number | null => {
    const epsilon = 1e-15;
    let left = a;
    let right = b;

    while (right - left > epsilon) {
      const mid = (left + right) / 2;
      const gMid = gFn.evaluate({ x: mid });

      if (Math.abs(gMid) < epsilon) {
        return mid;
      }

      if (gMid > 0) {
        right = mid;
      } else {
        left = mid;
      }
    }

    return null;
  };

  const predefined = () => {
    setValues({
      a: '-2',
      b: '2',
      n: '100',
      expression: '1/cos(x)',
    });
    setResultTrapezoid(undefined);
    setResultSimpson(undefined);
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" align="center" gutterBottom>
        Trapezoid and Simpson's Rule Calculator
      </Typography>
      <form onSubmit={(e) => { e.preventDefault(); calculate(); }}>
        <TextField
          label="Lower Bound (a)"
          variant="outlined"
          fullWidth
          margin="normal"
          name="a"
          value={values.a}
          onChange={handleChange}
        />
        <TextField
          label="Upper Bound (b)"
          variant="outlined"
          fullWidth
          margin="normal"
          name="b"
          value={values.b}
          onChange={handleChange}
        />
        <TextField
          label="Subintervals (n)"
          variant="outlined"
          fullWidth
          margin="normal"
          name="n"
          value={values.n}
          onChange={handleChange}
        />
        <TextField
          label="Expression (f(x) / g(x))"
          variant="outlined"
          fullWidth
          margin="normal"
          name="expression"
          value={values.expression}
          onChange={handleChange}
        />
        <Button type="submit" variant="contained" color="primary">
          Calculate
        </Button>
        <Button variant="outlined" onClick={predefined} style={{ marginLeft: '10px' }}>
          Use Predefined Values
        </Button>
      </form>
      <Typography variant="h6" align="center" gutterBottom>
        Trapezoid Rule Result: {resultTrapezoid !== undefined ? resultTrapezoid : 'undefined'}
      </Typography>
      {resultSimpson !== undefined && (
        <Typography variant="h6" align="center" gutterBottom>
          Simpson's Rule Result: {resultSimpson}
        </Typography>
      )}
    </Container>
  );
};

export default Trapezoid;
