import * as React from "react";
import { ICalendarEvents } from "../../reducers/calendarReducer";
import styles from "./calendarComponent.module.scss";

export interface IProps {
  calendarEvent: ICalendarEvents;
}

export interface IState {
  isHighlighted: boolean;
}

class CalendarComponent extends React.Component<IProps, IState> {
  public state = { isHighlighted: false };
  public render() {
    const markEvent = this.state.isHighlighted ? `${styles.highLighted}` : "";
    return (
      <article
        onClick={this.toggleHighlight}
        className={`${styles.calendarEvents} ${markEvent}`}
      >
        <h2>{this.props.calendarEvent.organizer.displayName}</h2>
        <div>Start Date: {this.props.calendarEvent.start.date} </div>
        <div>End Date: {this.props.calendarEvent.end.date}</div>
        <p>{this.props.calendarEvent.summary}</p>
      </article>
    );
  }

  private toggleHighlight = () => {
    this.setState({ isHighlighted: !this.state.isHighlighted });
  };
}

export default CalendarComponent;
