import React, { useState } from "react";
import { Button, Form, Input, Divider, message, DatePicker } from "antd";
import { SearchOutlined, DownOutlined, UpOutlined } from "@ant-design/icons";
import { getCommentsAPI } from "../../../../api/events/events.api";
import { withRouter } from "react-router-dom";
import styles from "../../index.module.scss";

const CommentsSearch = (props) => {
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const toggleSearchVisible = () => {
    setIsSearchVisible(!isSearchVisible);
  };

  const onSearchFinish = async (values) => {
    try {
      setLoading(true);
      const response = await getCommentsAPI({
        eventId: props.match.params.eventId,
        name: values.username,
        comment: values.comment,
        createdTime: values.createdTime?.format("YYYY-MM-DD"),
      });

      if (response.data) {
        setLoading(false);
        props.setComments(response.data);
      } else {
        setLoading(false);
        message.info("Fail to search comments");
      }
    } catch (error) {
      setLoading(false);
      message.error("Fail to search comments");
    }
  };

  const handleCancel = async () => {
    setIsSearchVisible(false);
    try {
      const response = await getCommentsAPI({
        eventId: props.match.params.eventId,
      });
      if (response.data) {
        props.setComments(response.data);
      } else {
        message.info("Fail to get comments");
      }
    } catch (error) {
      message.error("Fail to get comments");
    }
  };

  const handleDatePickerChange = (date, dateString) => {};

  const formRef = React.createRef();

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "row-reverse",
          marginBottom: "10px",
        }}
      >
        <Button onClick={toggleSearchVisible} style={{ borderRadius: "6px" }}>
          <SearchOutlined />
          {isSearchVisible ? <UpOutlined /> : <DownOutlined />}
        </Button>
      </div>
      <div style={{ display: isSearchVisible ? "block" : "none" }}>
        <Form
          name="searchComment"
          layout="vertical"
          ref={formRef}
          onFinish={onSearchFinish}
          className={styles.comment_search_form}
        >
          <div className={styles.comment_search_inputs}>
            <Form.Item
              name="username"
              label="Username"
              className={styles.username_input}
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name="comment"
              label="Comments"
              className={styles.comments_input}
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name="createdTime"
              label="Created Time"
              className={styles.created_time_input}
            >
              <DatePicker
                format="YYYY-MM-DD"
                onChange={handleDatePickerChange}
              />
            </Form.Item>
          </div>
          <div className={styles.comment_search_buttons}>
            <Form.Item>
              <Button
                loading={loading}
                type="primary"
                icon={<SearchOutlined />}
                htmlType="submit"
                style={{ borderRadius: "6px", width: "120px" }}
              >
                Search
              </Button>
              <Button
                type="text"
                style={{ borderRadius: "6px" }}
                htmlType="reset"
                onClick={handleCancel}
              >
                Cancel
              </Button>
            </Form.Item>
          </div>
        </Form>
        <Divider />
      </div>
    </>
  );
};

export default withRouter(CommentsSearch);
