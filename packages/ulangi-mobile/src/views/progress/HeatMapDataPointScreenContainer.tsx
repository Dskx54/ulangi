import * as React from "react"
import { Container } from "../../Container"
import { HeatMapDataPointScreen } from "./HeatMapDataPointScreen"
import { observer } from "mobx-react"

export interface HeatMapDataPointScreenPassedProps {
  date: Date
  value: number
}

@observer
export class HeatMapDataPointScreenContainer extends Container<HeatMapDataPointScreenPassedProps> {

  public render(): React.ReactElement<any> {
    return (
      <HeatMapDataPointScreen
        themeStore={this.props.rootStore.themeStore}
        observableLightBox={this.props.observableLightBox}
        observableScreen={this.observableScreen}
        screenDelegate={this.screenDelegate}
        date={this.props.passedProps.date}
        value={this.props.passedProps.value}
      />
    )
  }

}
