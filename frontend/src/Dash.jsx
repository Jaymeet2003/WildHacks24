import React, {useState, useMemo} from 'react'
import styled from "styled-components";
import bg from './img/bg.png'
import {MainLayout} from './Layouts'
import Orb from './Orb'
import Navigation from './Navigation'
import Dashboard from './dashboard';
import Income from './Income'
import Expenses from './Expenses';
import { useGlobalContext } from './useGlobalContext';
import History from './History';
import SavingsBatl from './SavingsBatl';
import Retirement from './Retirement';
import Quiz from './Quiz';
import StockTable from '../public/scrapping/stocktablecomponent';
function Dash() {
    const [active, setActive] = useState(1)    
    const global = useGlobalContext()
    console.log(global);

    const displayData = () => {
        switch(active){
        // case 0: 
        //     return <Landing />
        case 1:
            return <Dashboard />
        case 2:
            return <History />
        case 3:
            return <Income />
        case 4: 
            return <Expenses />
        case 5:
            return <Quiz />
        case 6: 
            return <Retirement />
        case 7:
            return <StockTable />
        default: 
            return <Dashboard />
        }
    }
    const orbMemo = useMemo(() => {
        return <Orb />
    },[])
    return (
        <>
        <AppStyled bg={bg} className="App">
        {orbMemo}
        <MainLayout>
            <Navigation active={active} setActive={setActive} />
            <main>
            {displayData()}
            </main>
        </MainLayout>
        </AppStyled>
        </>
    )
    
}
const AppStyled = styled.div`
  height: 100vh;
  background-image: url(${props => props.bg});
  position: relative;
  main{
    flex: 1;
    background: rgba(252, 246, 249, 0.78);
    border: 3px solid #FFFFFF;
    backdrop-filter: blur(4.5px);
    border-radius: 32px;
    overflow-x: hidden;
    &::-webkit-scrollbar{
      width: 0;
    }
  }
`;

export default Dash;
