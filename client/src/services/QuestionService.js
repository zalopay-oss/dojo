import Service from "./Service";
import React from "react";
import { notification } from "antd";
class QuestionService extends React.Component {
  handleErr(err) {
    console.log(err);
    notification["error"]({
      message: "UNEXPECTED ERROR",
      description: err.name + ": " + err.message,
      duration: 2.5,
    });
  }

  get(query, callback) {
    let params = { ...query };
    // TODO
    params["token"] = localStorage.getItem("token");
    Service.get("/question", { params })
      .then((res) => {
        callback(res.data);
      })
      .catch((err) => {
        this.handleErr(err);
      });
  }

  create(request, callback) {
    request["token"] = localStorage.getItem("token");
    Service.post("/question", request)
      .then((res) => {
        callback(res.data);
      })
      .catch((err) => {
        this.handleErr(err);
      });
  }

  delete(id, callback) {
    Service.patch("/question", {
      _id: id,
      token: localStorage.getItem("token"),
    })
      .then((res) => {
        callback(res.data);
      })
      .catch((err) => {
        this.handleErr(err);
      });
  }
}

export default new QuestionService();
