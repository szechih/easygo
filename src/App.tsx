import { Suspense } from 'react';
import { createHashRouter, RouterProvider } from 'react-router-dom'
import './style/app.scss';
import constantRoutes from './router';
import CustomLoading from './components/CustomLoading';

function App() {
  const router = createHashRouter([...constantRoutes])

  return (
    <>
      {/* <Suspense fallback={<Loading />}>{ element }</Suspense> */}
      <Suspense fallback={<CustomLoading />}>
        <RouterProvider router={router}/>
      </Suspense>
    </>
  );
}

export default App;
