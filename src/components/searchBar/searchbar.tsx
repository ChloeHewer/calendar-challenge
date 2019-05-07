import * as React from "react";
import { ICalendarEvents } from "../../reducers/calendarReducer";
import { connect } from "react-redux";
import { IStore } from "../../reducers";
import { setSearchText } from "../../reducers/filteredReducer";

export interface IOwnProps {}

export interface IStateProps {
  setSearchText: (searchText: string) => void;
  searchText: string;
}

export interface IState {}

class SearchBar extends React.Component<IOwnProps & IStateProps, IState> {
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
    // console.log(event.currentTarget.value);
    console.log(this.props.searchText);
  };
}

const mapStateToProps = (state: IStore, props: IOwnProps) => {
  return {
    searchText: state.calendar.searchText
  };
};

const mapDispatchToProps = { setSearchText };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchBar);
