import History from "./History";
import styled from "styled-components";
import { InnerLayout } from "./Layouts";

function View() {
    return (
        <HistoryStyled>
            
            <History />
            
        </HistoryStyled>
    )
}

const HistoryStyled = styled.div`
    display: flex;
    flex-direction: column;
    padding-top: 2rem;
    paddding-left: 20rem;
    gap: 1rem;
    .history-item{
        background: #FCF6F9;
        border: 2px solid #FFFFFF;
        box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
        padding: 1rem;
        border-radius: 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
`;

export default View;