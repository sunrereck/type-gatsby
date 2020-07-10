import { CreatePagesArgs } from "gatsby"
import path from "path"
import { Query } from "../graphql-types"

export async function createPages({ actions, graphql }: CreatePagesArgs) {
  const { createPage } = actions
  const { data, errors } = await graphql<Query>(`
    {
      allMdx {
        edges {
          node {
            body
            frontmatter {
              path
              title
            }
          }
        }
      }
    }
  `)

  if (errors) {
    throw errors
  }

  data.allMdx.edges.forEach(({ node }: any) => {
    createPage({
      path: node.frontmatter.path,
      context: {
        body: node.body,
        title: node.frontmatter.title,
      },
      component: path.resolve(__dirname, "../templates/PostTemplate.tsx"),
    })
  })
}
