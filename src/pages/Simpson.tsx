import React, { useState } from 'react';
// import { Button } from '@mui/material';
// import { styled } from '@mui/system';
import * as math from 'mathjs';
import { FormEvent } from 'react';

const Simpson: React.FC = () => {
  const [expression, setExpression] = useState('');
  const [result, setResult] = useState('');
  const [a, setA] = useState('');
  const [b, setB] = useState('');
  const [n, setN] = useState('');

  const deltaX = (x1: number, x2: number, n1: number) => {
    return (x1 - x2) / n1;
  };
  const trapezoidCalc = (a: number, b: number, n: number, expression: string) => {
    
  }


  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    throw new Error('Function not implemented.');
  }

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
