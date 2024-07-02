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

  //ones function accept a shape and return an N dimension array filled with 1 based on the shape
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
}
