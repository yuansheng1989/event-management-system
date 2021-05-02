import { List, Comment, Avatar, Divider } from "antd";
import { UserOutlined } from "@ant-design/icons";
import moment from "moment";

const CommentsList = ({ comments }) => (
  <div>
    <List
      dataSource={comments}
      itemLayout="horizontal"
      pagination={{
        onChange: (page) => {
          console.log(page);
        },
        pageSize: 10,
      }}
      renderItem={(item) => (
        <>
          <Comment
            style={{maxWidth: "600px"}}
            author={item.name}
            avatar={
              <Avatar
                src={item.photoURL}
                icon={!item.photoURL && <UserOutlined />}
                alt={item.name}
              />
            }
            content={item.comment}
            datetime={moment(item.createAt).format("MMMM Do YYYY, h:mm:ss a")}
          />
          <Divider />
        </>
      )}
    />
  </div>
);

export default CommentsList;
