import _ from 'lodash';

/*
  buildDiff recibe dos objetos planos y
  devuelve un array de líneas del diff
*/
const buildDiff = (data1, data2) => {
  // Union de todas las claves de ambos objetos
  const keys = _.sortBy(_.union(Object.keys(data1), Object.keys(data2)));

  return keys.flatMap((key) => {
    const value1 = data1[key];
    const value2 = data2[key];

    // Si la clave no existe en el segundo archivo ...removida
    if (!_.has(data2, key)) {
      return `  - ${key}: ${value1}`;
    }

    // Si la clave no existe en el primero ... agregada
    if (!_.has(data1, key)) {
      return `  + ${key}: ${value2}`;
    }

    // Si existe en ambos pero los valores son distintos ... cambio
    if (!_.isEqual(value1, value2)) {
      return [
        `  - ${key}: ${value1}`,
        `  + ${key}: ${value2}`,
      ];
    }

    // Si existe en ambos y es igual ... sin signo
    return `    ${key}: ${value1}`;
  });
};

export default buildDiff;
