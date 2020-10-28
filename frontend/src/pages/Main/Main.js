import React, { Component } from "react";

import Container from "../../components/Container";
import { FaGithubAlt, FaPlus, FaSpinner } from "react-icons/fa";
import { Form, SubmitButton, List } from "./styles";
import { Link } from "react-router-dom";

import api from "../../services/api";

class Main extends Component {
  state = {
    newRepository: "",
    repositories: [],
    loading: false
  };

  componentDidMount = () => {
    const repositories = JSON.parse(localStorage.getItem('repositories'));

    if (repositories) {
      this.setState({
        repositories: repositories
      })
    }
  }

  componentDidUpdate = (_, prevState) => {
    const { repositories } = this.state;

    if (prevState.repositories !== repositories) {
      localStorage.setItem("repositories", JSON.stringify(repositories));
    }
  }

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

    const { newRepository, repositories } = this.state;
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
    const { newRepository, repositories, loading } = this.state;

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
            {loading ? (
              <FaSpinner
                color="#FFF"
                size={14}
              />) : (
                <FaPlus
                  color="#FFF"
                  size={14}
                />)
            }
          </SubmitButton>
        </Form>
        <List>
          {repositories.map(repository => (
            <li key={repository.name}>
              <span>{repository.name}</span>
              <Link to={`/repository/${encodeURIComponent(repository.name)}`}>Details</Link>
            </li>
          ))}
        </List>
      </Container>
    )
  }
}

export default Main;