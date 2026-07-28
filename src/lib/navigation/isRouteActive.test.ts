import { describe, expect, it } from "vitest";

import { isRouteActive } from "./isRouteActive";

describe("isRouteActive", () => {
  it("ativa a rota inicial apenas na página inicial", () => {
    expect(isRouteActive("/", "/")).toBe(true);
    expect(isRouteActive("/servicos", "/")).toBe(false);
  });

  it("ativa uma rota exata", () => {
    expect(isRouteActive("/servicos", "/servicos")).toBe(true);
  });

  it("ativa uma sub-rota válida", () => {
    expect(isRouteActive("/servicos/detalhes", "/servicos")).toBe(true);
  });

  it("não ativa prefixos apenas parecidos", () => {
    expect(isRouteActive("/servicos-extra", "/servicos")).toBe(false);
  });
});
