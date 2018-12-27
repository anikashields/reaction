import {
  ArtworkBuyNow,
  ArtworkBuyNowMakeOffer,
  ArtworkMakeOffer,
  ArtworkSold,
} from "Apps/__tests__/Fixtures/Artwork/ArtworkSidebar/ArtworkSidebarCommercial"

import {
  OfferOrderWithFailure,
  OfferOrderWithSuccess,
  OrderWithFailure,
  OrderWithSuccess,
} from "Apps/__tests__/Fixtures/Artwork/MutationResults"

import { Button } from "@artsy/palette"
import { mount } from "enzyme"
import React from "react"
import { commitMutation as _commitMutation, RelayProp } from "react-relay"

import { ArtworkSidebarCommercial } from "Apps/Artwork/Components/ArtworkSidebar/ArtworkSidebarCommercial"
import { ErrorModal, ModalButton } from "Components/Modal/ErrorModal"
import { MockBoot } from "DevTools"

const commitMutation = _commitMutation as jest.Mock<any>

describe("ArtworkSidebarCommercial", () => {
  const getWrapper = artwork => {
    return mount(
      <MockBoot>
        <ArtworkSidebarCommercial
          artwork={artwork as any}
          relay={{ environment: {} } as RelayProp}
        />
      </MockBoot>
    )
  }

  beforeEach(() => {
    commitMutation.mockReset()
  })

  it("displays artwork enrolled in Buy Now", async () => {
    const artwork = Object.assign({}, ArtworkBuyNow)

    const wrapper = await getWrapper(artwork)

    expect(wrapper.text()).toContain("Buy now")
  })

  it("displays sold acquireable artwork", async () => {
    const artwork = Object.assign({}, ArtworkSold)

    const wrapper = await getWrapper(artwork)

    expect(wrapper.text()).toContain("Sold")
  })

  it("displays artwork enrolled in Make Offer", async () => {
    const artwork = Object.assign({}, ArtworkMakeOffer)

    const wrapper = await getWrapper(artwork)

    expect(wrapper.text()).toContain("Make offer")
  })

  it("displays artwork enrolled in both Buy Now and Make Offer", async () => {
    const artwork = Object.assign({}, ArtworkBuyNowMakeOffer)

    const wrapper = await getWrapper(artwork)

    expect(wrapper.text()).toContain("Buy now")
    expect(wrapper.text()).toContain("Make offer")
  })

  it("creates a Buy Now order and redirects to the order page", () => {
    window.location.assign = jest.fn()
    const component = getWrapper(ArtworkBuyNow)

    commitMutation.mockImplementationOnce((_environment, { onCompleted }) => {
      onCompleted(OrderWithSuccess)
    })

    component.find(Button).simulate("click")

    expect(commitMutation).toHaveBeenCalledTimes(1)
    expect(window.location.assign).toHaveBeenCalledWith("/orders/orderId")
  })

  it("displays an error modal when a Buy Now mutation fails", () => {
    window.location.assign = jest.fn()
    const component = getWrapper(ArtworkBuyNow)

    commitMutation.mockImplementationOnce((_environment, { onCompleted }) => {
      onCompleted(OrderWithFailure)
    })

    component.find(Button).simulate("click")

    expect(commitMutation).toHaveBeenCalledTimes(1)
    expect(window.location.assign).not.toHaveBeenCalled()

    const errorComponent = component.find(ErrorModal)
    expect(errorComponent.props().show).toBe(true)
    expect(errorComponent.text()).toContain("An error occurred")
    expect(errorComponent.text()).toContain(
      "Something went wrong. Please try again or contact orders@artsy.net."
    )

    component.find(ModalButton).simulate("click")
    expect(component.find(ErrorModal).props().show).toBe(false)
  })

  it("creates a Make Offer order and redirects to the order offer page", () => {
    window.location.assign = jest.fn()
    const component = getWrapper(ArtworkMakeOffer)

    commitMutation.mockImplementationOnce((_environment, { onCompleted }) => {
      onCompleted(OfferOrderWithSuccess)
    })

    component.find(Button).simulate("click")

    expect(commitMutation).toHaveBeenCalledTimes(1)
    expect(window.location.assign).toHaveBeenCalledWith("/orders/orderId/offer")
  })

  it("displays an error modal when a Make Offer mutation fails", () => {
    window.location.assign = jest.fn()
    const component = getWrapper(ArtworkMakeOffer)

    commitMutation.mockImplementationOnce((_environment, { onCompleted }) => {
      onCompleted(OfferOrderWithFailure)
    })

    component.find(Button).simulate("click")

    expect(commitMutation).toHaveBeenCalledTimes(1)
    expect(window.location.assign).not.toHaveBeenCalled()

    const errorComponent = component.find(ErrorModal)
    expect(errorComponent.props().show).toBe(true)
    expect(errorComponent.text()).toContain("An error occurred")
    expect(errorComponent.text()).toContain(
      "Something went wrong. Please try again or contact orders@artsy.net."
    )

    component.find(ModalButton).simulate("click")
    expect(component.find(ErrorModal).props().show).toBe(false)
  })
})