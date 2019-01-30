import { space } from "@artsy/palette"
import { fadeIn, fadeOut, growAndFadeIn } from "Assets/Animations"
import Colors from "Assets/Colors"
import { garamond, unica } from "Assets/Fonts"
import React from "react"
import styled from "styled-components"
import { borderedInput } from "./Mixins"

export interface QuickInputProps extends React.HTMLProps<HTMLInputElement> {
  block?: boolean
  error?: string
  label?: string
  setTouched?: (fields: { [field: string]: boolean }) => void
  touchedOnChange?: boolean
}

export interface QuickInputState {
  focused: boolean
  value: string
}

/**
 * Quick input. Renders the label inside of the textbox.
 *
 */
export class QuickInput extends React.Component<
  QuickInputProps,
  QuickInputState
> {
  state = {
    focused: false,
    value: (this.props.value as string) || "",
    touchedOnChange: true,
  }

  componentWillReceiveProps(newProps) {
    if (this.props.name !== newProps.name) {
      this.setState({
        value: "",
      })
    }
  }

  onFocus = e => {
    this.setState({
      focused: true,
    })

    if (this.props.onFocus) {
      this.props.onFocus(e)
    }
  }

  onBlur = e => {
    if (this.props.setTouched) {
      this.props.setTouched({ [this.props.name]: true })
    }
    this.setState({
      focused: false,
    })

    if (this.props.onBlur) {
      this.props.onBlur(e)
    }
  }

  onChange = e => {
    if (this.props.touchedOnChange && this.props.setTouched) {
      this.props.setTouched({ [this.props.name]: true })
    }
    this.setState({
      value: e.currentTarget.value,
    })

    if (this.props.onChange) {
      this.props.onChange(e)
    }
  }

  render() {
    const {
      error,
      className,
      label,
      ref: _ref,
      type,
      onChange,
      setTouched,
      ...newProps
    } = this.props
    const showLabel = (!!this.state.focused || !!this.state.value) && !!label

    return (
      <Container>
        <InputContainer
          hasLabel={!!label}
          hasError={!!error}
          className={this.state.focused ? "focused" : ""}
        >
          <Label out={!showLabel}>{label}</Label>
          <InputComponent
            {...newProps}
            onFocus={this.onFocus}
            onBlur={this.onBlur}
            onChange={this.onChange}
            value={this.state.value}
            showLabel={showLabel}
          />
        </InputContainer>
        {error && <Error>{error}</Error>}
      </Container>
    )
  }
}

const Container = styled.div`
  padding-bottom: 5px;
`

const InputComponent = styled.input.attrs<{ showLabel: boolean }>({})`
  ${garamond("s17")};
  border: 0;
  font-size: 17px;
  outline: none;
  flex: 1;
  transition: all 0.25s;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 0 ${space(1)}px;
  line-height: initial;
  ${props => props.showLabel && "padding: 10px 10px 0 10px"};
`

const InputContainer = styled.div.attrs<{
  hasLabel?: boolean
  hasError: boolean
}>({})`
  ${borderedInput};
  margin-right: 0;
  margin-top: 5px;
  margin-bottom: 10px;
  display: flex;
  position: relative;
  height: ${p => (p.hasLabel ? "40px" : "20px")};
  flex-direction: row;
  align-items: center;
  box-sizing: content-box;
`

const Label = styled.label.attrs<{ out: boolean }>({})`
  ${unica("s12", "medium")};
  position: absolute;
  left: 10px;
  top: 7px;
  visibility: ${p => (p.out ? "hidden" : "visible")};
  animation: ${p => (p.out ? fadeOut : fadeIn)} 0.2s linear;
  transition: visibility 0.2s linear;
  z-index: 1;
`

const Error = styled.div`
  ${unica("s12")};
  margin-top: 10px;
  color: ${Colors.redMedium};
  transition: visibility 0.2s linear;
  animation: ${growAndFadeIn("16px")} 0.25s linear;
  height: 16px;
`

export default QuickInput
