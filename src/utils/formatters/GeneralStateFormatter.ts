export const FormatRole = (value: number) => {
  switch(value) {
    case 1:
      return "Administrador"
    case 2:
      return "Professor"
    case 3:
      return "Gestor"
    default:
      return ""
  }
}