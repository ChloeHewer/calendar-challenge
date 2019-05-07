import * as React from "react";
import { ICalendarEvents } from "../../reducers/calendarReducer";
import { connect } from "react-redux";
import { IStore } from "../../reducers";
import { setSearchText } from "../../reducers/filteredReducer";

export interface IOwnProps {}

export interface IStateProps {
  setSearchText: (searchText: string) => void;
}

export interface IState {
  filteredCalendarEvents: ICalendarEvents[];
}

class SearchBar extends React.Component<IOwnProps & IStateProps, IState> {
  // public state = { filteredCalendarEvents: this.props.calendarEvents };
  public render() {
    return (
      <input
        onChange={this.handleSearchBoxChange}
        type="text"
        placeholder="search..."
      />
    );
  }

  private handleSearchBoxChange = (
    event: React.FormEvent<HTMLInputElement>
  ) => {
    this.props.setSearchText(event.currentTarget.value);
  };
}

const mapStateToProps = (state: IStore, props: IOwnProps) => {
  return {};
};

const mapDispatchToProps = { setSearchText };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchBar);
