import React, { useState, ChangeEvent } from "react";
import { Model } from "../interfaces/Model";
import { Param } from "../interfaces/Param";
import { ParamValue } from "../interfaces/ParamValue";
import Styles from "./ParamEditor.module.css";

interface Props {
  params: Param[];
  model: Model;
}

export const ParamEditorFunctional: React.FC<Props> = ({ params, model }) => {
  const [paramValues, setParamValues] = useState<ParamValue[]>([
    ...model.paramValues,
  ]);

  const handleParamChange = (
    paramId: number,
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = event.target;

    const param = params.find((param) => param.id === paramId);
    if (param && param.type === "string") {
      setParamValues((prevValues) => {
        const updatedParamValues = prevValues.map((paramValue) =>
          paramValue.paramId === paramId ? { ...paramValue, value } : paramValue
        );

        return updatedParamValues;
      });
    }
  };

  const getModel = (): Model => {
    return {
      paramValues: paramValues,
    };
  };

  return (
    <>
      {params.map((param) => (
        <div key={param.id} className={Styles["field"]}>
          <label>{param.name}</label>
          <input
            type="text"
            value={
              paramValues.find((pv) => pv.paramId === param.id)?.value || ""
            }
            onChange={(e) => handleParamChange(param.id, e)}
          />
        </div>
      ))}
    </>
  );
};
