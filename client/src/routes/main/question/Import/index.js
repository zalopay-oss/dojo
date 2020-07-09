import React from "react";
import { connect } from "react-redux";
import {
  Col,
  Row,
  Button,
  Card,
  Table,
  Upload,
  Icon,
  Form,
  message,
  Select,
} from "antd";
import Auxiliary from "util/Auxiliary";
import * as ExcelJS from "exceljs";
import QuestionService from "../../../../services/QuestionService";

const { Option } = Select;
const level = {
  Easy: 1,
  Medium: 2,
  Hard: 3,
};

const category = {
  OOP: 1,
  "Data structure & algorithm": 2,
  Database: 3,
  "Network & Operating system": 4,
};

class Import extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      fileList: [],
      uploading: false,
    };
  }

  componentDidMount() {
    this.getAllQuestion();
  }

  handleUpload = () => {
    const { fileList } = this.state;
    const formData = new FormData();
    const questions = [];
    const self = this;
    fileList.forEach((file) => {
      const wb = new ExcelJS.Workbook();
      const reader = new FileReader();
      reader.onload = function (e) {
        wb.xlsx.load(e.target.result).then((data) => {
          const ws = data.worksheets[0];
          ws.eachRow((row, index) => {
            if (index === 1) return;
            let { values } = row;
            let question = {
              category: category[values[1]],
              level: level[values[2]],
              content: values[3],
              hint: values[4],
            };
            questions.push(question);
          });
          self.setState({
            fileList: [],
            uploading: false,
          });

          QuestionService.create({ questions: questions }, (res) => {
            if (res.code === 200) {
              message.success("Import successfully.");
            } else {
              message.error(res.message);
            }
            self.getAllQuestion();
          });
        });
      };
      reader.readAsArrayBuffer(file);
      formData.append("files[]", file);
    });

    this.setState({
      uploading: true,
    });
  };

  getAllQuestion = () => {
    QuestionService.get({}, (res) => {
      if (res.code !== 200) {
        QuestionService.handleErr({ title: "ERROR", message: res.message });
        return;
      }
      let users = res.data.map((k, i) => ({ ...k, key: i }));
      this.setState({ data: users });
    });
  };

  render() {
    let { getFieldDecorator } = this.props.form;
    let { data } = this.state;

    const level = {
      1: "EASY",
      2: "MEDIUM",
      3: "HARD",
    };

    const category = {
      1: "OOP",
      2: "Data structure & algorithm",
      3: "Database",
      4: "Network & Operating system",
    };
    const columns = [
      {
        title: "Campaign",
        dataIndex: "campaign",
        key: "campaign",
      },
      {
        title: "Category",
        dataIndex: "category",
        key: "category",
        render: (text) => <span className="gx-link">{category[text]}</span>,
      },
      {
        title: "Level",
        dataIndex: "level",
        key: "level",
        render: (text) => <span className="gx-link">{level[text]}</span>,
      },
      {
        title: "Content",
        dataIndex: "content",
        key: "content",
      },
      {
        title: "Hint",
        dataIndex: "hint",
        key: "hint",
      },
    ];
    const { uploading, fileList } = this.state;
    const props = {
      onRemove: (file) => {
        this.setState((state) => {
          const index = state.fileList.indexOf(file);
          const newFileList = state.fileList.slice();
          newFileList.splice(index, 1);
          return {
            fileList: newFileList,
          };
        });
      },
      beforeUpload: (file) => {
        this.setState((state) => ({
          fileList: [...state.fileList, file],
        }));
        return false;
      },
      fileList,
    };

    return (
      <Auxiliary>
        <Row gutter={24}>
          <Col span={24}>
            <Card>
              <Upload {...props}>
                <Button>
                  <Icon type="upload" /> Select File
                </Button>
              </Upload>

              <Button
                type="primary"
                onClick={this.handleUpload}
                disabled={fileList.length === 0}
                loading={uploading}
                style={{ marginTop: 16 }}
              >
                {uploading ? "Importing" : "Start Import"}
              </Button>

              <Table
                pagination={{ pageSize: 10 }}
                className="gx-table-responsive"
                columns={columns}
                dataSource={data}
              />
            </Card>
          </Col>
        </Row>
      </Auxiliary>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Form.create({ name: "Import" })(Import));
