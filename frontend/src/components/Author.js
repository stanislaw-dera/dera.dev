import { graphql, useStaticQuery } from 'gatsby'
import { getImage } from 'gatsby-plugin-image'
import { GatsbyImage } from 'gatsby-plugin-image'
import React from 'react'
import styled from 'styled-components'

const StyledAuthor = styled.div`
    text-align: center;
    
    & > article > h1, & > article > p {
        padding: ${({theme}) => theme.spacing.sm} 0;
    }
`

const Avatar = styled(GatsbyImage)`
    border-radius: 50%;
`

export default function Author() {

    const data = useStaticQuery(graphql`
        query {
            strapiAuthor {
                name
                about
                photo {
                  localFile {
                    childImageSharp {
                      gatsbyImageData(
                        width: 100
                      )
                    }
                  }
               }
            }
        }      
    `).strapiAuthor

    const image = getImage(data.photo.localFile)

    return (
        <StyledAuthor>
            <Avatar image={image} alt="Blog author's photo" />

            <article>
                <h1>{data.name}</h1>
                <p>{data.about}</p>
            </article>
        </StyledAuthor>
    )
}
