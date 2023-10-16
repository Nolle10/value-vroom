import tailwindconf from "../../tailwind.config";

export function getPrimaryColor() {
  return (tailwindconf as any).theme.extend.colors.primary;
}