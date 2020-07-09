import React from "react";
import { connect } from "react-redux";
import {
  Col,
  Row,
  Button,
  Card,
  Table,
  Popconfirm,
  Switch,
  Modal,
  Form,
  Input,
  Select,
  notification,
} from "antd";
import UserService from "../../../services/UserService";
import Auxiliary from "util/Auxiliary";
import axios from "axios";

const { Option } = Select;
const role = {
  1: "Admin",
  2: "User",
};

class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      visibleModal: false,
    };
  }

  componentDidMount() {
    this.getAllUser();
  }

  getAllUser = () => {
    UserService.get({}, (res) => {
      if (res.code !== 200) {
        UserService.handleErr({ title: "ERROR", message: res.message });
        return;
      }
      let users = res.data.map((k, i) => ({ ...k, key: i }));
      this.setState({ data: users });
    });
  };

  showModal = () => {
    this.setState({
      visibleModal: true,
    });
  };

  handleCreateUser = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        UserService.create(
          {
            username: values.username,
            role: parseInt(values.role),
          },
          (res) => {
            if (res.code === 200) {
              Modal.info({
                title: "Info",
                content: (
                  <div>
                    <p>{res.message}</p>
                  </div>
                ),
              });
            } else {
              Modal.error({
                title: "Error",
                content: (
                  <div>
                    <p>{res.message}</p>
                  </div>
                ),
              });
            }
            this.handleCancel(e);
            this.getAllUser();
          }
        );
      }
    });
  };

  handleCancel = (e) => {
    this.setState({
      visibleModal: false,
    });
    this.props.form.resetFields(["username", "role"]);
  };

  onChangeStatus = async (record) => {
    UserService.update(
      {
        username: record.username,
        role: record.role,
        isActive: !record.isActive,
        _id: record._id,
      },
      (res) => {
        this.responseChangeUser(res);
      }
    );
  };

  onChangeRole = async (record) => {
    UserService.update(
      {
        username: record.username,
        role: record.role === 1 ? 2 : 1,
        isActive: record.isActive,
        _id: record._id,
      },
      (res) => {
        this.responseChangeUser(res);
      }
    );
  };

  responseChangeUser = (res) => {
    let typeNoti = "success";
    if (res.code !== 200) {
      typeNoti = "error";
    }
    notification[typeNoti]({
      message: "Update user",
      description: res.message,
    });
    this.getAllUser();
  };

  render() {
    let { getFieldDecorator } = this.props.form;
    let { data, visibleModal } = this.state;

    const columns = [
      {
        title: "Username",
        dataIndex: "username",
        key: "username",
        render: (text) => <span className="gx-link">{text}</span>,
      },
      {
        title: "Is Admin",
        dataIndex: "role",
        key: "role",
        render: (value, record) => (
          <Popconfirm
            placement="top"
            title={"Are you sure to update role?"}
            onConfirm={() => {
              this.onChangeRole(record);
            }}
            okText="Yes"
            cancelText="No"
          >
            <Switch checked={value == 1 ? true : false} />
          </Popconfirm>
        ),
      },
      {
        title: "Status",
        dataIndex: "isActive",
        key: "isActive",
        render: (value, record) => (
          <Popconfirm
            placement="top"
            title={"Are you sure to update status?"}
            onConfirm={() => {
              this.onChangeStatus(record);
            }}
            okText="Yes"
            cancelText="No"
          >
            <Switch checked={value} />
          </Popconfirm>
        ),
      },
    ];
    return (
      <Auxiliary>
        <Row gutter={24}>
          <Col span={24}>
            <Card>
              <Button onClick={this.showModal}>Create</Button>
              <Table
                pagination={{ pageSize: 10 }}
                className="gx-table-responsive"
                columns={columns}
                dataSource={data}
              />
            </Card>
          </Col>
        </Row>

        <Modal
          title={`Create user`}
          visible={visibleModal}
          onOk={this.handleCreateUser}
          onCancel={this.handleCancel}
          footer={[
            <Button key="cancel" onClick={this.handleCancel}>
              Cancel
            </Button>,
            <Button key="create" type="primary" onClick={this.handleCreateUser}>
              Create
            </Button>,
          ]}
        >
          <Form layout="vertical">
            <Row gutter={24}>
              <Col span={12} key="username">
                <Form.Item label="Username">
                  {getFieldDecorator(`username`, {
                    rules: [
                      {
                        required: true,
                        message: "Input username!",
                      },
                    ],
                  })(<Input placeholder="Username" />)}
                </Form.Item>
              </Col>
              <Col span={12} key="role">
                <Form.Item label="Role">
                  {getFieldDecorator(`role`, {
                    rules: [
                      {
                        required: true,
                        message: "Input role!",
                      },
                    ],
                    initialValue: Object.keys(role)[1],
                  })(
                    <Select>
                      {Object.keys(role).map((key) => (
                        <Option value={key}>{role[key]}</Option>
                      ))}
                    </Select>
                  )}
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Modal>
      </Auxiliary>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Form.create({ name: "User" })(User));
