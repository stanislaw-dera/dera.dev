import { graphql, Link } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import React from 'react'
import ReactMarkdown from 'react-markdown'
import Layout from '../components/Layout'
import { Helmet } from "react-helmet";
import styled from 'styled-components'
import { Wrapper } from '../utils/Wrapper'

const StyledElement = styled.div`
    & p, h1, h2, h3, h4, h5, h6 {
        padding-top: 10px;
    }

    & > p > img {
      max-width: 100%;
      display: block;
      margin-left: auto;
      margin-right: auto;
      margin-top: 10px;
    }
`

const BackLink = styled(Link)`
  display: none;


  ${({ theme }) => theme.media.desktop} {
        display: block;
      position: sticky;
      top: 20px;
      left: 20px;
      opacity: .8;
      color: black;
      text-decoration: none;
    font-family: 'Work Sans', sans-serif;

    &:hover {
      opacity: 1;
    }

  }
  
`

const Images = styled.div`
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
  justify-content: center;
  & > img {
    width: 100%;
    margin-top: ${({ theme }) => theme.spacing.sm};
  }
  ${({ theme }) => theme.media.tablet} {
    & > img {
      width: ${props => props.size === 'huge' ? '100%' : props.size === 'big' ? 'calc(50% - 20px)' : '200px'} !important;
      margin: ${({ theme }) => theme.spacing.md};
    }
  }
`

export default function post({ data }) {

  const { title, lead, coverImage } = data.strapiPosts

  const content = []
  let imagesCounter = 0;

  data.strapiPosts.content.forEach(element => {

    if (element.strapi_component === "elements.rich-text") {
      content.push(
        <StyledElement key={`rich${element.id}`}>
          <ReactMarkdown components={{ h1: 'h2', h2: 'h3', h3: 'h4', h4: 'h5', h5: 'h6' }}>{element.content}</ReactMarkdown>
        </StyledElement>
      )
    }

    if (element.strapi_component === "elements.images") {
      const e = [];

      element.images.forEach(img => {
        e.push(<img key={`img${img.id}`} src={`${img.url}`} alt="" />)
      })

      imagesCounter++;

      content.push(
        <StyledElement key={`images${imagesCounter}`} style={{ textAlign: "center" }}>
          <Images size={element.size}>
            {e}
          </Images>
          <i style={{ textAlign: 'center' }}>{element.caption}</i>
        </StyledElement>);
    }

  })

  return (
    <Layout>

      <BackLink to="/">Back to the homepage</BackLink>

      <Helmet>
        <title>{title} - Stanisław Dera</title>
        <meta name="description" content={lead} />
      </Helmet>

      <Wrapper>
        <article>
          <GatsbyImage image={getImage(coverImage.localFile)} style={{ width: "100%" }} />
          <h1>{title}</h1>
          <p className="lead">{lead}</p>


          {content}

        </article>
      </Wrapper>

    </Layout>
  )
}

export const query = graphql`
query ($slug: String) {
  strapiPosts(slug: {eq: $slug}) {
    title
    lead
    content
    coverImage {
      localFile {
        childImageSharp {
          gatsbyImageData(placeholder: TRACED_SVG, height: 300, width: 800),
        }
      }
    }
  }
}
`