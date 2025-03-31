import * as React from "react";
import { createRoot } from "react-dom/client";
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
  createRoutesFromElements,
} from "react-router-dom";
import { Layout } from "./layout/Layout";
import { Homepage } from './routes/homepage/Homepage';
import { Detail, Lesson } from "./routes/lesson/Lesson";
import { WordSearchPage } from "./routes/lesson/word-search";


const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
       <Layout />
      </>
    ),
    children: [
      {
        path: "/",
        element: (
          <div>
           { localStorage.getItem('user') ? <Lesson /> : <Homepage />}
          </div>
        ),
      },
      {
        path: "/lesson/:type/:lesson/:quiz",
        element: (
          <div>
            <Detail />
          </div>
        ),
      },
      {
        path: "/lesson/word-search/:lesson/:quiz",
        element: (
          <div>
            <WordSearchPage />
          </div>
        ),
      },
    ]
  }
]
  // createRoutesFromElements(
  //   <Route >
  //     <Route path="/"  element={<Layout />} >
  //       <Route path="/" element={localStorage.getItem('user') ? <Lesson /> : <Homepage />} />
  //       <Route path="/lesson/:type/:lesson/:quiz" element={<Detail />} />
  //       <Route path="/lesson/word-search/:lesson/:quiz" element={<WordSearchPage />} />
  //     </Route>

  //   </Route>

  // )
);

export default function App() {
    return <RouterProvider router={router} />;
  }