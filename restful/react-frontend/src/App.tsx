import React from "react"
import PagesRouter from "./routes"
import { CommonProvider } from "./context"
import { Toaster } from 'react-hot-toast';

const App = () => {
  return (
    <React.Suspense
      fallback={
        <div className="w-full bg-slate-200 h-screen flex justify-center items-center">
          <div className="flex flex-col items-center justify-center">
            <div className="relative z-[2] h-32 w-32">
              <div className="z-[3] animate-spin absolute w-full h-full rounded-full border-b-2 border-primary-blue p-10"></div>
              <div className="z-[4] absolute w-full h-full flex items-center justify-center">
              </div>
            </div>
          </div>
        </div>
      }
    >
      <CommonProvider>
        <Toaster position="top-center" />
        <PagesRouter />
      </CommonProvider>
    </React.Suspense>
  )
}

export default App