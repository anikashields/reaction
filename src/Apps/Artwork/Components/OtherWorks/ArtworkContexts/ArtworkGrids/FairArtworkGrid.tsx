import { FairArtworkGrid_artwork } from "__generated__/FairArtworkGrid_artwork.graphql"
import { withContext } from "Artsy/SystemContext"
import ArtworkGrid from "Components/ArtworkGrid"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { data as sd } from "sharify"
import { Header } from "../../Header"

export const FairArtworkGridFragmentContainer = createFragmentContainer<{
  artwork: FairArtworkGrid_artwork
}>(
  withContext(
    ({
      artwork: {
        fair: { href, artworksConnection },
      },
      mediator,
    }) => {
      return (
        <>
          <Header
            title={"Other works from the booth"}
            buttonHref={sd.APP_URL + href}
          />
          <ArtworkGrid
            artworks={artworksConnection}
            columnCount={[2, 3, 4]}
            mediator={mediator}
          />
        </>
      )
    }
  ),
  graphql`
    fragment FairArtworkGrid_artwork on Artwork
      @argumentDefinitions(excludeArtworkIDs: { type: "[String!]" }) {
      fair: show(at_a_fair: true) {
        artworksConnection(first: 8, exclude: $excludeArtworkIDs) {
          ...ArtworkGrid_artworks
        }
        href
      }
    }
  `
)

FairArtworkGridFragmentContainer.displayName = "FairArtworkGrid"
