import { NextResponse,NextRequest } from 'next/server';
 
// The country to block from accessing the secret page
const BLOCKED_COUNTRY = 'EC';
 
export function middleware(request:NextRequest) {
  // Extract country. Default to US if not found.
    const country = (request.geo && request.geo.country) || 'US';
    let urlDestination
  console.log(`Visitor from ${country}`);
 
  // Specify the correct route based on the requests location
  if (country === BLOCKED_COUNTRY) {
    console.log(`Blocked Visitor from ${country}`)
    
    //http://localhost:3000/secret-page
    //request.nextUrl.pathname :/secret-page 
    //request.url URL completa: http://localhost:3000/secret-page
    urlDestination="/login"
  } else {
    //console.log("desbloqueado")
    urlDestination="/secret-page"
  }
  //Redirect cambia la ruta en la barra del navegador
  return NextResponse.redirect(new URL(urlDestination, request.url));


  // Rewrite mantiene la url http://localhost:3000/secret-page en la barra del navegador pero carga la ruta especificada en urlDestination
    //?url = new URL(url, [base])
    //?new URL("/es/docs", "https://developer.mozilla.org/fr-FR/toto"); Devuelve: => 'https://developer.mozilla.org/es/docs'
  
    // return NextResponse.rewrite(new URL(urlDestination, request.url));
}
// Trigger this middleware to run on the `/secret-page` route
export const config = {
  matcher: '/secret-page',
};