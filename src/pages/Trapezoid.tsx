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
  const [resultTrapezoid, setResultTrapezoid] = useState<string>('');
  const [resultSimpson, setResultSimpson] = useState<string>('');

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

    let sumTrapezoid = 0;
    let sumSimpson = 0;
    const delta = (parsedB - parsedA) / parsedN;
    const fExpression = expression.split('/')[0].trim();
    const gExpression = expression.split('/')[1]?.trim();
    const fFn = parse(fExpression).compile();
    const gFn = gExpression ? parse(gExpression).compile() : null;

    let undefinedPoint: number | null = null;

    for (let i = 1; i < parsedN; i++) {
      const xi = parsedA + i * delta;
      try {
        const fi = fFn.evaluate({ x: xi });
        const gi = gFn ? gFn.evaluate({ x: xi }) : 1;

        if (!Number.isFinite(fi) || Number.isNaN(fi) || !Number.isFinite(gi) || Number.isNaN(gi) || gi === 0 || gi === Infinity) {
          undefinedPoint = xi;
          break;
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

    if (undefinedPoint !== null) {
      setResultTrapezoid(`Error: g(x) is not defined or equals to 0 at x = ${undefinedPoint}. Numerical method cannot be used.`);
      setResultSimpson(`Error: g(x) is not defined or equals to 0 at x = ${undefinedPoint}. Numerical method cannot be used.`);
    } else {
      const trapezoidResult = (delta / 2) * (fFn.evaluate({ x: parsedA }) / (gFn ? gFn.evaluate({ x: parsedA }) : 1) + fFn.evaluate({ x: parsedB }) / (gFn ? gFn.evaluate({ x: parsedB }) : 1)) + (delta * sumTrapezoid);
      setResultTrapezoid(trapezoidResult.toString());

      const simpsonResult = (delta / 3) * (fFn.evaluate({ x: parsedA }) / (gFn ? gFn.evaluate({ x: parsedA }) : 1) + fFn.evaluate({ x: parsedB }) / (gFn ? gFn.evaluate({ x: parsedB }) : 1) + sumSimpson);
      setResultSimpson(simpsonResult.toString());
    }
  };

  const predefined = () => {
    setValues({
      a: '-2',
      b: '2',
      n: '100',
      expression: '1/tanh(x)',
    });
    setResultTrapezoid('');
    setResultSimpson('');
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
        Trapezoid Rule Result: {resultTrapezoid}
      </Typography>
      <Typography variant="h6" align="center" gutterBottom>
        Simpson's Rule Result: {resultSimpson}
      </Typography>
    </Container>
  );
};

export default Trapezoid;
