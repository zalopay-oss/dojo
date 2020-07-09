import Service from "./Service";
import React from "react";
import { notification } from "antd";
class UserService extends React.Component {
  handleErr(err) {
    console.log(err);
    notification["error"]({
      message: "UNEXPECTED ERROR",
      description: err.name + ": " + err.message,
      duration: 2.5,
    });
  }

  login(username, password, callback) {
    Service.post("/login", { username: username, password: password })
      .then((res) => {
        let { data } = res;
        callback(data);
      })
      .catch((err) => {
        this.handleErr(err);
      });
  }

  get(query, callback) {
    let params = { ...query };
    // TODO
    params["token"] = localStorage.getItem("token");
    // params["token"] = localStorage.getItem("token");
    Service.get("/user", { params })
      .then((res) => {
        callback(res.data);
      })
      .catch((err) => {
        this.handleErr(err);
      });
  }

  create(request, callback) {
    request["token"] = localStorage.getItem("token");
    Service.post("/user", request)
      .then((res) => {
        callback(res.data);
      })
      .catch((err) => {
        this.handleErr(err);
      });
  }

  update(request, callback) {
    request["token"] = localStorage.getItem("token");
    Service.put("/user", request)
      .then((res) => {
        callback(res.data);
      })
      .catch((err) => {
        this.handleErr(err);
      });
  }

  delete(id, callback) {
    Service.patch("/user", {
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

export default new UserService();
