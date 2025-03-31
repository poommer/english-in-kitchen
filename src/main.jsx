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


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route >
      <Route path="/"  element={<Layout />} >
        <Route path="/" element={localStorage.getItem('user') ? <Lesson /> : <Homepage />} />
        <Route path="/lesson/:type/:lesson/:quiz" element={<Detail />} />
        <Route path="/lesson/word-search/:lesson/:quiz" element={<WordSearchPage />} />
      </Route>

    </Route>

  )
);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
