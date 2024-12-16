    import React from "react";
    import styled from "styled-components";

const Checkbox = ({ isChecked }) => {
  return (
    <StyledWrapper>
      <label className="container">
        <input type="checkbox" checked={isChecked} readOnly />
        <div className="checkmark" />
      </label>
    </StyledWrapper>
  );
};

    const StyledWrapper = styled.div`
    .container {
        --input-focus: #2d8cf0;
        --input-out-of-focus: #ccc;
        --bg-color: #fff;
        --bg-color-alt: #666;
        --main-color: #323232;
        position: relative;
        cursor: pointer;
    }

    .container input {
        position: absolute;
        opacity: 0;
    }

    .checkmark {
        width: 30px;
        height: 30px;
        position: relative;
        top: 0;
        left: 0;
        border: 2px solid var(--main-color);
        border-radius: 5px;
        box-shadow: 4px 4px var(--main-color);
        background-color: var(--input-out-of-focus);
        transition: all 0.3s;
    }

    .container input:checked ~ .checkmark {
        background-color: var(--input-focus);
    }

    .checkmark:after {
        content: "";
        width: 7px;
        height: 15px;
        position: absolute;
        top: 2px;
        left: 8px;
        display: none;
        border: solid var(--bg-color);
        border-width: 0 2.5px 2.5px 0;
        transform: rotate(45deg);
    }

    .container input:checked ~ .checkmark:after {
        display: block;
    }
    `;

    export default Checkbox;
