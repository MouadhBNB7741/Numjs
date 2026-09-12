# NumJS — NumPy for JavaScript

A single-module JavaScript library that reimplements core parts of Python's NumPy: N-dimensional arrays, broadcasting, element-wise math, reshaping, and more — no dependencies.

## Tech Stack
- Vanilla JavaScript (single `main.js` module, no external dependencies)

## Implemented / Targeted Areas
- **Array creation:** `array`, `zeros`, `ones`, `empty`, `full`, `arange`, `linspace`, `logspace`, `eye`, `identity`, `diag`
- **Array manipulation:** `reshape`, `ravel`, `flatten`, `transpose`, `swapaxes`, `concatenate`, `stack`, `split`, `repeat`, `tile`
- **Array attributes:** `shape`, `size`, `ndim`, `dtype`, `itemsize`, `nbytes`
- **Element-wise math with NumPy-style broadcasting:** add, subtract, multiply, divide, mod, power
- **Statistics:** mean, median, std, var, min, max, sum, prod
- **Trigonometric, exponential & logarithmic functions**
- **Linear algebra:** dot, inner, outer, matmul, tensordot, `linalg.solve`/`inv`/`det`/`eig`/`svd`/`norm`
- **Random number generation:** rand, randn, randint, choice, permutation, shuffle, seed
- **Sorting/searching/counting, set operations, and polynomial fitting** (`polyval`, `polyfit`, `roots`)

Broadcasting is implemented from scratch (shape compatibility checks + shape expansion) and reused across the element-wise operators.

## Getting Started
This is a plain JS file — include or `import` `main.js` directly:
```js
import * as numjs from "./main.js";

const a = numjs.zeros([2, 3]);
const b = numjs.arange(0, 6).reshape... // see main.js for exact API surface
```

> This is a learning/portfolio project aimed at reproducing NumPy's API surface in JS; not all listed functions may be fully implemented or optimized for production use — check `main.js` for the current state of any given function.
