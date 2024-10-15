export enum Routes {
  Agenda = '/agenda',
  Solicitações = '/solicitacoes',
  Espacos = '/espacos',
  Gestao = '/gestao'
}

const routePermissions = {
  [Routes.Agenda]: [1, 2, 3], 
  [Routes.Solicitações]: [1, 2, 3],   
  [Routes.Espacos]: [1, 2, 3],         
  [Routes.Gestao]: [1],         
};

export function canAccess(route: Routes, userRole: number): boolean {
  return routePermissions[route]?.includes(userRole) ?? false;
}
