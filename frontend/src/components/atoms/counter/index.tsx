import React, { useState } from "react";

const Contador = () => {
  const [contador, setContador] = useState(0);

  return (
    <div>
      <h1>Contador: {contador}</h1>
      <button
        className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
        type="button"
        onClick={() => setContador(contador + 1)}
      >
        Incrementar
      </button>
      <button
        className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
        type="button"
        onClick={() => setContador(contador - 1)}
      >
        Decrementar
      </button>
      <button
        className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
        type="button"
        onClick={() => setContador(0)}
      >
        Resetar
      </button>
    </div>
  );
};

export default Contador;