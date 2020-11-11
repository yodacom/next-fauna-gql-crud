import useSWR from "swr";
import { gql } from "graphql-request";
import Layout from "../components/layout";
import styles from "../styles/Home.module.css";
import { graphQLClient } from "../utils/graphql-client";
import Link from 'next/link';

const fetcher = async (query) => await graphQLClient.request(query);
const Home = () => {
  const { data, error } = useSWR(
    gql`
      {
        allTodos {
          data {
            _id
            task
            completed
          }
        }
      }
    `,
    fetcher
  );
  if (error) return <div>failed to load</div>;
  return (
    <Layout>
      <h1>Next Fauna GraphQL CRUD</h1>

      <Link href="/new">
        <a>Create New Todo</a>
      </Link>

      {data ? (
        <ul>
          {data.allTodos.data.map((todo) => (
            <li key={todo._id} className={styles.todo}>
              <span>{todo.task}</span>

              <span className={styles.edit}>
                <Link href="/todo/[id]" as={`/todo/${todo._id}`}>
                  <a>Edit</a>
                </Link>
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <div>loading...</div>
      )}
    </Layout>
  );
};
export default Home;

