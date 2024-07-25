const getTodosFromHasura = async () => {
  const response = await fetch("https://glad-insect-68.hasura.app/v1/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-hasura-admin-secret":
        "EKC7HFRMfM9IY70b5nMkE6R4zvPRiUB7pyK6UCZZdxHGiFiU17q0YEIbxCDlNj04",
    },
    body: JSON.stringify({
      query: `
      query MyQuery {
        todos(order_by: {updated_at: desc}) {
          id
          title 
          is_done
        }
      }
    `,
    }),
  });
  const json = await response.json();
  const array = json.data.todos.map((todo: any) => {
    return {
      id: todo.id,
      title: todo.title,
      is_done: todo.is_done,
    };
  });

  return array;
};

const deleleTodoFromHasura = async (id: number) => {
  try {
    const response = await fetch(
      "https://glad-insect-68.hasura.app/v1/graphql",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-hasura-admin-secret":
            "EKC7HFRMfM9IY70b5nMkE6R4zvPRiUB7pyK6UCZZdxHGiFiU17q0YEIbxCDlNj04",
        },
        body: JSON.stringify({
          query: `mutation {
                    delete_todos_by_pk(id: ${id}) {
                        id
                        title
                    }
                }`,
        }),
      }
    );
    const json = await response.json();
    return json.data.delete_todos_by_pk;
  } catch (error) {
    console.log("error", error);
  }
};

const addTodoToHasura = async (title: string) => {
  console.log(title);
  try {
    const response = await fetch(
      "https://glad-insect-68.hasura.app/v1/graphql",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-hasura-admin-secret":
            "EKC7HFRMfM9IY70b5nMkE6R4zvPRiUB7pyK6UCZZdxHGiFiU17q0YEIbxCDlNj04",
        },
        body: JSON.stringify({
          query: `mutation {
                    insert_todos_one(object: {title: "${title}"}) {
                        id
                        title
                        is_done
                        updated_at
                    }
                }
            `,
        }),
      }
    );
    const json = await response.json();
    console.log(json);
    return json.data.insert_todos_one;
  } catch (error) {
    console.log("error", error);
  }
};

const updateTodoInHasura = async (id: number, isDone: boolean) => {
  try {
    const response = await fetch(
      "https://glad-insect-68.hasura.app/v1/graphql",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-hasura-admin-secret":
            "EKC7HFRMfM9IY70b5nMkE6R4zvPRiUB7pyK6UCZZdxHGiFiU17q0YEIbxCDlNj04",
        },
        body: JSON.stringify({
          query: `mutation {
                    update_todos_by_pk(pk_columns: {id: ${id}}, _set: {is_done: ${isDone}}) {
                        id
                        title
                        is_done
                        updated_at    
                    }
                }`,
        }),
      }
    );
    const json = await response.json();
    return json.data.update_todos_by_pk;
  } catch (error) {
    console.log("error", error);
  }
};

export {
  getTodosFromHasura,
  deleleTodoFromHasura,
  addTodoToHasura,
  updateTodoInHasura,
};
