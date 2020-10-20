import React, { Component } from "react";

import { FaGithubAlt, FaPlus, FaSpinner } from "react-icons/fa";
import { Container, Form, SubmitButton } from "./styles";

import api from "../../services/api";

class Main extends Component {
  state = {
    newRepository: "",
    repositories: [],
    loading: false
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  }

  handleSubmit = async event => {
    event.preventDefault();

    this.setState({
      loading: true
    });

    const { newRepository, repositories, loading } = this.state;
    const response = await api.get(`/repos/${newRepository}`);
    const repositoryData = {
      name: response.data.full_name,
    }

    this.setState({
      repositories: [...repositories, repositoryData],
      newRepository: "",
      loading: false
    });
  }

  render() {
    const { newRepository, loading } = this.state;

    return (
      <Container>
        <h1>
          <FaGithubAlt />
          Repositories
        </h1>

        <Form onSubmit={this.handleSubmit}>
          <input
            name="newRepository"
            type="text"
            placeholder="Add a repository"
            value={newRepository}
            onChange={this.handleChange}
          />

          <SubmitButton loading={loading}>
            {loading ?
              <FaSpinner
                color="#FFF"
                size={14}
              /> :
              <FaPlus
                color="#FFF"
                size={14}
              />
            }
          </SubmitButton>
        </Form>
      </Container>
    )
  }
}

export default Main;