import { client } from "src/libs/client";
import { Blog } from "src/pages";
import { GetStaticProps, NextPage, GetStaticPaths } from "next";
import { MicroCMSContentId, MicroCMSDate } from "microcms-js-sdk";

type Props = Blog & MicroCMSContentId & MicroCMSDate;

const BlogId: NextPage<Props> = (props) => {
  return (
    <div>
      <h1>{props.title}</h1>
      <time>{props.publishedAt}</time>
      <div dangerouslySetInnerHTML={{ __html: props.body }} /></div>
    </div>
  );
};

export const getStaticPaths: GetStaticPaths<{id: string }> = async () => {
  const data = await client.getList({ endpoint: "blog" });
  const ids = data.contents.map((content) => '/blog/${ content.id }')
  return {
    paths: ids,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<Props, { id: string }> = async (
  ctx
) => {
  if (!ctx.params) {
    return {notFound: true }
  }
  const data = await client.getListDetail<Blog>({
    endpoint: "blog",
    contentId: ctx.params.id,
  });
  console.log(data);
  
  return {
    props: {},
  };
};

export default BlogId;