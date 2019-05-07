import * as React from "react";
import CalendarComponent from "../../components/calendarComponent/calendarComponent";
import { IStore } from "../../reducers";
import { fetchCalendar, ICalendarEvents } from "../../reducers/calendarReducer";
import { connect } from "react-redux";
import styles from "./calendar.module.scss";
import SearchBar from "../../components/searchBar/searchbar";
import { setSearchText } from "../../reducers/filteredReducer";

export interface IOwnProps {}

export interface IStateProps {
  fetchCalendar: () => void;
  calendarEvents: ICalendarEvents[];
  setSearchText: (searchText: string) => void;
  searchText: string;
}

export interface IState {
  filteredCalendarEvents: ICalendarEvents[];
}

class Calendar extends React.Component<IOwnProps & IStateProps, IState> {
  public state = { filteredCalendarEvents: this.props.calendarEvents };

  public componentDidUpdate(prevProps: IStateProps & IOwnProps) {
    if (prevProps !== this.props) {
      this.setState({ filteredCalendarEvents: this.props.calendarEvents });
    }
  }

  public componentDidMount() {
    this.props.fetchCalendar();
  }

  public render() {
    return (
      <React.Fragment>
        <section className={styles.filterSection}>
          <div>
            <label> Filter By Date </label>
            <select className={styles.select} onChange={this.handleChange}>
              <option value="all">Show All</option>
              <option value="2019-05-06">2019/05/06</option>
              <option value="2019-05-07">2019/05/07</option>
              <option value="2019-05-08">2019/05/08</option>
              <option value="2019-05-22">2019/05/22</option>
              <option value="2019-05-23">2019/05/23</option>
            </select>
          </div>
          {/* <SearchBar calendarEvents={this.state.filteredCalendarEvents} /> */}
          <input
            onChange={this.handleSearchBoxChange}
            type="text"
            placeholder="search..."
          />
        </section>

        <section className={styles.calendarSection}>
          {this.state.filteredCalendarEvents.map((calendarEvent, index) => (
            <CalendarComponent key={index} calendarEvent={calendarEvent} />
          ))}
        </section>
      </React.Fragment>
    );
  }

  private handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const filteredList = this.props.calendarEvents.filter(calendarEvent => {
      if (event.target.value === "all") {
        return calendarEvent;
      }
      return (
        calendarEvent.start.date === event.target.value ||
        calendarEvent.end.date === event.target.value
      );
    });
    this.setState({ filteredCalendarEvents: filteredList });
  };

  private handleSearchBoxChange = (
    event: React.FormEvent<HTMLInputElement>
  ) => {
    const search = this.state.filteredCalendarEvents.filter(calendarEvent => {
      return calendarEvent.summary.includes(event.currentTarget.value);
    });
    this.setState({ filteredCalendarEvents: search });
  };
}

const mapStateToProps = (state: IStore, props: IOwnProps) => {
  return {
    calendarEvents: state.calendar.calendarEvents,
    searchText: state.calendar.searchText
  };
};

const mapDispatchToProps = { fetchCalendar, setSearchText };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Calendar);
