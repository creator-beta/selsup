import React, { ChangeEvent } from "react";
import { Model } from "../interfaces/Model";
import { Param } from "../interfaces/Param";
import { ParamValue } from "../interfaces/ParamValue";
import Styles from "./ParamEditor.module.css";

interface Props {
  params: Param[];
  model: Model;
}
interface State {
  paramValues: ParamValue[];
}

class ParamEditor extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      paramValues: [...props.model.paramValues],
    };
  }

  private handleParamChange = (
    paramId: number,
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = event.target;

    const param = this.props.params.find((param) => param.id === paramId);
    if (param && param.type === "string") {
      this.setState((prevState) => {
        const updatedParamValues = prevState.paramValues.map((paramValue) =>
          paramValue.paramId === paramId ? { ...paramValue, value } : paramValue
        );

        return {
          paramValues: updatedParamValues,
        };
      });
    }
  };

  public getModel(): Model {
    return {
      paramValues: this.state.paramValues,
    };
  }

  render() {
    const { params } = this.props;
    const { paramValues } = this.state;

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
              onChange={(e) => this.handleParamChange(param.id, e)}
            />
          </div>
        ))}
      </>
    );
  }
}

export default ParamEditor;
