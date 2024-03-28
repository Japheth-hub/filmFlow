import "../scss/globals.scss";
import { UserProvider } from '@auth0/nextjs-auth0/client'


export const metadata = {
  title: "FilmFlow",
  description: "API movie/series",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <UserProvider>
        <body>
          
            {children}
          
        </body>
      </UserProvider>
    </html>
  );
}
