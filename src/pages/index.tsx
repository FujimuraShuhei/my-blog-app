import { MicroCMSListResponse } from "microcms-js-sdk";
import type { GetStaticProps, NextPage } from "next";
import { client } from "src/libs/client";
import { content } from "tailwind.config";


export type Blog = {
  title: string;
  body: string;
}

type Props = MicroCMSListResponse<Blog>;

const Home:NextPage<Props> = (props) => {
  return (
    <div>
      <p>{`記事の総数: ${props.totalCount}件`}</p>
      <ul>
        {props.contents.map((content) => {
          return (
            <li key={content.id}>
              <Link href={`/blog${content.id}`}>
                <a>{content.title}</a>
              </Link>
            </li>
          );
       })}
     </ul>
    </div>
  );
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const data = await client.getList<Blog>({ endpoint: "blog" });
  console.log(data);
  return {
    props: data,
  };
};

export default Home;
