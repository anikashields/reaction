import React from "react"
import styled, { StyledFunction } from "styled-components"
import { articleFullHref } from "../Constants"
import { Author, Date } from "./AuthorDate"
import { Share } from "./Share"

interface BylineProps {
  article: any
  layout?: string
}

interface BylineContainerProps {
  layout: string
}

export const Byline: React.SFC<BylineProps> = props => {
  const { article } = props
  const { authors, published_at } = article
  const layout = props.layout || article.layout
  const title = article.social_title || article.thumbnail_title
  const url = articleFullHref(article.slug)

  return (
    <BylineContainer layout={layout}>
      <Author
        authors={authors}
        layout={layout}
      />

      <Date
        date={published_at}
        layout={layout}
      />

      {layout !== "condensed" &&
        <Share
          url={url}
          title={title}
          color={layout === "fullscreen" ? "white" : "black"}
        />
      }
    </BylineContainer>
  )
}

const Div: StyledFunction<BylineContainerProps> = styled.div
const BylineContainer = Div`
  display: flex;
  flex-wrap: wrap;
  display: flex;
  align-items: flex-end;
`
