import React, { useState, useEffect } from "react";
import {
  Form,
  Input,
  Button,
  Select,
  DatePicker,
  Row,
  Col,
  message,
  Spin,
} from "antd";
import GooglePlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-google-places-autocomplete";
import { connect } from "react-redux";
import { clearEditEventId } from "../../redux/events/actions";
import { setSiderMenu } from "../../redux/layout/actions";
import { fetchEvents, editEvent } from "../../redux/events/actions";
import { withRouter } from "react-router-dom";
import moment from "moment";

const { Option } = Select;

const mapStateToProps = (state) => {
  return {
    eventsLoading: state.EventsReducer.loading,
    events: state.EventsReducer.events,
    editEventId: state.EventsReducer.editEventId
  };
};

const EditEvent = (props) => {
  const [venue, setVenue] = useState(null);
  const [city, setCity] = useState(null);

  const {
    editEventId,
    history,
    eventsLoading,
    clearEditEventId,
    editEvent,
    setSiderMenu,
    match,
    fetchEvents,
    events,
  } = props;

  const [form] = Form.useForm();

  useEffect(() => {
    setSiderMenu("3");
    fetchEvents({ eventId: match.params.eventId });

    return () => {
      clearEditEventId();
    };
  }, []);

  useEffect(() => {
    if (events) {
      form.setFieldsValue({
        title: events[0].title,
        description: events[0].description,
        category: events[0].category,
        date: moment(events[0].date),
      });
    }

    if (venue) {
      form.setFieldsValue({ venue: venue.label });
      geocodeByAddress(venue.label)
        .then((results) => getLatLng(results[0]))
        .then(({ lat, lng }) =>
          form.setFieldsValue({
            eventLatitude: lat.toString(),
            eventLogitude: lng.toString(),
          })
        )
        .catch((error) => message.error("Fail to get latitude and longitude."));
    }

    if (city) {
      form.setFieldsValue({ city: city.label });
    }

    if (editEventId) {
      setSiderMenu("1");
      history.push(`/Events/${editEventId}`);
    }
  }, [venue, city, events, editEventId]);

  const onEditFinish = async (fieldsValue) => {
    const event = {
      ...fieldsValue,
      date: fieldsValue.date.format("YYYY-MM-DDTHH:mm:ss"),
      eventId: match.params.eventId
    };

    editEvent(event);
  };

  const validateMessages = {
    required: "${label} is required!",
    string: {
      max: "${label} should be less than ${max} characters!",
    },
  };

  return (
    <Row>
      <Col
        xl={{ span: 12, offset: 6 }}
        md={{ span: 18, offset: 3 }}
        sm={{ span: 24 }}
      >
        <Spin spinning={eventsLoading}>
          <h1 style={{ fontSize: "30px", textAlign: "center" }}>Edit Event</h1>
          <Form
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 18 }}
            validateMessages={validateMessages}
            onFinish={onEditFinish}
            form={form}
          >
            <Form.Item
              label="Title"
              name="title"
              rules={[
                { required: true, label: "Title" },
                { types: "string", max: 250, label: "Title" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Description"
              name="description"
              rules={[
                { required: true, label: "Description" },
                { types: "string", max: 1200, label: "Description" },
              ]}
            >
              <Input.TextArea />
            </Form.Item>
            <Form.Item
              label="Category"
              name="category"
              rules={[{ required: true, label: "Category" }]}
            >
              <Select>
                <Option value="culture">Culture</Option>
                <Option value="film">Film</Option>
                <Option value="food">Food</Option>
                <Option value="music">Music</Option>
                <Option value="travel">Travel</Option>
              </Select>
            </Form.Item>
            <Form.Item
              label="City"
              name="city"
              rules={[{ required: true, label: "City" }]}
            >
              <GooglePlacesAutocomplete
                apiKey="AIzaSyDPeBnQCO1KQkYHuGGYKGxOHzgyCXQtUrM"
                autocompletionRequest={{
                  types: ["(cities)"],
                }}
                selectProps={{
                  city,
                  onChange: setCity,
                }}
              />
            </Form.Item>
            <Form.Item
              label="Venue"
              name="venue"
              rules={[{ required: true, label: "Venue" }]}
            >
              <GooglePlacesAutocomplete
                apiKey="AIzaSyDPeBnQCO1KQkYHuGGYKGxOHzgyCXQtUrM"
                selectProps={{
                  venue,
                  onChange: setVenue,
                }}
              />
            </Form.Item>
            <Form.Item hidden name="eventLatitude" />
            <Form.Item hidden name="eventLogitude" />
            <Form.Item
              label="Date"
              name="date"
              rules={[{ type: "object", required: true, label: "Date" }]}
            >
              <DatePicker showTime />
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 6 }}>
              <Button type="primary" htmlType="submit">
                Edit
              </Button>
            </Form.Item>
          </Form>
        </Spin>
      </Col>
    </Row>
  );
};

export default connect(mapStateToProps, {
  clearEditEventId,
  setSiderMenu,
  fetchEvents,
  editEvent
})(withRouter(EditEvent));
