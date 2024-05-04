import { Progress } from "semantic-ui-react";
import styled from "styled-components";

const StyledProgressBar = styled(Progress)`
  &&& {
    .bar {
      background-color: ${(props) => props.color || "green"} !important;
      height: 6px;
      border-radius: 2px;
      position: absolute;
      top: 0;
      left: 0;
    }
  }
`;

const ProgressBar = (props: any) => {
  return (
    <>
      <div className="relative w-[53px] h-[6px] rounded-sm bg-[#FFFFFF66]">
        <StyledProgressBar
          percent={props.value}
          total={100}
          style={{ width: "53px", margin: 0 }}
          color={props.color}
          size="tiny"
        />
      </div>
    </>
  );
};

export default ProgressBar;
