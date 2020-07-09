import React from "react";
import { connect } from "react-redux";
import {
  Col,
  Row,
  Card,
  Form,
  Slider,
  Select,
  Icon,
  Button,
  Switch,
} from "antd";
import Auxiliary from "util/Auxiliary";
import QuestionService from "../../../../services/QuestionService";

const ReactMarkdown = require("react-markdown");
const ButtonGroup = Button.Group;
const { Option } = Select;
const levelMapper = {
  1: "Easy",
  2: "Medium",
  3: "Hard",
};

const categoryMapper = {
  1: "OOP",
  2: "Data structure & algorithm",
  3: "Database",
  4: "Network & Operating system",
};

class Interview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      level: "1",
      category: "1",
      data: [],
      index: 0,
      hint: true,
    };
  }

  componentDidMount() {
    this.getQuestion(1, 1);
  }

  getQuestion = (category, level) => {
    QuestionService.get(
      {
        level: parseInt(level),
        category: parseInt(category),
      },
      (question) => {
        console.log(question);
        this.setState({ data: question.data });
      }
    );
  };

  nextQuestion = (e) => {
    this.setState({ index: this.state.index + 1 });
  };

  previousQuestion = (e) => {
    this.setState({ index: this.state.index - 1 });
  };

  onCategoryChange = (value) => {
    this.setState({ category: value, index: 0 });
    this.getQuestion(value, this.state.level);
  };

  onLevelChange = (value) => {
    this.setState({ level: value, index: 0 });
    this.getQuestion(this.state.category, value);
  };

  onModeChange = (value) => {
    this.setState({ hint: value });
  };

  render() {
    const { level, category, data, index, hint } = this.state;

    const marksCategory = {
      1: "",
      2: "",
      3: "",
      4: "",
    };

    const marksLevel = {
      1: "",
      2: "",
      3: "",
    };

    const marksMode = {
      1: "",
      2: "",
    };
    return (
      <Row gutter={24}>
        <Col span={24}>
          <Card style={{ height: "58vh", overflowY: "scroll" }}>
            {data.length > 0 ? (
              <div>
                <h3>Question:</h3>
                <ReactMarkdown source={data[index].content} />
                <br />
                {hint ? (
                  <div>
                    <h3>Hint:</h3>
                    <ReactMarkdown source={data[index].hint} />
                  </div>
                ) : null}
              </div>
            ) : null}
          </Card>

          <Card>
            <Row gutter={24}>
              <Col span={12}>
                <p
                  style={{
                    textAlign: "center",
                    color: "rgba(0,0,0,.45)",
                    fontStyle: "italic",
                  }}
                >
                  {" "}
                  {categoryMapper[category]}
                </p>
              </Col>

              <Col span={8}>
                <p
                  style={{
                    textAlign: "center",
                    color: "rgba(0,0,0,.45)",
                    fontStyle: "italic",
                  }}
                >
                  {" "}
                  {levelMapper[level]}
                </p>
              </Col>

              <Col span={4} style={{ textAlign: "center" }}>
                <p
                  style={{
                    textAlign: "center",
                    color: "rgba(0,0,0,.45)",
                    fontStyle: "italic",
                  }}
                >
                  {" "}
                  {"Hint"}
                </p>
              </Col>
            </Row>
            <Row gutter={24}>
              <Col span={12}>
                <Slider
                  max={4}
                  min={1}
                  defaultValue={0}
                  tooltipVisible={false}
                  marks={marksCategory}
                  onAfterChange={this.onCategoryChange}
                />
              </Col>
              <Col span={8}>
                <Slider
                  max={3}
                  min={1}
                  defaultValue={1}
                  tooltipVisible={false}
                  marks={marksLevel}
                  onAfterChange={this.onLevelChange}
                />
              </Col>
              <Col span={4} style={{ textAlign: "center" }}>
                <Switch defaultChecked onChange={this.onModeChange} />
              </Col>

              {data.length > 0 ? (
                <Col span={24} style={{ textAlign: "center" }}>
                  <ButtonGroup>
                    {index === 0 ? null : (
                      <Button onClick={this.previousQuestion} type="dashed">
                        <Icon type="left" />
                        Previous
                      </Button>
                    )}

                    {index === data.length - 1 ? null : (
                      <Button onClick={this.nextQuestion} type="dashed">
                        Next
                        <Icon type="right" />
                      </Button>
                    )}
                  </ButtonGroup>
                </Col>
              ) : null}
            </Row>
          </Card>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Form.create({ name: "Interview" })(Interview));
