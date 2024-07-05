class Numjs {
  //array function accept an array of data and a data type(must be bigint boolean number string object/className)
  static array(data = [], dtype = "any") {
    if (!Array.isArray(shape)) throw Error("shape must be an array");
    if (dtype === "any") return data;
    for (const item of data) {
      if (typeof item !== dtype)
        throw TypeError(`${item} is not the type of ${dtype}`);
    }
    return data;
  }

  //zeros function accept a shape and return an N dimension array filled with 0 based on the shape
  static zeros(shape) {
    if (!Array.isArray(shape)) throw Error("shape must be an array");
    const len = shape.length;
    let arr = new Array(shape[len - 1]).fill(0);
    for (let i = len - 2; i >= 0; i--) {
      if (typeof shape[i] !== "number") {
        throw Error(
          "shape must be an array of numbers the " +
            i +
            "th position is not a number"
        );
      }
      arr = new Array(shape[i]).fill(arr);
    }
    return arr;
  }

  /**
   @function
   @param shape Array
   @return an N dimension array filled with 1 based on the shape*/
  static ones(shape) {
    if (!Array.isArray(shape)) throw Error("shape must be an array");
    const len = shape.length;
    let arr = new Array(shape[len - 1]).fill(1);
    for (let i = len - 2; i >= 0; i--) {
      if (typeof shape[i] !== "number") {
        throw Error(
          "shape must be an array of numbers the " +
            i +
            "th position is not a number"
        );
      }
      arr = new Array(shape[i]).fill(arr);
    }
    return arr;
  }

  //empty function accept a shape and return an N dimension array based on the shape
  static empty(shape) {
    if (!Array.isArray(shape)) throw Error("shape must be an array");
    const len = shape.length;
    let arr;
    for (let i = len - 1; i >= 0; i--) {
      arr = new Array(shape[i]).fill(arr);
    }
    return arr;
  }

  //full function accept a shape and fillItem and return an N dimension array filled with the fillItem based on the shape
  static full(shape, fillItem) {
    if (!Array.isArray(shape)) throw Error("shape must be an array");
    const len = shape.length;
    let arr = new Array(shape[len - 1]).fill(fillItem);
    for (let i = len - 2; i >= 0; i--) {
      arr = new Array(shape[i]).fill(arr);
    }
    return arr;
  }

  //arrange function accept start stop step and return an array filled with element from start number to stop number evenly spaced
  static arange(start, stop, step = 1) {
    if (
      typeof start !== "number" ||
      typeof stop !== "number" ||
      typeof step !== "number"
    ) {
      throw Error("all params must be type of number");
    }
    let length = Math.ceil((stop - start) / step);
    let result = new Array(length);
    for (let i = 0; i < length; i++) {
      result[i] = start + i * step;
    }
    return result;
  }

  //linspace accept start stop num endpoint and return an array of evenly spaced numbers over a specified interval
  static linspace(start, stop, num = 10, endpoint = true) {
    if (
      typeof start !== "number" ||
      typeof stop !== "number" ||
      typeof num !== "number"
    ) {
      throw Error("start/stop/num must be type of number");
    }
    if (typeof endpoint !== "boolean") {
      throw Error("endpoint must be type of boolean");
    }
    let result = new Array(num);
    let step = (stop - start) / (endpoint ? num - 1 : num);
    for (let i = 0; i < num; i++) {
      result[i] = start + i * step;
    }
    return result;
  }

  //
  static logspace(start, stop, num = 50, base = 10, endpoint = true) {
    let result = new Array(num);
    let step = (stop - start) / (endpoint ? num - 1 : num);
    for (let i = 0; i < num; i++) {
      result[i] = Math.pow(base, start + i * step);
    }
    return result;
  }

  //
  static eye(n, m = n, k = 0) {
    if (typeof n !== "number" || typeof m !== "number" || typeof k !== "number")
      throw Error("all params must be type of number");
    let result = Array.from({ length: n }, () => new Array(m).fill(0));
    for (let i = 0; i < n; i++) {
      let j = i + k;
      if (j >= 0 && j < m) {
        result[i][j] = 1;
      }
    }
    return result;
  }

  //
  static identity(n) {
    if (typeof n !== "number") throw Error("n must be type of number");
    return Numpy.eye(n, n, 0);
  }

  //
  static diag(v, k = 0) {
    if (typeof k !== "number") throw Error("k must be type of number");
    if (Array.isArray(v[0])) {
      let min = Math.min(v.length, v[0].length);
      let result = [];
      for (let i = 0; i < min; i++) {
        let j = i + k;
        if (j >= 0 && j < v[i].length) {
          result.push(v[i][j]);
        }
      }
      return result;
    } else {
      let n = v.length;
      let result = Array.from({ length: n }, () => new Array(n).fill(0));
      for (let i = 0; i < n; i++) {
        result[i][i + k] = v[i];
      }
      return result;
    }
  }

  //
  static reshape(array = [], newShape) {
    if (Array.isArray(array[0]))
      throw Error("the first param must be a flat array");
    function recursiveReshape(shape) {
      if (shape.length === 1) {
        return flatArray.splice(0, shape[0]);
      }
      let size = shape[0];
      let rest = shape.slice(1);
      let result = [];
      for (let i = 0; i < size; i++) {
        result.push(recursiveReshape(rest));
      }
      return result;
    }
    if (!Array.isArray(array) || !Array.isArray(newShape))
      throw Error("all params must be arrays");
    let flatArray = array.flat(Infinity);
    let totalSize = newShape.reduce((a, b) => a * b);
    if (flatArray.length !== totalSize) throw new Error("Incompatible shape");
    return recursiveReshape(newShape);
  }

  //
  static ravel(arr = []) {
    if (!Array.isArray(arr)) throw Error("the param must be an array");
    return arr.flat(Infinity);
  }

  //
  static flatten(arr = []) {
    if (!Array.isArray(arr)) throw Error("the param must be an array");
    return arr.flat(Infinity).slice();
  }

  //
  static transpose(array, axes = null) {
    if (!Array.isArray(array)) throw Error("the param must be an array");
    if (axes === null) {
      return array[0].map((_, colIndex) => array.map((row) => row[colIndex]));
    }
    return axes.map((i) => array[i]);
  }

  static swapaxes(array, axis1, axis2) {
    if (!Array.isArray(array)) throw Error("first param must be an array");
    if (!typeof axis1 === "number") throw Error("axis must be an number");
    let temp = array.map((row) => row.slice());
    for (let i = 0; i < temp.length; i++) {
      [temp[i][axis1], temp[i][axis2]] = [temp[i][axis2], temp[i][axis1]];
    }
    return temp;
  }

  static concatenate(arrays, axis = 0) {
    if (axis === 0) {
      return arrays.reduce((acc, val) => acc.concat(val), []);
    } else {
      return arrays[0].map((_, i) => arrays.map((array) => array[i]).flat());
    }
  }

  static stack(arrays, axis = 0) {
    if (axis === 0) {
      return [arrays];
    } else {
      return arrays[0].map((_, i) => arrays.map((array) => array[i]));
    }
  }

  static split(array, sections, axis = 0) {
    let result = [];
    if (typeof sections === "number") {
      let sectionSize = Math.ceil(array.length / sections);
      for (let i = 0; i < array.length; i += sectionSize) {
        result.push(array.slice(i, i + sectionSize));
      }
    } else {
      let prevIndex = 0;
      sections.forEach((index) => {
        result.push(array.slice(prevIndex, index));
        prevIndex = index;
      });
      result.push(array.slice(prevIndex));
    }
    return result;
  }

  static repeat(array, repeats, axis = null) {
    if (axis === null) {
      return array
        .flat(Infinity)
        .map((el) => Array(repeats).fill(el))
        .flat();
    } else {
      return array.map((row) =>
        row.map((el) => Array(repeats).fill(el)).flat()
      );
    }
  }

  static tile(array, reps) {
    let result = array;
    for (let i = 1; i < reps; i++) {
      result = result.concat(array);
    }
    return result;
  }

  static add(arr1, arr2) {
    if (!arr1 || !arr2) throw Error("Missing params");
    if (!Array.isArray(arr1) || !Array.isArray(arr2))
      throw Error("params must be an array");

    const help = [];
    const res = [];
    const a = Numjs.flatten(arr1);
    const b = Numjs.flatten(arr2);

    if (a.length !== b.length)
      throw Error("Must enter two arrays with the same shape");

    function getArrShape(arr) {
      if (Array.isArray(arr)) {
        getArrShape(arr[0]);
        return help.push(arr.length);
      }
      return null;
    }

    getArrShape(arr1);

    for (const i in a) {
      res.push(a[i] + b[i]);
    }
    return Numjs.reshape(res, help.reverse());
  }

  static sub(arr1, arr2) {
    if (!arr1 || !arr2) throw Error("Missing params");
    if (!Array.isArray(arr1) || !Array.isArray(arr2))
      throw Error("params must be an array");

    const help = [];
    const res = [];
    const a = Numjs.flatten(arr1);
    const b = Numjs.flatten(arr2);

    if (a.length !== b.length)
      throw Error("Must enter two arrays with the same shape");

    function getArrShape(arr) {
      if (Array.isArray(arr)) {
        getArrShape(arr[0]);
        return help.push(arr.length);
      }
      return null;
    }

    getArrShape(arr1);

    for (const i in a) {
      res.push(a[i] - b[i]);
    }
    return Numjs.reshape(res, help.reverse());
  }

  //
  static multiply(arr1, arr2) {
    function getShape(arr) {
      let shape = [];
      while (Array.isArray(arr)) {
        shape.push(arr.length);
        arr = arr[0];
      }
      return shape;
    }

    function isBroadcastable(shapeA, shapeB) {
      const lenA = shapeA.length;
      const lenB = shapeB.length;
      const maxLength = Math.max(lenA, lenB);

      for (let i = 1; i <= maxLength; i++) {
        const dimA = shapeA[lenA - i] || 1;
        const dimB = shapeB[lenB - i] || 1;
        if (dimA !== dimB && dimA !== 1 && dimB !== 1) {
          return false;
        }
      }
      return true;
    }

    function broadcastArray(arr, targetShape) {
      const currentShape = getShape(arr);
      const diff = targetShape.length - currentShape.length;

      for (let i = 0; i < diff; i++) {
        arr = [arr];
      }

      function broadcastHelper(arr, targetShape) {
        if (targetShape.length === 0) {
          return arr;
        }

        const [targetSize, ...remainingShape] = targetShape;
        const currentSize = arr.length;

        if (currentSize === targetSize) {
          return arr.map((item) => broadcastHelper(item, remainingShape));
        } else if (currentSize === 1) {
          return Array(targetSize)
            .fill(arr[0])
            .map((item) => broadcastHelper(item, remainingShape));
        } else {
          throw new Error("Broadcasting failed");
        }
      }

      return broadcastHelper(arr, targetShape);
    }

    function elementWiseMultiply(A, B) {
      if (Array.isArray(A) && Array.isArray(B)) {
        return A.map((a, i) => elementWiseMultiply(a, B[i]));
      } else {
        return A * B;
      }
    }

    const shapeA = getShape(arr1);
    const shapeB = getShape(arr2);

    if (!isBroadcastable(shapeA, shapeB)) {
      throw new Error("Shapes are not broadcastable");
    }

    const broadcastedB = broadcastArray(arr2, shapeA);

    return elementWiseMultiply(arr1, broadcastedB);
  }

  //
  static divide(arr1, arr2) {
    function getShape(arr) {
      let shape = [];
      while (Array.isArray(arr)) {
        shape.push(arr.length);
        arr = arr[0];
      }
      return shape;
    }

    function isBroadcastable(shapeA, shapeB) {
      const lenA = shapeA.length;
      const lenB = shapeB.length;
      const maxLength = Math.max(lenA, lenB);

      for (let i = 1; i <= maxLength; i++) {
        const dimA = shapeA[lenA - i] || 1;
        const dimB = shapeB[lenB - i] || 1;
        if (dimA !== dimB && dimA !== 1 && dimB !== 1) {
          return false;
        }
      }
      return true;
    }

    function broadcastArray(arr, targetShape) {
      const currentShape = getShape(arr);
      const diff = targetShape.length - currentShape.length;

      for (let i = 0; i < diff; i++) {
        arr = [arr];
      }

      function broadcastHelper(arr, targetShape) {
        if (targetShape.length === 0) {
          return arr;
        }

        const [targetSize, ...remainingShape] = targetShape;
        const currentSize = arr.length;

        if (currentSize === targetSize) {
          return arr.map((item) => broadcastHelper(item, remainingShape));
        } else if (currentSize === 1) {
          return Array(targetSize)
            .fill(arr[0])
            .map((item) => broadcastHelper(item, remainingShape));
        } else {
          throw new Error("Broadcasting failed");
        }
      }

      return broadcastHelper(arr, targetShape);
    }

    function elementWiseDivide(A, B) {
      if (Array.isArray(A) && Array.isArray(B)) {
        return A.map((a, i) => elementWiseDivide(a, B[i]));
      } else {
        return A / B;
      }
    }

    const shapeA = getShape(arr1);
    const shapeB = getShape(arr2);

    if (!isBroadcastable(shapeA, shapeB)) {
      throw new Error("Shapes are not broadcastable");
    }

    const broadcastedB = broadcastArray(arr2, shapeA);

    return elementWiseDivide(arr1, broadcastedB);
  }

  //
  static pow(arr1, arr2) {
    function getShape(arr) {
      let shape = [];
      while (Array.isArray(arr)) {
        shape.push(arr.length);
        arr = arr[0];
      }
      return shape;
    }

    function isBroadcastable(shapeA, shapeB) {
      const lenA = shapeA.length;
      const lenB = shapeB.length;
      const maxLength = Math.max(lenA, lenB);

      for (let i = 1; i <= maxLength; i++) {
        const dimA = shapeA[lenA - i] || 1;
        const dimB = shapeB[lenB - i] || 1;
        if (dimA !== dimB && dimA !== 1 && dimB !== 1) {
          return false;
        }
      }
      return true;
    }

    function broadcastArray(arr, targetShape) {
      const currentShape = getShape(arr);
      const diff = targetShape.length - currentShape.length;

      for (let i = 0; i < diff; i++) {
        arr = [arr];
      }

      function broadcastHelper(arr, targetShape) {
        if (targetShape.length === 0) {
          return arr;
        }

        const [targetSize, ...remainingShape] = targetShape;
        const currentSize = arr.length;

        if (currentSize === targetSize) {
          return arr.map((item) => broadcastHelper(item, remainingShape));
        } else if (currentSize === 1) {
          return Array(targetSize)
            .fill(arr[0])
            .map((item) => broadcastHelper(item, remainingShape));
        } else {
          throw new Error("Broadcasting failed");
        }
      }

      return broadcastHelper(arr, targetShape);
    }

    function elementWisePow(A, B) {
      if (Array.isArray(A) && Array.isArray(B)) {
        return A.map((a, i) => elementWisePow(a, B[i]));
      } else {
        return A ** B;
      }
    }

    const shapeA = getShape(arr1);
    const shapeB = getShape(arr2);

    if (!isBroadcastable(shapeA, shapeB)) {
      throw new Error("Shapes are not broadcastable");
    }

    const broadcastedB = broadcastArray(arr2, shapeA);

    return elementWisePow(arr1, broadcastedB);
  }

  //
  static mod(arr1, arr2) {
    function getShape(arr) {
      let shape = [];
      while (Array.isArray(arr)) {
        shape.push(arr.length);
        arr = arr[0];
      }
      return shape;
    }

    function isBroadcastable(shapeA, shapeB) {
      const lenA = shapeA.length;
      const lenB = shapeB.length;
      const maxLength = Math.max(lenA, lenB);

      for (let i = 1; i <= maxLength; i++) {
        const dimA = shapeA[lenA - i] || 1;
        const dimB = shapeB[lenB - i] || 1;
        if (dimA !== dimB && dimA !== 1 && dimB !== 1) {
          return false;
        }
      }
      return true;
    }

    function broadcastArray(arr, targetShape) {
      const currentShape = getShape(arr);
      const diff = targetShape.length - currentShape.length;

      for (let i = 0; i < diff; i++) {
        arr = [arr];
      }

      function broadcastHelper(arr, targetShape) {
        if (targetShape.length === 0) {
          return arr;
        }

        const [targetSize, ...remainingShape] = targetShape;
        const currentSize = arr.length;

        if (currentSize === targetSize) {
          return arr.map((item) => broadcastHelper(item, remainingShape));
        } else if (currentSize === 1) {
          return Array(targetSize)
            .fill(arr[0])
            .map((item) => broadcastHelper(item, remainingShape));
        } else {
          throw new Error("Broadcasting failed");
        }
      }

      return broadcastHelper(arr, targetShape);
    }

    function elementWiseMod(A, B) {
      if (Array.isArray(A) && Array.isArray(B)) {
        return A.map((a, i) => elementWiseMod(a, B[i]));
      } else {
        return A * B;
      }
    }

    const shapeA = getShape(arr1);
    const shapeB = getShape(arr2);

    if (!isBroadcastable(shapeA, shapeB)) {
      throw new Error("Shapes are not broadcastable");
    }

    const broadcastedB = broadcastArray(arr2, shapeA);

    return elementWiseMod(arr1, broadcastedB);
  }

  //
  static mean(arr = [], axis = null) {
    if (!Array.isArray(arr)) throw Error("must enter an array");
    if (axis !== null && axis > 1) throw Error("axis out of bound");
    if (axis === null) {
      const flattened = arr.flat(Infinity);
      const sum = flattened.reduce((acc, val) => acc + val, 0);
      return sum / flattened.length;
    }
    if (axis === 0) {
      const res = arr.map((_, colIndex) => {
        const sum = arr.reduce((acc, row) => acc + row[colIndex], 0);
        return sum / arr.length;
      });
      return res;
    }
    const res = arr.map((row) => {
      const sum = row.reduce((acc, val) => acc + val, 0);
      return sum / row.length;
    });
    return res;
  }

  //
  static median(arr = []) {
    if (!Array.isArray(arr)) throw Error("must enter an array");
    const res = arr.flat(Infinity);
    return res[Math.floor(res.length / 2)];
  }

  //
  static std(arr = [], axis = null, ddof = 0) {
    const res = Numjs.mean(arr, axis);
    const flat = arr.flat(Infinity);
    let sum = 0;
    for (const item of flat) {
      sum += Math.pow(item - res, 2);
    }
    sum /= flat.length - ddof;
    return Math.sqrt(sum);
  }

  //
  static var() {}

  //
  static min(arr = []) {
    if (!Array.isArray(arr)) throw Error("must enter an array");
    const res = arr.flat(Infinity);
    return Math.min(...res);
  }

  //
  static max(arr = []) {
    if (!Array.isArray(arr)) throw Error("must enter an array");
    const res = arr.flat(Infinity);
    return Math.max(...res);
  }

  //
  static sum(arr = []) {
    if (!Array.isArray(arr)) throw Error("must enter an array");
    const res = arr.flat(Infinity);
    let sum = 0;
    for (const item in res) {
      sum += item;
    }
    return sum;
  }

  //
  static prod(arr = []) {
    if (!Array.isArray(arr)) throw Error("must enter an array");
    const res = arr.flat(Infinity);
    let prod = 0;
    for (const item in res) {
      prod *= item;
    }
    return prod;
  }
}

//for later transforming all arrays to numjs arrays
class NumjsArrays extends Array {
  constructor(shape, ndim, ...items) {
    if (items.length === 1 && Array.isArray(items[0])) {
      super(...items[0]);
    } else {
      super(...items);
    }
    this.shape = shape;
    this.ndim = ndim;
  }
}
