import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import UserService from './services/user/UserService';

// Define as rotas públicas
const PUBLIC_PATHS = [
  "/login",
  "/error",
  "/iforgot",
];


const isPublicPath = (pathname: string) =>
  isPublicFile(pathname) ||
  PUBLIC_PATHS.some(p => pathname === p || pathname.startsWith(`${p}/`));

const isPublicFile = (pathname: string) =>
  pathname.startsWith('/_next') ||
  pathname.includes('.');

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const userService = new UserService();

  // Se a rota for pública, permite o acesso
  if (isPublicPath(pathname)) {
    return NextResponse.next();
  }

  // Verifica se o cookie 'user_token' existe
  const token = req.cookies.get('user_token');

  // Se o token não existir, redireciona para a página de login
  if (!token) {
    return NextResponse.redirect(new URL('/login', req.url));
  }
  
  try {
    const validate = await userService.getMe(token.value);
    if (validate && validate.id && validate.login) {
      return NextResponse.next()
    }
    return NextResponse.redirect(new URL('/error', req.url));
  } catch (error) {
    return NextResponse.redirect(new URL('/error', req.url));
  }
}

export const config = {
  matcher: '/:path*',
};
