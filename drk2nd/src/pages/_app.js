// import "@/styles/globals.css";
// import DefaultLayout from "../../Components/DefaultLayout";
// import { useRouter } from 'next/router';

// function App({ Component, pageProps }) {
//   const router = useRouter();

//   return (
//     <>
//       {router.pathname === '/' ? (
//         <Component {...pageProps} />
//       ) : (
//         <DefaultLayout>
//           <Component {...pageProps} />
//         </DefaultLayout>
//       )}
//     </>
//   );
// }

// export default App;

import DefaultLayout from "../../Components/DefaultLayout";
import { SessionProvider } from 'next-auth/react';
import "@/styles/globals.css";
import { useRouter } from 'next/router';

 function App({ Component, pageProps }) {
  const router = useRouter();
  return (
    <>
     <SessionProvider session={pageProps.session}>
     {router.pathname === '/' ? (
        <Component {...pageProps} />
      ) : (
          <DefaultLayout>
              <Component {...pageProps} />
          </DefaultLayout>
      )}
     </SessionProvider>
     </>
   
  );
}
export default App;
