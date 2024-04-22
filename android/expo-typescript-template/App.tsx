import CommonContextProvider from "./src/context";
import Screens from "./src/routes";

const App: React.FC = () => {

  return (
    <CommonContextProvider>
      <Screens />
    </CommonContextProvider>

  );
}

export default App;