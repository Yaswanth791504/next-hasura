import { gql } from "@apollo/client";

const ADD_TODO = gql`
  mutation addTodoMutation($title: String!) {
    insert_todos_one(object: { title: $title }) {
      id
      title
      is_done
    }
  }
`;

const GET_ALL_TODOS = gql`
  query {
    todos(order_by: { id: desc }) {
      id
      title
      is_done
    }
  }
`;

const TOGGLE_TODO = gql`
  mutation toggleTodoMutation($id: Int!, $is_done: Boolean!) {
    update_todos_by_pk(pk_columns: { id: $id }, _set: { is_done: $is_done }) {
      id
      title
      is_done
    }
  }
`;

const DELETE_TODO = gql`
  mutation deleteTodoMutation($id: Int!) {
    delete_todos_by_pk(id: $id) {
      id
    }
  }
`;

export { ADD_TODO, GET_ALL_TODOS, TOGGLE_TODO, DELETE_TODO };
