import * as React from "react";
import styles from "./filterDate.module.scss";
import { IStore } from "../../reducers";
import { connect } from "react-redux";

export interface IOwnProps {}

export interface IStateProps {}

export interface IState {}

class FilterDate extends React.Component<IOwnProps & IStateProps, IState> {
  // state = { :  }
  public render() {
    return (
      <section className={styles.filterSection}>
        <label> Filter By Date </label>
        <select className={styles.select} onChange={this.handleChange}>
          <option value="2019-05-06">2019/05/06</option>
          <option value="2019-05-07">2019/05/07</option>
          <option value="2019-05-08">2019/05/08</option>
          <option value="2019-05-22">2019/05/22</option>
          <option value="2019-05-23">2019/05/23</option>
        </select>
      </section>
    );
  }

  private handleChange(event: any) {}
}

const mapStateToProps = (state: IStore, props: IOwnProps) => {
  return {};
};

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FilterDate);
