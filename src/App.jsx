import React, {useState} from 'react';
import PropTypes from 'prop-types'
import './App.css'
import moment from 'moment/moment';

function Pretty (Component) {
  class PrettyClass extends React.Component {
    render() {
      const create = moment(this.props.date);
      const now = moment();
      const difference = now.diff(create, 'hours');
      let prettyDate = '';
      if (difference >= 24) {
        prettyDate = now.diff(create, 'days') + ' дней назад';
      } else if (difference >= 1) {
        prettyDate = difference + ' часов назад';
      } else {
        prettyDate = now.diff(create, 'minutes') + ' минут назад';
      }
      return <Component date={prettyDate}/>;
    }
  }
  PrettyClass.propTypes = {
    date: PropTypes.string
  };

  return PrettyClass;
}

function DateTime(props) {
    return (
        <p className="date">{props.date}</p>
    )
}

DateTime.propTypes = {
  date: PropTypes.string
}

const DateTimePretty = Pretty(DateTime);

function Video(props) {
    return (
        <div className="video">
            <iframe src={props.url} allow="autoplay; encrypted-media" allowfullscreen></iframe>
            <DateTimePretty date={props.date} />
        </div>
    )
}

Video.propTypes = {
  url: PropTypes.string,
  date: PropTypes.string,
}

function VideoList(props) {
    return props.list.map(item => <Video url={item.url} date={item.date} key={item.key}/>);
}

export default function App() {
    const [list] = useState([
        {
            url: 'https://www.youtube.com/embed/rN6nlNC9WQA?rel=0&amp;controls=0&amp;showinfo=0',
            date: '2023-08-28 00:00:00'
        },
        {
            url: 'https://www.youtube.com/embed/dVkK36KOcqs?rel=0&amp;controls=0&amp;showinfo=0',
            date: '2023-08-27 12:10:00'
        },
        {
            url: 'https://www.youtube.com/embed/xGRjCa49C6U?rel=0&amp;controls=0&amp;showinfo=0',
            date: '2023-08-28 00:09:00'
        },
        {
            url: 'https://www.youtube.com/embed/RK1K2bCg4J8?rel=0&amp;controls=0&amp;showinfo=0',
            date: '2023-01-03 12:10:00'
        },
        {
            url: 'https://www.youtube.com/embed/TKmGU77INaM?rel=0&amp;controls=0&amp;showinfo=0',
            date: '2018-01-01 16:17:00'
        },
        {
            url: 'https://www.youtube.com/embed/TxbE79-1OSI?rel=0&amp;controls=0&amp;showinfo=0',
            date: '2017-12-02 05:24:00'
        },
    ]);

    return (
        <VideoList list={list} />
    );
}