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

  const simpsonCalc = (a: number, b: number, n: number, expression: string) => {
    const denominatorFn = math.parse(expression).compile();
    let sum1 = 0;
    let sum2 = 0;
    let delta = deltaX(b, a, n);
    let xi, fi;
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

      if (i % 2 === 0) {
        sum2 += fi;
      } else {
        sum1 += fi;
      }
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

    let result = (delta / 3) * (math.evaluate(expression, { x: a }) + math.evaluate(expression, { x: b }) + 2 * sum2 + 4 * sum1);
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
        <FormContainer>
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
          <SubmitButton variant="contained" type="submit">
            Submit
          </SubmitButton>
        </FormContainer>
      </form>
      <p>Result: {result}</p>
    </div>
  );
};

export default Simpson;
