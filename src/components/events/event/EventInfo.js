import React, { Component } from 'react';
import styles from '../index.module.scss';
import { InfoOutlined, CalendarOutlined, CompassOutlined } from '@ant-design/icons';
import { Button, Avatar } from 'antd';
import 'antd/dist/antd.css';
import moment from 'moment';
import { compose, withProps } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";
import { UserOutlined } from '@ant-design/icons';
import { withRouter } from 'react-router-dom';

const MyMapComponent = compose(
    withProps({
      googleMapURL: "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places",
      loadingElement: <div style={{ height: `100%` }} />,
      containerElement: <div style={{ height: `300px` }} />,
      mapElement: <div style={{ height: `100%` }} />,
    }),
    withScriptjs,
    withGoogleMap
  )((props) =>
    <GoogleMap
      defaultZoom={8}
      defaultCenter={{ lat: Number(props.lat), lng: Number(props.lng) }}
    >
      {props.isMarkerShown && <Marker position={{ lat: Number(props.lat), lng: Number(props.lng) }} />}
    </GoogleMap>
  )

class EventInfo extends Component {
    state = {
        showMap: true
    }

    toggleMap = () => {
        this.setState({
            showMap: !this.state.showMap
        });
    }

    handleSeeMoreClick = () => {
        this.props.history.push(`/events/${this.props.match.params.eventId}/Attendees`);
    }
    
    render() {
        const { events } = this.props;

        return (
            <div className={styles.event_info}>
                <div className={styles.event_info_list}>
                    <div style={{padding: "5px 10px"}}>
                        <InfoOutlined style={{ fontSize: "20px", color: "#13a9b0" }}/>
                    </div>
                    <div style={{flex: 1}}>
                        <p style={{margin: "5px 5px 5px 0px"}}>
                            {events && events[0].description}
                        </p>
                    </div>
                </div>
                <div className={styles.event_info_list}>
                    <div style={{padding: "5px 10px"}}>
                        <CalendarOutlined style={{ fontSize: "20px", color: "#13a9b0" }}/>
                    </div>
                    <div style={{flex: 1}}>
                        {moment(events && events[0].date).format("MMMM DD, YYYY h:mm A")}
                    </div>
                </div>
                <div className={styles.event_info_list}>
                    <div style={{padding: "5px 10px"}}>
                        <CompassOutlined style={{  fontSize: "20px", color: "#13a9b0" }}/>
                    </div>
                    <div style={{flex: 1}}>
                        {events && events[0].venue}
                    </div>
                    <div style={{padding: "5px 20px"}}>
                        <Button
                            onClick={this.toggleMap}
                            type="primary"
                            style={{
                                backgroundColor: "#13a9b0",
                                borderColor: "#13a9b0",
                                borderRadius:" 6px",
                                width: "100px"
                            }}
                        >
                            {this.state.showMap? "Hide Map" : "Show Map"} 
                        </Button>
                    </div>
                </div>
                {
                    this.state.showMap &&
                    <div>
                        <MyMapComponent isMarkerShown lat={events && events[0].eventLatitude} lng={events && events[0].eventLogitude} />
                    </div>
                }
                <div style={{padding: "5px 10px"}}>
                    <div >
                        <p>Who's comming?</p>
                    </div>
                    <div>
                        {
                            events && events[0].attendees.slice(0, 5).map((attendee => {
                                return <Avatar src={attendee.photoURL} icon={!attendee.photoURL && <UserOutlined />} style={{marginRight: "20px", marginBottom: "10px"}}/>
                            }))
                        }
                        {
                            events &&
                            <Button
                                onClick={this.handleSeeMoreClick}
                                type="text"
                                style={{color: "#1890ff"}}
                            >
                                See more
                            </Button>
                        }
                    </div>                
                </div>
            </div>
        );
    }
}

export default withRouter(EventInfo);