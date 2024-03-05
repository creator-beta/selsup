import ParamEditor from "./components/ParamEditorClass";
import { ParamEditorFunctional } from "./components/ParamEditorFunctional";
import { Param } from "./interfaces/Param";
import "./index.css";

function App() {
  const params: Param[] = [
    { id: 1, name: "Назначение", type: "string" },
    { id: 2, name: "Длина", type: "string" },
  ];

  const model = {
    paramValues: [
      { paramId: 1, value: "повседневное" },
      { paramId: 2, value: "макси" },
    ],
  };

  return (
    <div className="fields-wrapper">
      <ParamEditor params={params} model={model} />
      <ParamEditorFunctional params={params} model={model} />
    </div>
  );
}

export default App;
