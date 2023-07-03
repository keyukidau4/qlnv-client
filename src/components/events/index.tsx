import React from "react";
import { EventType } from "../../types/event";

type Props = {
  events: Array<EventType>;
};

const EventsComponent = ({ events }: Props) => {
  return (
    <div>
      <ul>
        {events.map((event) => (
          <li key={event.id}>
            <a href={event.url}>{event.title}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EventsComponent;
