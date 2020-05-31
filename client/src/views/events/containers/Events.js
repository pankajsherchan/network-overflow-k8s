import React, { useEffect } from 'react';
import useHttpHook from '../../../hooks/HttpHook';

const Events = () => {
  const { sendRequest } = useHttpHook();

  const [event, setEvents] = useState(null);

  // get the events
  useEffect(() => {
    const sendRequestAsync = async () => {
      const url = `${environment.apiUrl}${environment.apis.event}`;

      const res = await sendRequest(url, 'GET');

      setEvents(res.data);
    };

    sendRequestAsync();
  }, []);

  useEffect(() => {
    const sendRequest = async () => {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/posts`);

      res.data.posts.map(p => {
        p.date = moment(p.date).format('MM/DD/YYYY');
        return p;
      });

      setPostList(res.data.posts);
    };

    sendRequest();
  }, []);

  return <div> Event Container </div>;
};

export default Events;
