import React, { useEffect, useState } from 'react';
import { environment } from '../../../environments/environment';
import withErrorAndLoadingHandlerHOC from '../../../hoc/ErrorAndLoadingHandlerHOC';
import useHttpHook from '../../../hooks/HttpHook';
import EventList from '../components/EventList';
import EventSearch from '../components/EventSearch';

const Events = () => {
  const { sendRequest } = useHttpHook();

  const [events, setEvents] = useState(null);

  const searchEvents = async (search, country, state, category) => {
    if (search || country || state || category) {
      let params = {};

      if (search) params = { ...params, name: search };
      if (country) params = { ...params, country };
      if (state) params = { ...params, state };
      if (category) params = { ...params, category };

      const searchUrl = `${environment.apiUrl}${environment.apis.event}`;
      const searchResponse = await sendRequest(searchUrl, 'GET', params);

      setEvents(searchResponse.data);
    }
  };

  useEffect(() => {
    const sendRequestAsync = async () => {
      const url = `${environment.apiUrl}${environment.apis.event}`;

      const res = await sendRequest(url, 'GET');
      setEvents(res.data);
    };

    sendRequestAsync();
  }, []);

  return (
    <>
      <EventSearch searchEvents={searchEvents} />

      {events ? <EventList events={events}></EventList> : null}
    </>
  );
};

export default withErrorAndLoadingHandlerHOC(Events);
