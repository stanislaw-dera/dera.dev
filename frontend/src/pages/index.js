import { graphql, Link } from 'gatsby'
import { getImage } from 'gatsby-plugin-image'
import { GatsbyImage } from 'gatsby-plugin-image'
import React from 'react'
import styled from 'styled-components'
import Author from '../components/Author'
import Layout from '../components/Layout'
import { Helmet } from "react-helmet";
import { Wrapper } from '../utils/Wrapper'

const LinkCard = styled(Link)`
  display: block;
  color: inherit;
  text-decoration: none;
`

const Card = styled.div`
  margin-top: ${({ theme }) => theme.spacing.xl};
  border-radius: ${({ theme }) => theme.spacing.sm};
  box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
  transition: transform .2s ease-in-out;

  &:hover {
    transform: translateY(-5px);
  }
`

const Padding = styled.div`
  padding: ${({ theme }) => theme.spacing.md};
`

export default function index({ data }) {

  const posts = data.allStrapiPosts.edges.map(post => post.node)

  return (
    <Layout>

      <Helmet>
        <title>Stanisław Dera - teenage webdeveloper</title>
      </Helmet>

      <Wrapper>

        <Author />

        {
          posts.map(post => (
            <LinkCard to={`/post/${post.slug}`} key={post.id}>
              <Card>
                <GatsbyImage image={getImage(post.coverImage.localFile)} style={{ width: "100%", borderTopLeftRadius: "5px", borderTopRightRadius: "5px" }} alt="" />
                <Padding>
                  <h2>{post.title}</h2>
                  <p>{post.lead}</p>
                </Padding>
              </Card>
            </LinkCard>

          ))
        }

      </Wrapper>
    </Layout>
  )
}


export const query = graphql`
  {
    allStrapiPosts(sort: {fields: updated_at, order: DESC}) {
      edges {
        node {
          id
          slug
          title
          lead
          updated_at
          coverImage {
            localFile {
              childImageSharp {
                gatsbyImageData(width: 800)
              }
            }
          }
        }
      }
    }
  }  

`