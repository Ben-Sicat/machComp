import React, { useState } from 'react';
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
    try {
      math.evaluate(expression.replace('x', '0')); // Check if the expression is valid
    } catch (error) {
      setResult('Error: Invalid mathematical expression');
      return;
    }

    const fn = math.parse(expression).compile();
    let sum = 0;
    let delta = deltaX(b, a, n);
    let xi;
    let undefinedPoints: number[] = [];

    for (let i = 0; i <= n; i++) {
      xi = a + i * delta;
      try {
        const fi = fn.evaluate({ x: xi });
        if (!Number.isFinite(fi) || Number.isNaN(fi)) {
          undefinedPoints.push(xi);
        } else if (undefinedPoints.length > 0) {
          setResult(`Error: The function is undefined at x = ${undefinedPoints.join(', ')}`);
          return;
        }
        if (i > 0 && i < n) {
          sum += fi;
        }
      } catch (error) {
        setResult('Error: Invalid mathematical expression');
        return;
      }
    }

    let result = (delta * (fn.evaluate({ x: a }) + fn.evaluate({ x: b })) / 2) + (delta * sum);
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
