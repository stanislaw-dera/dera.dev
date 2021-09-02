import styled from "styled-components";

export const Wrapper = styled.div`
    ${({ theme }) => theme.media.desktop} {
        width: 800px;
        margin: 0 auto;
    }
`