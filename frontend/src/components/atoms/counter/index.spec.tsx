import { describe, test, expect } from "vitest";
import { render, fireEvent } from "@testing-library/react";
import Contador from "./index";

describe("<Contador/>", () => {
  test("Renderiza o valor inicial do contador", () => {
    const { asFragment } = render(<Contador />);
    expect(asFragment()).toMatchSnapshot();
  });

  /* test("Incrementa o contador ao clicar em 'Incrementar'", () => {
    const { getByText } = render(<Contador />);
    fireEvent.click(getByText("Incrementar"));
    expect(getByText("Contador: 1")).toBeInTheDocument();
  }); */

  test("Decrementa o contador ao clicar em 'Decrementar'", () => {
    const { getByText, asFragment } = render(<Contador />);
    const contadorInicial = asFragment();

    fireEvent.click(getByText("Incrementar"));

    const contadorIncrementado = asFragment();

    fireEvent.click(getByText("Decrementar"));

    const contadorFinal = asFragment();

    expect(contadorInicial).not.toEqual(contadorIncrementado);
    expect(contadorInicial).toEqual(contadorFinal);
  });

  test("Reseta o contador ao clicar em 'Resetar'", () => {
    const { getByText, asFragment } = render(<Contador />);
    fireEvent.click(getByText("Incrementar"));
    fireEvent.click(getByText("Resetar"));
    expect(asFragment()).toMatchSnapshot();
  });
});