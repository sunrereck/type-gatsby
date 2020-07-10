import React from "react"
import { graphql, Link, useStaticQuery } from "gatsby"
import { Query } from "../graphql-types"

import Layout from "../components/layout"
import SEO from "../components/seo"

const LatestPostListQuery = graphql`
  query {
    allMdx(sort: { order: DESC, fields: frontmatter___date }) {
      edges {
        node {
          body
          excerpt(truncate: true, pruneLength: 200)
          frontmatter {
            title
            path
            date(formatString: "YYYY-MM-DD HH:mm")
          }
        }
      }
    }
  }
`

const IndexPage: React.FC = () => {
  const data = useStaticQuery<Query>(LatestPostListQuery)
  return (
    <Layout>
      <SEO title="Home" />
      <ul>
        {data.allMdx.edges.map(({ node }) => (
          <li key={node.id}>
            <h2>
              <Link to={node.frontmatter.path}>{node.frontmatter.title}</Link>
            </h2>
            <h3>{node.frontmatter.date}</h3>
            <p>{node.excerpt}</p>
            <hr />
          </li>
        ))}
      </ul>
    </Layout>
  )
}

export default IndexPage
