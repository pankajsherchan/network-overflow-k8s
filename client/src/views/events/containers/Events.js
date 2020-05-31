import React, { useEffect, useState } from 'react';
import { environment } from '../../../environments/environment';
import useHttpHook from '../../../hooks/HttpHook';
import EventList from '../components/EventList';

const Events = () => {
  const { sendRequest } = useHttpHook();

  const [events, setEvents] = useState(null);

  // get the events
  useEffect(() => {
    const sendRequestAsync = async () => {
      const url = `${environment.apiUrl}${environment.apis.event}`;

      const res = await sendRequest(url, 'GET');
      console.log('res: ', res);
      setEvents(res.data);
    };

    sendRequestAsync();
  }, []);

  return <>{events ? <EventList events={events}></EventList> : null}</>;
};

export default Events;
