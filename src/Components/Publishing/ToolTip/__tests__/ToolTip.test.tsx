import { mount } from "enzyme"
import "jest-styled-components"
import React from "react"
import renderer from "react-test-renderer"
import { Gene, Artists } from "../../Fixtures/Components"
import { ArtistToolTip } from "../Artist"
import { GeneToolTip } from "../Gene"
import { ToolTip } from "../ToolTip"

describe("ToolTip", () => {
  describe("snapshots", () => {
    it("Renders an artist properly", () => {
      const component = renderer
        .create(<ToolTip model="artist" entity={Artists[0]} />)
        .toJSON()
      expect(component).toMatchSnapshot()
    })

    it("Renders a gene properly", () => {
      const component = renderer
        .create(<ToolTip model="gene" entity={Gene} />)
        .toJSON()
      expect(component).toMatchSnapshot()
    })
  })

  it("Renders an artist", () => {
    const component = mount(<ToolTip model="artist" entity={Artists[0]} />)
    expect(component.find(ArtistToolTip).length).toBe(1)
    expect(component.text()).toMatch(Artists[0].name)
  })

  it("Renders a gene", () => {
    const component = mount(<ToolTip model="gene" entity={Gene} />)
    expect(component.find(GeneToolTip).length).toBe(1)
    expect(component.text()).toMatch(Gene.name)
  })
})