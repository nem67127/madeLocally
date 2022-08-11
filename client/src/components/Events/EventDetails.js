import { useParams } from "react-router-dom";

const EventDetails = () => {
  const { eventId } = useParams();
  return <div>{eventId}</div>;
  //where when you click on an event it shows more details of what vendors are there
  //if current user is artisan then they can add them selves to the list of vendors (links to thier profile)
  //users can show interest and will go on their interested Events Page (** need to make component)
};

export default EventDetails;
