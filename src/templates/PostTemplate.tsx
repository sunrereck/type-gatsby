import React from "react"
import Layout from "../components/layout"
import { ITemplateProps } from "../interface"
import { MDXRenderer } from "gatsby-plugin-mdx"
type IPostTemplateProps = ITemplateProps<{
  body: string
  date: string
  title: string
}>

const PostTemplate: React.FC<IPostTemplateProps> = React.memo(props => {
  const { title, date, body } = props.pageContext
  return (
    <Layout>
      <h2>{title}</h2>
      <h4>{date}</h4>
      <hr />
      {/* <div dangerouslySetInnerHTML={{ __html: html }} /> */}
      <MDXRenderer>{body}</MDXRenderer>
    </Layout>
  )
})

PostTemplate.displayName = "PostTemplate"

export default PostTemplate
